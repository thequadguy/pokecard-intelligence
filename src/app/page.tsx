import Link from "next/link";
import Image from "next/image";
import collectionData from "../../data/collection.json";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* ── Hero ── */}
      <section className="relative grid grid-cols-1 md:grid-cols-2 items-center gap-8 min-h-screen pt-24 pb-16 px-4 md:px-12 max-w-[1200px] mx-auto w-full" id="home">
        <div className="absolute inset-0 pointer-events-none -z-10 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(0,98,255,0.10)_0%,transparent_70%)]" aria-hidden="true" />
        
        <div className="flex flex-col items-center md:items-start text-center md:text-left z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-blue/10 border border-brand-blue/30 rounded-full text-xs font-semibold tracking-[0.15em] uppercase text-brand-blue mb-8 animate-fade-up">
            <span className="w-1.5 h-1.5 bg-brand-blue rounded-full animate-pulse" aria-hidden="true"></span>
            New to the hobby · Sharing the journey
          </div>

          <h1 className="font-display text-5xl md:text-7xl font-semibold leading-tight tracking-tight mb-2 animate-fade-up">
            <span className="block font-extrabold tracking-tight text-gradient-hero">The Rare Pick</span>
            <span className="block text-silver font-normal text-[0.38em] tracking-[0.18em] uppercase mt-2">Passion. Discovery. The Journey.</span>
          </h1>

          <p className="text-base md:text-lg text-silver max-w-[50ch] my-6 animate-fade-up">
            You remember that feeling. A card lands in your hands and something just clicks. This is for everyone who felt that as a kid — and never quite let it go.
          </p>

          <div className="flex gap-4 flex-wrap justify-center md:justify-start animate-fade-up">
            <Link href="#collection" className="btn-primary">See the Finds</Link>
            <Link href="#about" className="btn-secondary">My Story</Link>
          </div>
        </div>

        <div className="relative z-10 flex items-center justify-center animate-fade-up mt-12 md:mt-0">
          <div className="absolute inset-[-40px] bg-[radial-gradient(ellipse,rgba(0,98,255,0.2)_0%,rgba(80,120,255,0.08)_40%,transparent_70%)] blur-[20px] rounded-full animate-slab-pulse"></div>
          <Image 
            src="/assets/slab-hero.jpg" 
            alt="The Rare Pick grading slab — Gem Mint 10" 
            width={560}
            height={800}
            className="w-full max-w-[560px] rounded-2xl shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_25px_80px_rgba(0,0,0,0.8),0_0_60px_rgba(0,98,255,0.15)] animate-slab-float transition-all duration-400 hover:-translate-y-2 hover:-rotate-1 hover:scale-105" 
            priority
          />
        </div>
      </section>

      {/* ── Stats Bar ── */}
      <div className="border-y border-white/10 py-10 bg-gradient-to-r from-transparent via-brand-blue/5 to-transparent">
        <div className="max-w-[1200px] w-[90%] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="p-2">
              <div className="font-display text-4xl md:text-5xl font-bold text-gradient-blue leading-none">🎨</div>
              <div className="text-xs font-medium tracking-widest uppercase text-silver mt-2">Cool Illustration Rares</div>
            </div>
            <div className="p-2">
              <div className="font-display text-4xl md:text-5xl font-bold text-gradient-blue leading-none">✨</div>
              <div className="text-xs font-medium tracking-widest uppercase text-silver mt-2">Vintage Holographics</div>
            </div>
            <div className="p-2">
              <div className="font-display text-4xl md:text-5xl font-bold text-gradient-blue leading-none">🔍</div>
              <div className="text-xs font-medium tracking-widest uppercase text-silver mt-2">Hard to Find Picks</div>
            </div>
            <div className="p-2">
              <div className="font-display text-4xl md:text-5xl font-bold text-gradient-blue leading-none">❤️</div>
              <div className="text-xs font-medium tracking-widest uppercase text-silver mt-2">Pure Passion</div>
            </div>
          </div>
        </div>
      </div>

      {/* ── About ── */}
      <section className="py-24" id="about">
        <div className="max-w-[1200px] w-[90%] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
            <div className="relative">
              <div className="relative z-10 rounded-2xl overflow-hidden bg-obsidian-card aspect-[4/5] border border-white/10 grid place-items-center">
                <Image src="/assets/slab-original.jpg" alt="Brand slab" fill className="object-cover" />
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <p className="font-body text-[0.7rem] font-semibold tracking-[0.25em] uppercase text-brand-blue mb-[-1rem]">Sound Familiar?</p>
              <h2 className="font-display text-4xl md:text-5xl font-semibold text-gradient-blue">This One&apos;s For You Too</h2>
              
              <blockquote className="font-display text-xl md:text-2xl italic text-brand-blue-light border-l-4 border-brand-blue pl-6 my-4">
                "You had a favourite card. Maybe it was a Charizard, maybe it was something nobody else cared about — but you cared. That feeling never really went away."
              </blockquote>
              
              <p className="text-silver text-base leading-relaxed">
                The Rare Pick started with a box of childhood cards found at the back of a closet. One look and it all came flooding back — the excitement of a new pack, the hunt for that one card, the pure joy of it.
              </p>
              
              <p className="text-silver text-base leading-relaxed">
                This is a place for anyone rediscovering that feeling. No experts here. No gatekeeping. Just someone genuinely learning, hunting, and sharing the ride.
              </p>
              
              <p className="text-gold-light italic text-base">If any of that sounds like you — welcome home.</p>
              
              <div className="flex flex-wrap gap-2 mt-4">
                {["Vintage Holos", "Illustration Rares", "Pack Openings", "Hidden Gems", "Card Art"].map(tag => (
                  <span key={tag} className="px-3.5 py-1.5 bg-brand-blue/10 border border-brand-blue/20 rounded-full text-xs font-medium text-brand-blue tracking-wide">
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="mt-6">
                <Link href="https://x.com/TheRarePick" target="_blank" className="btn-primary">Follow the Journey on X</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Collection ── */}
      <section className="py-24" id="collection">
        <div className="max-w-[1200px] w-[90%] mx-auto">
          <p className="font-body text-[0.7rem] font-semibold tracking-[0.25em] uppercase text-brand-blue mb-4">The Finds</p>
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-gradient-blue mb-6">Cards That Hit Different</h2>
          <p className="text-silver max-w-[52ch] text-lg mb-12">No formula, no investment spreadsheet — just cards that genuinely excite me. Cool art, great memories, or something I just had to have.</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {collectionData.map((card, index) => (
              <div key={index} className="glass-card p-6 flex flex-col group cursor-pointer animate-fade-up" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="relative w-full aspect-[3/4] mb-4 bg-gradient-to-br from-obsidian-mid to-obsidian-light rounded-xl overflow-hidden flex items-center justify-center border border-white/5 group-hover:border-brand-blue/30 transition-all duration-300">
                  <div className="absolute top-2 right-2 z-10 bg-brand-blue/20 backdrop-blur-md border border-brand-blue/30 text-white text-[10px] font-bold tracking-wider px-2 py-1 rounded">
                    {card.condition === "Ungraded" ? "RAW" : card.condition}
                  </div>
                  <Image 
                    src={card.imageUrl} 
                    alt={card.name} 
                    fill 
                    className="object-contain p-2 z-0 relative group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(135deg,#ff6ec7_0%,#a78bfa_20%,#60a5fa_40%,#34d399_60%,#0062ff_80%,#a78bfa_100%)] mix-blend-overlay opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"></div>
                </div>
                
                <h3 className="font-display font-semibold text-lg text-white truncate">{card.name}</h3>
                <p className="text-xs text-silver tracking-wider uppercase mb-1 truncate">{card.set}</p>
                <p className="text-sm font-semibold text-brand-blue mb-3 truncate">{card.notes}</p>
                
                {card.marketPrice && (
                  <div className="mt-auto pt-4 border-t border-white/10 flex justify-between items-end">
                    <span className="text-[10px] text-silver uppercase tracking-wider">Market</span>
                    <span className="text-sm font-bold text-gold-light">${card.marketPrice.toFixed(2)}</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="https://x.com/TheRarePick" target="_blank" className="btn-secondary">
              See All My Finds on X →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Content Pillars ── */}
      <section className="py-24 bg-gradient-to-b from-transparent via-brand-blue/5 to-transparent" id="content">
        <div className="max-w-[1200px] w-[90%] mx-auto">
          <p className="font-body text-[0.7rem] font-semibold tracking-[0.25em] uppercase text-brand-blue mb-4">What I Post</p>
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-gradient-blue mb-6">Real Talk. Real Finds.</h2>
          <p className="text-silver max-w-[52ch] text-lg mb-12">No gatekeeping, no flexing — just genuine content from someone learning and loving every step of the hobby.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="glass-card p-6 text-center flex flex-col items-center gap-3">
              <div className="text-3xl">📦</div>
              <div className="font-display font-semibold text-white">Pack Openings</div>
              <div className="text-sm text-silver leading-relaxed">Cracking packs and sharing every pull — the highs, the misses, the surprises. Unfiltered.</div>
            </div>
            <div className="glass-card p-6 text-center flex flex-col items-center gap-3">
              <div className="text-3xl">🎨</div>
              <div className="font-display font-semibold text-white">Card Art Appreciation</div>
              <div className="text-sm text-silver leading-relaxed">Celebrating the illustration rares and alternate arts that make this hobby genuinely beautiful.</div>
            </div>
            <div className="glass-card p-6 text-center flex flex-col items-center gap-3">
              <div className="text-3xl">✨</div>
              <div className="font-display font-semibold text-white">Vintage Holo Hunts</div>
              <div className="text-sm text-silver leading-relaxed">Tracking down those hard-to-find older holos — the ones that sparked the obsession in the first place.</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── For Brands ── */}
      <section className="py-24" id="brands">
        <div className="max-w-[1200px] w-[90%] mx-auto">
          <p className="font-body text-[0.7rem] font-semibold tracking-[0.25em] uppercase text-brand-blue mb-4">Partnerships</p>
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-gradient-blue mb-6">Work With The Rare Pick</h2>
          <p className="text-silver max-w-[60ch] text-lg mb-12">
            Growing a passionate community of Pokémon collectors and fans on X. If your brand loves this hobby as much as I do — let's talk.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="glass-card p-6 flex flex-col gap-4">
              <div className="w-12 h-12 bg-brand-blue/10 border border-brand-blue/30 rounded-xl grid place-items-center text-2xl">🤝</div>
              <h3 className="font-display font-semibold text-xl text-white">Sponsored Content</h3>
              <p className="text-sm text-silver leading-relaxed">Authentic, integrated posts and threads that speak directly to engaged collectors on X. No generic ads — real stories.</p>
            </div>
            <div className="glass-card p-6 flex flex-col gap-4">
              <div className="w-12 h-12 bg-brand-blue/10 border border-brand-blue/30 rounded-xl grid place-items-center text-2xl">📸</div>
              <h3 className="font-display font-semibold text-xl text-white">Product Reviews</h3>
              <p className="text-sm text-silver leading-relaxed">Honest, detailed reviews of grading supplies, storage solutions, card accessories, and collection tools.</p>
            </div>
            <div className="glass-card p-6 flex flex-col gap-4">
              <div className="w-12 h-12 bg-brand-blue/10 border border-brand-blue/30 rounded-xl grid place-items-center text-2xl">📢</div>
              <h3 className="font-display font-semibold text-xl text-white">Brand Amplification</h3>
              <p className="text-sm text-silver leading-relaxed">Drive awareness, launches, and campaigns directly to the high-intent Pokémon collecting community.</p>
            </div>
            <div className="glass-card p-6 flex flex-col gap-4">
              <div className="w-12 h-12 bg-brand-blue/10 border border-brand-blue/30 rounded-xl grid place-items-center text-2xl">🎯</div>
              <h3 className="font-display font-semibold text-xl text-white">Ideal Partners</h3>
              <p className="text-sm text-silver leading-relaxed">PSA · BGS · TCGPlayer · Pokémon Center · Card shops · Storage brands · Grading supplies · Collecting apps</p>
            </div>
          </div>

          <div className="text-center mt-14">
            <p className="text-silver/80 text-sm mb-6">Ready to reach serious collectors? Let's build something together.</p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link href="/media-kit" className="btn-primary">View Media Kit</Link>
              <Link href="mailto:hello@therarepick.com" className="btn-secondary">Get In Touch</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-32 text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[radial-gradient(ellipse,rgba(201,168,76,0.15)_0%,transparent_70%)] pointer-events-none" />
        <div className="max-w-[1200px] w-[90%] mx-auto relative z-10">
          <p className="font-body text-[0.7rem] font-semibold tracking-[0.25em] uppercase text-brand-blue mb-4">Come Along</p>
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-gradient-blue mb-6">Follow the Journey</h2>
          <p className="text-silver max-w-[52ch] mx-auto text-lg mb-10">
            This is just the start — new finds, new ideas, new discoveries. Follow on X and let's explore the hobby together.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="https://x.com/TheRarePick" target="_blank" className="btn-primary">Follow @TheRarePick on X</Link>
            <Link href="/market" className="btn-secondary">Explore Market</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
