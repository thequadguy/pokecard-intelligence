import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const cardName = searchParams.get('q');

  try {
    // Construct query for Pokemon TCG API
    let query = 'set.id:base1 OR set.id:neo3'; // Default to some popular sets
    if (cardName) {
      query = `name:"*${cardName}*"`;
    }

    // Fetch from free Pokemon TCG API
    const res = await fetch(`https://api.pokemontcg.io/v2/cards?q=${encodeURIComponent(query)}&pageSize=12`);
    
    if (!res.ok) {
      throw new Error('Failed to fetch from Pokemon TCG API');
    }

    const json = await res.json();
    
    // Transform into our market format
    const results = json.data.map((card: any) => {
      // Safely extract price data if available
      const price = card.tcgplayer?.prices?.holofoil?.market || 
                    card.tcgplayer?.prices?.normal?.market || 
                    card.cardmarket?.prices?.averageSellPrice || 
                    0;
                    
      return {
        id: card.id,
        name: card.name,
        set: card.set.name,
        marketPrice: price,
        trend: price > 0 ? "+1.2%" : "N/A", // Simulated trend
        lastSold: "Recent",
        imageUrl: card.images.large || card.images.small
      };
    });

    return NextResponse.json({ data: results });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ data: [] }, { status: 500 });
  }
}
