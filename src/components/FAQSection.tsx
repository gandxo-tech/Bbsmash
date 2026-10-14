import React, { useState } from 'react';
import { ChevronDown, MapPin, Clock, CreditCard, Sparkles } from 'lucide-react';
import { DELIVERY_ZONES } from '../data/menu';
import { formatFCFA } from '../utils/format';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    question: 'Serai-je livré à temps pour le coup d’envoi de mon match ou ma soirée\u00a0?',
    answer: 'Oui. Toutes nos commandes sont préparées en moins de 10 minutes sur nos planchas dédiées puis remises à nos coursiers motorisés équipés de caissons thermiques. Le délai moyen constaté est de 25 à 35 minutes sur Cotonou intra-muros (Cadjehoun, Haie Vive, Fidjrossè, Saint-Michel) et 30 à 45 minutes pour Akpakpa et Calavi. Vous recevez un lien de suivi dès le départ du coursier.',
  },
  {
    question: 'Et si le burger arrive tiède ou les frites ramollies\u00a0?',
    answer: 'C’est la peur numéro un avec la livraison de burger. C’est pourquoi nous utilisons exclusivement des boîtes en carton kraft micro-perforées qui laissent s’échapper l’humidité tout en retenant la chaleur. Vos frites restent croustillantes. Si toutefois un repas arrivait tiède suite à un imprévu de circulation, nous vous le remplaçons ou vous remboursons immédiatement.',
  },
  {
    question: 'Les remises et prix barrés sont-ils réels\u00a0?',
    answer: 'Totalement transparent. Les prix barrés affichés sur notre site correspondent à nos tarifs unitaires habituels hors formule ou au tarif pratiqué au restaurant. Aucun faux rabais gonflé avant l’événement. Sur chaque produit remisé, vous visualisez l’économie exacte en FCFA.',
  },
  {
    question: 'Comment puis-je payer ma commande\u00a0?',
    answer: 'Vous choisissez votre méthode au moment de valider\u00a0: MTN Mobile Money, Moov Money, Wave, ou espèces directement au livreur. Dans tous les cas, vous ne payez qu’après avoir reçu votre sac.',
  },
  {
    question: 'Puis-je commander directement par WhatsApp\u00a0?',
    answer: 'Oui\u00a0! Cliquez sur le bouton vert WhatsApp dans votre panier. Un message pré-formaté avec le détail de vos burgers, vos options et votre adresse est généré en un clic. Notre équipe confirme votre commande en moins de 60 secondes.',
  },
];

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [activeZone, setActiveZone] = useState(DELIVERY_ZONES[0]);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="livraison" className="py-16 sm:py-24 border-b border-stone-800 bg-stone-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold tracking-wider text-amber-400 uppercase mb-2">
            <span>Zéro Doute</span>
            <span aria-hidden="true">·</span>
            <span>Transparence Totale</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
            Questions fréquentes & Délais par quartier
          </h2>
          <p className="text-sm sm:text-base text-stone-400 mt-2">
            Tout ce qu'il faut savoir avant de commander votre smash chaud ce soir.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left: Interactive Delivery Zone Estimator */}
          <div className="lg:col-span-5 p-6 rounded-2xl bg-stone-900/60 border border-stone-800 space-y-5">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-amber-500" />
              <h3 className="text-base font-bold text-white font-display">
                Estimer mon délai de livraison à Cotonou
              </h3>
            </div>
            
            <p className="text-xs text-stone-400 leading-relaxed">
              Sélectionnez votre quartier pour vérifier le temps d’arrivée et le tarif de livraison en caisson thermique&nbsp;:
            </p>

            {/* Neighborhood button grid */}
            <div className="grid grid-cols-2 gap-2">
              {DELIVERY_ZONES.map((zone) => {
                const isSelected = activeZone.name === zone.name;
                return (
                  <button
                    key={zone.name}
                    type="button"
                    onClick={() => setActiveZone(zone)}
                    className={`p-2.5 rounded-lg border text-left text-xs font-medium transition-all ${
                      isSelected
                        ? 'border-amber-500 bg-amber-500/10 text-white font-semibold'
                        : 'border-stone-800 bg-stone-950/60 text-stone-400 hover:text-stone-200'
                    }`}
                  >
                    {zone.name}
                  </button>
                );
              })}
            </div>

            {/* Zone summary display */}
            <div className="p-4 rounded-xl bg-stone-950 border border-stone-800 space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-stone-400 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  Délai moyen constaté
                </span>
                <span className="font-bold text-white font-mono">{activeZone.eta}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-stone-400 flex items-center gap-1.5">
                  <CreditCard className="w-3.5 h-3.5 text-amber-400" />
                  Frais de livraison
                </span>
                <span className="font-bold text-amber-400 font-mono tabular-nums">
                  {formatFCFA(activeZone.deliveryFee)}
                </span>
              </div>
              <div className="pt-2 border-t border-stone-800/80 flex items-center justify-between text-[11px] text-emerald-400 font-medium">
                <span className="flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  Livraison offerte
                </span>
                <span>Dès 10&nbsp;000&nbsp;FCFA de commande</span>
              </div>
            </div>

          </div>

          {/* Right: FAQ Accordions */}
          <div className="lg:col-span-7 space-y-3">
            {FAQS.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-xl border border-stone-800 bg-stone-900/50 overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => toggle(idx)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 text-sm sm:text-base font-bold text-white hover:text-amber-400 transition-colors"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-stone-400 transition-transform duration-200 shrink-0 ${
                        isOpen ? 'rotate-180 text-amber-400' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-5 sm:px-5 sm:pb-5 text-xs sm:text-sm text-stone-300 leading-relaxed border-t border-stone-800/60 pt-3 animate-fadeIn">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
