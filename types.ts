
export interface Product {
  _id: string; // ID gerado pelo MongoDB
  id?: string;  // ID amigável opcional
  name: string;
  category: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  badge?: 'new' | 'sale';
  description: string;
  stock: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export enum CategoryType {
  ALL = 'all',
  NOTEBOOKS = 'notebooks',
  SMARTPHONES = 'smartphones',
  GAMING = 'gaming',
  AUDIO = 'audio',
  TV_MONITORS = 'tv_monitors',
  COMPONENTS = 'components'
}
