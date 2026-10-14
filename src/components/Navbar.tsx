import React from 'react';
import { ShoppingBag, Flame } from 'lucide-react';
import { formatFCFA } from '../utils/format';

interface NavbarProps {
  cartCount: number;
  cartTotal: number;
  onOpenCart: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  cartTotal,
  onOpenCart,
}) => {
  return (
    <>
      {/* Top Banner - slim announcement under 40px */}
      <aside aria-label="Annonce de livraison" className="h-9 bg-amber-500 text-stone-950 text-xs font-semibold px-4 flex items-center justify-between overflow-hidden">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center gap-2 truncate">
            <Flame className="w-3.5 h-3.5 shrink-0 text-stone-950" />
            <span className="truncate">
              Cotonou & Calavi&nbsp;: Commandez avant 22&nbsp;h&nbsp;30 · Livré fumant en 35 min · Livraison offerte dès 10&nbsp;000&nbsp;FCFA
            </span>
          </div>
          <span className="hidden sm:inline-block shrink-0 text-stone-900 font-medium text-[11px]">
            Marque fictive · Démonstration
          </span>
        </div>
      </aside>

      {/* Top Navigation Bar - strictly complies with 3-zone contract */}
      <header className="sticky top-0 z-40 bg-stone-950/95 backdrop-blur-md border-b border-stone-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-4 sm:px-6 py-3.5">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#"
            className="text-xl sm:text-2xl font-black tracking-tight text-white whitespace-nowrap shrink-0 hover:text-amber-400 transition-colors font-display"
          >
            BOULEVARD<span className="text-amber-500">.</span>SMASH
          </a>

          {/* Zone 2: 4 single-line clean text navigation links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-300">
            <a
              href="#menu"
              className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0"
            >
              Le Menu
            </a>
            <a
              href="#builder"
              className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0"
            >
              Personnaliser
            </a>
            <a
              href="#quiz"
              className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0"
            >
              Quiz Express (30&nbsp;s)
            </a>
            <a
              href="#livraison"
              className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0"
            >
              Livraison & FAQ
            </a>
          </nav>

          {/* Zone 3: 1 primary action button */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenCart}
              className="group flex items-center gap-2.5 px-4 py-2 text-sm font-semibold text-stone-950 bg-amber-500 hover:bg-amber-400 rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-sm"
              aria-label={`Panier avec ${cartCount} articles, total ${formatFCFA(cartTotal)}`}
            >
              <ShoppingBag className="w-4 h-4 text-stone-950" />
              <span>
                Panier ({cartCount})
              </span>
              {cartTotal > 0 && (
                <span className="hidden sm:inline-block font-mono text-xs pl-1 border-l border-stone-900/30">
                  {formatFCFA(cartTotal)}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>
    </>
  );
};
