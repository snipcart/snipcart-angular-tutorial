import { Product } from './core/product';
import { Size } from './core/size';

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Ice Cream',
    imageUrls: ['../assets/ice-cream-prune.svg', '../assets/ice-cream-cherry.svg', '../assets/ice-cream-squash.svg'],
    price: 10,
    flavors: [
      { name: 'prune', color: '#5A188E' },
      { name: 'squash', color: '#F88532' },
      { name: 'cherry', color: '#E91E63' },
    ],
    sizes: [Size.SMALL, Size.MEDIUM, Size.LARGE],
  },
  {
    id: 2,
    name: 'Popsicle',
    imageUrls: ['../assets/popsicle-lime.svg', '../assets/popsicle-lettuce.svg', '../assets/popsicle-cherry.svg'],
    price: 8,
    flavors: [
      { name: 'lime', color: '#00CACA' },
      { name: 'lettuce', color: '#80DC0B' },
      { name: 'cherry', color: '#E91E63' },
    ],
    sizes: [Size.SMALL, Size.LARGE],
  },
];
