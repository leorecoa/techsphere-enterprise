
import { Product, CategoryType } from './types';

export const MOCK_PRODUCTS: Product[] = [
  {
    // Added _id to match Product interface requirements
    _id: '1',
    id: '1',
    name: 'Notebook Gamer Predator RTX 4080',
    category: CategoryType.NOTEBOOKS,
    price: 12499,
    oldPrice: 14999,
    rating: 4.5,
    reviews: 24,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1171&q=80',
    badge: 'new',
    description: 'Alta performance com RTX 4080 e tela de 165Hz.',
    stock: 5
  },
  {
    // Added _id to match Product interface requirements
    _id: '2',
    id: '2',
    name: 'iPhone 15 Pro Max 1TB Titanium',
    category: CategoryType.SMARTPHONES,
    price: 9999,
    oldPrice: 11499,
    rating: 4.0,
    reviews: 42,
    image: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=1128&q=80',
    badge: 'sale',
    description: 'O mais poderoso iPhone com acabamento em titânio aeroespacial.',
    stock: 10
  },
  {
    // Added _id to match Product interface requirements
    _id: '3',
    id: '3',
    name: 'PlayStation 5 Edition + 2 Controles',
    category: CategoryType.GAMING,
    price: 4299,
    rating: 5.0,
    reviews: 67,
    image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?auto=format&fit=crop&w=1170&q=80',
    badge: 'new',
    description: 'Jogue os maiores sucessos com gráficos incríveis e carregamento ultra-rápido.',
    stock: 0 // Out of stock example
  },
  {
    // Added _id to match Product interface requirements
    _id: '4',
    id: '4',
    name: 'Fone Sony WH-1000XM5 Noise Cancelling',
    category: CategoryType.AUDIO,
    price: 2199,
    oldPrice: 2749,
    rating: 4.8,
    reviews: 38,
    image: 'https://images.unsplash.com/photo-1585298728729-e9f3c85e86b3?auto=format&fit=crop&w=1074&q=80',
    badge: 'sale',
    description: 'Cancelamento de ruído líder da indústria e qualidade de áudio excepcional.',
    stock: 15
  },
  {
    // Added _id to match Product interface requirements
    _id: '5',
    id: '5',
    name: 'MacBook Pro M3 Max 14"',
    category: CategoryType.NOTEBOOKS,
    price: 22999,
    rating: 4.9,
    reviews: 15,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1026&q=80',
    description: 'Desempenho monstruoso para profissionais criativos.',
    stock: 3
  },
  {
    // Added _id to match Product interface requirements
    _id: '6',
    id: '6',
    name: 'Monitor Alienware 34" Curvo QD-OLED',
    category: CategoryType.TV_MONITORS,
    price: 7499,
    oldPrice: 8999,
    rating: 4.7,
    reviews: 12,
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=1170&q=80',
    badge: 'sale',
    description: 'Imersão absoluta com cores infinitas e tempo de resposta zero.',
    stock: 8
  }
];

export const CATEGORIES_LIST = [
  { id: CategoryType.NOTEBOOKS, name: 'Notebooks', icon: 'fa-laptop' },
  { id: CategoryType.SMARTPHONES, name: 'Smartphones', icon: 'fa-mobile-alt' },
  { id: CategoryType.GAMING, name: 'Gaming', icon: 'fa-gamepad' },
  { id: CategoryType.AUDIO, name: 'Áudio', icon: 'fa-headphones' },
  { id: CategoryType.TV_MONITORS, name: 'TVs & Monitores', icon: 'fa-tv' },
  { id: CategoryType.COMPONENTS, name: 'Componentes', icon: 'fa-microchip' },
];
