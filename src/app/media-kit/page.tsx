import Link from "next/link";
import Image from "next/image";

export default function MediaKit() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* ── Media Kit Hero ── */}
      <section className="relative min-h-[80vh] flex items-center py-24">
        <div className="absolute inset-0 pointer-events-none -z-10 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(0,98,255,0.10)_0%,transparent_70%)]" aria-hidden="true" />
        <div className="max-w-[1200px] w-[90%] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-blue/10 border border-brand-blue/30 rounded-full text-xs font-semibold tracking-[0.15em] uppercase text-brand-blue mb-8 animate-fade-up">
              <span>📋</span> Media Kit · 2026
            </div>
            <h1 className="font-display text-5xl md:text-7xl font-semibold leading-tight tracking-tight mb-6 animate-fade-up text-gradient-hero">
              Partner With<br/>The Rare Pick
            </h1>
            <p className="text-lg text-silver max-w-[50ch] mb-10 animate-fade-up">
              Reach a growing community of serious Pokémon collectors, vintage card investors, and enthusiasts on X — a niche with real purchasing power.
            </p>
            <div className="flex gap-4 flex-wrap animate-fade-up">
              <Link href="mailto:hello@therarepick.com" className="btn-primary">📧 Email to Partner</Link>
              <Link href="https://x.com/TheRarePick" target="_blank" className="btn-secondary">View Profile on X</Link>
            </div>
          </div>
          <div className="relative z-10 flex items-center justify-center animate-fade-up mt-12 md:mt-0">
            <div className="absolute inset-[-40px] bg-[radial-gradient(ellipse,rgba(0,98,255,0.2)_0%,rgba(80,120,255,0.08)_40%,transparent_70%)] blur-[20px] rounded-full animate-slab-pulse"></div>
            <Image 
              src="/assets/slab-hero.jpg" 
              alt="The Rare Pick brand slab" 
              width={560}
              height={800}
              className="w-full max-w-[400px] rounded-2xl shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_25px_80px_rgba(0,0,0,0.8),0_0_60px_rgba(0,98,255,0.15)] animate-slab-float transition-all duration-400 hover:-translate-y-2 hover:-rotate-1 hover:scale-105" 
            />
          </div>
        </div>
      </section>

      {/* ── Stats Strip ── */}
      <div className="border-y border-white/10 py-10 bg-gradient-to-r from-transparent via-brand-blue/5 to-transparent">
        <div className="max-w-[1200px] w-[90%] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="p-2">
              <div className="font-display text-4xl font-bold text-gradient-blue leading-none">X</div>
              <div className="text-xs font-medium tracking-widest uppercase text-silver mt-2">Primary Platform</div>
            </div>
            <div className="p-2">
              <div className="font-display text-4xl font-bold text-gradient-blue leading-none">🎯</div>
              <div className="text-xs font-medium tracking-widest uppercase text-silver mt-2">High-Intent Collectors</div>
            </div>
            <div className="p-2">
              <div className="font-display text-4xl font-bold text-gradient-blue leading-none">PSA</div>
              <div className="text-xs font-medium tracking-widest uppercase text-silver mt-2">Grading Focused</div>
            </div>
            <div className="p-2">
              <div className="font-display text-4xl font-bold text-gradient-blue leading-none">Growing</div>
              <div className="text-xs font-medium tracking-widest uppercase text-silver mt-2">Fast Audience Growth</div>
            </div>
          </div>
        </div>
      </div>

      {/* ── About the Creator ── */}
      <section className="py-24">
        <div className="max-w-[1200px] w-[90%] mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div>
            <p className="font-body text-[0.7rem] font-semibold tracking-[0.25em] uppercase text-brand-blue mb-4">The Creator</p>
            <h2 className="font-display text-4xl md:text-5xl font-semibold text-gradient-blue mb-6">Who Is The Rare Pick?</h2>
            <p className="text-silver text-base leading-relaxed mb-4">
              A returning Pokémon collector with a passion for vintage cards, PSA grading, and smart acquisitions. The journey from childhood collector to serious hobbyist resonates deeply with a massive, underserved audience on X.
            </p>
            <p className="text-silver text-base leading-relaxed mb-8">
              The face-free format means the focus stays 100% on the cards, the content, and the community — making it the perfect vehicle for authentic brand integration that doesn&apos;t feel like an ad.
            </p>
            <div className="flex flex-wrap gap-2">
              {["Vintage Cards", "PSA Grading", "Base Set", "Pack Openings", "Market Analysis"].map(tag => (
                <span key={tag} className="px-3.5 py-1.5 bg-brand-blue/10 border border-brand-blue/20 rounded-full text-xs font-medium text-brand-blue tracking-wide">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="glass-card p-8 flex flex-col md:flex-row gap-8 items-center border border-white/10 relative overflow-hidden">
            <div className="absolute inset-0 bg-brand-blue/5 -z-10 pointer-events-none"></div>
            <div className="w-32 h-32 relative shrink-0 rounded-xl overflow-hidden border border-white/20 shadow-2xl">
              <Image src="/assets/slab-original.jpg" alt="The Rare Pick brand slab" fill className="object-cover" />
            </div>
            <div className="flex flex-col gap-3 w-full">
              {[
                { label: "Brand", value: "The Rare Pick" },
                { label: "Handle", value: "@TheRarePick" },
                { label: "Platform", value: "X (Twitter)" },
                { label: "Niche", value: "Pokémon Cards · PSA" },
                { label: "Email", value: "hello@therarepick.com" }
              ].map(item => (
                <div key={item.label} className="flex justify-between border-b border-white/5 pb-2 last:border-0 last:pb-0">
                  <span className="text-xs uppercase tracking-widest text-silver">{item.label}</span>
                  <span className="text-sm font-semibold text-white">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Content Pillars ── */}
      <section className="py-24 bg-gradient-to-b from-transparent via-brand-blue/5 to-transparent">
        <div className="max-w-[1200px] w-[90%] mx-auto">
          <p className="font-body text-[0.7rem] font-semibold tracking-[0.25em] uppercase text-brand-blue mb-4">Content</p>
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-gradient-blue mb-12">What Gets Posted</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { num: "01", name: "Pack Openings & Pulls", desc: "Live rips of vintage sealed wax and modern product. High engagement, shareable moments." },
              { num: "02", name: "PSA Grading Reveals", desc: "Submission results, slab unboxings, grade breakdowns. Highly engaged niche audience." },
              { num: "03", name: "Market Intelligence", desc: "Card value analysis, undervalued picks, investment threads. Trusted voice in the space." },
              { num: "04", name: "Education & Guides", desc: "How to spot fakes, condition guides, grading tips. Drives saves, shares, and trust." }
            ].map((pillar, i) => (
              <div key={i} className="glass-card p-6 flex flex-col items-start gap-4">
                <div className="text-3xl font-display font-bold text-brand-blue/20">{pillar.num}</div>
                <h3 className="font-display font-semibold text-lg text-white">{pillar.name}</h3>
                <p className="text-sm text-silver leading-relaxed">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Partnership Options ── */}
      <section className="py-24">
        <div className="max-w-[1200px] w-[90%] mx-auto">
          <p className="font-body text-[0.7rem] font-semibold tracking-[0.25em] uppercase text-brand-blue mb-4">How We Work Together</p>
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-gradient-blue mb-12">Partnership Options</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Tier 1 */}
            <div className="glass-card p-8 flex flex-col h-full relative overflow-hidden">
              <h3 className="font-display text-2xl font-semibold text-white mb-4">Sponsored Post</h3>
              <p className="text-sm text-silver leading-relaxed mb-8 flex-grow">A single dedicated post or thread on X featuring your brand, product, or service — written authentically in my voice.</p>
              <ul className="space-y-3 mb-8">
                {["1 X post / thread", "Authentic integration", "Link in post", "Performance report"].map(item => (
                  <li key={item} className="flex items-center gap-3 text-sm text-white">
                    <span className="text-brand-blue">✓</span> {item}
                  </li>
                ))}
              </ul>
              <Link href="mailto:hello@therarepick.com?subject=Sponsored Post Enquiry" className="btn-secondary w-full">Enquire →</Link>
            </div>

            {/* Tier 2 */}
            <div className="glass-card p-8 flex flex-col h-full relative overflow-hidden border-brand-blue/50 transform md:-translate-y-4 shadow-[0_20px_60px_rgba(0,98,255,0.15)]">
              <div className="absolute top-0 right-0 bg-brand-blue text-obsidian text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-bl-lg">Most Popular</div>
              <div className="absolute inset-0 bg-brand-blue/5 -z-10"></div>
              <h3 className="font-display text-2xl font-semibold text-white mb-4">Content Series</h3>
              <p className="text-sm text-silver leading-relaxed mb-8 flex-grow">Multi-post campaign over 2–4 weeks. Deep integration woven into ongoing content for maximum authenticity and reach.</p>
              <ul className="space-y-3 mb-8">
                {["4–8 X posts", "Brand story integration", "Product review included", "Weekly performance reports", "Cross-post to website"].map(item => (
                  <li key={item} className="flex items-center gap-3 text-sm text-white">
                    <span className="text-brand-blue">✓</span> {item}
                  </li>
                ))}
              </ul>
              <Link href="mailto:hello@therarepick.com?subject=Content Series Enquiry" className="btn-primary w-full">Enquire →</Link>
            </div>

            {/* Tier 3 */}
            <div className="glass-card p-8 flex flex-col h-full relative overflow-hidden">
              <h3 className="font-display text-2xl font-semibold text-white mb-4">Brand Ambassador</h3>
              <p className="text-sm text-silver leading-relaxed mb-8 flex-grow">Long-term partnership (3–12 months) making your brand a natural part of The Rare Pick universe.</p>
              <ul className="space-y-3 mb-8">
                {["Ongoing mentions", "Website feature", "Exclusive content", "Co-branded materials", "Monthly strategy calls"].map(item => (
                  <li key={item} className="flex items-center gap-3 text-sm text-white">
                    <span className="text-brand-blue">✓</span> {item}
                  </li>
                ))}
              </ul>
              <Link href="mailto:hello@therarepick.com?subject=Ambassador Programme Enquiry" className="btn-secondary w-full">Enquire →</Link>
            </div>
          </div>

          {/* Ideal Partners Row */}
          <div className="mt-20 text-center">
            <p className="font-body text-[0.7rem] font-semibold tracking-[0.25em] uppercase text-silver mb-6">Ideal Brand Partners</p>
            <div className="flex flex-wrap justify-center gap-3">
              {["PSA", "BGS / Beckett", "TCGPlayer", "Pokémon Center", "Card Shops", "Storage Brands", "Grading Supplies", "Collecting Apps"].map(brand => (
                <span key={brand} className="px-4 py-2 bg-obsidian-card border border-white/10 rounded-full text-xs font-medium text-silver hover:text-white hover:border-white/30 transition-colors">
                  {brand}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-32 text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[radial-gradient(ellipse,rgba(0,98,255,0.15)_0%,transparent_70%)] pointer-events-none" />
        <div className="max-w-[1200px] w-[90%] mx-auto relative z-10">
          <p className="font-body text-[0.7rem] font-semibold tracking-[0.25em] uppercase text-brand-blue mb-4">Let&apos;s Talk</p>
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-gradient-blue mb-6">Ready to Partner?</h2>
          <p className="text-silver max-w-[52ch] mx-auto text-lg mb-10">
            Reach out directly and let&apos;s build a partnership that feels authentic to the community.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="mailto:hello@therarepick.com" className="btn-primary">📧 hello@therarepick.com</Link>
            <Link href="https://x.com/TheRarePick" target="_blank" className="btn-secondary">Message on X</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
