import { addToCollection, addToWatchlist } from './actions'

export default async function Market() {
    const res = await fetch('/api/prices', { cache: 'no-store' });
  const { data: prices } = await res.json();

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
              <form action={async () => {
                'use server'
                await addToCollection(card)
              }}>
                <button className="w-full btn-primary py-2 text-xs">Add to Collection</button>
              </form>
              <form action={async () => {
                'use server'
                await addToWatchlist(card, card.marketPrice * 0.85)
              }}>
                <button className="w-full btn-secondary py-2 text-xs border border-white/10">Add to Watchlist (-15%)</button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
