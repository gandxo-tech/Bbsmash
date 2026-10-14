import React, { useState } from 'react';
import { Sparkles, ArrowRight, RotateCcw, CheckCircle } from 'lucide-react';
import { MenuItem } from '../types';
import { MENU_ITEMS } from '../data/menu';
import { formatFCFA } from '../utils/format';
import { playIngredientSnap } from '../utils/sound';

interface BurgerQuizProps {
  onSelectProduct: (product: MenuItem) => void;
}

interface Question {
  id: string;
  question: string;
  options: {
    label: string;
    subtext: string;
    value: string;
  }[];
}

const QUESTIONS: Question[] = [
  {
    id: 'hunger',
    question: 'Quel est votre niveau de faim ce soir\u00a0?',
    options: [
      { label: 'Faim modérée', subtext: 'Un bon burger réconfortant sans excès', value: 'medium' },
      { label: 'Grosse faim', subtext: 'Double viande croustillante obligatoire', value: 'heavy' },
      { label: 'Faim de fête', subtext: 'La formule totale avec loaded fries et boisson', value: 'max' }
    ]
  },
  {
    id: 'spice',
    question: 'Votre relation avec le piment\u00a0?',
    options: [
      { label: 'Douceur totale', subtext: 'Zéro piquant, juste le goût du cheddar et du bœuf', value: 'mild' },
      { label: 'Légère pointe relevée', subtext: 'Une touche d’épices douces bien dosée', value: 'warm' },
      { label: 'Piment Akpakpa sans compromis', subtext: 'Piment local et sensation intense', value: 'hot' }
    ]
  },
  {
    id: 'craving',
    question: 'Votre priorité absolue dans l’assiette\u00a0?',
    options: [
      { label: 'Le croustillant du bœuf caramélisé', subtext: 'La fameuse croûte smashée à 280\u00a0°C', value: 'crust' },
      { label: 'Le cheddar chaud dégoulinant', subtext: 'De l’onctuosité à chaque bouchée', value: 'cheese' },
      { label: 'Le menu complet tout compris', subtext: 'Frites cheddar fumantes + boisson glacée', value: 'combo' }
    ]
  }
];

export const BurgerQuiz: React.FC<BurgerQuizProps> = ({ onSelectProduct }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [recommendedItem, setRecommendedItem] = useState<MenuItem | null>(null);

  const handleSelectOption = (questionId: string, value: string) => {
    playIngredientSnap();
    const updated = { ...answers, [questionId]: value };
    setAnswers(updated);

    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Calculate best recommendation
      let match = MENU_ITEMS[0]; // Default Classic Smash
      if (updated.spice === 'hot') {
        match = MENU_ITEMS.find((m) => m.id === 'smash-akpakpa-spicy') || MENU_ITEMS[0];
      } else if (updated.hunger === 'max' || updated.craving === 'combo') {
        match = MENU_ITEMS.find((m) => m.id === 'combo-soir-match') || MENU_ITEMS[0];
      } else if (updated.craving === 'cheese') {
        match = MENU_ITEMS.find((m) => m.id === 'smash-truffle-melt') || MENU_ITEMS[0];
      }
      setRecommendedItem(match);
    }
  };

  const handleRestart = () => {
    playIngredientSnap();
    setAnswers({});
    setCurrentStep(0);
    setRecommendedItem(null);
  };

  return (
    <section id="quiz" className="py-16 sm:py-20 border-b border-stone-800 bg-stone-950 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold tracking-wider text-amber-400 uppercase mb-2">
            <span>Guide Personnalisé</span>
            <span aria-hidden="true">·</span>
            <span>30 secondes chrono</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-display">
            Trouvez votre burger idéal
          </h2>
          <p className="text-xs sm:text-sm text-stone-400 mt-2">
            Répondez à 3 questions rapides pour être orienté vers la recette faite pour vous.
          </p>
        </div>

        {/* Quiz Body */}
        {!recommendedItem ? (
          <div className="p-6 sm:p-8 rounded-2xl bg-stone-900/60 border border-stone-800 shadow-xl">
            
            {/* Step progress indicator */}
            <div className="flex items-center justify-between text-xs text-stone-400 mb-6 pb-4 border-b border-stone-800">
              <span className="font-semibold text-amber-400">
                Question {currentStep + 1} sur {QUESTIONS.length}
              </span>
              <span>{Math.round(((currentStep + 1) / QUESTIONS.length) * 100)}&nbsp;% complété</span>
            </div>

            <h3 className="text-lg sm:text-xl font-bold text-white mb-6">
              {QUESTIONS[currentStep].question}
            </h3>

            <div className="grid grid-cols-1 gap-3.5">
              {QUESTIONS[currentStep].options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleSelectOption(QUESTIONS[currentStep].id, option.value)}
                  className="w-full p-4 rounded-xl border border-stone-800 bg-stone-950 hover:border-amber-500/80 hover:bg-stone-900 text-left transition-all group flex items-center justify-between"
                >
                  <div>
                    <span className="font-semibold text-sm sm:text-base text-stone-200 group-hover:text-amber-400 transition-colors">
                      {option.label}
                    </span>
                    <p className="text-xs text-stone-400 mt-0.5">{option.subtext}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-stone-600 group-hover:text-amber-400 group-hover:translate-x-1 transition-all shrink-0 ml-3" />
                </button>
              ))}
            </div>

          </div>
        ) : (
          /* Recommended Result Card */
          <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-stone-900 to-stone-950 border border-amber-500/50 shadow-2xl animate-fadeIn">
            
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
                <CheckCircle className="w-4 h-4" />
                <span>Votre recommandation sur-mesure</span>
              </div>
              <button
                onClick={handleRestart}
                className="flex items-center gap-1.5 text-xs text-stone-400 hover:text-white transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Recommencer</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-5 rounded-xl overflow-hidden border border-stone-800 aspect-[4/3] bg-stone-900 group cursor-pointer">
                <img
                  src={recommendedItem.image}
                  alt={recommendedItem.name}
                  className="w-full h-full object-cover burger-img-zoom"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="md:col-span-7 space-y-3">
                <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
                  {recommendedItem.name}
                </h3>
                <p className="text-xs sm:text-sm text-amber-300 font-medium">
                  {recommendedItem.shortBenefit}
                </p>
                <p className="text-xs text-stone-300 leading-relaxed">
                  {recommendedItem.description}
                </p>

                <div className="pt-2 flex items-center justify-between">
                  <span className="text-xl font-extrabold text-amber-400 font-mono tabular-nums">
                    {formatFCFA(recommendedItem.price)}
                  </span>
                  <button
                    onClick={() => onSelectProduct(recommendedItem)}
                    className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs sm:text-sm rounded-lg transition-all shadow-md active:scale-95 flex items-center gap-2"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Commander ce burger recommandé</span>
                  </button>
                </div>
              </div>
            </div>

          </div>
        )}

      </div>
    </section>
  );
};
