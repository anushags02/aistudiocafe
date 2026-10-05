import React from 'react';
import { Sparkles, Sun, Volume2, ShieldCheck, HeartHandshake } from 'lucide-react';
import { CAFE_IMAGES, PATRON_REVIEWS } from '../data/cafeData';

export const SpaceAtmosphereSection: React.FC = () => {
  return (
    <section id="space" className="py-24 bg-[#F5EFE6] border-b border-[#E8E2D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#8A5A36] block mb-2">
            The Space &amp; Atmosphere
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif-display font-medium text-[#211D1A] tracking-tight leading-tight [text-wrap:balance]">
            Designed for unhurried thought, tactile materials, and morning rituals.
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#696157] font-light leading-relaxed">
            Housed in a restored 19th-century SoHo cast-iron building. Natural acoustic dampening, custom smoked oak banquettes, and floor-to-ceiling glass that tracks the daylight from east to south.
          </p>
        </div>

        {/* 2-Card Photo Bento */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          
          {/* Card 1: 5:30 AM Bakery Ritual */}
          <div className="bg-white rounded-xl border border-[#E3DCCF] overflow-hidden shadow-sm flex flex-col justify-between">
            <div className="relative aspect-[4/3] bg-[#EBE2D4] overflow-hidden">
              <img
                src={CAFE_IMAGES.croissant}
                alt="Flaky golden croissants and pain au chocolat dusted with salt on linen"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover hover:scale-103 transition-transform duration-700"
              />
              <div className="absolute top-3 left-3 bg-[#211D1A]/85 backdrop-blur-xs text-[#FAF7F2] text-[10px] uppercase font-semibold tracking-wider px-2 py-1 rounded">
                05:30 AM Stone-Deck Bake
              </div>
            </div>
            <div className="p-6 sm:p-8">
              <h3 className="text-2xl font-serif-display font-medium text-[#211D1A]">
                The Morning Lamination Ritual
              </h3>
              <p className="mt-2.5 text-xs sm:text-sm text-[#696157] font-light leading-relaxed">
                Before the neighborhood stirs, our baker laminates 72-hour sourdough viennoiserie with AOP cultured butter from Normandy. Each croissant undergoes slow fermentation to yield deep malt sweetness and paper-thin crisp layers.
              </p>
              <div className="mt-4 flex items-center gap-2 text-xs text-[#8A5A36] font-medium">
                <span>Baked once daily in limited quantity</span>
                <span aria-hidden="true">·</span>
                <span>Warm from the deck at 7:00 AM</span>
              </div>
            </div>
          </div>

          {/* Card 2: Seasonal Kitchen Sourcing */}
          <div className="bg-white rounded-xl border border-[#E3DCCF] overflow-hidden shadow-sm flex flex-col justify-between">
            <div className="relative aspect-[4/3] bg-[#EBE2D4] overflow-hidden">
              <img
                src={CAFE_IMAGES.brunch}
                alt="Artisanal poached eggs on sourdough with fresh herbs and heirloom produce"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover hover:scale-103 transition-transform duration-700"
              />
              <div className="absolute top-3 left-3 bg-[#211D1A]/85 backdrop-blur-xs text-[#FAF7F2] text-[10px] uppercase font-semibold tracking-wider px-2 py-1 rounded">
                Farm-to-Table Kitchen
              </div>
            </div>
            <div className="p-6 sm:p-8">
              <h3 className="text-2xl font-serif-display font-medium text-[#211D1A]">
                Seasonal Kitchen &amp; Botanical Plates
              </h3>
              <p className="mt-2.5 text-xs sm:text-sm text-[#696157] font-light leading-relaxed">
                Our kitchen partners with regenerative Hudson Valley farms, sourcing pasture-raised heritage eggs, foraged woodland mushrooms, and heirloom grains milled within 48 hours of service.
              </p>
              <div className="mt-4 flex items-center gap-2 text-xs text-[#8A5A36] font-medium">
                <span>Kitchen service 7:00 AM – 3:30 PM</span>
                <span aria-hidden="true">·</span>
                <span>Pastry &amp; espresso until close</span>
              </div>
            </div>
          </div>

        </div>

        {/* Ambient Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 pb-16 border-b border-[#E3DCCF]">
          <div className="p-6 bg-white rounded-xl border border-[#E8E2D8]">
            <Sun className="w-5 h-5 text-[#8A5A36] mb-3" />
            <h4 className="text-base font-serif-display font-medium text-[#211D1A]">
              Natural Daylight &amp; Courtyard
            </h4>
            <p className="mt-1.5 text-xs text-[#696157] leading-relaxed">
              Expansive windows invite warm morning rays. During warmer months, our secluded cobblestone rear courtyard offers open-air seating beneath fig trees.
            </p>
          </div>

          <div className="p-6 bg-white rounded-xl border border-[#E8E2D8]">
            <Volume2 className="w-5 h-5 text-[#8A5A36] mb-3" />
            <h4 className="text-base font-serif-display font-medium text-[#211D1A]">
              Considered Soundscape
            </h4>
            <p className="mt-1.5 text-xs text-[#696157] leading-relaxed">
              Curated analog vinyl playlists spanning Japanese ambient, modal jazz, and minimalist folk playing softly through vintage Tannoy dual-concentric speakers.
            </p>
          </div>

          <div className="p-6 bg-white rounded-xl border border-[#E8E2D8]">
            <HeartHandshake className="w-5 h-5 text-[#8A5A36] mb-3" />
            <h4 className="text-base font-serif-display font-medium text-[#211D1A]">
              Unhurried Hospitality
            </h4>
            <p className="mt-1.5 text-xs text-[#696157] leading-relaxed">
              Whether you are reading a monograph for two hours or tasting a rare Geisha pour-over, you will never be hurried or nudged toward the exit.
            </p>
          </div>
        </div>

        {/* Patron Attributions - Adheres strictly to Claim-to-Proof Adjacency */}
        <div className="pt-12">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#8A5A36] block mb-1">
              Patron Voices
            </span>
            <h3 className="text-2xl font-serif-display font-medium text-[#211D1A]">
              Notes from our neighborhood regulars
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PATRON_REVIEWS.map((review, i) => (
              <div 
                key={i} 
                className="bg-white p-6 rounded-xl border border-[#E3DCCF] flex flex-col justify-between"
              >
                <p className="text-xs sm:text-[13px] text-[#423C36] font-serif italic leading-relaxed">
                  "{review.quote}"
                </p>
                <div className="pt-4 mt-4 border-t border-[#F0EBE1]">
                  <span className="text-xs font-semibold text-[#211D1A] block">
                    {review.author}
                  </span>
                  <span className="text-[11px] text-[#7A7167] block">
                    {review.role}
                  </span>
                  <span className="text-[10px] text-[#9E9284] block mt-0.5">
                    {review.location}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
