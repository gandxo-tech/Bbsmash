import React, { useState } from 'react';
import { X, Plus, Minus, Trash2, ArrowRight, ShoppingBag, ShieldCheck } from 'lucide-react';
import { CartItem, Neighborhood } from '../types';
import { DELIVERY_ZONES, FREE_DELIVERY_THRESHOLD } from '../data/menu';
import { formatFCFA } from '../utils/format';
import { playIngredientSnap } from '../utils/sound';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onOpenCheckoutSuccess: (orderDetails: {
    items: CartItem[];
    subtotal: number;
    deliveryFee: number;
    total: number;
    neighborhood: Neighborhood;
    paymentMethod: string;
    customerName: string;
    customerPhone: string;
    notes: string;
  }) => void;
  onScrollToMenu: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onOpenCheckoutSuccess,
  onScrollToMenu,
}) => {
  const [selectedZone, setSelectedZone] = useState<Neighborhood>('Cadjehoun');
  const [paymentMethod, setPaymentMethod] = useState<string>('MTN Mobile Money');
  const [customerName, setCustomerName] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [customerNotes, setCustomerNotes] = useState<string>('');
  const [orderError, setOrderError] = useState<string>('');

  if (!isOpen) return null;

  const currentZoneInfo = DELIVERY_ZONES.find((z) => z.name === selectedZone) || DELIVERY_ZONES[0];
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const isFreeDelivery = subtotal >= FREE_DELIVERY_THRESHOLD;
  const deliveryFee = items.length === 0 ? 0 : isFreeDelivery ? 0 : currentZoneInfo.deliveryFee;
  const remainingForFreeDelivery = Math.max(0, FREE_DELIVERY_THRESHOLD - subtotal);
  const total = subtotal + deliveryFee;

  const handleCheckoutValidation = () => {
    if (items.length === 0) return;
    if (!customerPhone.trim() || customerPhone.trim().length < 8) {
      setOrderError('Veuillez renseigner un numéro de téléphone valide (ex\u00a0: 97 00 00 00).');
      return;
    }
    setOrderError('');
    onOpenCheckoutSuccess({
      items,
      subtotal,
      deliveryFee,
      total,
      neighborhood: selectedZone,
      paymentMethod,
      customerName: customerName.trim() || 'Client Boulevard Smash',
      customerPhone: customerPhone.trim(),
      notes: customerNotes.trim(),
    });
  };

  const handleWhatsAppOrder = () => {
    if (items.length === 0) return;
    
    // Construct pre-filled WhatsApp message
    const itemLines = items
      .map((i) => `- ${i.quantity}x ${i.name} (${formatFCFA(i.price * i.quantity)})${i.customDetails ? ` [${i.customDetails}]` : ''}`)
      .join('\n');

    const message = `Bonjour Boulevard Smash ! Je souhaite passer commande :\n\n${itemLines}\n\nSous-total : ${formatFCFA(subtotal)}\nLivraison : ${deliveryFee === 0 ? 'Offerte' : formatFCFA(deliveryFee)} (${selectedZone})\nTotal : ${formatFCFA(total)}\n\nNom : ${customerName.trim() || 'Non renseigné'}\nTéléphone : ${customerPhone.trim() || 'Direct'}\nPaiement : ${paymentMethod}${customerNotes ? `\nPrécision : ${customerNotes}` : ''}\n\nMerci !`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/22997000000?text=${encoded}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-stone-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-md bg-stone-950 border-l border-stone-800 h-full flex flex-col shadow-2xl">
        
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-amber-500" />
            <h3 className="font-bold text-lg text-white font-display">Votre Commande</h3>
            <span className="text-xs text-stone-400 font-mono">({items.length} article{items.length > 1 ? 's' : ''})</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-white rounded-lg hover:bg-stone-900 transition-colors"
            aria-label="Fermer le panier"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Delivery Threshold Bar */}
        {items.length > 0 && (
          <div className="px-5 py-2.5 bg-stone-900/90 border-b border-stone-800 text-xs">
            {isFreeDelivery ? (
              <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" />
                Félicitations&nbsp;! La livraison vous est offerte.
              </span>
            ) : (
              <div>
                <div className="flex justify-between text-stone-300 mb-1">
                  <span>Plus que <strong className="text-amber-400">{formatFCFA(remainingForFreeDelivery)}</strong> pour la livraison offerte</span>
                </div>
                <div className="w-full bg-stone-800 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-amber-500 h-full rounded-full transition-all duration-300"
                    style={{ width: `${Math.min(100, (subtotal / FREE_DELIVERY_THRESHOLD) * 100)}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* Content Area */}
        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-stone-900 flex items-center justify-center text-stone-600 mb-4">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <h4 className="text-base font-bold text-white font-display">Votre plancha est encore froide.</h4>
            <p className="text-xs text-stone-400 mt-1 max-w-xs leading-relaxed">
              Choisissez un double smash croustillant pour démarrer votre festin de ce soir.
            </p>
            <button
              onClick={() => {
                onClose();
                onScrollToMenu();
              }}
              className="mt-6 px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs rounded-lg transition-all"
            >
              Voir la carte du soir
            </button>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            
            {/* Itemized List */}
            <div className="space-y-3">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 rounded-xl bg-stone-900/60 border border-stone-800 flex items-start justify-between gap-3"
                >
                  <div className="space-y-1 flex-1">
                    <h5 className="text-xs sm:text-sm font-semibold text-white">
                      {item.name}
                    </h5>
                    {item.customDetails && (
                      <p className="text-[11px] text-amber-300/80 leading-tight">
                        {item.customDetails}
                      </p>
                    )}
                    <span className="text-xs font-bold text-amber-400 font-mono tabular-nums block">
                      {formatFCFA(item.price * item.quantity)}
                    </span>
                  </div>

                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="text-stone-500 hover:text-red-400 transition-colors p-1"
                      aria-label="Supprimer l'article"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    
                    <div className="flex items-center border border-stone-800 rounded bg-stone-950">
                      <button
                        onClick={() => {
                          playIngredientSnap();
                          onUpdateQuantity(item.id, -1);
                        }}
                        className="p-1 text-stone-400 hover:text-white"
                        aria-label="Diminuer quantité"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 text-xs font-mono font-bold text-stone-200">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => {
                          playIngredientSnap();
                          onUpdateQuantity(item.id, 1);
                        }}
                        className="p-1 text-stone-400 hover:text-white"
                        aria-label="Augmenter quantité"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Neighborhood / Delivery Zone */}
            <div className="pt-2 border-t border-stone-800/80 space-y-2">
              <label htmlFor="neighborhood-select" className="text-xs font-bold text-stone-300 block uppercase tracking-wider">
                Quartier de livraison à Cotonou
              </label>
              <select
                id="neighborhood-select"
                value={selectedZone}
                onChange={(e) => setSelectedZone(e.target.value as Neighborhood)}
                className="w-full p-2.5 rounded-lg bg-stone-900 border border-stone-800 text-xs font-medium text-white focus:outline-none focus:border-amber-500"
              >
                {DELIVERY_ZONES.map((zone) => (
                  <option key={zone.name} value={zone.name}>
                    {zone.name} ({zone.eta} · {isFreeDelivery ? 'Livraison offerte' : formatFCFA(zone.deliveryFee)})
                  </option>
                ))}
              </select>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-stone-300 block uppercase tracking-wider">
                Moyen de paiement
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {['MTN Mobile Money', 'Moov Money', 'Wave', 'Espèces au livreur'].map((method) => (
                  <button
                    key={method}
                    type="button"
                    onClick={() => setPaymentMethod(method)}
                    className={`p-2 rounded-lg border text-left transition-all ${
                      paymentMethod === method
                        ? 'border-amber-500 bg-amber-500/10 text-white font-semibold'
                        : 'border-stone-800 bg-stone-900/60 text-stone-400 hover:text-stone-200'
                    }`}
                  >
                    {method}
                  </button>
                ))}
              </div>
            </div>

            {/* Customer Contact Details */}
            <div className="space-y-2 pt-2">
              <label htmlFor="phone-input" className="text-xs font-bold text-stone-300 block uppercase tracking-wider">
                Vos coordonnées pour la livraison
              </label>
              <input
                id="phone-input"
                type="tel"
                placeholder="Numéro WhatsApp / Téléphone (obligatoire)"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                className="w-full p-2.5 rounded-lg bg-stone-900 border border-stone-800 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-amber-500"
              />
              <input
                type="text"
                placeholder="Votre prénom ou nom"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full p-2.5 rounded-lg bg-stone-900 border border-stone-800 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-amber-500"
              />
              <input
                type="text"
                placeholder="Repère précis (ex: pharmacie, station, portail noir...)"
                value={customerNotes}
                onChange={(e) => setCustomerNotes(e.target.value)}
                className="w-full p-2.5 rounded-lg bg-stone-900 border border-stone-800 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-amber-500"
              />
              {orderError && (
                <p className="text-[11px] text-red-400 font-medium">{orderError}</p>
              )}
            </div>

          </div>
        )}

        {/* Sticky Drawer Footer */}
        {items.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-stone-800 bg-stone-900/90 space-y-3 shrink-0">
            
            {/* Calculation Recap */}
            <div className="space-y-1 text-xs">
              <div className="flex justify-between text-stone-400">
                <span>Sous-total</span>
                <span className="font-mono tabular-nums text-stone-200">{formatFCFA(subtotal)}</span>
              </div>
              <div className="flex justify-between text-stone-400">
                <span>Livraison ({selectedZone})</span>
                <span className="font-mono tabular-nums text-stone-200">
                  {deliveryFee === 0 ? <strong className="text-emerald-400">Offerte</strong> : formatFCFA(deliveryFee)}
                </span>
              </div>
              <div className="flex justify-between text-sm font-extrabold text-white pt-1 border-t border-stone-800">
                <span>Total à régler</span>
                <span className="text-amber-400 font-mono tabular-nums text-base">{formatFCFA(total)}</span>
              </div>
            </div>

            {/* Actions: Direct App Checkout OR WhatsApp Order */}
            <div className="space-y-2 pt-1">
              <button
                onClick={handleCheckoutValidation}
                className="w-full py-3 px-4 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs sm:text-sm rounded-lg transition-all shadow-md active:scale-95 flex items-center justify-center gap-2"
              >
                <span>Valider ma commande ({formatFCFA(total)})</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={handleWhatsAppOrder}
                className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <span>Commander directement par WhatsApp</span>
              </button>
            </div>

            <p className="text-[10px] text-stone-500 text-center">
              Paiement à la réception après vérification · Zéro surprise
            </p>

          </div>
        )}

      </div>
    </div>
  );
};
