export interface Card {
  id: string;
  name: string;
  set: string;
  setNumber: string;
  rarity: 'common' | 'uncommon' | 'rare' | 'holo_rare' | 'ultra_rare' | 'secret_rare';
  type: string;
  hp?: number;
  artist?: string;
  releaseYear: number;
  isHolographic: boolean;
  basePrice: number;
}
