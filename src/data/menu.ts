import { MenuItem, DeliveryZoneInfo } from '../types';

export const HERO_IMAGE = '/src/assets/images/hero_smash_burger_1791997100752.jpg';
export const CLASSIC_IMAGE = '/src/assets/images/product_classic_smash_1791997101251.jpg';
export const SPICY_IMAGE = '/src/assets/images/product_spicy_akpakpa_1791997102559.jpg';
export const FRIES_IMAGE = '/src/assets/images/product_loaded_fries_1791997102572.jpg';

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'smash-classic-double',
    name: 'Le Double Classic Smash',
    category: 'smash',
    price: 5500,
    originalPrice: 6500,
    discountNote: 'Prix barré = notre tarif unitaire habituel hors offre de rentrée',
    shortBenefit: 'Croûte caramélisée à 280\u00a0°C\u00a0: le croustillant absolu dès votre première bouchée.',
    description: 'Deux steaks de bœuf frais smashés ultra-fins à feu vif, double cheddar coulant, oignons caramélisés et notre sauce secrète sur pain brioché artisanal.',
    bulletPoints: [
      '180\u00a0g de bœuf sélectionné, haché le matin même',
      'Pain brioché artisanal doré au beurre',
      'Double tranche de vrai cheddar affiné 6 mois',
      'Sauce signature aux épices douces'
    ],
    image: CLASSIC_IMAGE,
    isPopular: true,
    isPromo: true
  },
  {
    id: 'smash-akpakpa-spicy',
    name: "L'Explosif Akpakpa Spicy",
    category: 'smash',
    price: 6200,
    shortBenefit: 'Piment local confit et pepper jack coulant\u00a0: du caractère sans brûler le palais.',
    description: 'Pour les amateurs de sensations authentiques. Deux smashs croustillants relevés de piments doux marinés, bacon croustillant et sauce pimentée maison.',
    bulletPoints: [
      'Piment oiseau adouci au miel et vinaigre de canne',
      'Double smash de bœuf croustillant sur les bords',
      'Pepper Jack fondant & tranches de bacon grillé',
      'Livré avec une lingette rafraîchissante'
    ],
    image: SPICY_IMAGE,
    spicyLevel: 2,
    isPopular: true
  },
  {
    id: 'smash-truffle-melt',
    name: 'Le Gouda & Oignons Fondus',
    category: 'smash',
    price: 6800,
    shortBenefit: 'Oignons fondus 2 heures au beurre\u00a0: une douceur irrésistible en bouche.',
    description: 'Deux smash patties dorés, compotée d’oignons maison, fromage gouda crémeux et une touche d’ail noir fermenté sur pain moelleux.',
    bulletPoints: [
      'Compotée d’oignons jaunes mijotés doucement',
      'Fromage gouda affiné ultra-filant',
      'Deux steaks smashés juteux au centre',
      'Fini sans mayonnaise industrielle'
    ],
    image: HERO_IMAGE,
    isPopular: false
  },
  {
    id: 'combo-soir-match',
    name: 'Le Menu Soir de Fête',
    category: 'combos',
    price: 8900,
    originalPrice: 10500,
    discountNote: 'Prix barré = total des éléments commandés séparément',
    shortBenefit: 'Le festin complet en un clic\u00a0: burger signature, loaded fries et boisson fraîche.',
    description: 'Ne choisissez plus entre burger et gourmandise. Comprend 1 Double Classic Smash, 1 portion de Loaded Fries au cheddar chaud et 1 boisson artisanale au choix.',
    bulletPoints: [
      '1 Burger Double Smash au choix',
      '1 Grande barquette de Loaded Fries au cheddar',
      '1 Jus de Bissap vanille ou Citronnade gingembre (33 cl)',
      'Économisez 1\u00a0600\u00a0FCFA par rapport à l’achat individuel'
    ],
    image: CLASSIC_IMAGE,
    isPopular: true,
    isPromo: true
  },
  {
    id: 'side-loaded-cheddar',
    name: 'Loaded Cheddar & Bacon Fries',
    category: 'sides',
    price: 3200,
    shortBenefit: 'Sauce cheddar maison tiède et bacon croustillant\u00a0: zéro frite triste dans l’assiette.',
    description: 'Frites ondulées croustillantes enrobées de vraie sauce cheddar fondu, dés de bacon fumé grillé et ciboulette fraîche.',
    bulletPoints: [
      'Frites double cuisson pour une tenue parfaite en livraison',
      'Sauce cheddar préparée chaque midi',
      'Bacon grillé croustillant taillé minute',
      'Boîte ventilée pour éviter toute humidité'
    ],
    image: FRIES_IMAGE,
    isPopular: true
  },
  {
    id: 'side-frites-artisanales',
    name: 'Frites Maison Croustillantes',
    category: 'sides',
    price: 1800,
    shortBenefit: 'Croustillantes à l’extérieur, fondantes au cœur\u00a0: même après 30 minutes de trajet.',
    description: 'Pommes de terre sélectionnées coupées sur place, frites en deux bains dans une huile propre. Assaisonnées à notre sel aux herbes.',
    bulletPoints: [
      'Double friture traditionnelle',
      'Sel de Ouidah parfumé au romarin',
      '1 sauce artisanale au choix incluse'
    ],
    image: FRIES_IMAGE
  },
  {
    id: 'drink-bissap-vanille',
    name: 'Bissap Infusé Vanille & Menthe',
    category: 'drinks',
    price: 1200,
    shortBenefit: 'Fleurs d’hibiscus du pays et gousse de vanille\u00a0: désaltère instantanément sans excès de sucre.',
    description: 'Infusion fraîche de fleurs d’hibiscus rouge, feuille de menthe fraîche et touche subtile de vanille Bourbon. Bouteille en verre consignée 33 cl.',
    bulletPoints: [
      '100\u00a0% naturel, sans colorant ni arôme de synthèse',
      'Faible teneur en sucre de canne brut',
      'Servi glacé dans un sac isotherme'
    ],
    image: CLASSIC_IMAGE
  },
  {
    id: 'drink-citronnade-gingembre',
    name: 'Citronnade Fraîche & Gingembre',
    category: 'drinks',
    price: 1200,
    shortBenefit: 'Citron vert pressé et pointe de gingembre piquant\u00a0: le coup de fouet après une chaude journée.',
    description: 'Jus de citrons verts de Calavi pressés le jour même, gingembre doux râpé et eau de source filtrée.',
    bulletPoints: [
      'Citrons pressés à froid le matin',
      'Gingembre frais pour réveiller le palais',
      'Bouteille 33 cl bien fraîche'
    ],
    image: SPICY_IMAGE
  }
];

export const DELIVERY_ZONES: DeliveryZoneInfo[] = [
  { name: 'Cadjehoun', eta: '25 - 30 min', deliveryFee: 1000 },
  { name: 'Haie Vive', eta: '25 - 30 min', deliveryFee: 1000 },
  { name: 'Fidjrossè', eta: '30 - 35 min', deliveryFee: 1200 },
  { name: 'Akpakpa', eta: '30 - 38 min', deliveryFee: 1500 },
  { name: 'Saint-Michel', eta: '25 - 30 min', deliveryFee: 1000 },
  { name: 'Cococodji / Godomey', eta: '35 - 45 min', deliveryFee: 1500 },
  { name: 'Abomey-Calavi', eta: '40 - 50 min', deliveryFee: 2000 }
];

export const FREE_DELIVERY_THRESHOLD = 10000;
