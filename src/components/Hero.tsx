import React, { useState } from 'react';
import { Volume2, VolumeX, ShieldCheck, Clock, Flame, ChevronRight } from 'lucide-react';
import { HERO_IMAGE } from '../data/menu';
import { toggleGrillSizzle } from '../utils/sound';

interface HeroProps {
  onScrollToMenu: () => void;
  onScrollToBuilder: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onScrollToMenu,
  onScrollToBuilder,
}) => {
  const [isSizzling, setIsSizzling] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(true);

  const handleToggleSound = () => {
    const newState = toggleGrillSizzle();
    setIsSizzling(newState);
  };

  return (
    <section className="relative pt-8 pb-16 lg:pt-14 lg:pb-20 overflow-hidden border-b border-stone-800">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-amber-500/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Copywriting & Actions */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6 text-left">
            
            {/* Clean unboxed metadata separator */}
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-amber-400 uppercase">
              <span>Plancha brûlante à 280&nbsp;°C</span>
              <span aria-hidden="true">·</span>
              <span>Bœuf frais du jour</span>
              <span aria-hidden="true">·</span>
              <span>Cotonou & Calavi</span>
            </div>

            {/* Headline with text-wrap: balance */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.08] font-display" style={{ textWrap: 'balance' }}>
              Le smash croustillant de Cotonou, livré fumant chez vous en 35&nbsp;minutes.
            </h1>

            {/* Subtitle - Rule 1 & Rule 2: concrete, benefits, no fluff */}
            <p className="text-base sm:text-lg text-stone-300 max-w-2xl leading-relaxed">
              Bœuf pur sélectionné écrasé à la presse d’acier, double cheddar affiné dégoulinant et pain brioché doré au beurre. Savourez un vrai burger sans craindre les frites ramollies par le trajet.
            </p>

            {/* Actions: One Primary + One Secondary */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                onClick={onScrollToMenu}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-bold text-stone-950 bg-amber-500 hover:bg-amber-400 rounded-lg transition-all shadow-lg shadow-amber-500/20 active:scale-[0.98] whitespace-nowrap"
              >
                <span>Commander mon burger (dès 4&nbsp;500&nbsp;FCFA)</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              <button
                onClick={onScrollToBuilder}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-semibold text-stone-200 hover:text-white bg-transparent border border-stone-700 hover:border-stone-500 rounded-lg transition-colors whitespace-nowrap"
              >
                <span>Composer mon smash sur-mesure</span>
              </button>
            </div>

            {/* Live Grill Sizzle Sound Button */}
            <div className="pt-2 flex items-center gap-3">
              <button
                type="button"
                onClick={handleToggleSound}
                className={`inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium rounded-md border transition-all ${
                  isSizzling
                    ? 'border-amber-500 bg-amber-500/10 text-amber-300'
                    : 'border-stone-800 bg-stone-900/60 text-stone-400 hover:text-stone-200 hover:border-stone-700'
                }`}
                title="Activer le son de la plancha"
              >
                {isSizzling ? (
                  <>
                    <Volume2 className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                    <span>Plancha en feu&nbsp;: Son activé 🔊</span>
                  </>
                ) : (
                  <>
                    <VolumeX className="w-3.5 h-3.5" />
                    <span>Ambiance plancha&nbsp;: Écouter le crépitement</span>
                  </>
                )}
              </button>
              <span className="text-xs text-stone-500 hidden sm:inline">
                Testé devant vous au livreur
              </span>
            </div>

          </div>

          {/* Right Column: Hero Visual Anchor with fallback */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none rounded-2xl overflow-hidden border border-stone-800 bg-stone-900 shadow-2xl burger-hero-container group cursor-pointer">
              
              {imageLoaded ? (
                <div className="relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-square overflow-hidden bg-stone-900">
                  <img
                    src={HERO_IMAGE}
                    alt="Smash burger artisanal Boulevard Smash avec double steak croustillant et cheddar fondant"
                    className="w-full h-full object-cover burger-img-zoom"
                    referrerPolicy="no-referrer"
                    onError={() => setImageLoaded(false)}
                  />
                  {/* Contrast scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-stone-950/20" />
                </div>
              ) : (
                <div className="aspect-square bg-gradient-to-br from-amber-950/40 to-stone-900 flex flex-col items-center justify-center p-8 text-center">
                  <Flame className="w-16 h-16 text-amber-500 mb-3" />
                  <span className="font-display font-bold text-xl text-white">Boulevard Smash Cotonou</span>
                  <span className="text-sm text-stone-400 mt-1">Double Smash & Cheddar coulant</span>
                </div>
              )}

              {/* Float note at bottom of photo */}
              <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-xl bg-stone-950/90 backdrop-blur-md border border-stone-800 flex items-center justify-between text-xs">
                <div>
                  <p className="font-semibold text-white">Le Double Classic Smash</p>
                  <p className="text-stone-400">Croûte ultra caramélisée · Pain brioché</p>
                </div>
                <div className="text-right">
                  <span className="text-amber-400 font-bold font-mono text-sm">5&nbsp;500&nbsp;FCFA</span>
                  <span className="block text-[10px] text-stone-400 line-through">6&nbsp;500&nbsp;FCFA</span>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Claim-to-Proof Adjacency Strip directly below hero */}
        <div className="mt-14 pt-8 border-t border-stone-800/80 grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="flex items-start gap-3.5 p-4 rounded-xl bg-stone-900/40 border border-stone-800/60">
            <div className="p-2.5 rounded-lg bg-amber-500/10 text-amber-400 shrink-0">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-white">Croûte caramélisée à 280&nbsp;°C</h2>
              <p className="text-xs text-stone-400 mt-0.5 leading-relaxed">
                Écrasé à froid sur plaque brûlante pour sceller le jus et garantir le croquant absolu.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 p-4 rounded-xl bg-stone-900/40 border border-stone-800/60">
            <div className="p-2.5 rounded-lg bg-amber-500/10 text-amber-400 shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-white">35 minutes chrono</h2>
              <p className="text-xs text-stone-400 mt-0.5 leading-relaxed">
                Boîte perforée anti-condensation&nbsp;: vos frites restent craquantes jusqu’à Fidjrossè ou Akpakpa.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 p-4 rounded-xl bg-stone-900/40 border border-stone-800/60">
            <div className="p-2.5 rounded-lg bg-amber-500/10 text-amber-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-white">Paiement à la réception</h2>
              <p className="text-xs text-stone-400 mt-0.5 leading-relaxed">
                Vérifiez votre commande devant le livreur, puis réglez par MTN MoMo, Moov Money, Wave ou espèces.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
