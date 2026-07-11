import os
import json
import sys

# Ensure we can import from the agents package
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from agents.tools.pricecharting import get_collection_cards

def build_gallery():
    """
    Fetches the collection data and saves it to a static JSON file for the frontend to consume.
    """
    print("Building dynamic collection gallery...")
    collection_json_str = get_collection_cards()
    
    # Parse just to ensure it's valid JSON before writing, and maybe format it
    collection_data = json.loads(collection_json_str)
    
    # Target directory is one level up from scripts/, in the 'data' folder
    root_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    target_dir = os.path.join(root_dir, 'data')
    os.makedirs(target_dir, exist_ok=True)
    
    output_path = os.path.join(target_dir, 'collection.json')
    with open(output_path, 'w') as f:
        json.dump(collection_data, f, indent=2)
        
    print(f"Successfully exported {len(collection_data)} cards to {output_path}")

if __name__ == "__main__":
    build_gallery()
