import json, random

pokemon = ['Bulbasaur','Ivysaur','Venusaur','Charmander','Charmeleon','Charizard','Squirtle','Wartortle','Blastoise','Pikachu','Raichu','Mewtwo','Mew','Gyarados','Dragonite','Snorlax','Alakazam','Gengar','Machamp','Zapdos','Articuno','Moltres','Lugia','Ho-Oh','Rayquaza','Giratina','Arceus','Lucario','Greninja','Miraidon','Koraidon']
sets = [('Base Set','第1弾','基礎','베이스',1996,102),('Jungle','ジャングル','叢林','정글',1997,64),('Fossil','化石','化石','화석',1997,62),('Team Rocket','ロケット団','火箭隊','로켓단',1998,83),('Neo Genesis','金銀','新世代','신세대',2000,111),('EX Ruby','ルビー','紅寶石','루비',2003,109),('Diamond & Pearl','DP','鑽石珍珠','다이아몬드',2007,130),('Black & White','BW','黑白','블랙화이트',2011,114),('XY','XY','XY','XY',2014,146),('Sun & Moon','SM','日月','썬문',2017,149),('Sword & Shield','剣盾','劍盾','소드실드',2020,202),('Scarlet & Violet','SV','朱紫','스칼렛',2023,198)]
rarities = ['Common','Uncommon','Rare','Holo Rare','Ultra Rare','Secret Rare']
full_cards = []
for set_en, set_ja, set_zh, set_ko, year, count in sets:
  for i, poke in enumerate(pokemon):
    card_id = f"{set_en.lower().replace(' ','-')}-{i+1}"
    rarity = random.choice(rarities)
    base_price = {'Common':1,'Uncommon':2,'Rare':5,'Holo Rare':15,'Ultra Rare':50,'Secret Rare':150}[rarity]
    year_mult = 1 + (2026 - year) * 0.15
    en_mid = round(base_price * year_mult, 2)
    full_cards.append({'id':card_id,'name':poke,'set':set_en,'number':str(i+1),'rarity':rarity,'hp':random.randint(40,340),'types':[random.choice(['Fire','Water','Grass','Lightning','Psychic'])],'localNames':{'ja':poke,'zh':poke,'ko':poke},'prices':{'en':{'low':round(en_mid*0.75,2),'mid':en_mid,'high':round(en_mid*1.35,2)},'ja':{'low':round(en_mid*1.5,2),'mid':round(en_mid*2.0,2),'high':round(en_mid*2.7,2)},'zh':{'low':round(en_mid*0.5,2),'mid':round(en_mid*0.7,2),'high':round(en_mid*0.9,2)},'ko':{'low':round(en_mid*0.7,2),'mid':round(en_mid*0.9,2),'high':round(en_mid*1.2,2)}},'language':'en','year':year,'setNames':{'en':set_en,'ja':set_ja,'zh':set_zh,'ko':set_ko}})
with open('full_cards.json','w',encoding='utf-8') as f: json.dump(full_cards,f,ensure_ascii=False,indent=2)
print(f"Generated {len(full_cards)} cards across {len(sets)} sets")
