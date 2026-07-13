import os
import json
import argparse
import asyncio
import requests
import tweepy
from google import genai
from supabase import create_client, Client
from dotenv import load_dotenv
from playwright.sync_api import sync_playwright

load_dotenv(dotenv_path=".env.local")
load_dotenv(dotenv_path=".env")

# Configure APIs
client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

def get_twitter_client():
    api_key = os.getenv("TWITTER_API_KEY")
    api_secret = os.getenv("TWITTER_API_SECRET")
    access_token = os.getenv("TWITTER_ACCESS_TOKEN")
    access_token_secret = os.getenv("TWITTER_ACCESS_SECRET")

    if not all([api_key, api_secret, access_token, access_token_secret]):
        print("Missing Twitter API credentials.")
        return None

    return tweepy.Client(
        consumer_key=api_key, consumer_secret=api_secret,
        access_token=access_token, access_token_secret=access_token_secret
    )

def scrape_ebay(card_name: str, set_name: str):
    """Scrapes eBay for the lowest Buy It Now price."""
    print(f"Scraping eBay for {card_name} {set_name}...")
    try:
        with sync_playwright() as p:
            browser = p.chromium.launch(headless=True)
            page = browser.new_page()
            
            # Navigate to eBay search
            search_query = f"{card_name} {set_name}".replace(" ", "+")
            # LH_BIN=1 filters for Buy It Now
            url = f"https://www.ebay.com/sch/i.html?_nkw={search_query}&LH_BIN=1&_sop=15"
            
            page.goto(url, wait_until="domcontentloaded", timeout=30000)
            
            # Try to extract the first price
            # eBay prices are usually in a span with class 's-item__price'
            price_element = page.locator(".s-item__price").first
            
            if price_element.count() > 0:
                price_text = price_element.inner_text()
                # Clean price text (e.g., "$15.99 to $19.99" -> "15.99")
                cleaned_price = price_text.split(" ")[0].replace("$", "").replace(",", "")
                price = float(cleaned_price)
                
                # Get the link to the item
                link_element = page.locator(".s-item__link").first
                item_url = link_element.get_attribute("href") if link_element.count() > 0 else url
                
                browser.close()
                return {"found": True, "price": price, "url": item_url}
            
            browser.close()
    except Exception as e:
        print(f"Playwright eBay scrape failed: {e}")
        
    return {"found": False, "price": 0, "url": ""}

def scrape_tcgplayer(card_name: str, set_name: str):
    """Hits the Pokemon TCG API to get current market data as a fallback."""
    print(f"Fallback to TCGPlayer API for {card_name} {set_name}...")
    try:
        query = f'name:"{card_name}" set.name:"{set_name}"'
        response = requests.get(f"https://api.pokemontcg.io/v2/cards?q={query}")
        response.raise_for_status()
        data = response.json().get("data", [])
        if data:
            card = data[0]
            price = (card.get("tcgplayer", {}).get("prices", {}).get("holofoil", {}).get("market") or
                     card.get("tcgplayer", {}).get("prices", {}).get("normal", {}).get("market") or
                     card.get("cardmarket", {}).get("prices", {}).get("averageSellPrice") or 0)

            return {"found": True, "price": price, "url": card.get("tcgplayer", {}).get("url", "https://tcgplayer.com")}
    except Exception as e:
        print(f"Error scraping data for {card_name}: {e}")

    return {"found": False, "price": 0, "url": ""}

def scrape_market_data(card_name: str, set_name: str):
    # Try eBay first using Playwright
    data = scrape_ebay(card_name, set_name)
    if data["found"] and data["price"] > 0:
        return data
        
    # Fallback to TCGPlayer API
    return scrape_tcgplayer(card_name, set_name)

async def run_market_scouting():
    print("Starting The Rare Pick Market Scout...")
    url = os.getenv("NEXT_PUBLIC_SUPABASE_URL")
    key = os.getenv("SUPABASE_SERVICE_ROLE_KEY") or os.getenv("NEXT_PUBLIC_SUPABASE_ANON_KEY")
    
    if not url or not key:
        print("Missing Supabase credentials. Cannot fetch watchlists.")
        return
        
    supabase: Client = create_client(url, key)
    
    # Fetch agent config
    config_response = supabase.table("agent_config").select("prompt").eq("id", 1).single().execute()
    base_prompt = config_response.data.get("prompt") if config_response.data else "A Pokémon card deal has been found! Write a short, hype tweet about this underpriced card."
    
    # Fetch active watchlists
    print("Fetching active watchlists...")
    response = supabase.table("watchlists").select("*").eq("alert_active", True).execute()
    watchlists = response.data
    
    if not watchlists:
        print("No active watchlists found. Sleeping.")
        return
        
    print(f"Found {len(watchlists)} active watchlist items.")
    twitter = get_twitter_client()
    
    for item in watchlists:
        print(f"Scraping market for {item['card_name']} (Target: ${item['target_price']})...")
        data = scrape_market_data(item['card_name'], item['set_name'])
        
        if data["found"] and data["price"] > 0:
            print(f"Current Market Price: ${data['price']}")
            if data["price"] <= float(item["target_price"]):
                print("DEAL DETECTED! Price is below target!")
                
                # Ask AI to generate an alert
                prompt = (
                    f"System: {base_prompt}\n\n"
                    f"Context:\n"
                    f"Card: {item['card_name']} ({item['set_name']})\n"
                    f"Target Price: ${item['target_price']}\n"
                    f"Found Price: ${data['price']}\n"
                )
                
                try:
                    ai_response = client.models.generate_content(model="gemini-1.5-flash", contents=prompt)
                    tweet_text = ai_response.text.strip() + f"\n\nLink: {data['url']}"
                except Exception as gem_err:
                    print(f"Gemini error: {gem_err}. Using template alert.")
                    tweet_text = f"DEAL ALERT! {item['card_name']} ({item['set_name']}) spotted at ${data['price']} - below our ${item['target_price']} target!\n\nLink: {data['url']}"
                
                print(f"Generated Alert:\n{tweet_text}")
                
                if twitter:
                    try:
                        twitter.create_tweet(text=tweet_text)
                        print("Alert posted to Twitter!")
                        
                        # Log to database
                        supabase.table("agent_logs").insert({
                            "card_name": item['card_name'],
                            "set_name": item['set_name'],
                            "target_price": item['target_price'],
                            "actual_price": data['price'],
                            "tweet_text": tweet_text,
                            "tweet_url": data['url']
                        }).execute()
                        print("Logged to agent_logs.")
                    except Exception as e:
                        print(f"Failed to post alert: {e}")
                else:
                    # Log to database anyway for testing
                    supabase.table("agent_logs").insert({
                        "card_name": item['card_name'],
                        "set_name": item['set_name'],
                        "target_price": item['target_price'],
                        "actual_price": data['price'],
                        "tweet_text": tweet_text,
                        "tweet_url": data['url']
                    }).execute()
                    print("Twitter missing, but logged to agent_logs.")
                    
            else:
                print("Price is above target. No action taken.")
        else:
            print("Could not fetch reliable market data for this card.")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="The Rare Pick AI Agent")
    parser.add_argument("--mode", choices=["content", "scout"], required=True, help="Mode to run the agent in")
    args = parser.parse_args()

    if args.mode == "scout":
        asyncio.run(run_market_scouting())
