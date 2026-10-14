import { useState, useEffect } from 'react';
import { MenuItem, CartItem, Neighborhood } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { BurgerBuilder } from './components/BurgerBuilder';
import { BurgerQuiz } from './components/BurgerQuiz';
import { MenuSection } from './components/MenuSection';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { ReviewsAndProof } from './components/ReviewsAndProof';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';

const CART_STORAGE_KEY = 'boulevard_smash_cart_v1';

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [detailItem, setDetailItem] = useState<MenuItem | null>(null);
  const [completedOrder, setCompletedOrder] = useState<{
    items: CartItem[];
    subtotal: number;
    deliveryFee: number;
    total: number;
    neighborhood: Neighborhood;
    paymentMethod: string;
    customerName: string;
    customerPhone: string;
    notes: string;
  } | null>(null);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch {
      // ignore
    }
  }, [cartItems]);

  const cartTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Add standard menu item
  const handleAddToCart = (item: MenuItem, quantity = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.itemId === item.id && !i.customDetails);
      if (existing) {
        return prev.map((i) =>
          i.id === existing.id ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [
        ...prev,
        {
          id: `${item.id}-${Date.now()}`,
          itemId: item.id,
          name: item.name,
          price: item.price,
          quantity,
          image: item.image,
        },
      ];
    });
    setIsCartOpen(true);
  };

  // Add custom burger from BurgerBuilder
  const handleAddCustomBurger = (burgerName: string, price: number, details: string) => {
    const newItem: CartItem = {
      id: `custom-${Date.now()}`,
      itemId: 'custom-smash',
      name: burgerName,
      price,
      quantity: 1,
      customDetails: details,
    };
    setCartItems((prev) => [...prev, newItem]);
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleOpenCheckoutSuccess = (orderDetails: {
    items: CartItem[];
    subtotal: number;
    deliveryFee: number;
    total: number;
    neighborhood: Neighborhood;
    paymentMethod: string;
    customerName: string;
    customerPhone: string;
    notes: string;
  }) => {
    setIsCartOpen(false);
    setCompletedOrder(orderDetails);
    // Clear cart
    setCartItems([]);
  };

  const scrollToMenu = () => {
    const el = document.getElementById('menu');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToBuilder = () => {
    const el = document.getElementById('builder');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col font-sans selection:bg-amber-500 selection:text-stone-950">
      
      {/* Top Navbar */}
      <Navbar
        cartCount={cartCount}
        cartTotal={cartTotal}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Main Page Sections */}
      <main className="flex-1">
        {/* 1. Hero Campaign Showcase */}
        <Hero
          onScrollToMenu={scrollToMenu}
          onScrollToBuilder={scrollToBuilder}
        />

        {/* 2. Menu Catalog with Category Tabs */}
        <MenuSection
          onAddToCart={handleAddToCart}
          onOpenDetails={(item) => setDetailItem(item)}
        />

        {/* 3. Interactive Burger Builder */}
        <BurgerBuilder onAddCustomBurger={handleAddCustomBurger} />

        {/* 4. 30-Second Recommendation Quiz */}
        <BurgerQuiz
          onSelectProduct={(item) => {
            handleAddToCart(item);
          }}
        />

        {/* 5. Authentic Reviews and Quality Proof */}
        <ReviewsAndProof />

        {/* 6. Neighborhood Delivery Estimator & FAQ */}
        <FAQSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Slide-over Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onOpenCheckoutSuccess={handleOpenCheckoutSuccess}
        onScrollToMenu={scrollToMenu}
      />

      {/* Product Detail Modal */}
      <ProductDetailModal
        item={detailItem}
        onClose={() => setDetailItem(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Order Tracking & Confirmation Modal */}
      <OrderSuccessModal
        isOpen={!!completedOrder}
        onClose={() => setCompletedOrder(null)}
        orderDetails={completedOrder}
      />

    </div>
  );
}
