import { Category } from '../types';

export const categories: Category[] = [
  {
    id: 'vegetables',
    name: 'Vegetables',
    icon: '🥬',
    image: 'https://images.pexels.com/photos/1128678/pexels-photo-1128678.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    id: 'fruits',
    name: 'Fruits',
    icon: '🍎',
    image: 'https://images.pexels.com/photos/1132047/pexels-photo-1132047.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    id: 'dairy',
    name: 'Dairy',
    icon: '🥛',
    image: 'https://images.pexels.com/photos/416656/pexels-photo-416656.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    id: 'grains',
    name: 'Grains',
    icon: '🌾',
    image: 'https://images.pexels.com/photos/1537086/pexels-photo-1537086.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    id: 'spices',
    name: 'Spices',
    icon: '🌶️',
    image: 'https://images.pexels.com/photos/277253/pexels-photo-277253.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    id: 'household',
    name: 'Household',
    icon: '🧴',
    image: 'https://images.pexels.com/photos/4099355/pexels-photo-4099355.jpeg?auto=compress&cs=tinysrgb&w=300'
  }
];

export const beautyCategories:Category[] = [
    { id: 'all', name: 'All', icon: '💄', image:''},
    { id: 'skincare', name: 'Skincare', icon: '🧴',image:'' },
    { id: 'makeup', name: 'Makeup', icon: '💄' , image:''},
    { id: 'haircare', name: 'Hair Care', icon: '🧴' , image:''},
    { id: 'fragrance', name: 'Fragrance', icon: '🌸',image:'' },
    { id: 'jewelry', name: 'Jewelry', icon: '💍' , image:''},
  ];

 export const fashionCategories:Category[] = [
    { id: 'all', name: 'All', icon: '👗', image:'' },
    { id: 'men', name: 'Men', icon: '👔', image:'' },
    { id: 'women', name: 'Women', icon: '👗', image:'' },
    { id: 'kids', name: 'Kids', icon: '👶', image:'' },
    { id: 'accessories', name: 'Accessories', icon: '👜', image:'' },
    { id: 'footwear', name: 'Footwear', icon: '👟', image:'' },
  ];