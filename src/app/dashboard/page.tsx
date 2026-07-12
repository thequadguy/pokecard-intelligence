import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export default async function Dashboard() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Fetch actual data from DB
  const { data: collections } = await supabase.from('collections').select('*').eq('user_id', user.id)
  const { data: watchlists } = await supabase.from('watchlists').select('*').eq('user_id', user.id)

  const totalValue = collections?.reduce((sum, item) => sum + (Number(item.purchase_price) || 0), 0) || 0;

  return (
    <div className="max-w-[1200px] w-[90%] mx-auto py-24">
      <h1 className="font-display text-4xl font-semibold text-white mb-2">Welcome Back.</h1>
      <p className="text-silver mb-12">Logged in as: <span className="text-brand-blue">{user.email}</span></p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="glass-card p-8">
          <h2 className="text-xl font-display text-white mb-2">Collection Value</h2>
          <div className="text-3xl font-bold text-gradient-blue">${totalValue.toFixed(2)}</div>
          <p className="text-xs text-silver mt-2">{collections?.length || 0} Cards Tracked</p>
        </div>
        
        <div className="glass-card p-8">
          <h2 className="text-xl font-display text-white mb-2">Active Alerts</h2>
          <div className="text-3xl font-bold text-gradient-blue">{watchlists?.filter(w => w.alert_active).length || 0}</div>
          <p className="text-xs text-silver mt-2">Target prices being monitored.</p>
        </div>

        <div className="glass-card p-8 border-brand-blue/30 relative overflow-hidden">
          <div className="absolute inset-0 bg-brand-blue/5"></div>
          <h2 className="text-xl font-display text-white mb-2 relative z-10">AI Deal Scout</h2>
          <p className="text-silver text-sm mb-6 relative z-10">The Market Scout is currently analyzing eBay and TCGPlayer for underpriced cards on your watchlist.</p>
          <div className="flex items-center gap-2 text-brand-blue text-sm font-semibold relative z-10">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
            Status: Active
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* My Collection Section */}
        <div>
          <h2 className="text-2xl font-display text-white mb-6 border-b border-white/10 pb-4">My Collection</h2>
          {collections && collections.length > 0 ? (
            <div className="flex flex-col gap-4">
              {collections.map(item => (
                <div key={item.id} className="glass-card p-4 flex items-center gap-4">
                  <img src={item.image_url} alt={item.card_name} className="w-16 h-24 object-contain" />
                  <div>
                    <h3 className="font-semibold text-white">{item.card_name}</h3>
                    <p className="text-xs text-silver uppercase">{item.set_name} • {item.condition}</p>
                    <p className="text-sm font-bold text-gold-light mt-1">${Number(item.purchase_price).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 border border-dashed border-white/10 rounded-lg text-silver text-sm">
              No cards added yet. Head to the Market Tracker to add some!
            </div>
          )}
        </div>

        {/* Watchlist Section */}
        <div>
          <h2 className="text-2xl font-display text-white mb-6 border-b border-white/10 pb-4">Watchlist Deals</h2>
          {watchlists && watchlists.length > 0 ? (
            <div className="flex flex-col gap-4">
              {watchlists.map(item => (
                <div key={item.id} className="glass-card p-4 flex items-center gap-4 border-l-2 border-l-brand-blue">
                  <img src={item.image_url} alt={item.card_name} className="w-16 h-24 object-contain opacity-70" />
                  <div>
                    <h3 className="font-semibold text-white">{item.card_name}</h3>
                    <p className="text-xs text-silver uppercase mb-2">{item.set_name}</p>
                    <div className="inline-block px-2 py-1 bg-brand-blue/10 border border-brand-blue/30 rounded text-xs text-brand-blue font-bold">
                      Target: ${Number(item.target_price).toFixed(2)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 border border-dashed border-white/10 rounded-lg text-silver text-sm">
              No active alerts. Add target prices from the Market Tracker.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
