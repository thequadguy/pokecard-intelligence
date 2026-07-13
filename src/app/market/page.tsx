import { addToCollection, addToWatchlist } from './actions'
import AddButton from './AddButton'

export default async function Market() {
  // Fetch directly from Pokemon TCG API (avoid self-referencing fetch on Vercel)
  const query = 'set.id:base1 OR set.id:neo3';
  const apiUrl = `https://api.pokemontcg.io/v2/cards?q=${encodeURIComponent(query)}&pageSize=12`;
  const res = await fetch(apiUrl, { cache: 'no-store' });
  const json = res.ok ? await res.json() : { data: [] };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const prices = json.data.map((card: any) => ({
    id: card.id,
    name: card.name,
    set: card.set.name,
    marketPrice: card.tcgplayer?.prices?.holofoil?.market || card.tcgplayer?.prices?.normal?.market || card.cardmarket?.prices?.averageSellPrice || 0,
    trend: '+1.2%',
    lastSold: 'Recent',
    imageUrl: card.images?.large || card.images?.small,
  }));

  return (
    <div className="max-w-[1200px] w-[90%] mx-auto py-24">
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-4">
        <div>
          <p className="font-body text-[0.7rem] font-semibold tracking-[0.25em] uppercase text-brand-blue mb-4">Market Watch</p>
          <h1 className="font-display text-4xl md:text-5xl font-semibold text-gradient-blue mb-4">Live Tracker</h1>
          <p className="text-silver max-w-[50ch]">Real-time market data for high-target vintage and modern grails.</p>
        </div>
        <div className="flex gap-2">
          <input type="text" placeholder="Search cards..." className="bg-obsidian-card border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-brand-blue/50" />
          <button className="btn-primary py-2 px-6">Search</button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {prices.map((card: any) => (
          <div key={card.id} className="glass-card p-6 flex flex-col group animate-fade-up">
            <div className="relative w-full aspect-[3/4] mb-4 bg-gradient-to-br from-obsidian-mid to-obsidian-light rounded-xl overflow-hidden flex items-center justify-center border border-white/5">
              <img src={card.imageUrl} alt={card.name} className="absolute inset-0 w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-500" />
            </div>
            
            <h3 className="font-display font-semibold text-lg text-white truncate">{card.name}</h3>
            <p className="text-xs text-silver tracking-wider uppercase mb-4">{card.set}</p>
            
            <div className="flex justify-between items-end mb-6">
              <div>
                <div className="text-[10px] text-silver uppercase tracking-wider mb-1">Market</div>
                <div className="text-xl font-bold text-gold-light">${card.marketPrice.toFixed(2)}</div>
              </div>
              <div className="text-right">
                <div className="text-[10px] text-silver uppercase tracking-wider mb-1">Trend</div>
                <div className="text-sm font-bold text-green-400">{card.trend}</div>
              </div>
            </div>

            <div className="flex flex-col gap-2 mt-auto">
              <AddButton 
                action={async () => {
                  'use server'
                  return await addToCollection(card)
                }}
                label="Add to Collection"
                className="w-full btn-primary py-2 text-xs"
              />
              <AddButton 
                action={async () => {
                  'use server'
                  return await addToWatchlist(card, card.marketPrice * 0.85)
                }}
                label="Add to Watchlist (-15%)"
                className="w-full btn-secondary py-2 text-xs border border-white/10"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
