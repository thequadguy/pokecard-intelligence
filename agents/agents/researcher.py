import json

def research_card_info(card_name: str, set_name: str) -> str:
    """
    Research agent tool: Looks up history, artist, and trivia about a specific Pokémon card.
    
    Args:
        card_name: Name of the card (e.g. Charizard)
        set_name: Name of the set (e.g. Base Set)
    """
    # In a full implementation, this could call an external API (like Pokemon TCG API) or search the web.
    # For now, it returns curated trivia.
    data = {
        "Base Set Charizard": {
            "artist": "Mitsuhiro Arita",
            "release_year": 1999,
            "trivia": "The definitive chase card of the 90s. Mitsuhiro Arita designed it to look powerful and heavy.",
            "market_trend": "Highly volatile but always a grail."
        },
        "Base Set Blastoise": {
            "artist": "Ken Sugimori",
            "release_year": 1999,
            "trivia": "Often overshadowed by Charizard, but holds intense nostalgic value as the cover mascot of Pokemon Blue.",
            "market_trend": "Steady climb, especially for clean copies."
        }
    }
    
    key = f"{set_name} {card_name}"
    info = data.get(key, {"trivia": "A classic piece of Pokémon history."})
    return json.dumps(info, indent=2)
