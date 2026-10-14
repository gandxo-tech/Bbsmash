import React from 'react';
import { MessageSquare, Phone, MapPin, Clock } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-stone-950 border-t border-stone-800 text-stone-400 text-xs py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-stone-800/80">
          
          {/* Col 1: Brand & Promise */}
          <div className="space-y-3">
            <span className="text-xl font-black text-white tracking-tight font-display">
              BOULEVARD<span className="text-amber-500">.</span>SMASH
            </span>
            <p className="text-stone-400 text-xs leading-relaxed">
              Le véritable smash burger de Cotonou. Viande fraîche écrasée minute sur plancha brûlante, pain brioché doré et frites livrées croustillantes.
            </p>
          </div>

          {/* Col 2: Horaires de la Plancha */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Horaires de service
            </h4>
            <div className="flex items-start gap-2 text-stone-300">
              <Clock className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <p>Mardi au Dimanche</p>
                <p className="text-stone-400 font-mono text-[11px]">11&nbsp;h&nbsp;30 – 14&nbsp;h&nbsp;30 · 18&nbsp;h&nbsp;30 – 23&nbsp;h&nbsp;00</p>
                <p className="text-stone-500 text-[11px] mt-1">Fermé le lundi pour repos de l’équipe</p>
              </div>
            </div>
          </div>

          {/* Col 3: Kitchen & Delivery Address */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Cuisine & Retrait
            </h4>
            <div className="flex items-start gap-2 text-stone-300">
              <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <p>Avenue Jean-Paul II, Cotonou</p>
                <p className="text-stone-400 text-[11px]">Zone Cadjehoun / Haie Vive</p>
                <p className="text-stone-500 text-[11px]">Livraison dans tout Cotonou & Calavi</p>
              </div>
            </div>
          </div>

          {/* Col 4: Contact & WhatsApp */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Contact & WhatsApp
            </h4>
            <div className="space-y-2">
              <a
                href="https://wa.me/22997000000"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-600/20 text-emerald-400 border border-emerald-600/30 hover:bg-emerald-600/30 transition-colors text-xs font-medium"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Commander par WhatsApp</span>
              </a>
              <div className="flex items-center gap-2 text-stone-400 text-xs">
                <Phone className="w-3.5 h-3.5 text-amber-500" />
                <span className="font-mono">+229 97 00 00 00</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-[11px] text-stone-400">
          <p>© {new Date().getFullYear()} Boulevard Smash Cotonou. Tous droits réservés.</p>
          <p className="text-amber-400/90 font-medium">
            Marque fictive – site de démonstration e-commerce street food Afrique de l’Ouest.
          </p>
        </div>

      </div>
    </footer>
  );
};
