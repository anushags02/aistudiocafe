import React, { useState } from 'react';
import { MapPin, Clock, Compass, Train, Coffee, ChevronDown, Check } from 'lucide-react';
import { CAFE_INFO } from '../data/cafeData';

const FAQS = [
  {
    q: 'What is your laptop and remote work policy?',
    a: 'We welcome focused creative work and laptops in our mezzanine and main room from 7:00 AM until 12:00 PM on weekdays. After 12:00 PM and throughout weekends, we transition our main seating to an unhurried, screen-free social space. High-speed Wi-Fi remains active throughout.',
  },
  {
    q: 'Are dogs permitted in the cafe?',
    a: 'Well-behaved leashed dogs are warmly welcomed in our outdoor garden cobblestone courtyard. Water bowls and organic biscuit treats are available at the bar.',
  },
  {
    q: 'Do you cater to dairy and gluten sensitivities?',
    a: 'Yes. We offer organic Minor Figures oat milk and house-steeped almond milk at no or modest upcharge. In our kitchen, our Acai bowl and daily chia pudding are strictly gluten-free, and we offer toasted gluten-free artisan seeded bread on request.',
  },
  {
    q: 'Can I purchase freshly roasted beans to take home?',
    a: 'Yes. All our single-origin lots and our Mercer Espresso Blend are available in 250g and 300g nitrogen-flushed bags, freshly roasted within 10 days. We are happy to grind your beans to your specific home brewing apparatus (French press, Chemex, Aeropress, or espresso).',
  },
];

export const VisitSection: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <section id="visit" className="py-24 bg-[#FAF7F2] border-b border-[#E8E2D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#8A5A36] block mb-2">
            Visit &amp; Neighborhood
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif-display font-medium text-[#211D1A] tracking-tight leading-tight [text-wrap:balance]">
            Hours, Location &amp; House Culture
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#696157] font-light leading-relaxed">
            Located on cobblestone Mercer Street between Broome and Grand in historic SoHo. We are steps away from design galleries and quiet bookstores.
          </p>
        </div>

        {/* 3-Column Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          
          {/* Card 1: Operating Hours */}
          <div className="bg-white p-7 rounded-xl border border-[#E3DCCF] shadow-xs">
            <div className="w-9 h-9 rounded-lg bg-[#F5EFE6] text-[#8A5A36] flex items-center justify-center mb-5">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-serif-display font-medium text-[#211D1A]">
              Opening Hours
            </h3>
            <div className="mt-4 space-y-3 text-xs">
              <div className="flex justify-between pb-2 border-b border-[#F0EBE1]">
                <span className="text-[#59524B]">Monday – Friday</span>
                <span className="font-semibold text-[#211D1A] tabular-nums">7:00 AM — 6:00 PM</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-[#F0EBE1]">
                <span className="text-[#59524B]">Saturday – Sunday</span>
                <span className="font-semibold text-[#211D1A] tabular-nums">8:00 AM — 6:30 PM</span>
              </div>
              <div className="pt-1 text-[11px] text-[#7A7167]">
                <span className="font-medium text-[#8A5A36]">Kitchen Service:</span> Warm plates until 3:30 PM daily. Espresso &amp; viennoiserie until close.
              </div>
            </div>
          </div>

          {/* Card 2: Location & Transit */}
          <div className="bg-white p-7 rounded-xl border border-[#E3DCCF] shadow-xs">
            <div className="w-9 h-9 rounded-lg bg-[#F5EFE6] text-[#8A5A36] flex items-center justify-center mb-5">
              <MapPin className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-serif-display font-medium text-[#211D1A]">
              Location &amp; Transit
            </h3>
            <div className="mt-4 text-xs text-[#59524B] space-y-2.5">
              <p className="font-semibold text-[#211D1A]">
                {CAFE_INFO.address}
              </p>
              <p className="text-[11px] text-[#7A7167]">
                Between Broome &amp; Grand Streets · SoHo Cast-Iron Historic District
              </p>
              <div className="pt-2 border-t border-[#F0EBE1] flex items-center gap-2">
                <Train className="w-3.5 h-3.5 text-[#8A5A36] shrink-0" />
                <span className="text-[11px]">
                  <strong>N, Q, R, W</strong> at Prince St (3 min) or <strong>6</strong> at Spring St (4 min)
                </span>
              </div>
            </div>
          </div>

          {/* Card 3: House Amenities */}
          <div className="bg-white p-7 rounded-xl border border-[#E3DCCF] shadow-xs">
            <div className="w-9 h-9 rounded-lg bg-[#F5EFE6] text-[#8A5A36] flex items-center justify-center mb-5">
              <Coffee className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-serif-display font-medium text-[#211D1A]">
              House Amenities
            </h3>
            <ul className="mt-4 space-y-2 text-xs text-[#59524B]">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8A5A36]" />
                <span>Stone-deck bakery fresh at 05:30 AM</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8A5A36]" />
                <span>Complimentary Still &amp; Sparkling water tap</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8A5A36]" />
                <span>Dog-friendly garden courtyard</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8A5A36]" />
                <span>Card, Apple Pay &amp; contactless only</span>
              </li>
            </ul>
          </div>

        </div>

        {/* FAQs Accordion */}
        <div className="max-w-3xl mx-auto pt-6">
          <div className="text-center mb-8">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#8A5A36] block mb-1">
              Visiting Details
            </span>
            <h3 className="text-2xl font-serif-display font-medium text-[#211D1A]">
              Frequently Asked Questions
            </h3>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="bg-white rounded-lg border border-[#E3DCCF] overflow-hidden transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full py-4 px-5 text-left flex items-center justify-between gap-4 text-xs sm:text-sm font-semibold text-[#211D1A] hover:bg-[#FAF7F2] transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#8A5A36] transition-transform duration-200 shrink-0 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-4 text-xs text-[#696157] font-light leading-relaxed border-t border-[#F0EBE1] pt-3 animate-in fade-in duration-150">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
