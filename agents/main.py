import os
import json
import logging
import tweepy
from dotenv import load_dotenv

# Load environment variables (API Key)
load_dotenv()
import logging
from tools.pricecharting import get_collection_cards
from agents.researcher import research_card_info

from dotenv import load_dotenv
load_dotenv()

from google.antigravity import Agent, LocalAgentConfig
from google.antigravity.types import TemplatedSystemInstructions, CapabilitiesConfig

def save_draft_post(post_content: str) -> str:
    """
    Saves a drafted X (Twitter) post to the content bank.
    """
    bank_path = "/Users/jake/Desktop/the-rare-pick/agents/data/content_bank.json"
    
    # Ensure data dir exists
    os.makedirs(os.path.dirname(bank_path), exist_ok=True)
    
    # Load existing
    if os.path.exists(bank_path):
        with open(bank_path, 'r') as f:
            data = json.load(f)
    else:
        data = []
        
    data.append({"post": post_content, "status": "draft"})
    
    with open(bank_path, 'w') as f:
        json.dump(data, f, indent=2)
        
    return f"Saved post to content bank. Total drafts: {len(data)}"

def post_to_twitter(post_content: str) -> str:
    """
    Publishes a post directly to the @TheRarePick X (Twitter) timeline.
    Only call this when the post is finalized and ready for the public.
    """
    api_key = os.getenv("TWITTER_API_KEY")
    api_secret = os.getenv("TWITTER_API_KEY_SECRET")
    access_token = os.getenv("TWITTER_ACCESS_TOKEN")
    access_token_secret = os.getenv("TWITTER_ACCESS_TOKEN_SECRET")
    
    if not all([api_key, api_secret, access_token, access_token_secret]):
        logging.warning("Missing Twitter API credentials. Skipping live post.")
        return "Failed to post: Missing Twitter API credentials in environment."
        
    try:
        client = tweepy.Client(
            consumer_key=api_key, consumer_secret=api_secret,
            access_token=access_token, access_token_secret=access_token_secret
        )
        response = client.create_tweet(text=post_content)
        return f"Successfully posted to X! Tweet ID: {response.data['id']}"
    except Exception as e:
        return f"Failed to post to X: {e}"

async def run_content_generation():
    """
    The main orchestrator loop.
    """
    print("🚀 Starting The Rare Pick Content Engine...")
    
    # 1. Fetch collection
    print("Fetching collection from PriceCharting...")
    collection_json = get_collection_cards()
    collection = json.loads(collection_json)
    print(f"Found {len(collection)} cards.")

    # 2. Configure the Orchestrator Agent using AGY
    print("Configuring AGY Agents...")
    
    # Enable subagents
    config = LocalAgentConfig(
        capabilities=CapabilitiesConfig(enable_subagents=True),
        tools=[get_collection_cards, research_card_info, save_draft_post, post_to_twitter],
        system_instructions=TemplatedSystemInstructions(
            identity=(
                "You are the Orchestrator Agent for @TheRarePick, a passionate Pokémon card collector brand on X. "
                "Your job is to generate highly engaging, nostalgic, and authentic X posts about the user's collection. "
                "You write like a true collector: hunting for vintage holos, appreciating card art, and remembering the good old days. "
                "Never use generic AI buzzwords like 'Delve', 'Explore', 'Realm', or 'Tapestry'. Keep sentences punchy. Use line breaks. "
                "Use emojis sparingly. Use hashtags. Always mention @TheRarePick in a natural way.\n\n"
                "1. Use get_collection_cards to see what they own.\n"
                "2. Use research_card_info to get trivia.\n"
                "3. Write a short, punchy draft.\n"
                "4. Use save_draft_post to save it.\n"
                "5. Use post_to_twitter to publish the final version to X!"
            )
        )
    )

    # 3. Run the agent
    async with Agent(config) as agent:
        response = await agent.chat(
            "Draft a new X post about one of my Base Set cards. Make it nostalgic, short lines, and mention my specific notes. Save the draft, then publish it using post_to_twitter!"
        )
        print("Agent finished executing.")
        # We can stream or print the agent's thought process
        final_text = await response.text()
        print(f"Agent Log: {final_text}")

import argparse

def scrape_tcgplayer_deals(card_name: str) -> str:
    """
    Simulates scraping eBay or TCGPlayer for live deals that are underpriced.
    In production, this would use BeautifulSoup or a dedicated API.
    """
    import random
    
    # Simulate a deal search
    market_price = 350.00
    found_price = market_price * random.uniform(0.7, 0.95) # 5% to 30% below market
    
    return json.dumps({
        "card": card_name,
        "market_average": market_price,
        "found_listing_price": round(found_price, 2),
        "condition": "Near Mint",
        "url": f"https://tcgplayer.com/mock-listing/{card_name.replace(' ', '-')}"
    })

async def run_market_scouting():
    print("🚀 Starting The Rare Pick Market Scout...")
    print("Configuring AGY Market Scout Agent...")
    
    config = LocalAgentConfig(
        capabilities=CapabilitiesConfig(enable_subagents=False),
        tools=[scrape_tcgplayer_deals],
        system_instructions=TemplatedSystemInstructions(
            identity=(
                "You are the Market Scout Agent for The Rare Pick. "
                "Your job is to analyze market trends and identify high-value Pokémon card deals. "
                "Use the scrape_tcgplayer_deals tool to find live listings. "
                "If a listing is more than 15% below the market average, explicitly flag it as a '🔥 HIGH PRIORITY DEAL' and explain why it's a good buy."
            )
        )
    )

    async with Agent(config) as agent:
        response = await agent.chat("Scrape the market for Base Set Charizard and tell me if you find any good deals.")
        print("Scout finished executing.")
        print(f"Agent Log: {await response.text()}")

if __name__ == "__main__":
    import asyncio
    parser = argparse.ArgumentParser(description="Run The Rare Pick AI Agents")
    parser.add_argument("--mode", choices=["content", "scout"], default="content", help="Which agent to run")
    args = parser.parse_args()
    
    if args.mode == "content":
        asyncio.run(run_content_generation())
    elif args.mode == "scout":
        asyncio.run(run_market_scouting())
