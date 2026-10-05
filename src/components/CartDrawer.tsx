import React, { useState } from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, CheckCircle2, Clock, MapPin, Coffee } from 'lucide-react';
import { CartItem } from '../types/cafe';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (cartItemId: string, delta: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [orderType, setOrderType] = useState<'pickup' | 'dinein'>('pickup');
  const [tableNumber, setTableNumber] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [tipPercent, setTipPercent] = useState<number>(18);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<{
    orderId: string;
    customerName: string;
    orderType: 'pickup' | 'dinein';
    tableNumber?: string;
    total: number;
    itemsCount: number;
    readyTime: string;
  } | null>(null);

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.itemTotal, 0);
  const tax = subtotal * 0.08875; // NYC sales tax
  const tip = (subtotal * tipPercent) / 100;
  const grandTotal = subtotal + tax + tip;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim()) return;

    setIsCheckingOut(true);
    setTimeout(() => {
      const orderNum = '#' + Math.floor(100 + Math.random() * 900);
      setCompletedOrder({
        orderId: orderNum,
        customerName: customerName.trim(),
        orderType,
        tableNumber: orderType === 'dinein' ? tableNumber : undefined,
        total: grandTotal,
        itemsCount: items.reduce((acc, i) => acc + i.quantity, 0),
        readyTime: '12 – 15 mins',
      });
      setIsCheckingOut(false);
      onClearCart();
    }, 700);
  };

  const handleResetOrder = () => {
    setCompletedOrder(null);
    setCustomerName('');
    setCustomerPhone('');
    setTableNumber('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end">
      <div 
        className="w-full max-w-md bg-[#FAF7F2] text-[#211D1A] h-full shadow-2xl flex flex-col justify-between border-l border-[#E3DCCF] animate-in slide-in-from-right duration-250"
        role="dialog"
        aria-modal="true"
        aria-labelledby="drawer-title"
      >
        {/* Header */}
        <div className="p-6 bg-[#EFE9DE] border-b border-[#E3DCCF] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-[#8A5A36]" />
            <h2 id="drawer-title" className="text-xl font-serif-display font-medium text-[#211D1A]">
              Your Order Bag
            </h2>
            {items.length > 0 && (
              <span className="text-xs text-[#7A7167] tabular-nums">
                ({items.reduce((s, i) => s + i.quantity, 0)} items)
              </span>
            )}
          </div>

          <button
            onClick={onClose}
            aria-label="Close bag drawer"
            className="p-1.5 text-[#59524B] hover:text-[#211D1A] rounded-full hover:bg-[#E3DCCF] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Completed Order Digital Receipt */}
        {completedOrder ? (
          <div className="p-6 overflow-y-auto flex-1 flex flex-col justify-between">
            <div className="text-center pt-4">
              <div className="w-14 h-14 bg-[#EAE2D5] text-[#8A5A36] rounded-full flex items-center justify-center mx-auto mb-4 border border-[#DDD5C7]">
                <CheckCircle2 className="w-7 h-7" />
              </div>

              <span className="text-xs font-semibold uppercase tracking-wider text-[#8A5A36] block">
                Order Received by Roastery
              </span>

              <h3 className="text-2xl font-serif-display font-medium text-[#211D1A] mt-1">
                Order {completedOrder.orderId} Confirmed
              </h3>

              <p className="text-xs text-[#696157] mt-1.5">
                Thank you, {completedOrder.customerName}. Your extraction has been queued at the barista counter.
              </p>

              {/* Progress status bar */}
              <div className="mt-6 p-4 bg-[#F2ECE2] rounded-lg border border-[#E3DCCF] text-left">
                <div className="flex items-center justify-between text-xs font-medium text-[#211D1A] mb-2">
                  <span className="flex items-center gap-1.5 text-[#8A5A36]">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Estimated Ready: {completedOrder.readyTime}</span>
                  </span>
                  <span className="text-[#7A7167]">Barista Station #1</span>
                </div>
                {/* 3 Step indicator */}
                <div className="w-full bg-[#DDD6CA] h-1.5 rounded-full overflow-hidden">
                  <div className="bg-[#8A5A36] h-full w-2/3 rounded-full animate-pulse" />
                </div>
                <div className="mt-2 text-[10px] text-[#7A7167] flex justify-between">
                  <span>Received</span>
                  <span className="font-semibold text-[#8A5A36]">Brewing &amp; Plating</span>
                  <span>Ready at Counter</span>
                </div>
              </div>

              {/* Summary */}
              <div className="mt-6 bg-white p-4 rounded-lg border border-[#E3DCCF] text-xs text-left space-y-2">
                <div className="flex justify-between pb-1.5 border-b border-[#F0EBE1]">
                  <span className="text-[#7A7167]">Fulfillment</span>
                  <span className="font-semibold text-[#211D1A]">
                    {completedOrder.orderType === 'pickup' ? 'Counter Bar Pickup' : `Dine-In Table ${completedOrder.tableNumber || '-'}`}
                  </span>
                </div>
                <div className="flex justify-between pb-1.5 border-b border-[#F0EBE1]">
                  <span className="text-[#7A7167]">Pickup Location</span>
                  <span className="text-[#211D1A]">42 Mercer St, SoHo Bar</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#7A7167]">Paid Total</span>
                  <span className="font-bold text-[#211D1A] tabular-nums">
                    ${completedOrder.total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <button
                type="button"
                onClick={handleResetOrder}
                className="w-full py-3.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#211D1A] hover:bg-[#38322D] rounded-md transition-colors shadow-sm"
              >
                Close &amp; Return to Menu
              </button>
            </div>
          </div>
        ) : items.length === 0 ? (
          /* Empty State */
          <div className="flex-1 p-8 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-full bg-[#EFE9DE] flex items-center justify-center mb-4 text-[#8A5A36]">
              <Coffee className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-serif-display font-medium text-[#211D1A]">
              Your order bag is empty
            </h3>
            <p className="mt-2 text-xs text-[#7A7167] max-w-xs leading-relaxed">
              Explore our single-origin pour-overs, stone-deck viennoiserie, and seasonal kitchen plates.
            </p>
            <button
              onClick={onClose}
              className="mt-6 px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#211D1A] bg-[#EFE9DE] hover:bg-[#E5DDCF] rounded-md transition-colors"
            >
              Browse Menu
            </button>
          </div>
        ) : (
          /* Order Items & Checkout Module */
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            
            {/* Fulfillment Mode Toggle */}
            <div className="bg-[#EFE9DE] p-1 rounded-lg flex items-center gap-1">
              <button
                type="button"
                onClick={() => setOrderType('pickup')}
                className={`flex-1 py-2 text-xs font-medium rounded-md transition-all ${
                  orderType === 'pickup'
                    ? 'bg-white text-[#211D1A] shadow-xs'
                    : 'text-[#696157] hover:text-[#211D1A]'
                }`}
              >
                Bar Pickup (10–15 min)
              </button>
              <button
                type="button"
                onClick={() => setOrderType('dinein')}
                className={`flex-1 py-2 text-xs font-medium rounded-md transition-all ${
                  orderType === 'dinein'
                    ? 'bg-white text-[#211D1A] shadow-xs'
                    : 'text-[#696157] hover:text-[#211D1A]'
                }`}
              >
                Dine-In Table Order
              </button>
            </div>

            {/* Itemized List */}
            <div className="space-y-3 divide-y divide-[#EAE3D6]">
              {items.map((cartItem) => (
                <div key={cartItem.cartItemId} className="pt-3 first:pt-0 flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <h4 className="text-sm font-serif-display font-medium text-[#211D1A]">
                      {cartItem.menuItem.name}
                    </h4>

                    {/* Customization Details */}
                    <div className="text-[11px] text-[#7A7167] space-y-0.5 mt-0.5">
                      {cartItem.customization.milk !== 'none' && (
                        <div>Milk: <span className="capitalize text-[#544D45]">{cartItem.customization.milk}</span></div>
                      )}
                      {cartItem.customization.ice !== 'hot' && (
                        <div>Temp: <span className="capitalize text-[#544D45]">{cartItem.customization.ice.replace('-', ' ')}</span></div>
                      )}
                      {cartItem.customization.extraShot && (
                        <div className="text-[#8A5A36] font-medium">+ Extra Double Ristretto Shot</div>
                      )}
                      {cartItem.customization.instructions && (
                        <div className="italic text-[#8A8074]">"{cartItem.customization.instructions}"</div>
                      )}
                    </div>

                    <div className="mt-2 text-xs font-semibold text-[#211D1A] tabular-nums">
                      ${cartItem.itemTotal.toFixed(2)}
                    </div>
                  </div>

                  {/* Quantity Stepper & Remove */}
                  <div className="flex items-center gap-2">
                    <div className="flex items-center border border-[#DDD5C7] rounded-md bg-white overflow-hidden">
                      <button
                        onClick={() => onUpdateQuantity(cartItem.cartItemId, -1)}
                        aria-label="Decrease quantity"
                        className="p-1.5 text-[#59524B] hover:bg-[#F2EDE4]"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 text-xs font-semibold tabular-nums text-[#211D1A]">
                        {cartItem.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(cartItem.cartItemId, 1)}
                        aria-label="Increase quantity"
                        className="p-1.5 text-[#59524B] hover:bg-[#F2EDE4]"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button
                      onClick={() => onRemoveItem(cartItem.cartItemId)}
                      aria-label="Remove item"
                      className="p-1.5 text-[#8A8074] hover:text-red-700 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Customer Details Form */}
            <div className="pt-4 border-t border-[#EAE3D6] space-y-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#8A5A36] block">
                Pickup Contact Details
              </span>

              <div>
                <label className="block text-xs font-medium text-[#59524B] mb-1">
                  Your Name *
                </label>
                <input
                  type="text"
                  placeholder="For pickup announcement"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  required
                  className="w-full text-xs px-3.5 py-2 bg-white border border-[#DDD5C7] rounded-lg text-[#211D1A] focus:outline-none focus:ring-2 focus:ring-[#8A5A36]"
                />
              </div>

              {orderType === 'dinein' ? (
                <div>
                  <label className="block text-xs font-medium text-[#59524B] mb-1">
                    Table Number *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Table 4 or Banquette B"
                    value={tableNumber}
                    onChange={(e) => setTableNumber(e.target.value)}
                    required
                    className="w-full text-xs px-3.5 py-2 bg-white border border-[#DDD5C7] rounded-lg text-[#211D1A] focus:outline-none focus:ring-2 focus:ring-[#8A5A36]"
                  />
                </div>
              ) : (
                <div>
                  <label className="block text-xs font-medium text-[#59524B] mb-1">
                    Mobile Phone (for SMS ready alert)
                  </label>
                  <input
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full text-xs px-3.5 py-2 bg-white border border-[#DDD5C7] rounded-lg text-[#211D1A] focus:outline-none focus:ring-2 focus:ring-[#8A5A36]"
                  />
                </div>
              )}
            </div>

            {/* Barista Tip */}
            <div className="pt-3 border-t border-[#EAE3D6]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-[#59524B]">
                  Support our Baristas (Tip)
                </span>
                <span className="text-xs font-semibold text-[#8A5A36] tabular-nums">
                  ${tip.toFixed(2)}
                </span>
              </div>
              <div className="grid grid-cols-4 gap-1.5">
                {[0, 15, 18, 20].map((pct) => (
                  <button
                    key={pct}
                    type="button"
                    onClick={() => setTipPercent(pct)}
                    className={`py-1.5 text-xs font-medium rounded border transition-all ${
                      tipPercent === pct
                        ? 'bg-[#211D1A] text-white border-[#211D1A]'
                        : 'bg-white text-[#59524B] border-[#DDD5C7] hover:border-[#B5ABA0]'
                    }`}
                  >
                    {pct === 0 ? 'None' : `${pct}%`}
                  </button>
                ))}
              </div>
            </div>

            {/* Calculations Breakdown */}
            <div className="pt-3 border-t border-[#EAE3D6] space-y-1.5 text-xs text-[#59524B]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-[#211D1A] tabular-nums">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>NYC Tax (8.875%)</span>
                <span className="tabular-nums">${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tip</span>
                <span className="tabular-nums">${tip.toFixed(2)}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-[#EAE3D6] text-sm font-semibold text-[#211D1A]">
                <span>Total</span>
                <span className="text-lg font-serif-display tabular-nums">${grandTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="button"
                disabled={isCheckingOut || !customerName.trim()}
                onClick={handlePlaceOrder}
                className="w-full py-3.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#211D1A] hover:bg-[#38322D] rounded-md transition-colors shadow-sm disabled:opacity-40 flex items-center justify-center gap-2"
              >
                <span>{isCheckingOut ? 'Transmitting to Bar...' : `Place Order • $${grandTotal.toFixed(2)}`}</span>
                <ArrowRight className="w-4 h-4 text-[#D8B48D]" />
              </button>
              {!customerName.trim() && (
                <p className="text-[10px] text-center text-[#8A8074] mt-1.5">
                  Please enter your name above to place pickup order
                </p>
              )}
            </div>

          </div>
        )}
      </div>
    </div>
  );
};
