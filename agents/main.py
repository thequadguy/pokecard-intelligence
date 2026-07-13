import os
import json
import argparse
import asyncio
import requests
import tweepy
from google import genai
from supabase import create_client, Client
from dotenv import load_dotenv

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

    client = tweepy.Client(
        consumer_key=api_key, consumer_secret=api_secret,
        access_token=access_token, access_token_secret=access_token_secret
    )
    return client

def scrape_market_data(card_name: str, set_name: str):
    """Hits the Pokemon TCG API to get current market data as a proxy for scraping."""
    try:
        # Simplistic search query
        query = f'name:"{card_name}" set.name:"{set_name}"'
        response = requests.get(f"https://api.pokemontcg.io/v2/cards?q={query}")
        response.raise_for_status()
        data = response.json().get("data", [])
        if data:
            card = data[0]
            # Safely extract price
            price = (card.get("tcgplayer", {}).get("prices", {}).get("holofoil", {}).get("market") or
                     card.get("tcgplayer", {}).get("prices", {}).get("normal", {}).get("market") or
                     card.get("cardmarket", {}).get("prices", {}).get("averageSellPrice") or 0)
            
            return {"found": True, "price": price, "url": card.get("tcgplayer", {}).get("url", "https://tcgplayer.com")}
    except Exception as e:
        print(f"Error scraping data for {card_name}: {e}")
    
    return {"found": False, "price": 0, "url": ""}

async def run_content_generation():
    print("🚀 Starting The Rare Pick Content Engine...")
    
    try:
        # model initialized via client
        
        prompt = (
            "You are the social media manager for 'The Rare Pick', a premium Pokémon card collecting brand. "
            "Write an engaging, authentic Twitter post (under 280 characters) about the thrill of collecting vintage Pokémon cards. "
            "Do not use hashtags. Keep it natural and genuine."
        )
        
        response = client.models.generate_content(model='gemini-1.5-flash', contents=prompt)
        tweet_text = response.text.strip()
        
        print(f"\nGenerated Tweet:\n{tweet_text}\n")
        
        twitter = get_twitter_client()
        if twitter:
            print("Posting to Twitter...")
            twitter.create_tweet(text=tweet_text)
            print("Successfully posted!")
        else:
            print("Twitter not configured. Skipping post.")
            
    except Exception as e:
        print(f"Error generating content: {e}")

async def run_market_scouting():
    print("🚀 Starting The Rare Pick Market Scout...")
    print("Connecting to Supabase Database...")
    
    url = os.getenv("NEXT_PUBLIC_SUPABASE_URL")
    key = os.getenv("SUPABASE_SERVICE_ROLE_KEY") or os.getenv("NEXT_PUBLIC_SUPABASE_ANON_KEY")
    
    if not url or not key:
        print("Missing Supabase credentials. Cannot fetch watchlists.")
        return

    supabase: Client = create_client(url, key)
    
    # Fetch active watchlists
    print("Fetching active watchlists...")
    response = supabase.table("watchlists").select("*").eq("alert_active", True).execute()
    watchlists = response.data
    
    if not watchlists:
        print("No active watchlists found. Sleeping.")
        return
        
    print(f"Found {len(watchlists)} active watchlist items.")
    
    # model initialized via client
    twitter = get_twitter_client()

    for item in watchlists:
        print(f"Scraping market for {item['card_name']} (Target: ${item['target_price']})...")
        data = scrape_market_data(item['card_name'], item['set_name'])
        
        if data["found"] and data["price"] > 0:
            print(f"Current Market Price: ${data['price']}")
            if data["price"] <= float(item["target_price"]):
                print("🔥 DEAL DETECTED! Price is below target!")
                
                # Ask AI to generate an alert
                prompt = (
                    f"A Pokémon card deal has been found!\n"
                    f"Card: {item['card_name']} ({item['set_name']})\n"
                    f"Target Price: ${item['target_price']}\n"
                    f"Found Price: ${data['price']}\n"
                    f"Write a short, exciting Twitter alert (under 280 chars) announcing this deal to the community."
                )
                
                ai_response = client.models.generate_content(model='gemini-1.5-flash', contents=prompt)
                tweet_text = ai_response.text.strip() + f"\n\nLink: {data['url']}"
                
                print(f"Generated Alert:\n{tweet_text}")
                
                if twitter:
                    try:
                        twitter.create_tweet(text=tweet_text)
                        print("Alert posted to Twitter!")
                    except Exception as e:
                        print(f"Failed to post alert: {e}")
            else:
                print("Price is above target. No action taken.")
        else:
            print("Could not fetch reliable market data for this card.")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Run The Rare Pick AI Agents")
    parser.add_argument("--mode", choices=["content", "scout"], default="content", help="Which agent to run")
    args = parser.parse_args()
    
    if args.mode == "content":
        asyncio.run(run_content_generation())
    elif args.mode == "scout":
        asyncio.run(run_market_scouting())
