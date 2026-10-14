export interface MenuItem {
  id: string;
  name: string;
  category: 'smash' | 'combos' | 'sides' | 'drinks';
  price: number;
  originalPrice?: number;
  discountNote?: string;
  shortBenefit: string;
  description: string;
  bulletPoints: string[];
  image: string;
  spicyLevel?: number; // 0 to 3
  isPopular?: boolean;
  isPromo?: boolean;
}

export interface CartItem {
  id: string;
  itemId: string;
  name: string;
  price: number;
  quantity: number;
  customDetails?: string;
  image?: string;
}

export interface BurgerCustomization {
  bun: string;
  bunPrice: number;
  pattyCount: number; // 1, 2, 3
  pattyPrice: number;
  cheese: string;
  cheesePrice: number;
  toppings: string[];
  toppingsPrice: number;
  sauce: string;
  saucePrice: number;
}

export type Neighborhood = 
  | 'Akpakpa'
  | 'Fidjrossè'
  | 'Cadjehoun'
  | 'Haie Vive'
  | 'Saint-Michel'
  | 'Cococodji / Godomey'
  | 'Abomey-Calavi';

export interface DeliveryZoneInfo {
  name: Neighborhood;
  eta: string;
  deliveryFee: number;
}
