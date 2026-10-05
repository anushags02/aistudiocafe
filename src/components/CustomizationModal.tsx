import React, { useState } from 'react';
import { X, Plus, Minus, Check, Coffee } from 'lucide-react';
import { MenuItem, MilkOption, IceOption, SweetnessOption, CartItemCustomization } from '../types/cafe';

interface CustomizationModalProps {
  item: MenuItem | null;
  onClose: () => void;
  onAddToCart: (item: MenuItem, quantity: number, customization: CartItemCustomization, total: number) => void;
}

export const CustomizationModal: React.FC<CustomizationModalProps> = ({
  item,
  onClose,
  onAddToCart,
}) => {
  if (!item) return null;

  const isBeverage = item.category === 'slow-bar' || item.category === 'botanicals';
  
  const [quantity, setQuantity] = useState(1);
  const [milk, setMilk] = useState<MilkOption>(isBeverage ? 'oat' : 'none');
  const [ice, setIce] = useState<IceOption>('hot');
  const [sweetness, setSweetness] = useState<SweetnessOption>('none');
  const [extraShot, setExtraShot] = useState(false);
  const [instructions, setInstructions] = useState('');

  // Price calculations
  let extraCharge = 0;
  if (milk === 'oat' || milk === 'almond') extraCharge += 0.75;
  if (extraShot) extraCharge += 1.25;

  const unitPrice = item.price + extraCharge;
  const totalPrice = unitPrice * quantity;

  const handleConfirm = () => {
    onAddToCart(
      item,
      quantity,
      {
        milk: isBeverage ? milk : 'none',
        ice: isBeverage ? ice : 'hot',
        sweetness: isBeverage ? sweetness : 'none',
        extraShot: isBeverage ? extraShot : false,
        instructions: instructions.trim(),
      },
      totalPrice
    );
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div 
        className="bg-[#FAF7F2] text-[#211D1A] w-full max-w-lg rounded-xl shadow-2xl border border-[#E3DCcf] overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-headline"
      >
        {/* Header with image preview or brand header */}
        <div className="relative bg-[#EFE9DE] border-b border-[#E3DCCF] p-6 pb-5">
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="absolute top-4 right-4 p-1.5 text-[#59524B] hover:text-[#211D1A] rounded-full hover:bg-[#E3DCCF] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {item.accentKicker && (
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#8A5A36] block mb-1">
              {item.accentKicker}
            </span>
          )}

          <h3 id="modal-headline" className="text-2xl font-serif-display font-medium text-[#211D1A]">
            {item.name}
          </h3>

          <p className="text-sm text-[#665E55] mt-1.5 line-clamp-2">
            {item.description}
          </p>

          <div className="mt-3 flex items-center gap-3 text-xs text-[#7A7167]">
            {item.origin && (
              <>
                <span>{item.origin}</span>
                <span aria-hidden="true">·</span>
              </>
            )}
            <span className="font-semibold text-[#8A5A36] tabular-nums text-sm">
              Base ${item.price.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Customization Options */}
        <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
          {isBeverage ? (
            <>
              {/* Milk Option */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#544D45] mb-2.5">
                  Milk Preference
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'oat', label: 'Organic Oat', extra: '+$0.75' },
                    { id: 'whole', label: 'Whole Milk', extra: 'Standard' },
                    { id: 'almond', label: 'Almond', extra: '+$0.75' },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setMilk(opt.id as MilkOption)}
                      className={`px-3 py-2.5 text-xs text-left rounded-lg border transition-all flex flex-col justify-between ${
                        milk === opt.id
                          ? 'bg-[#211D1A] text-white border-[#211D1A] shadow-sm'
                          : 'bg-white text-[#4A433D] border-[#DDD5C7] hover:border-[#B5ABA0]'
                      }`}
                    >
                      <span className="font-medium">{opt.label}</span>
                      <span className={`text-[10px] mt-1 ${milk === opt.id ? 'text-[#D8B48D]' : 'text-[#8A8074]'}`}>
                        {opt.extra}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Temperature */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#544D45] mb-2.5">
                  Preparation Temperature
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'hot', label: 'Silky Hot' },
                    { id: 'standard', label: 'Chilled / Over Ice' },
                    { id: 'light-ice', label: 'Light Ice' },
                  ].map((temp) => (
                    <button
                      key={temp.id}
                      type="button"
                      onClick={() => setIce(temp.id as IceOption)}
                      className={`px-3 py-2 text-xs font-medium rounded-lg border transition-all text-center ${
                        ice === temp.id
                          ? 'bg-[#211D1A] text-white border-[#211D1A]'
                          : 'bg-white text-[#4A433D] border-[#DDD5C7] hover:border-[#B5ABA0]'
                      }`}
                    >
                      {temp.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sweetness */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#544D45] mb-2.5">
                  Sweetness
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'none', label: 'Unsweetened' },
                    { id: 'subtle', label: 'Subtle Raw Agave' },
                    { id: 'standard', label: 'Vanilla Bean' },
                  ].map((sweet) => (
                    <button
                      key={sweet.id}
                      type="button"
                      onClick={() => setSweetness(sweet.id as SweetnessOption)}
                      className={`px-3 py-2 text-xs font-medium rounded-lg border transition-all text-center ${
                        sweetness === sweet.id
                          ? 'bg-[#211D1A] text-white border-[#211D1A]'
                          : 'bg-white text-[#4A433D] border-[#DDD5C7] hover:border-[#B5ABA0]'
                      }`}
                    >
                      {sweet.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Extra Ristretto Shot */}
              <div className="pt-2 border-t border-[#E8E2D8]">
                <label className="flex items-center justify-between cursor-pointer py-1">
                  <div>
                    <span className="text-sm font-medium text-[#211D1A] block">
                      Extra Double Ristretto Shot
                    </span>
                    <span className="text-xs text-[#7A7167]">
                      Adds deep intensity and heavy crema
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-[#8A5A36] font-semibold tabular-nums">+$1.25</span>
                    <input
                      type="checkbox"
                      checked={extraShot}
                      onChange={(e) => setExtraShot(e.target.checked)}
                      className="w-4 h-4 rounded border-[#C4BAAC] text-[#8A5A36] focus:ring-[#8A5A36]"
                    />
                  </div>
                </label>
              </div>
            </>
          ) : (
            <div className="p-4 bg-[#F2EDE4] rounded-lg text-xs text-[#59524B] flex items-start gap-2.5">
              <Coffee className="w-4 h-4 text-[#8A5A36] shrink-0 mt-0.5" />
              <span>
                Freshly prepared upon your pickup order. Pastries are baked fresh in our deck ovens and plated with organic fruit compote on request.
              </span>
            </div>
          )}

          {/* Special Barista Note */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#544D45] mb-1.5">
              Barista or Kitchen Notes
            </label>
            <input
              type="text"
              placeholder="e.g. Extra hot, separate box, or allergy warning"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              maxLength={120}
              className="w-full text-xs px-3.5 py-2.5 bg-white border border-[#DDD5C7] rounded-lg text-[#211D1A] placeholder:text-[#A89F93] focus:outline-none focus:ring-2 focus:ring-[#8A5A36]"
            />
          </div>

          {/* Quantity Stepper */}
          <div className="flex items-center justify-between pt-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#544D45]">
              Quantity
            </span>
            <div className="flex items-center border border-[#DDD5C7] rounded-lg bg-white overflow-hidden">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                aria-label="Decrease quantity"
                className="p-2 text-[#59524B] hover:bg-[#F2EDE4] transition-colors"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="px-4 text-xs font-semibold text-[#211D1A] tabular-nums">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity(Math.min(10, quantity + 1))}
                aria-label="Increase quantity"
                className="p-2 text-[#59524B] hover:bg-[#F2EDE4] transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Footer with total and submit */}
        <div className="p-6 bg-[#EFE9DE] border-t border-[#E3DCCF] flex items-center justify-between gap-4">
          <div>
            <span className="text-[11px] uppercase tracking-wider text-[#7A7167] block">
              Total Order Price
            </span>
            <span className="text-xl font-serif-display font-semibold text-[#211D1A] tabular-nums">
              ${totalPrice.toFixed(2)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-xs font-medium text-[#59524B] hover:text-[#211D1A] transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              className="px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#211D1A] hover:bg-[#38322D] rounded-lg transition-colors shadow-sm flex items-center gap-2"
            >
              <Check className="w-4 h-4 text-[#D8B48D]" />
              <span>Add to Bag</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
