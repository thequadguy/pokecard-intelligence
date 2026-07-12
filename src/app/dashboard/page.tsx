import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export default async function Dashboard() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <div className="max-w-[1200px] w-[90%] mx-auto py-24">
      <h1 className="font-display text-4xl font-semibold text-white mb-2">Welcome Back.</h1>
      <p className="text-silver mb-12">Logged in as: <span className="text-brand-blue">{user.email}</span></p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="mt-12 p-8 border border-white/10 rounded-2xl bg-obsidian-card text-center">
        <div className="text-4xl mb-4">🔮</div>
        <h3 className="font-display text-xl text-white mb-2">No items yet</h3>
        <p className="text-silver mb-6 max-w-[40ch] mx-auto">Start adding cards to your collection to unlock AI grading estimates and market insights.</p>
        <button className="btn-primary">Add Your First Card</button>
      </div>
    </div>
  );
}
