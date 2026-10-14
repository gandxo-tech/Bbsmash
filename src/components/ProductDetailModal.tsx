import React, { useState } from 'react';
import { X, Plus, Minus, Check, Clock, Flame } from 'lucide-react';
import { MenuItem } from '../types';
import { formatFCFA } from '../utils/format';
import { playIngredientSnap } from '../utils/sound';

interface ProductDetailModalProps {
  item: MenuItem | null;
  onClose: () => void;
  onAddToCart: (item: MenuItem, quantity: number) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  item,
  onClose,
  onAddToCart,
}) => {
  const [quantity, setQuantity] = useState(1);

  if (!item) return null;

  const handleIncrement = () => {
    playIngredientSnap();
    setQuantity((q) => q + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      playIngredientSnap();
      setQuantity((q) => q - 1);
    }
  };

  const handleConfirm = () => {
    playIngredientSnap();
    onAddToCart(item, quantity);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-xl bg-stone-900 border border-stone-800 rounded-2xl overflow-hidden shadow-2xl max-h-[90vh] flex flex-col">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-stone-950/70 hover:bg-stone-950 text-stone-300 hover:text-white transition-colors"
          aria-label="Fermer la fiche produit"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Image */}
        <div className="relative aspect-[16/9] w-full bg-stone-950 shrink-0 group overflow-hidden">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover burger-img-zoom"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-transparent to-transparent" />
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-4">
          
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider mb-1">
              <span>Fiche Recette Plancha</span>
              <span aria-hidden="true">·</span>
              <span>Boulevard Smash</span>
            </div>
            <h3 className="text-2xl font-extrabold text-white font-display">
              {item.name}
            </h3>
            <p className="text-sm font-semibold text-amber-300 mt-1">
              {item.shortBenefit}
            </p>
          </div>

          <p className="text-sm text-stone-300 leading-relaxed">
            {item.description}
          </p>

          {/* Details / Bullets */}
          <div className="p-4 rounded-xl bg-stone-950/70 border border-stone-800 space-y-2">
            <h4 className="text-xs font-bold text-stone-200 uppercase tracking-wider">
              Ce qui fait la différence&nbsp;:
            </h4>
            <ul className="space-y-1.5">
              {item.bulletPoints.map((point, index) => (
                <li key={index} className="text-xs text-stone-300 flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Reassurance note */}
          <div className="flex items-center gap-4 text-xs text-stone-400 pt-1">
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-amber-500" />
              <span>35 min de livraison</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-amber-500" />
              <span>Emballage isotherme ventilé</span>
            </div>
          </div>

        </div>

        {/* Footer with quantity and Add CTA */}
        <div className="p-4 sm:p-6 bg-stone-950 border-t border-stone-800 flex items-center justify-between gap-4 shrink-0">
          
          {/* Quantity Stepper */}
          <div className="flex items-center border border-stone-800 rounded-lg bg-stone-900 overflow-hidden">
            <button
              onClick={handleDecrement}
              className="p-2.5 text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
              aria-label="Diminuer la quantité"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-10 text-center font-mono font-bold text-sm text-white">
              {quantity}
            </span>
            <button
              onClick={handleIncrement}
              className="p-2.5 text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
              aria-label="Augmenter la quantité"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleConfirm}
            className="flex-1 py-3 px-5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-sm rounded-lg transition-all shadow-md active:scale-95 flex items-center justify-between"
          >
            <span>Ajouter à ma commande</span>
            <span className="font-mono tabular-nums">
              {formatFCFA(item.price * quantity)}
            </span>
          </button>

        </div>

      </div>
    </div>
  );
};
