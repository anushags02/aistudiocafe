import React, { useState, useMemo } from 'react';
import { Search, Plus, Filter, Sparkles, Check } from 'lucide-react';
import { MenuItem, MenuCategory } from '../types/cafe';
import { MENU_ITEMS } from '../data/cafeData';

interface MenuSectionProps {
  onSelectItem: (item: MenuItem) => void;
  onQuickAdd: (item: MenuItem) => void;
}

const CATEGORIES: { id: MenuCategory | 'all'; label: string }[] = [
  { id: 'all', label: 'All Offerings' },
  { id: 'slow-bar', label: 'Slow Bar & Espresso' },
  { id: 'viennoiserie', label: 'Artisanal Viennoiserie' },
  { id: 'brunch', label: 'Seasonal Kitchen' },
  { id: 'botanicals', label: 'Botanicals & Teas' },
  { id: 'whole-bean', label: 'Whole Bean Roasts' },
];

export const MenuSection: React.FC<MenuSectionProps> = ({ onSelectItem, onQuickAdd }) => {
  const [activeCategory, setActiveCategory] = useState<MenuCategory | 'all'>('all');
  const [dietaryFilter, setDietaryFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [recentlyAddedId, setRecentlyAddedId] = useState<string | null>(null);

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // Category filter
      if (activeCategory !== 'all' && item.category !== activeCategory) {
        return false;
      }
      // Dietary filter
      if (dietaryFilter !== 'all') {
        if (!item.dietary || !item.dietary.includes(dietaryFilter as any)) {
          return false;
        }
      }
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesOrigin = item.origin?.toLowerCase().includes(query);
        const matchesTasting = item.tastingNotes?.some(t => t.toLowerCase().includes(query));
        return matchesName || matchesDesc || matchesOrigin || matchesTasting;
      }
      return true;
    });
  }, [activeCategory, dietaryFilter, searchQuery]);

  const handleItemAdd = (item: MenuItem, e: React.MouseEvent) => {
    e.stopPropagation();
    if (item.customizable) {
      onSelectItem(item);
    } else {
      onQuickAdd(item);
      setRecentlyAddedId(item.id);
      setTimeout(() => setRecentlyAddedId(null), 1500);
    }
  };

  return (
    <section id="menu" className="py-24 bg-[#FAF7F2] border-b border-[#E8E2D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#E8E2D8]">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#8A5A36] block mb-2">
              Autumn Sourcing · Seasonal Kitchen
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif-display font-medium text-[#211D1A] tracking-tight">
              Curated Menu &amp; Slow Offerings
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#696157] font-light leading-relaxed">
              Every coffee is roasted in-house to preserve terroir. Pastries are laminated daily at dawn with cultured Normandy butter.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C8276]" />
            <input
              type="text"
              placeholder="Search origin, pastry, or notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs pl-9 pr-4 py-2.5 bg-white border border-[#DDD5C7] rounded-lg text-[#211D1A] placeholder:text-[#A89F93] focus:outline-none focus:ring-2 focus:ring-[#8A5A36] shadow-sm"
            />
          </div>
        </div>

        {/* Filter Controls Row */}
        <div className="pt-6 pb-10 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          
          {/* Functional Segmented Tabs - Category Filter */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-2 text-xs font-medium rounded-md whitespace-nowrap transition-all duration-150 ${
                  activeCategory === cat.id
                    ? 'bg-[#211D1A] text-white shadow-sm'
                    : 'bg-[#EFE9DE] text-[#59524B] hover:text-[#211D1A] hover:bg-[#E5DDCF]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Secondary Dietary Segmented Bar */}
          <div className="flex items-center gap-2 text-xs text-[#7A7167]">
            <span className="hidden sm:inline font-medium uppercase text-[10px] tracking-wider text-[#9E9284]">
              Dietary:
            </span>
            <div className="inline-flex bg-[#EFE9DE] p-1 rounded-md">
              {[
                { id: 'all', label: 'All' },
                { id: 'vegan', label: 'Vegan' },
                { id: 'gluten-free', label: 'Gluten-Free' },
                { id: 'organic', label: 'Organic' },
              ].map((diet) => (
                <button
                  key={diet.id}
                  onClick={() => setDietaryFilter(diet.id)}
                  className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                    dietaryFilter === diet.id
                      ? 'bg-white text-[#211D1A] shadow-xs'
                      : 'text-[#696157] hover:text-[#211D1A]'
                  }`}
                >
                  {diet.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Product Cards Grid - 3 Columns Desktop */}
        {filteredItems.length === 0 ? (
          <div className="py-20 text-center bg-[#F3EFE9] rounded-xl border border-dashed border-[#DDD6CA]">
            <p className="text-base font-serif-display text-[#59524B]">No offerings match your current filter.</p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setDietaryFilter('all');
                setSearchQuery('');
              }}
              className="mt-3 text-xs font-semibold text-[#8A5A36] underline underline-offset-4"
            >
              Reset all filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => onSelectItem(item)}
                className="group cursor-pointer bg-white rounded-xl border border-[#E8E2D8] hover:border-[#C4BAAC] overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-md flex flex-col justify-between"
              >
                {/* Visual Lead (60%-70% of upper card) */}
                <div className="relative aspect-[4/3] bg-[#EFE9DF] overflow-hidden">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-[#F5EFE6] to-[#EBE2D5]">
                      <span className="text-2xl font-serif-display text-[#8A5A36] mb-1">
                        {item.category === 'whole-bean' ? '250g' : 'Slow Craft'}
                      </span>
                      <span className="text-xs text-[#8A8074]">Maison Verre Archive</span>
                    </div>
                  )}

                  {/* Kicker badge overlay - discreet text only, no candy pills */}
                  {item.accentKicker && (
                    <div className="absolute top-3 left-3 bg-[#211D1A]/90 backdrop-blur-xs text-[#E8DFD3] text-[10px] uppercase font-semibold tracking-wider px-2 py-1 rounded">
                      {item.accentKicker}
                    </div>
                  )}

                  {item.roastLevel && (
                    <div className="absolute bottom-3 right-3 bg-[#FAF7F2]/90 backdrop-blur-xs text-[#59524B] text-[10px] font-medium px-2 py-0.5 rounded shadow-xs">
                      {item.roastLevel} Roast
                    </div>
                  )}
                </div>

                {/* Card Content & Metadata */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Clean unboxed metadata with typographic separators (Strict Zero-Pill) */}
                    <div className="flex items-center gap-1.5 text-xs text-[#8A8074] font-medium mb-1.5 flex-wrap">
                      <span className="uppercase text-[11px] text-[#8A5A36] font-semibold">
                        {item.category.replace('-', ' ')}
                      </span>
                      {item.origin && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span className="truncate max-w-[180px]">{item.origin}</span>
                        </>
                      )}
                    </div>

                    {/* Product Title */}
                    <h3 className="text-lg font-serif-display font-medium text-[#211D1A] group-hover:text-[#8A5A36] transition-colors leading-snug">
                      {item.name}
                    </h3>

                    {/* Description */}
                    <p className="mt-2 text-xs sm:text-[13px] text-[#696157] font-light leading-relaxed line-clamp-2">
                      {item.description}
                    </p>

                    {/* Tasting Notes as clean typographic list */}
                    {item.tastingNotes && item.tastingNotes.length > 0 && (
                      <div className="mt-3 flex items-center gap-1.5 text-[11px] text-[#7A7167]">
                        <span className="font-medium text-[#544D45]">Notes:</span>
                        <span>{item.tastingNotes.join(' · ')}</span>
                      </div>
                    )}
                  </div>

                  {/* Price & Action Module */}
                  <div className="pt-4 mt-4 border-t border-[#F0EBE1] flex items-center justify-between">
                    <div>
                      <span className="text-[11px] text-[#8A8074] block uppercase tracking-wider">
                        Price
                      </span>
                      <span className="text-base font-semibold text-[#211D1A] tabular-nums">
                        ${item.price.toFixed(2)}
                      </span>
                    </div>

                    <button
                      onClick={(e) => handleItemAdd(item, e)}
                      className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold uppercase tracking-wider rounded-md transition-all ${
                        recentlyAddedId === item.id
                          ? 'bg-emerald-800 text-white'
                          : 'bg-[#EFE9DE] hover:bg-[#211D1A] text-[#211D1A] hover:text-white'
                      }`}
                    >
                      {recentlyAddedId === item.id ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Added</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          <span>{item.customizable ? 'Customize' : 'Add to Bag'}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
