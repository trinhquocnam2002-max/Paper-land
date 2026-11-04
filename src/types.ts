export type ProductCategory = 'all' | 'notebooks' | 'pens' | 'desk' | 'accessories';

export type PaperRuling = 'Dot Grid' | 'French Ruled' | 'Architect Grid' | 'Plain Blank';
export type PaperWeight = '80 gsm' | '100 gsm' | '120 gsm';
export type NibSize = 'Fine (0.38mm)' | 'Medium (0.5mm)' | 'Broad (0.7mm)';

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  category: 'notebooks' | 'pens' | 'desk' | 'accessories';
  price: number;
  material: string;
  origin: string;
  dimensions: string;
  description: string;
  story: string;
  features: string[];
  images: string[];
  inStock: boolean;
  stockCount: number;
  badge?: string;
  rulingOptions?: PaperRuling[];
  weightOptions?: PaperWeight[];
  nibOptions?: NibSize[];
}

export interface CartItem {
  cartItemId: string;
  product: Product;
  ruling?: PaperRuling;
  weight?: PaperWeight;
  nib?: NibSize;
  quantity: number;
  unitPrice: number;
}

export interface OrderDetails {
  orderId: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  shippingMethod: 'standard' | 'express';
  customer: {
    fullName: string;
    email: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
    orderNotes?: string;
  };
}
