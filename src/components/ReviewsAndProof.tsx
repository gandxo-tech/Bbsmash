import React from 'react';
import { Star, ShieldCheck, Box, Flame } from 'lucide-react';

const REVIEWS = [
  {
    author: 'Rodrigue K.',
    neighborhood: 'Akpakpa, Cotonou',
    order: 'Le Double Classic Smash & Loaded Fries',
    quote: 'Reçu en 28 minutes à Akpakpa encore fumant. La croûte dentelée reste ultra croustillante et les frites ne sont pas molles du tout grâce à leur boîte ventilée. Enfin un vrai smash à Cotonou.',
    rating: 5,
  },
  {
    author: 'Vanessa A.',
    neighborhood: 'Fidjrossè plage',
    order: "L'Explosif Akpakpa Spicy",
    quote: 'Le piment local a un vrai parfum fruité sans anesthésier le goût de la viande et du cheddar. Paiement par MTN MoMo directement au livreur après ouverture du sac, super rassurant.',
    rating: 5,
  },
  {
    author: 'Malik B.',
    neighborhood: 'Haie Vive',
    order: 'Menu Soir de Fête (Combo complet)',
    quote: 'Après le match hier soir, c’était le réconfort parfait. Le pain brioché toasté au beurre tient parfaitement en main sans s’effondrer. Mention spéciale pour le bissap vanille bien glacé.',
    rating: 5,
  },
];

export const ReviewsAndProof: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 border-b border-stone-800 bg-stone-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold tracking-wider text-amber-400 uppercase mb-2">
            <span>Retours d’expérience vérifiés</span>
            <span aria-hidden="true">·</span>
            <span>Cotonou & Calavi</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-display">
            Ce que changent nos burgers dans vos soirées
          </h2>
          <p className="text-xs sm:text-sm text-stone-400 mt-2">
            Des faits concrets, des temps de livraison mesurés et des gourmets rassurés.
          </p>
        </div>

        {/* 3 Review Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.map((rev, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl bg-stone-950 border border-stone-800/80 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                {/* 5 Stars */}
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Review Body */}
                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed italic">
                  «&nbsp;{rev.quote}&nbsp;»
                </p>
              </div>

              {/* Author and Neighborhood */}
              <div className="pt-3 border-t border-stone-800/60 flex items-center justify-between">
                <div>
                  <h3 className="text-xs font-bold text-white">{rev.author}</h3>
                  <span className="text-[11px] text-amber-400/90">{rev.neighborhood}</span>
                </div>
                <span className="text-[10px] text-stone-400 bg-stone-900 px-2 py-0.5 rounded border border-stone-800">
                  {rev.order}
                </span>
              </div>

            </div>
          ))}
        </div>

        {/* Triple Quality Pillars Strip */}
        <div className="mt-12 p-6 rounded-2xl bg-stone-950/80 border border-stone-800 grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
          <div className="flex items-center gap-3 justify-center md:justify-start">
            <Box className="w-6 h-6 text-amber-500 shrink-0" />
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Boîtes thermiques aérées</h4>
              <p className="text-[11px] text-stone-400">La vapeur s’échappe, la chaleur reste&nbsp;: zéro frite molle.</p>
            </div>
          </div>

          <div className="flex items-center gap-3 justify-center md:justify-start">
            <Flame className="w-6 h-6 text-amber-500 shrink-0" />
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Smashé à 280&nbsp;°C minute</h4>
              <p className="text-[11px] text-stone-400">Croûte ultra dorée caramélisée au contact de la plancha.</p>
            </div>
          </div>

          <div className="flex items-center gap-3 justify-center md:justify-start">
            <ShieldCheck className="w-6 h-6 text-amber-500 shrink-0" />
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Paiement après contrôle</h4>
              <p className="text-[11px] text-stone-400">Inspectez votre sac avant de régler par MoMo, Wave ou Cash.</p>
            </div>
          </div>
        </div>

        {/* Demo transparency caption */}
        <p className="text-center text-[11px] text-stone-400 mt-6">
          Marque fictive – avis de test pour la démonstration de la landing page e-commerce.
        </p>

      </div>
    </section>
  );
};
