import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk" });

export const metadata: Metadata = {
  title: "The Rare Pick — A Pokémon Card Collecting Journey",
  description: "The Rare Pick is a Pokémon card collecting journey — chasing cool illustrations, vintage holos, and rare finds. Come along for the ride.",
  openGraph: {
    title: "The Rare Pick",
    description: "Rare cards. Real passion. One collector's journey.",
    images: ["/assets/slab-hero.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    site: "@TheRarePick",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="antialiased font-sans">
        <header>
          <nav className="fixed top-0 left-0 right-0 z-50 py-5 transition-all duration-400 bg-obsidian/90 backdrop-blur-md border-b border-white/10" aria-label="Main navigation">
            <div className="flex items-center justify-between max-w-[1200px] w-[90%] mx-auto">
              <Link href="/" className="flex items-center gap-3">
                <Image src="/assets/logo-dark.jpg" alt="The Rare Pick logo" width={36} height={36} className="rounded-lg object-contain" />
                <span className="font-display text-xl font-semibold text-gradient-blue tracking-wider">The Rare Pick</span>
              </Link>
              <ul className="hidden md:flex gap-10 list-none">
                <li><Link href="#about" className="text-sm font-medium tracking-widest uppercase text-silver hover:text-brand-blue transition-colors">About</Link></li>
                <li><Link href="#collection" className="text-sm font-medium tracking-widest uppercase text-silver hover:text-brand-blue transition-colors">Collection</Link></li>
                <li><Link href="/market" className="text-sm font-medium tracking-widest uppercase text-silver hover:text-brand-blue transition-colors">Market</Link></li>
                <li><Link href="#brands" className="text-sm font-medium tracking-widest uppercase text-silver hover:text-brand-blue transition-colors">For Brands</Link></li>
              </ul>
              <div className="flex items-center gap-4">
                <Link href="https://x.com/TheRarePick" target="_blank" rel="noopener noreferrer" className="btn-secondary hidden sm:flex">
                  Follow on X
                </Link>
              </div>
            </div>
          </nav>
        </header>
        <main className="pt-20">
          {children}
        </main>
        <footer className="border-t border-white/10 py-10 text-center mt-20">
          <div className="max-w-[1200px] mx-auto w-[90%]">
            <div className="font-display text-2xl font-semibold text-gradient-blue mb-3">The Rare Pick</div>
            <ul className="flex gap-8 justify-center list-none mb-6">
              <li><Link href="#about" className="text-sm text-silver tracking-widest uppercase hover:text-brand-blue transition-colors">About</Link></li>
              <li><Link href="#collection" className="text-sm text-silver tracking-widest uppercase hover:text-brand-blue transition-colors">Collection</Link></li>
              <li><Link href="/media-kit" className="text-sm text-silver tracking-widest uppercase hover:text-brand-blue transition-colors">Media Kit</Link></li>
              <li><Link href="https://x.com/TheRarePick" target="_blank" rel="noopener noreferrer" className="text-sm text-silver tracking-widest uppercase hover:text-brand-blue transition-colors">X / Twitter</Link></li>
            </ul>
            <p className="text-silver/60 text-sm">© 2026 The Rare Pick · Authenticate · Grade · Preserve</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
