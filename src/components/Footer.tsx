import React, { useState } from 'react';
import { ArrowRight, Check, Coffee, Heart } from 'lucide-react';
import { CAFE_INFO } from '../data/cafeData';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) return;
    setSubscribed(true);
    setEmail('');
  };

  return (
    <footer className="bg-[#1A1816] text-[#FAF7F2] border-t border-[#2B2724]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          
          {/* Brand & Philosophy Column */}
          <div className="md:col-span-4 space-y-4">
            <span className="text-2xl font-serif-display font-medium text-white tracking-tight">
              {CAFE_INFO.name}
            </span>
            <p className="text-xs text-[#B5ABA0] font-light leading-relaxed max-w-sm">
              Artisanal single-origin roastery, slow bar pour-overs, and daily hand-laminated viennoiserie in historic SoHo, New York.
            </p>
            <div className="text-xs text-[#8A8074] pt-2">
              42 Mercer Street, SoHo, NY 10013<br />
              bonjour@maisonverre.cafe · +1 (212) 840-9120
            </div>
          </div>

          {/* Navigation Links Column */}
          <div className="md:col-span-2 space-y-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#D8B48D] block">
              Offerings
            </span>
            <ul className="space-y-2 text-xs text-[#B5ABA0]">
              <li><a href="#menu" className="hover:text-white transition-colors">Slow Bar Pour-Over</a></li>
              <li><a href="#menu" className="hover:text-white transition-colors">Normandy Viennoiserie</a></li>
              <li><a href="#menu" className="hover:text-white transition-colors">Seasonal Kitchen Plates</a></li>
              <li><a href="#menu" className="hover:text-white transition-colors">Ceremonial Uji Matcha</a></li>
              <li><a href="#menu" className="hover:text-white transition-colors">Roasted Whole Beans</a></li>
            </ul>
          </div>

          {/* House Culture Column */}
          <div className="md:col-span-2 space-y-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#D8B48D] block">
              House
            </span>
            <ul className="space-y-2 text-xs text-[#B5ABA0]">
              <li><a href="#roastery" className="hover:text-white transition-colors">Direct-Trade Sourcing</a></li>
              <li><a href="#space" className="hover:text-white transition-colors">The SoHo Space</a></li>
              <li><a href="#reservations" className="hover:text-white transition-colors">Table Booking</a></li>
              <li><a href="#visit" className="hover:text-white transition-colors">Hours &amp; Location</a></li>
              <li><a href="#visit" className="hover:text-white transition-colors">Patron FAQ</a></li>
            </ul>
          </div>

          {/* Roastery Gazette / Newsletter Column */}
          <div className="md:col-span-4 space-y-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#D8B48D] block">
              The Monthly Gazette
            </span>
            <p className="text-xs text-[#B5ABA0] font-light leading-relaxed">
              Quiet dispatches on rare harvest lots, seasonal kitchen previews, and guest roaster residencies. No spam.
            </p>

            {subscribed ? (
              <div className="p-3 bg-white/10 rounded-md border border-white/20 text-xs text-[#E8DFD3] flex items-center gap-2">
                <Check className="w-4 h-4 text-[#D8B48D]" />
                <span>Thank you. You will receive our next harvest journal.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 text-xs px-3.5 py-2.5 bg-white/5 border border-white/15 rounded-md text-white placeholder:text-[#8A8074] focus:outline-none focus:ring-1 focus:ring-[#D8B48D]"
                />
                <button
                  type="submit"
                  aria-label="Subscribe to newsletter"
                  className="px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#1A1816] bg-[#E8DFD3] hover:bg-white rounded-md transition-colors"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Quiet Bottom Copyright Line */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#8A8074] gap-4">
          <div className="flex items-center gap-1">
            <span>&copy; {new Date().getFullYear()} Maison Verre Roastery LLC. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-6">
            <span className="text-[#6B635A]">42 Mercer St, New York</span>
            <span aria-hidden="true" className="text-[#3E3934]">·</span>
            <span className="text-[#6B635A]">Roasted In-House</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
