import React, { useState } from 'react';
import { Sparkles, Plus, Check, RefreshCw } from 'lucide-react';
import { formatFCFA } from '../utils/format';
import { playIngredientSnap } from '../utils/sound';

interface BurgerBuilderProps {
  onAddCustomBurger: (burgerName: string, price: number, details: string) => void;
}

interface BunOption {
  id: string;
  name: string;
  price: number;
  desc: string;
}

interface MeatOption {
  count: number;
  label: string;
  priceDelta: number;
  desc: string;
}

interface CheeseOption {
  id: string;
  name: string;
  price: number;
  color: string;
}

interface SauceOption {
  id: string;
  name: string;
  color: string;
  spiceNote: string;
}

const BUN_OPTIONS: BunOption[] = [
  { id: 'brioche-gold', name: 'Brioché Doré au Beurre', price: 0, desc: 'Ultra moelleux, toasté sur plancha' },
  { id: 'sesame-noir', name: 'Brioché Sésame & Pavot', price: 300, desc: 'Léger croquant grillé sous la dent' },
  { id: 'sans-gluten', name: 'Bun Maïs & Avoine', price: 600, desc: 'Sans gluten, texture aérée' }
];

const MEAT_OPTIONS: MeatOption[] = [
  { count: 1, label: 'Simple Smash (100\u00a0g)', priceDelta: -1000, desc: 'Léger et rapide' },
  { count: 2, label: 'Double Smash (180\u00a0g)', priceDelta: 0, desc: 'L’équilibre parfait bœuf/fromage' },
  { count: 3, label: 'Triple Smash (270\u00a0g)', priceDelta: 1600, desc: 'Pour les faims de carnivore' }
];

const CHEESE_OPTIONS: CheeseOption[] = [
  { id: 'cheddar', name: 'Double Cheddar Rouge', price: 0, color: 'bg-amber-400' },
  { id: 'pepperjack', name: 'Pepper Jack Pimenté', price: 400, color: 'bg-amber-200' },
  { id: 'gouda', name: 'Gouda Affiné Fondu', price: 400, color: 'bg-yellow-300' }
];

const TOPPING_OPTIONS = [
  { id: 'bacon', name: 'Bacon fumé grillé croustillant', price: 600 },
  { id: 'onions', name: 'Oignons fondus à la plancha', price: 300 },
  { id: 'pickles', name: 'Pickles de concombre maison', price: 0 },
  { id: 'piments', name: 'Piments doux sautés Akpakpa', price: 300 },
  { id: 'salade', name: 'Feuille de batavia craquante', price: 0 }
];

const SAUCE_OPTIONS: SauceOption[] = [
  { id: 'secret', name: 'Sauce Secrète Smash', color: '#f59e0b', spiceNote: 'Douce & umami' },
  { id: 'spicy', name: 'Mayo Pimentée Akpakpa', color: '#ef4444', spiceNote: 'Piquant franc' },
  { id: 'bbq', name: 'BBQ Fumé Artisanal', color: '#92400e', spiceNote: 'Boisé & caramélisé' }
];

export const BurgerBuilder: React.FC<BurgerBuilderProps> = ({ onAddCustomBurger }) => {
  const [selectedBun, setSelectedBun] = useState<BunOption>(BUN_OPTIONS[0]);
  const [selectedMeat, setSelectedMeat] = useState<MeatOption>(MEAT_OPTIONS[1]);
  const [selectedCheese, setSelectedCheese] = useState<CheeseOption>(CHEESE_OPTIONS[0]);
  const [selectedToppings, setSelectedToppings] = useState<string[]>(['onions', 'pickles']);
  const [selectedSauce, setSelectedSauce] = useState<SauceOption>(SAUCE_OPTIONS[0]);

  // Base price for a tailored double smash is 5 500 FCFA
  const basePrice = 5500;
  const toppingsPrice = selectedToppings.reduce((acc, topId) => {
    const item = TOPPING_OPTIONS.find((t) => t.id === topId);
    return acc + (item ? item.price : 0);
  }, 0);

  const totalPrice = basePrice + selectedBun.price + selectedMeat.priceDelta + selectedCheese.price + toppingsPrice;

  const toggleTopping = (toppingId: string) => {
    playIngredientSnap();
    setSelectedToppings((prev) =>
      prev.includes(toppingId) ? prev.filter((id) => id !== toppingId) : [...prev, toppingId]
    );
  };

  const handleBunChange = (bun: BunOption) => {
    playIngredientSnap();
    setSelectedBun(bun);
  };

  const handleMeatChange = (meat: MeatOption) => {
    playIngredientSnap();
    setSelectedMeat(meat);
  };

  const handleCheeseChange = (cheese: CheeseOption) => {
    playIngredientSnap();
    setSelectedCheese(cheese);
  };

  const handleSauceChange = (sauce: SauceOption) => {
    playIngredientSnap();
    setSelectedSauce(sauce);
  };

  const handleReset = () => {
    playIngredientSnap();
    setSelectedBun(BUN_OPTIONS[0]);
    setSelectedMeat(MEAT_OPTIONS[1]);
    setSelectedCheese(CHEESE_OPTIONS[0]);
    setSelectedToppings(['onions', 'pickles']);
    setSelectedSauce(SAUCE_OPTIONS[0]);
  };

  const handleAddToCart = () => {
    const toppingNames = selectedToppings
      .map((t) => TOPPING_OPTIONS.find((opt) => opt.id === t)?.name)
      .filter(Boolean)
      .join(', ');

    const details = `${selectedBun.name} · ${selectedMeat.label} · ${selectedCheese.name} · Sauce ${selectedSauce.name}${toppingNames ? ` · Extras: ${toppingNames}` : ''}`;
    
    onAddCustomBurger(
      `Smash Custom (${selectedMeat.count}x)`,
      totalPrice,
      details
    );
  };

  return (
    <section id="builder" className="py-16 sm:py-24 border-b border-stone-800 bg-stone-900/30 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold tracking-wider text-amber-400 uppercase mb-2">
            <span>Atelier Plancha</span>
            <span aria-hidden="true">·</span>
            <span>Composition Instantanée</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
            Composez votre Smash sur-mesure
          </h2>
          <p className="text-sm sm:text-base text-stone-400 mt-3 leading-relaxed">
            Chaque ingrédient s’assemble sous vos yeux. Ajustez le bœuf, la force du fromage et vos suppléments sans surprise sur le prix final.
          </p>
        </div>

        {/* Builder Studio: 2 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Visual Layered Burger Stack Canvas */}
          <div className="lg:col-span-5 sticky top-24">
            <div className="p-6 sm:p-8 rounded-2xl bg-stone-950 border border-stone-800 shadow-xl flex flex-col items-center justify-center min-h-[460px] text-center relative overflow-hidden burger-card-hover group">
              
              {/* Background circular halo */}
              <div className="absolute w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

              {/* Reset button */}
              <button
                onClick={handleReset}
                className="absolute top-4 right-4 flex items-center gap-1.5 text-xs text-stone-400 hover:text-amber-400 transition-colors p-1.5 rounded-lg border border-stone-800 hover:border-stone-700 bg-stone-900/80"
                title="Réinitialiser la recette"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Réinitialiser</span>
              </button>

              {/* Live Visual Layer Stack */}
              <div className="w-full max-w-[300px] flex flex-col items-center gap-1.5 py-4 transition-transform duration-300 group-hover:scale-[1.03]">
                
                {/* 1. Top Bun */}
                <div className="w-56 h-16 rounded-t-[50px] bg-gradient-to-b from-amber-600 to-amber-700 shadow-lg relative flex items-center justify-center border-b-2 border-amber-800/60 transform transition-all hover:scale-105">
                  <div className="absolute top-2 w-full flex justify-around px-6 opacity-80">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-200/90" />
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-200/90" />
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-200/90" />
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-200/90" />
                  </div>
                  <span className="text-[11px] font-semibold text-amber-100 tracking-wide">
                    {selectedBun.name}
                  </span>
                </div>

                {/* 2. Sauce Layer */}
                <div
                  className="w-48 h-3 rounded-full shadow-inner transition-colors duration-300 flex items-center justify-center"
                  style={{ backgroundColor: selectedSauce.color }}
                >
                  <span className="text-[9px] font-bold text-stone-950 uppercase tracking-wider">
                    {selectedSauce.name}
                  </span>
                </div>

                {/* 3. Pickles / Salad Toppings */}
                {selectedToppings.includes('salade') && (
                  <div className="w-52 h-4 rounded-full bg-emerald-600/90 border-t border-emerald-400/50 flex items-center justify-center shadow-sm animate-fadeIn">
                    <span className="text-[9px] font-medium text-emerald-100">Batavia Craquante</span>
                  </div>
                )}

                {selectedToppings.includes('pickles') && (
                  <div className="w-44 h-3.5 rounded-full bg-lime-700 border border-lime-500/40 flex items-center justify-center gap-2">
                    <span className="text-[9px] text-lime-100 font-semibold">Pickles Maison</span>
                  </div>
                )}

                {/* 4. Bacon layer if active */}
                {selectedToppings.includes('bacon') && (
                  <div className="w-50 h-3.5 rounded-sm bg-gradient-to-r from-red-900 via-amber-900 to-red-950 border border-amber-700/60 flex items-center justify-center shadow-md">
                    <span className="text-[9px] font-bold text-amber-200 tracking-wider">
                      🥓 Bacon Croustillant Grillé
                    </span>
                  </div>
                )}

                {/* 5. Melted Cheese 1 */}
                <div
                  className={`w-52 h-4 rounded-md shadow-md border-t border-white/20 flex items-center justify-center transition-all ${
                    selectedCheese.id === 'pepperjack'
                      ? 'bg-amber-200 text-stone-900'
                      : 'bg-amber-400 text-stone-950'
                  }`}
                >
                  <span className="text-[10px] font-bold">
                    {selectedCheese.name} (Fondu)
                  </span>
                </div>

                {/* 6. Smash Beef Patty 1 */}
                <div className="w-56 h-7 rounded-lg bg-gradient-to-r from-stone-900 via-amber-950 to-stone-900 border-x-4 border-amber-900 shadow-md flex items-center justify-between px-3">
                  <span className="text-[9px] text-amber-400 font-mono">280°C</span>
                  <span className="text-[10px] font-bold text-amber-100">
                    Smash Beef #1 (Croûte caramélisée)
                  </span>
                  <span className="text-[9px] text-amber-400 font-mono">Juteux</span>
                </div>

                {/* Patty 2 if double or triple */}
                {selectedMeat.count >= 2 && (
                  <>
                    <div className="w-50 h-2.5 rounded-sm bg-amber-400/90 shadow-sm" />
                    <div className="w-56 h-7 rounded-lg bg-gradient-to-r from-stone-900 via-amber-950 to-stone-900 border-x-4 border-amber-900 shadow-md flex items-center justify-center">
                      <span className="text-[10px] font-bold text-amber-100">
                        Smash Beef #2 (Croûte croustillante)
                      </span>
                    </div>
                  </>
                )}

                {/* Patty 3 if triple */}
                {selectedMeat.count >= 3 && (
                  <>
                    <div className="w-50 h-2 rounded-sm bg-amber-400/90 shadow-sm" />
                    <div className="w-56 h-7 rounded-lg bg-gradient-to-r from-stone-900 via-amber-950 to-stone-900 border-x-4 border-amber-900 shadow-md flex items-center justify-center">
                      <span className="text-[10px] font-bold text-amber-100">
                        Smash Beef #3 (Maxi Gourmand)
                      </span>
                    </div>
                  </>
                )}

                {/* Onions & Piments */}
                {selectedToppings.includes('onions') && (
                  <div className="w-48 h-3 rounded-md bg-amber-800/80 flex items-center justify-center">
                    <span className="text-[9px] text-amber-200">Oignons Fondus</span>
                  </div>
                )}
                {selectedToppings.includes('piments') && (
                  <div className="w-44 h-3 rounded-md bg-red-700/80 flex items-center justify-center">
                    <span className="text-[9px] text-red-100 font-semibold">Piments Sautés Akpakpa</span>
                  </div>
                )}

                {/* 7. Bottom Bun */}
                <div className="w-52 h-9 rounded-b-[30px] bg-gradient-to-t from-amber-700 to-amber-600 border-t-2 border-amber-800 shadow-md flex items-center justify-center">
                  <span className="text-[10px] font-medium text-amber-100">
                    Base Briochée Toastée
                  </span>
                </div>

              </div>

              {/* Bottom live recipe ticker */}
              <div className="w-full mt-6 pt-4 border-t border-stone-800/80 flex items-center justify-between text-left">
                <div>
                  <span className="text-xs text-stone-400 block">Total estimé</span>
                  <span className="text-xl font-extrabold text-amber-400 font-mono tabular-nums">
                    {formatFCFA(totalPrice)}
                  </span>
                </div>
                <button
                  onClick={handleAddToCart}
                  className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs rounded-lg transition-all shadow-md active:scale-95 flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Ajouter au panier</span>
                </button>
              </div>

            </div>
          </div>

          {/* Configuration Controls (Accordion/Tabs) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* 1. Viande & Steaks */}
            <div className="p-5 rounded-xl bg-stone-900/60 border border-stone-800">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-3 flex items-center justify-between">
                <span>1. Bœuf Pur Frais du Jour</span>
                <span className="text-xs text-amber-400 font-normal lowercase">Sélectionnez l'épaisseur</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {MEAT_OPTIONS.map((meat) => {
                  const isSelected = selectedMeat.count === meat.count;
                  return (
                    <button
                      key={meat.count}
                      onClick={() => handleMeatChange(meat)}
                      className={`p-3.5 rounded-lg border text-left transition-all relative ${
                        isSelected
                          ? 'border-amber-500 bg-amber-500/10 text-white ring-1 ring-amber-500/50'
                          : 'border-stone-800 bg-stone-950/60 text-stone-300 hover:border-stone-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-sm">{meat.label}</span>
                        {isSelected && <Check className="w-4 h-4 text-amber-400 shrink-0" />}
                      </div>
                      <p className="text-xs text-stone-400 mt-1">{meat.desc}</p>
                      <span className="inline-block mt-2 font-mono text-xs text-amber-400">
                        {meat.priceDelta === 0 ? 'Inclus' : meat.priceDelta > 0 ? `+${formatFCFA(meat.priceDelta)}` : formatFCFA(meat.priceDelta)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Pain Artisanal */}
            <div className="p-5 rounded-xl bg-stone-900/60 border border-stone-800">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-3 flex items-center justify-between">
                <span>2. Choix du Pain</span>
                <span className="text-xs text-amber-400 font-normal lowercase">Cuit chaque matin</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {BUN_OPTIONS.map((bun) => {
                  const isSelected = selectedBun.id === bun.id;
                  return (
                    <button
                      key={bun.id}
                      onClick={() => handleBunChange(bun)}
                      className={`p-3.5 rounded-lg border text-left transition-all ${
                        isSelected
                          ? 'border-amber-500 bg-amber-500/10 text-white ring-1 ring-amber-500/50'
                          : 'border-stone-800 bg-stone-950/60 text-stone-300 hover:border-stone-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-sm">{bun.name}</span>
                        {isSelected && <Check className="w-4 h-4 text-amber-400 shrink-0" />}
                      </div>
                      <p className="text-xs text-stone-400 mt-1">{bun.desc}</p>
                      <span className="inline-block mt-2 font-mono text-xs text-amber-400">
                        {bun.price === 0 ? 'Inclus' : `+${formatFCFA(bun.price)}`}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Fromage Fondu */}
            <div className="p-5 rounded-xl bg-stone-900/60 border border-stone-800">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-3 flex items-center justify-between">
                <span>3. Fromage Affiné</span>
                <span className="text-xs text-amber-400 font-normal lowercase">Fondu sous cloche</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {CHEESE_OPTIONS.map((cheese) => {
                  const isSelected = selectedCheese.id === cheese.id;
                  return (
                    <button
                      key={cheese.id}
                      onClick={() => handleCheeseChange(cheese)}
                      className={`p-3.5 rounded-lg border text-left transition-all ${
                        isSelected
                          ? 'border-amber-500 bg-amber-500/10 text-white ring-1 ring-amber-500/50'
                          : 'border-stone-800 bg-stone-950/60 text-stone-300 hover:border-stone-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-sm">{cheese.name}</span>
                        {isSelected && <Check className="w-4 h-4 text-amber-400 shrink-0" />}
                      </div>
                      <span className="inline-block mt-2 font-mono text-xs text-amber-400">
                        {cheese.price === 0 ? 'Inclus' : `+${formatFCFA(cheese.price)}`}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 4. Sauce Maison */}
            <div className="p-5 rounded-xl bg-stone-900/60 border border-stone-800">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-3 flex items-center justify-between">
                <span>4. Sauce Signature</span>
                <span className="text-xs text-amber-400 font-normal lowercase">Recette secrète maison</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {SAUCE_OPTIONS.map((sauce) => {
                  const isSelected = selectedSauce.id === sauce.id;
                  return (
                    <button
                      key={sauce.id}
                      onClick={() => handleSauceChange(sauce)}
                      className={`p-3.5 rounded-lg border text-left transition-all ${
                        isSelected
                          ? 'border-amber-500 bg-amber-500/10 text-white ring-1 ring-amber-500/50'
                          : 'border-stone-800 bg-stone-950/60 text-stone-300 hover:border-stone-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-sm">{sauce.name}</span>
                        {isSelected && <Check className="w-4 h-4 text-amber-400 shrink-0" />}
                      </div>
                      <p className="text-xs text-stone-400 mt-1">{sauce.spiceNote}</p>
                      <span className="inline-block mt-1 text-[11px] text-stone-400">Inclus</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 5. Toppings & Extras */}
            <div className="p-5 rounded-xl bg-stone-900/60 border border-stone-800">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-3 flex items-center justify-between">
                <span>5. Suppléments & Croquant</span>
                <span className="text-xs text-amber-400 font-normal lowercase">Multiples choix possibles</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {TOPPING_OPTIONS.map((top) => {
                  const isChecked = selectedToppings.includes(top.id);
                  return (
                    <button
                      key={top.id}
                      type="button"
                      onClick={() => toggleTopping(top.id)}
                      className={`p-3 rounded-lg border text-left flex items-center justify-between transition-all ${
                        isChecked
                          ? 'border-amber-500/80 bg-amber-500/10 text-white'
                          : 'border-stone-800 bg-stone-950/60 text-stone-300 hover:border-stone-700'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-4 h-4 rounded flex items-center justify-center border text-[10px] ${
                            isChecked
                              ? 'bg-amber-500 border-amber-500 text-stone-950 font-bold'
                              : 'border-stone-700 bg-stone-900 text-transparent'
                          }`}
                        >
                          ✓
                        </div>
                        <span className="text-xs sm:text-sm font-medium">{top.name}</span>
                      </div>
                      <span className="font-mono text-xs text-amber-400 shrink-0 ml-2">
                        {top.price === 0 ? 'Gratuit' : `+${formatFCFA(top.price)}`}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Sticky Action CTA */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-stone-900 to-stone-950 border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <p className="text-xs text-stone-400">Total de votre création</p>
                <p className="text-2xl font-black text-amber-400 font-mono tabular-nums">
                  {formatFCFA(totalPrice)}
                </p>
              </div>
              <button
                onClick={handleAddToCart}
                className="w-full sm:w-auto px-6 py-3.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-sm rounded-lg transition-all shadow-lg shadow-amber-500/20 active:scale-[0.98] flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Ajouter ce smash sur-mesure au panier</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
