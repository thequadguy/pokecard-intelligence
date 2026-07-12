"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

type PriceData = {
  id: string;
  name: string;
  set: string;
  marketPrice: number;
  trend: string;
  lastSold: string;
  imageUrl: string;
};

export default function MarketPage() {
  const [prices, setPrices] = useState<PriceData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPrices() {
      try {
        const res = await fetch('/api/prices');
        const json = await res.json();
        setPrices(json.data);
      } catch (error) {
        console.error("Failed to fetch prices:", error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchPrices();
  }, []);

  return (
    <div className="max-w-[1200px] w-[90%] mx-auto py-12 min-h-[70vh]">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 gap-6">
        <div>
          <p className="font-body text-[0.7rem] font-semibold tracking-[0.25em] uppercase text-brand-blue mb-2">Live Data</p>
          <h1 className="font-display text-4xl font-semibold text-gradient-blue mb-2">Market Tracker</h1>
          <p className="text-silver max-w-[60ch]">Real-time price tracking, trend analysis, and market movers. Stay ahead of the curve.</p>
        </div>
        
        <div className="flex gap-4">
          <input 
            type="text" 
            placeholder="Search cards..." 
            className="bg-obsidian-card border border-white/10 rounded-full px-6 py-2 text-sm text-white focus:outline-none focus:border-brand-blue/50 transition-colors"
          />
          <button className="btn-primary">Search</button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-20 text-brand-blue animate-pulse">Loading market data...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {prices.map((card) => (
            <div key={card.id} className="glass-card p-6 flex flex-col group cursor-pointer">
              <div className="relative w-full aspect-[3/4] mb-4 bg-obsidian-mid rounded-xl overflow-hidden flex items-center justify-center border border-white/5 group-hover:border-brand-blue/30 transition-colors">
                <Image 
                  src={card.imageUrl} 
                  alt={card.name} 
                  fill 
                  className="object-contain p-2"
                />
              </div>
              
              <h3 className="font-display font-semibold text-lg text-white truncate">{card.name}</h3>
              <p className="text-xs text-silver tracking-wider uppercase mb-4 truncate">{card.set}</p>
              
              <div className="flex items-end justify-between mt-auto pt-4 border-t border-white/10">
                <div>
                  <div className="text-xs text-silver mb-1">Market Price</div>
                  <div className="text-xl font-bold text-gradient-blue">${card.marketPrice.toFixed(2)}</div>
                </div>
                <div className="text-right">
                  <div className={`text-xs font-semibold ${card.trend.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                    {card.trend}
                  </div>
                  <div className="text-[10px] text-silver mt-1">{card.lastSold}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-16 text-center">
        <div className="inline-block p-6 rounded-2xl bg-gradient-to-br from-brand-blue/10 to-transparent border border-brand-blue/20">
          <h2 className="font-display text-2xl text-white mb-2">Want personalized alerts?</h2>
          <p className="text-silver text-sm mb-6 max-w-[40ch] mx-auto">Create a free account to track your collection value and get notified when your favorite cards hit your target price.</p>
          <Link href="/dashboard" className="btn-primary">Create Account</Link>
        </div>
      </div>
    </div>
  );
}
