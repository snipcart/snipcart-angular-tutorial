import { Product } from './core/product';
import { Size } from './core/size';

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Ice Cream',
    imageUrls: ['/test-chocolate.png', '/test-orange.png', '/test-cherry.png'],
    price: 10,
    flavors: [
      { name: 'chocolate', color: '#592905' },
      { name: 'orange', color: '#F36B09' },
      { name: 'cherry', color: '#E82518' },
    ],
    sizes: [Size.SMALL, Size.MEDIUM, Size.LARGE],
  },
  {
    id: 2,
    name: 'Popsicle',
    imageUrls: ['/test.png', '/test2.png', '/test3.png'],
    price: 8,
    flavors: [
      { name: 'sundae', color: '#777' },
      { name: 'cauliflower', color: '888' },
      { name: 'cherry', color: '#999' },
    ],
    sizes: [Size.SMALL, Size.LARGE],
  },
];
