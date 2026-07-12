import { login, signup } from './actions'

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center py-24 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(0,98,255,0.05)_0%,transparent_70%)] pointer-events-none" />
      
      <div className="glass-card w-full max-w-md p-8 relative z-10 animate-fade-up">
        <div className="text-center mb-8">
          <h1 className="font-display text-3xl font-semibold text-gradient-blue mb-2">Welcome Back</h1>
          <p className="text-silver text-sm">Sign in to manage your collection and deals.</p>
        </div>

        <form className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-xs font-semibold tracking-wider text-silver uppercase">Email</label>
            <input 
              id="email" 
              name="email" 
              type="email" 
              required 
              className="bg-obsidian-dark/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-brand-blue/50 focus:ring-1 focus:ring-brand-blue/50 transition-all"
              placeholder="hello@therarepick.com"
            />
          </div>
          
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-xs font-semibold tracking-wider text-silver uppercase">Password</label>
            <input 
              id="password" 
              name="password" 
              type="password" 
              required 
              className="bg-obsidian-dark/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-brand-blue/50 focus:ring-1 focus:ring-brand-blue/50 transition-all"
              placeholder="••••••••"
            />
          </div>

          <div className="flex gap-4 mt-4">
            <button formAction={login} className="btn-primary flex-1 py-3 justify-center">Sign In</button>
            <button formAction={signup} className="btn-secondary flex-1 py-3 justify-center">Sign Up</button>
          </div>
        </form>
      </div>
    </div>
  )
}
