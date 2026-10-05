import React, { useState } from 'react';
import { ShoppingBag, Calendar, Clock, MapPin, Menu as MenuIcon, X } from 'lucide-react';
import { CAFE_INFO } from '../data/cafeData';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenReservations: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  onOpenCart,
  onOpenReservations,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E8E2D8] transition-colors">
      {/* Top 1-row, 3-zone Top Bar Contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Zone 1: Single text element wordmark */}
        <a 
          href="#" 
          className="text-2xl sm:text-3xl font-serif-display font-medium tracking-tight text-[#211D1A] hover:opacity-90 transition-opacity"
        >
          {CAFE_INFO.name}
        </a>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-8 text-[14px] font-medium text-[#59524B]">
          <a 
            href="#menu" 
            className="hover:text-[#211D1A] transition-colors"
          >
            Menu &amp; Offerings
          </a>
          <a 
            href="#roastery" 
            className="hover:text-[#211D1A] transition-colors"
          >
            Roastery &amp; Slow Bar
          </a>
          <a 
            href="#space" 
            className="hover:text-[#211D1A] transition-colors"
          >
            The Space
          </a>
          <a 
            href="#reservations" 
            className="hover:text-[#211D1A] transition-colors"
          >
            Reservations
          </a>
          <a 
            href="#visit" 
            className="hover:text-[#211D1A] transition-colors"
          >
            Hours &amp; Location
          </a>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            onClick={onOpenReservations}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 text-xs font-medium tracking-wide uppercase text-[#211D1A] bg-[#EFE9DF] hover:bg-[#E4DCCE] border border-[#DDD6CA] rounded-md transition-colors"
          >
            <Calendar className="w-3.5 h-3.5 text-[#8A5A36]" />
            <span>Book Table</span>
          </button>

          <button
            onClick={onOpenCart}
            aria-label="View Order Bag"
            className="relative inline-flex items-center gap-2 px-4 py-2.5 text-xs font-medium tracking-wide uppercase text-white bg-[#211D1A] hover:bg-[#38322D] rounded-md transition-colors shadow-sm"
          >
            <ShoppingBag className="w-4 h-4 text-[#D8B48D]" />
            <span className="hidden xs:inline">Order Bag</span>
            {cartCount > 0 && (
              <span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 text-[11px] font-semibold bg-[#8A5A36] text-white rounded-full tabular-nums">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="md:hidden p-2 text-[#59524B] hover:text-[#211D1A] rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8A5A36]"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#E8E2D8] bg-[#FAF7F2] px-6 py-6 space-y-4 shadow-lg animate-in fade-in duration-200">
          <div className="flex flex-col space-y-3 text-base font-medium text-[#4A433D]">
            <a 
              href="#menu" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 border-b border-[#F0EBE1] hover:text-[#211D1A]"
            >
              Menu &amp; Offerings
            </a>
            <a 
              href="#roastery" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 border-b border-[#F0EBE1] hover:text-[#211D1A]"
            >
              Roastery &amp; Slow Bar
            </a>
            <a 
              href="#space" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 border-b border-[#F0EBE1] hover:text-[#211D1A]"
            >
              The Space &amp; Bakery
            </a>
            <a 
              href="#reservations" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 border-b border-[#F0EBE1] hover:text-[#211D1A]"
            >
              Reserve a Table
            </a>
            <a 
              href="#visit" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 hover:text-[#211D1A]"
            >
              Hours &amp; Location
            </a>
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenReservations();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 text-xs font-semibold uppercase tracking-wider text-[#211D1A] bg-[#EFE9DF] border border-[#DDD6CA] rounded-md"
            >
              <Calendar className="w-4 h-4 text-[#8A5A36]" />
              Book a Table
            </button>
          </div>

          <div className="pt-4 border-t border-[#E8E2D8] text-xs text-[#7A7167] space-y-1.5">
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5" />
              <span>Open today · 7:00 AM — 6:00 PM</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5" />
              <span>42 Mercer Street, SoHo, NY</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
