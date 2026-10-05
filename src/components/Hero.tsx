import React from 'react';
import { ArrowDown, Coffee, Sparkles, MapPin } from 'lucide-react';
import { CAFE_INFO, CAFE_IMAGES } from '../data/cafeData';

interface HeroProps {
  onExploreMenu: () => void;
  onReserveTable: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreMenu, onReserveTable }) => {
  return (
    <section className="relative w-full overflow-hidden bg-[#1A1816] text-[#F9F7F2]">
      {/* Background Image with Measured Scrim */}
      <div className="absolute inset-0">
        <img
          src={CAFE_IMAGES.hero}
          alt="Sunlit interior of Maison Verre specialty cafe and roastery in SoHo"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center opacity-65 scale-105 transition-transform duration-1000 ease-out"
        />
        {/* Measured contrast scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#151312] via-[#151312]/60 to-[#151312]/30" />
        <div className="absolute inset-0 bg-[#151312]/20" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20 sm:pt-32 sm:pb-28 min-h-[82vh] flex flex-col justify-between">
        
        {/* Top Status Line - Clean unboxed text with typographic separator (No pill capsules) */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm font-medium text-[#D1C7BA] tracking-wide">
          <span className="flex items-center gap-1.5 text-[#E6AF76]">
            <Coffee className="w-3.5 h-3.5" />
            <span>Artisanal Roastery &amp; Slow Bar</span>
          </span>
          <span aria-hidden="true" className="text-[#8A8074]">·</span>
          <span>Open Today 7:00 AM — 6:00 PM</span>
          <span aria-hidden="true" className="text-[#8A8074]">·</span>
          <span className="flex items-center gap-1 text-[#BEB3A4]">
            <MapPin className="w-3 h-3 text-[#A89D8F]" />
            <span>42 Mercer St, SoHo</span>
          </span>
        </div>

        {/* Hero Title & Value Proposition */}
        <div className="max-w-3xl my-auto py-10">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif-display font-medium tracking-tight text-white leading-[1.08] [text-wrap:balance]">
            Specialty slow coffee, morning viennoiserie, and daylight.
          </h1>

          <p className="mt-6 text-base sm:text-lg text-[#D6CDC2] font-light leading-relaxed max-w-2xl">
            A quiet sanctuary dedicated to single-origin micro-lots, 72-hour stone-deck pastries laminated with Normandy butter, and unhurried mornings.
          </p>

          {/* Primary Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
            <button
              onClick={onExploreMenu}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-[#1F1C19] bg-[#E8DFD3] hover:bg-white rounded-md transition-all duration-200 shadow-md whitespace-nowrap"
            >
              <span>Explore Seasonal Menu</span>
              <ArrowDown className="w-4 h-4 text-[#8A5A36]" />
            </button>

            <button
              onClick={onReserveTable}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-white bg-white/10 hover:bg-white/15 border border-white/20 hover:border-white/40 rounded-md backdrop-blur-sm transition-all duration-200 whitespace-nowrap"
            >
              <span>Reserve a Table</span>
            </button>
          </div>
        </div>

        {/* Bottom Quantitative Rigor Bar - Claim-to-Proof Adjacency */}
        <div className="pt-8 border-t border-white/15 grid grid-cols-2 md:grid-cols-4 gap-6 text-[#E3DDD4]">
          {CAFE_INFO.stats.map((stat, i) => (
            <div key={i} className="flex flex-col">
              <span className="text-2xl sm:text-3xl font-serif-display font-medium text-white tabular-nums">
                {stat.value}
              </span>
              <span className="text-xs text-[#B5ABA0] tracking-wide mt-0.5">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
