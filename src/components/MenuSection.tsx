import React, { useState } from 'react';
import { Plus, Info, Clock } from 'lucide-react';
import { MenuItem } from '../types';
import { MENU_ITEMS } from '../data/menu';
import { formatFCFA } from '../utils/format';
import { playIngredientSnap } from '../utils/sound';

interface MenuSectionProps {
  onAddToCart: (item: MenuItem) => void;
  onOpenDetails: (item: MenuItem) => void;
}

type CategoryFilter = 'all' | 'smash' | 'combos' | 'sides' | 'drinks';

const CATEGORIES: { id: CategoryFilter; label: string }[] = [
  { id: 'all', label: 'Toute la Carte' },
  { id: 'smash', label: 'Smash Signatures' },
  { id: 'combos', label: 'Formules Fête & Match' },
  { id: 'sides', label: 'Sides & Frites' },
  { id: 'drinks', label: 'Boissons Fraîches' }
];

export const MenuSection: React.FC<MenuSectionProps> = ({
  onAddToCart,
  onOpenDetails
}) => {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all');

  const filteredItems = activeCategory === 'all'
    ? MENU_ITEMS
    : MENU_ITEMS.filter((item) => item.category === activeCategory);

  const handleAdd = (item: MenuItem) => {
    playIngredientSnap();
    onAddToCart(item);
  };

  return (
    <section id="menu" className="py-16 sm:py-24 border-b border-stone-800 bg-stone-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold tracking-wider text-amber-400 uppercase mb-2">
            <span>La Carte du Soir</span>
            <span aria-hidden="true">·</span>
            <span>Cuisiné minute</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
            Toutes nos recettes à la plancha
          </h2>
          <p className="text-sm sm:text-base text-stone-400 mt-2">
            Garantie fraîcheur&nbsp;: steaks smashés à la commande, boîtes micro-ventilées pour garder vos frites croustillantes.
          </p>
        </div>

        {/* Clean Segmented Filter Controls */}
        <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-4 mb-10 gap-2 no-scrollbar">
          <div className="inline-flex p-1 bg-stone-900 rounded-xl border border-stone-800 shrink-0">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'bg-amber-500 text-stone-950 shadow-sm'
                      : 'text-stone-400 hover:text-white'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Product Cards Grid: 3-column desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => {
            return (
              <div
                key={item.id}
                className="group flex flex-col justify-between rounded-2xl bg-stone-900/60 border border-stone-800 burger-card-hover overflow-hidden"
              >
                {/* Image Container with Fallback */}
                <div>
                  <div className="relative aspect-[4/3] bg-stone-950 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover burger-img-zoom"
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Dark gradient overlay for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-transparent to-transparent opacity-80" />

                    {/* Quick view button */}
                    <button
                      onClick={() => onOpenDetails(item)}
                      className="absolute top-3 right-3 p-2 rounded-lg bg-stone-950/80 backdrop-blur-md text-stone-300 hover:text-white border border-stone-800 hover:border-stone-700 transition-all opacity-0 group-hover:opacity-100"
                      title="Voir les détails et ingrédients"
                    >
                      <Info className="w-4 h-4" />
                    </button>

                    {/* Unboxed text category kicker at bottom-left */}
                    <div className="absolute bottom-3 left-3 text-xs text-amber-400 font-semibold tracking-wider uppercase">
                      <span>{item.category === 'smash' ? 'Smash Burger' : item.category === 'combos' ? 'Formule Complète' : item.category === 'sides' ? 'Accompagnement' : 'Boisson Artisanale'}</span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 space-y-3">
                    
                    {/* Item Name */}
                    <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors font-display">
                      {item.name}
                    </h3>

                    {/* Benefice avant caractéristique (Rule 1) */}
                    <p className="text-xs font-medium text-amber-300/90 leading-snug">
                      {item.shortBenefit}
                    </p>

                    {/* Description */}
                    <p className="text-xs text-stone-400 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>

                    {/* Bullet proof points */}
                    <ul className="space-y-1 pt-1">
                      {item.bulletPoints.slice(0, 2).map((pt, idx) => (
                        <li key={idx} className="text-[11px] text-stone-300 flex items-start gap-1.5">
                          <span className="text-amber-500 font-bold">·</span>
                          <span className="truncate">{pt}</span>
                        </li>
                      ))}
                    </ul>

                  </div>
                </div>

                {/* Footer / Price & Actions */}
                <div className="p-5 pt-0 border-t border-stone-800/80 mt-4 space-y-3">
                  
                  {/* Delivery time guarantee notice */}
                  <div className="flex items-center gap-1.5 text-[11px] text-stone-400">
                    <Clock className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span>Livré chaud en 35 min après commande</span>
                  </div>

                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-lg sm:text-xl font-extrabold text-amber-400 font-mono tabular-nums">
                          {formatFCFA(item.price)}
                        </span>
                        {item.originalPrice && (
                          <span className="text-xs text-stone-400 line-through font-mono">
                            {formatFCFA(item.originalPrice)}
                          </span>
                        )}
                      </div>
                      {item.discountNote && (
                        <p className="text-[10px] text-stone-400 max-w-[170px] truncate" title={item.discountNote}>
                          {item.discountNote}
                        </p>
                      )}
                    </div>

                    <button
                      onClick={() => handleAdd(item)}
                      className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 active:scale-95 text-stone-950 font-bold text-xs rounded-lg transition-all shadow-md flex items-center gap-1.5 whitespace-nowrap shrink-0"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Ajouter</span>
                    </button>
                  </div>

                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
