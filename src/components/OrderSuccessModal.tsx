import React from 'react';
import { CheckCircle2, Clock, MapPin, Phone, MessageSquare, X } from 'lucide-react';
import { CartItem, Neighborhood } from '../types';
import { formatFCFA } from '../utils/format';

interface OrderSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderDetails: {
    items: CartItem[];
    subtotal: number;
    deliveryFee: number;
    total: number;
    neighborhood: Neighborhood;
    paymentMethod: string;
    customerName: string;
    customerPhone: string;
    notes: string;
  } | null;
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({
  isOpen,
  onClose,
  orderDetails,
}) => {
  if (!isOpen || !orderDetails) return null;

  const handleSendToWhatsApp = () => {
    const itemLines = orderDetails.items
      .map((i) => `- ${i.quantity}x ${i.name} (${formatFCFA(i.price * i.quantity)})`)
      .join('\n');

    const message = `Bonjour Boulevard Smash ! Je confirme ma commande passée en ligne :\n\n${itemLines}\n\nTotal : ${formatFCFA(orderDetails.total)}\nQuartier : ${orderDetails.neighborhood}\nContact : ${orderDetails.customerName} (${orderDetails.customerPhone})\nPaiement choisi : ${orderDetails.paymentMethod}${orderDetails.notes ? `\nRepère : ${orderDetails.notes}` : ''}`;

    window.open(`https://wa.me/22997000000?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg bg-stone-900 border border-stone-800 rounded-2xl overflow-hidden shadow-2xl p-6 sm:p-8 space-y-6">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition-colors"
          aria-label="Fermer la confirmation"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Icon & Status */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/20">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-black text-white font-display">
            Commande confirmée en cuisine&nbsp;!
          </h3>
          <p className="text-xs sm:text-sm text-stone-300">
            Vos steaks partent immédiatement sur la plancha brûlante à 280&nbsp;°C.
          </p>
        </div>

        {/* Tracking progress simulator */}
        <div className="p-4 rounded-xl bg-stone-950/80 border border-stone-800 space-y-3">
          <div className="flex items-center justify-between text-xs text-stone-400 font-mono">
            <span>Statut&nbsp;: Cuisson minute en cours</span>
            <span className="text-amber-400 font-bold">~ 35 min d'attente</span>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2.5 text-xs text-stone-200">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
              <span className="font-semibold text-emerald-400">Plancha active</span>
              <span className="text-stone-500">· Croûte smashée croustillante</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-stone-400">
              <span className="w-2 h-2 rounded-full bg-stone-700" />
              <span>Mise en boîte thermique ventilée</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-stone-400">
              <span className="w-2 h-2 rounded-full bg-stone-700" />
              <span>Livreur en route vers {orderDetails.neighborhood}</span>
            </div>
          </div>
        </div>

        {/* Recap */}
        <div className="space-y-2 text-xs border-t border-stone-800 pt-4">
          <div className="flex items-center justify-between text-stone-300">
            <span className="flex items-center gap-1.5 text-stone-400">
              <MapPin className="w-3.5 h-3.5 text-amber-500" />
              Destination
            </span>
            <span className="font-medium text-white">{orderDetails.neighborhood}</span>
          </div>
          <div className="flex items-center justify-between text-stone-300">
            <span className="flex items-center gap-1.5 text-stone-400">
              <Phone className="w-3.5 h-3.5 text-amber-500" />
              Destinataire
            </span>
            <span className="font-medium text-white">{orderDetails.customerName} ({orderDetails.customerPhone})</span>
          </div>
          <div className="flex items-center justify-between text-stone-300">
            <span className="flex items-center gap-1.5 text-stone-400">
              <Clock className="w-3.5 h-3.5 text-amber-500" />
              Paiement à la réception
            </span>
            <span className="font-semibold text-amber-400 font-mono tabular-nums">{formatFCFA(orderDetails.total)} ({orderDetails.paymentMethod})</span>
          </div>
        </div>

        {/* Transparent Demo Disclaimer */}
        <div className="p-3.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200 leading-relaxed">
          <strong>Site de démonstration e-commerce&nbsp;:</strong> aucun montant réel n’a été prélevé sur votre compte. Pour tester l’expérience réelle, vous pouvez envoyer cette commande sur WhatsApp.
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleSendToWhatsApp}
            className="flex-1 py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Transférer sur WhatsApp</span>
          </button>
          
          <button
            onClick={onClose}
            className="py-3 px-5 border border-stone-700 hover:border-stone-500 text-stone-300 hover:text-white text-xs font-semibold rounded-lg transition-colors"
          >
            Fermer
          </button>
        </div>

      </div>
    </div>
  );
};
