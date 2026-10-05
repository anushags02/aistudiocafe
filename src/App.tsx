import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { MenuSection } from './components/MenuSection';
import { RoasterySection } from './components/RoasterySection';
import { SpaceAtmosphereSection } from './components/SpaceAtmosphereSection';
import { ReservationSection } from './components/ReservationSection';
import { VisitSection } from './components/VisitSection';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { CustomizationModal } from './components/CustomizationModal';
import { MenuItem, CartItem, CartItemCustomization } from './types/cafe';

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [customizingItem, setCustomizingItem] = useState<MenuItem | null>(null);

  // Cart actions
  const handleAddToCart = (
    item: MenuItem,
    quantity: number,
    customization: CartItemCustomization,
    itemTotal: number
  ) => {
    const newItem: CartItem = {
      cartItemId: `${item.id}-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      menuItem: item,
      quantity,
      customization,
      itemTotal,
    };
    setCartItems((prev) => [...prev, newItem]);
    setIsCartOpen(true);
  };

  const handleQuickAdd = (item: MenuItem) => {
    const newItem: CartItem = {
      cartItemId: `${item.id}-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      menuItem: item,
      quantity: 1,
      customization: {
        milk: 'none',
        ice: 'hot',
        sweetness: 'none',
        extraShot: false,
        instructions: '',
      },
      itemTotal: item.price,
    };
    setCartItems((prev) => [...prev, newItem]);
  };

  const handleUpdateQuantity = (cartItemId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.cartItemId === cartItemId) {
            const newQty = item.quantity + delta;
            if (newQty <= 0) return null;
            const unitPrice = item.itemTotal / item.quantity;
            return {
              ...item,
              quantity: newQty,
              itemTotal: unitPrice * newQty,
            };
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  const handleRemoveItem = (cartItemId: string) => {
    setCartItems((prev) => prev.filter((i) => i.cartItemId !== cartItemId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Navigation handlers
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#211D1A] flex flex-col font-sans-body">
      {/* 3-Zone Header */}
      <Header
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenReservations={() => scrollToSection('reservations')}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onExploreMenu={() => scrollToSection('menu')}
          onReserveTable={() => scrollToSection('reservations')}
        />

        {/* Interactive Menu Grid */}
        <MenuSection
          onSelectItem={(item) => setCustomizingItem(item)}
          onQuickAdd={handleQuickAdd}
        />

        {/* Roastery Sourcing & Sensory Explorer */}
        <RoasterySection
          onSelectCoffee={() => scrollToSection('menu')}
        />

        {/* Space, Morning Ritual & Bakery */}
        <SpaceAtmosphereSection />

        {/* Interactive Table Reservation Engine */}
        <ReservationSection />

        {/* Hours, Directions & House FAQ */}
        <VisitSection />
      </main>

      {/* Editorial Footer */}
      <Footer />

      {/* Customization Dialog */}
      <CustomizationModal
        item={customizingItem}
        onClose={() => setCustomizingItem(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Slide-out Order & Bag Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />
    </div>
  );
}
