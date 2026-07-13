import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { updatePrompt } from './actions'

export default async function AdminDashboard() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Check if admin
  const { data: roleData } = await supabase.from('user_roles').select('role').eq('user_id', user.id).single()
  
  if (!roleData || roleData.role !== 'admin') {
    return (
      <div className="max-w-[1200px] w-[90%] mx-auto py-24 text-center">
        <h1 className="font-display text-4xl font-semibold text-white mb-2">Access Denied</h1>
        <p className="text-silver">You do not have permission to view this page.</p>
      </div>
    )
  }

  // Fetch config and logs
  const { data: config } = await supabase.from('agent_config').select('*').eq('id', 1).single()
  const { data: logs } = await supabase.from('agent_logs').select('*').order('created_at', { ascending: false }).limit(50)

  return (
    <div className="max-w-[1200px] w-[90%] mx-auto py-24">
      <h1 className="font-display text-4xl font-semibold text-gradient-blue mb-2">Admin Dashboard</h1>
      <p className="text-silver mb-12">Manage the AI Agent Engine.</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Config Section */}
        <div>
          <h2 className="text-2xl font-display text-white mb-6 border-b border-white/10 pb-4">Agent Config</h2>
          <div className="glass-card p-6">
            <form action={updatePrompt} className="flex flex-col gap-4">
              <label htmlFor="prompt" className="text-xs font-semibold tracking-wider text-silver uppercase">System Prompt</label>
              <textarea 
                id="prompt" 
                name="prompt" 
                rows={6}
                defaultValue={config?.prompt || ''}
                className="bg-obsidian-dark/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-brand-blue/50 focus:ring-1 focus:ring-brand-blue/50 transition-all"
              />
              <button type="submit" className="btn-primary py-2 self-start">Update Prompt</button>
            </form>
          </div>
        </div>

        {/* Logs Section */}
        <div>
          <h2 className="text-2xl font-display text-white mb-6 border-b border-white/10 pb-4">Recent Agent Logs</h2>
          {logs && logs.length > 0 ? (
            <div className="flex flex-col gap-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
              {logs.map(log => (
                <div key={log.id} className="glass-card p-4 border-l-2 border-l-brand-blue">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-white">{log.card_name} ({log.set_name})</h3>
                    <span className="text-[10px] text-silver">{new Date(log.created_at).toLocaleString()}</span>
                  </div>
                  <div className="flex gap-4 text-xs mb-3">
                    <span className="text-silver">Target: <span className="font-bold text-white">${Number(log.target_price).toFixed(2)}</span></span>
                    <span className="text-brand-blue">Actual: <span className="font-bold">${Number(log.actual_price).toFixed(2)}</span></span>
                  </div>
                  <div className="bg-obsidian-dark/50 p-3 rounded text-sm text-silver/90 italic">
                    {log.tweet_text}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 border border-dashed border-white/10 rounded-lg text-silver text-sm">
              No agent logs yet.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
