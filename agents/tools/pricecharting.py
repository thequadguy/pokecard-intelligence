import os
import json
import requests

def get_collection_cards() -> str:
    """
    Fetches the user's Pokémon card collection using the live Pokémon TCG API.
    Returns a JSON string of the top cards owned, including real high-res images and prices.
    """
    # The user's specific collection represented as card IDs for the TCG API.
    collection_specs = [
        {"id": "base1-4", "condition": "Ungraded", "notes": "Childhood card"},
        {"id": "base1-2", "condition": "Ungraded", "notes": "Found in loft"},
        {"id": "base1-10", "condition": "LP", "notes": "Childhood binder"}
    ]
    
    collection = []
    
    for spec in collection_specs:
        try:
            res = requests.get(f"https://api.pokemontcg.io/v2/cards/{spec['id']}", headers={'User-Agent': 'Mozilla/5.0'})
            if res.status_code == 200:
                data = res.json().get('data', {})
                card = {
                    "name": data.get("name", "Unknown"),
                    "set": data.get("set", {}).get("name", "Unknown Set"),
                    "condition": spec["condition"],
                    "notes": spec["notes"],
                    "imageUrl": data.get("images", {}).get("large", ""),
                    "marketPrice": data.get("tcgplayer", {}).get("prices", {}).get("holofoil", {}).get("market", 0)
                }
                collection.append(card)
        except Exception as e:
            print(f"Failed to fetch {spec['id']}: {e}")
            
    return json.dumps(collection, indent=2)
