import React, { useState } from 'react';
import { Coffee, Flame, Droplets, Compass, ArrowRight } from 'lucide-react';
import { CAFE_IMAGES } from '../data/cafeData';
import { MenuItem } from '../types/cafe';

interface RoasterySectionProps {
  onSelectCoffee: (coffeeName: string) => void;
}

const TASTE_PROFILES = [
  {
    id: 'floral',
    title: 'Floral & Jasmine',
    origin: 'Ethiopia Yirgacheffe G1',
    altitude: '2,050 MASL',
    process: 'Washed Process',
    device: 'Ceramic V60 Dripper (92°C)',
    notes: 'Jasmine blossom, bergamot zest, honeysuckle sweetness, silky tea texture.',
    roast: 'Light Nordic Profile',
    quote: 'Preserves the fragile floral esters produced at extreme micro-climates in southern Ethiopia.',
  },
  {
    id: 'tropical',
    title: 'Guava & Sugarcane',
    origin: 'Colombia Huila Pink Bourbon',
    altitude: '1,850 MASL',
    process: 'Anaerobic Washed',
    device: 'Glass Chemex (94°C)',
    notes: 'Pink guava, candied blood orange, raw panela sugar, vibrant malic acidity.',
    roast: 'Light-Medium Filter',
    quote: 'A naturally occurring mutation of Red and Yellow Bourbon noted for extraordinary cup clarity.',
  },
  {
    id: 'praline',
    title: 'Praline & Dark Cacao',
    origin: 'Mercer Signature Espresso Blend',
    altitude: '1,650 – 1,900 MASL',
    process: 'Washed & Natural Blend',
    device: 'La Marzocco Strada Double Ristretto',
    notes: 'Toasted pecan praline, brown butter, 72% Valrhona cacao, lingering molasses.',
    roast: 'Medium Roastery Staple',
    quote: 'Balanced specifically for both concentrated straight shots and rich oat flat whites.',
  },
  {
    id: 'botanical',
    title: 'Matcha & Pistachio',
    origin: 'Uji First-Flush Tencha & Cascara',
    altitude: 'Kyoto Prefecture Terraces',
    process: 'Shade Grown & Stone Ground',
    device: 'Bamboo Chasen Whisk',
    notes: 'Deep vegetal umami, whipped pistachio velvet, raw honeycomb, fresh spring dew.',
    roast: 'Artisanal Direct Mill',
    quote: 'Single-estate tea leaves harvested in early May and ground on granite stone mills.',
  },
];

export const RoasterySection: React.FC<RoasterySectionProps> = ({ onSelectCoffee }) => {
  const [selectedProfile, setSelectedProfile] = useState(TASTE_PROFILES[0]);

  return (
    <section id="roastery" className="py-24 bg-[#1F1C19] text-[#F9F7F2] border-b border-[#332E29]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#D8B48D] block mb-2">
            In-House Roasting · Slow Bar Craft
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif-display font-medium text-white tracking-tight leading-tight [text-wrap:balance]">
            Precision extraction guided by water chemistry and terroir.
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#C4B9AD] font-light leading-relaxed">
            We source exclusively through direct, multi-year farm relationships. Every batch is roasted on our modified cast-iron drum roaster in micro-batches to spotlight natural regional acidity.
          </p>
        </div>

        {/* 2-Column Split: Visual & Interactive Story */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Atmospheric Visual with Overlay Detail */}
          <div className="lg:col-span-6">
            <div className="relative rounded-xl overflow-hidden border border-white/10 shadow-2xl aspect-[4/3]">
              <img
                src={CAFE_IMAGES.pourover}
                alt="Barista brewing single-origin coffee on ceramic V60 pour over"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#151312] via-transparent to-transparent opacity-80" />
              
              {/* Overlay Badge Card */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-lg bg-[#1F1C19]/90 backdrop-blur-md border border-white/15">
                <div className="flex items-center justify-between text-xs text-[#E8DFD3]">
                  <span className="font-semibold uppercase tracking-wider text-[#D8B48D]">
                    Slow Bar Extraction
                  </span>
                  <span className="tabular-nums text-[#B5ABA0]">92.5°C · 1:16.5 Ratio</span>
                </div>
                <p className="mt-1 text-xs text-[#C4B9AD]">
                  Brewed to order using remineralized reverse-osmosis water calibrated to 110 ppm for maximum sweetness.
                </p>
              </div>
            </div>

            {/* Quick Sourcing Commitments */}
            <div className="grid grid-cols-3 gap-4 mt-6 text-center text-xs">
              <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                <Flame className="w-4 h-4 text-[#D8B48D] mx-auto mb-1.5" />
                <span className="block font-medium text-white">Twice-Weekly Roast</span>
                <span className="text-[10px] text-[#A89F93]">Never older than 12 days</span>
              </div>
              <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                <Droplets className="w-4 h-4 text-[#D8B48D] mx-auto mb-1.5" />
                <span className="block font-medium text-white">Calibrated Water</span>
                <span className="text-[10px] text-[#A89F93]">Magnesium-balanced buffer</span>
              </div>
              <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                <Compass className="w-4 h-4 text-[#D8B48D] mx-auto mb-1.5" />
                <span className="block font-medium text-white">Direct Trade</span>
                <span className="text-[10px] text-[#A89F93]">100% farm gate transparency</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Flavor & Varietal Explorer */}
          <div className="lg:col-span-6 bg-[#262320] p-6 sm:p-8 rounded-xl border border-white/10 shadow-xl">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#D8B48D]">
                Select Your Sensory Profile
              </span>
              <span className="text-xs text-[#A89F93]">Interactive Cupping Notes</span>
            </div>

            {/* Profile Selector Buttons */}
            <div className="grid grid-cols-2 gap-2.5 my-6">
              {TASTE_PROFILES.map((profile) => (
                <button
                  key={profile.id}
                  onClick={() => setSelectedProfile(profile)}
                  className={`p-3 text-left rounded-lg text-xs transition-all border ${
                    selectedProfile.id === profile.id
                      ? 'bg-[#FAF7F2] text-[#211D1A] border-[#FAF7F2] font-semibold shadow-md'
                      : 'bg-white/5 text-[#D1C7BA] border-white/10 hover:border-white/20 hover:bg-white/10'
                  }`}
                >
                  <span className="block text-[13px]">{profile.title}</span>
                  <span className={`text-[10px] mt-0.5 block truncate ${
                    selectedProfile.id === profile.id ? 'text-[#8A5A36]' : 'text-[#8A8074]'
                  }`}>
                    {profile.origin}
                  </span>
                </button>
              ))}
            </div>

            {/* Active Profile Breakdown Card */}
            <div className="space-y-4 pt-2">
              <div className="flex items-baseline justify-between">
                <h4 className="text-xl font-serif-display font-medium text-white">
                  {selectedProfile.origin}
                </h4>
                <span className="text-xs text-[#D8B48D] font-mono tabular-nums">
                  {selectedProfile.roast}
                </span>
              </div>

              <blockquote className="text-xs sm:text-sm text-[#D1C7BA] italic font-serif leading-relaxed border-l-2 border-[#D8B48D] pl-3 py-0.5">
                "{selectedProfile.quote}"
              </blockquote>

              {/* Data Grid with tabular clarity */}
              <div className="grid grid-cols-2 gap-3 text-xs pt-2">
                <div className="p-3 bg-white/5 rounded-md border border-white/5">
                  <span className="text-[10px] uppercase text-[#8A8074] block">Elevation</span>
                  <span className="font-medium text-white tabular-nums">{selectedProfile.altitude}</span>
                </div>
                <div className="p-3 bg-white/5 rounded-md border border-white/5">
                  <span className="text-[10px] uppercase text-[#8A8074] block">Processing</span>
                  <span className="font-medium text-white">{selectedProfile.process}</span>
                </div>
                <div className="col-span-2 p-3 bg-white/5 rounded-md border border-white/5">
                  <span className="text-[10px] uppercase text-[#8A8074] block">Recommended Brew Method</span>
                  <span className="font-medium text-[#E8DFD3]">{selectedProfile.device}</span>
                </div>
              </div>

              <div className="pt-2">
                <span className="text-[11px] text-[#A89F93] block mb-1 uppercase tracking-wider">
                  Cupping Tasting Notes:
                </span>
                <p className="text-xs text-[#E8DFD3]">
                  {selectedProfile.notes}
                </p>
              </div>

              {/* Action Button */}
              <button
                onClick={() => onSelectCoffee(selectedProfile.origin)}
                className="w-full mt-4 flex items-center justify-center gap-2 py-3 text-xs font-semibold uppercase tracking-wider text-[#211D1A] bg-[#E8DFD3] hover:bg-white rounded-md transition-colors shadow-sm"
              >
                <span>Find in Menu Offerings</span>
                <ArrowRight className="w-4 h-4 text-[#8A5A36]" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
