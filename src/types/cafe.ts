export type MenuCategory = 
  | 'slow-bar' 
  | 'viennoiserie' 
  | 'brunch' 
  | 'botanicals' 
  | 'whole-bean';

export interface MenuItem {
  id: string;
  name: string;
  category: MenuCategory;
  price: number;
  description: string;
  origin?: string;
  tastingNotes?: string[];
  dietary?: ('vegan' | 'gluten-free' | 'dairy-free' | 'organic')[];
  image?: string;
  customizable?: boolean;
  available: boolean;
  prepTime?: string;
  roastLevel?: 'Light' | 'Light-Medium' | 'Medium' | 'Dark';
  accentKicker?: string;
}

export type MilkOption = 'oat' | 'almond' | 'whole' | 'none';
export type IceOption = 'standard' | 'light-ice' | 'hot';
export type SweetnessOption = 'none' | 'subtle' | 'standard';

export interface CartItemCustomization {
  milk: MilkOption;
  ice: IceOption;
  sweetness: SweetnessOption;
  extraShot: boolean;
  instructions: string;
}

export interface CartItem {
  cartItemId: string;
  menuItem: MenuItem;
  quantity: number;
  customization: CartItemCustomization;
  itemTotal: number;
}

export type SeatingArea = 'window' | 'slow-bar' | 'courtyard' | 'mezzanine';

export interface ReservationData {
  reservationId: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  partySize: number;
  seatingArea: SeatingArea;
  notes?: string;
  createdAt: string;
}
