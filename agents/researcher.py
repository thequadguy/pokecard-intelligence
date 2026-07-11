import json
import requests

def research_card_info(card_name: str, card_set: str) -> str:
    """
    Returns real, live trivia and market data about a Pokémon card to help craft engaging social posts.
    """
    try:
        # Search for the card by name and set (the set name might be partial so we use standard search)
        query = f'name:"{card_name}" set.name:"{card_set}"'
        res = requests.get(f"https://api.pokemontcg.io/v2/cards", params={"q": query}, headers={'User-Agent': 'Mozilla/5.0'})
        
        if res.status_code == 200:
            data = res.json().get('data', [])
            if data:
                card = data[0] # Take the first match
                
                info = {
                    "artist": card.get("artist", "Unknown Artist"),
                    "flavorText": card.get("flavorText", f"A classic card from {card_set}."),
                    "rarity": card.get("rarity", "Unknown"),
                    "marketPrice": card.get("tcgplayer", {}).get("prices", {}).get("holofoil", {}).get("market", "Unknown")
                }
                return json.dumps(info, indent=2)
                
    except Exception as e:
        print(f"Error researching card: {e}")
        
    # Fallback if not found or API fails
    fallback = {
        "artist": "Unknown Artist",
        "flavorText": f"A classic card from {card_set}. Always a fun pull for collectors.",
        "rarity": "Unknown",
        "marketPrice": "Unknown"
    }
    return json.dumps(fallback, indent=2)
