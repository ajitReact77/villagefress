import { Product, BeautyProduct , FashionProduct, CategoryItems, UnifiedProduct} from '../types';

export const products: Product[] = [
  // Vegetables
  {
    id: 'shop-v1',
    name: 'Fresh Tomatoes',
    price: 40,
    originalPrice: 50,
    image: 'https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg?auto=compress&cs=tinysrgb&w=300',
    category: 'vegetables',
    unit: '1 kg',
    inStock: true,
    description: 'Fresh local tomatoes, perfect for cooking'
  },
  {
    id: 'shop-v2',
    name: 'Green Onions',
    price: 25,
    image: 'https://images.pexels.com/photos/928251/pexels-photo-928251.jpeg?auto=compress&cs=tinysrgb&w=300',
    category: 'vegetables',
    unit: 'per bunch',
    inStock: true,
    description: 'Fresh green onions from local farms'
  },
  {
    id: 'shop-v3',
    name: 'Fresh Potatoes',
    price: 30,
    image: 'https://images.pexels.com/photos/144248/potatoes-vegetables-erdfrucht-bio-144248.jpeg?auto=compress&cs=tinysrgb&w=300',
    category: 'vegetables',
    unit: '1 kg',
    inStock: true,
    description: 'High quality potatoes for all your cooking needs'
  },
  {
    id: 'shop-v4',
    name: 'Fresh Carrots',
    price: 45,
    image: 'https://images.pexels.com/photos/143133/pexels-photo-143133.jpeg?auto=compress&cs=tinysrgb&w=300',
    category: 'vegetables',
    unit: '1 kg',
    inStock: true,
    description: 'Sweet and crunchy carrots, rich in vitamins'
  },
  
  // Fruits
  {
    id: 'shop-f1',
    name: 'Fresh Apples',
    price: 120,
    originalPrice: 140,
    image: 'https://images.pexels.com/photos/102104/pexels-photo-102104.jpeg?auto=compress&cs=tinysrgb&w=300',
    category: 'fruits',
    unit: '1 kg',
    inStock: true,
    description: 'Crisp and sweet apples, perfect for snacking'
  },
  {
    id: 'shop-f2',
    name: 'Ripe Bananas',
    price: 60,
    image: 'https://images.pexels.com/photos/61127/pexels-photo-61127.jpeg?auto=compress&cs=tinysrgb&w=300',
    category: 'fruits',
    unit: 'per dozen',
    inStock: true,
    description: 'Sweet and ripe bananas, rich in potassium'
  },
  {
    id: 'shop-f3',
    name: 'Fresh Oranges',
    price: 80,
    image: 'https://images.pexels.com/photos/1000084/pexels-photo-1000084.jpeg?auto=compress&cs=tinysrgb&w=300',
    category: 'fruits',
    unit: '1 kg',
    inStock: true,
    description: 'Juicy oranges packed with vitamin C'
  },
  
  // Dairy
  {
    id: 'shop-d1',
    name: 'Fresh Milk',
    price: 55,
    image: 'https://images.pexels.com/photos/248412/pexels-photo-248412.jpeg?auto=compress&cs=tinysrgb&w=300',
    category: 'dairy',
    unit: 'per liter',
    inStock: true,
    description: 'Pure and fresh milk from local dairy farms'
  },
  {
    id: 'shop-d2', 
    name: 'Farm Eggs',
    price: 6,
    image: 'https://images.pexels.com/photos/162712/egg-white-food-protein-162712.jpeg?auto=compress&cs=tinysrgb&w=300',
    category: 'dairy',
    unit: 'per piece',
    inStock: true,
    description: 'Fresh farm eggs, rich in protein'
  },
  
  // Grains
  {
    id: 'shop-g1',
    name: 'Basmati Rice',
    price: 180,
    image: 'https://images.pexels.com/photos/723198/pexels-photo-723198.jpeg?auto=compress&cs=tinysrgb&w=300',
    category: 'grains',
    unit: '1 kg',
    inStock: true,
    description: 'Premium quality basmati rice'
  },
  {
    id: 'shop-g2',
    name: 'Wheat Flour',
    price: 45,
    image: 'https://images.pexels.com/photos/1117386/pexels-photo-1117386.jpeg?auto=compress&cs=tinysrgb&w=300',
    category: 'grains',
    unit: '1 kg',
    inStock: true,
    description: 'Fresh ground wheat flour for rotis and bread'
  },
  
  // Spices
  {
    id: 'shop-s1',
    name: 'Turmeric Powder',
    price: 120,
    image: 'https://images.pexels.com/photos/1340116/pexels-photo-1340116.jpeg?auto=compress&cs=tinysrgb&w=300',
    category: 'spices',
    unit: 'per 100g',
    inStock: true,
    description: 'Pure turmeric powder with natural color'
  },
  {
    id: 'shop-s2',
    name: 'Red Chili Powder',
    price: 150,
    image: 'https://images.pexels.com/photos/1340113/pexels-photo-1340113.jpeg?auto=compress&cs=tinysrgb&w=300',
    category: 'spices',
    unit: 'per 100g',
    inStock: true,
    description: 'Spicy red chili powder for authentic taste'
  },
  
  // Household
  {
    id: 'shop-h1',
    name: 'Dish Soap',
    price: 85,
    image: 'https://images.pexels.com/photos/4099355/pexels-photo-4099355.jpeg?auto=compress&cs=tinysrgb&w=300',
    category: 'household',
    unit: 'per bottle',
    inStock: true,
    description: 'Effective dish cleaning soap'
  },
  {
    id: 'shop-h2',
    name: 'Toilet Paper',
    price: 120,
    image: 'https://images.pexels.com/photos/4099354/pexels-photo-4099354.jpeg?auto=compress&cs=tinysrgb&w=300',
    category: 'household',
    unit: 'per pack',
    inStock: true,
    description: 'Soft and absorbent toilet paper'
  }
];

export const beautyProducts:BeautyProduct[] = [
    {
      id: 'beauty-b1',
      name: 'Himalaya Face Wash',
      price: 149,
      originalPrice: 199,
      image: 'https://images.pexels.com/photos/3685530/pexels-photo-3685530.jpeg?auto=compress&cs=tinysrgb&w=300',
      category: 'skincare',
      rating: 4.5,
      reviews: 1234,
      brand: 'Himalaya',
      type: 'Neem Face Wash'
    },
    {
      id: 'beauty-b2',
      name: 'Lakme Lipstick',
      price: 299,
      originalPrice: 399,
      image: 'https://images.pexels.com/photos/2533266/pexels-photo-2533266.jpeg?auto=compress&cs=tinysrgb&w=300',
      category: 'makeup',
      rating: 4.3,
      reviews: 856,
      brand: 'Lakme',
      type: 'Matte Lipstick'
    },
    {
      id: 'beauty-b3',
      name: 'L\'Oreal Shampoo',
      price: 249,
      originalPrice: 329,
      image: 'https://images.pexels.com/photos/4465124/pexels-photo-4465124.jpeg?auto=compress&cs=tinysrgb&w=300',
      category: 'haircare',
      rating: 4.4,
      reviews: 567,
      brand: 'L\'Oreal',
      type: 'Anti-Dandruff'
    },
    {
      id: 'beauty-b4',
      name: 'Gold Ring',
      price: 2999,
      originalPrice: 3999,
      image: 'https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg?auto=compress&cs=tinysrgb&w=300',
      category: 'jewelry',
      rating: 4.8,
      reviews: 234,
      brand: 'Tanishq',
      type: '18K Gold Ring'
    },
    {
      id: 'beauty-b5',
      name: 'Fogg Perfume',
      price: 199,
      originalPrice: 299,
      image: 'https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg?auto=compress&cs=tinysrgb&w=300',
      category: 'fragrance',
      rating: 4.2,
      reviews: 445,
      brand: 'Fogg',
      type: 'Body Spray'
    },
    {
      id: 'beauty-b6',
      name: 'Nivea Moisturizer',
      price: 179,
      originalPrice: 229,
      image: 'https://images.pexels.com/photos/3685530/pexels-photo-3685530.jpeg?auto=compress&cs=tinysrgb&w=300',
      category: 'skincare',
      rating: 4.6,
      reviews: 789,
      brand: 'Nivea',
      type: 'Daily Moisturizer'
    },
    {
      id: 'beauty-b7',
      name: 'Maybelline Mascara',
      price: 399,
      originalPrice: 499,
      image: 'https://images.pexels.com/photos/2533266/pexels-photo-2533266.jpeg?auto=compress&cs=tinysrgb&w=300',
      category: 'makeup',
      rating: 4.4,
      reviews: 623,
      brand: 'Maybelline',
      type: 'Volume Express'
    },
    {
      id: 'beauty-b8',
      name: 'Silver Earrings',
      price: 899,
      originalPrice: 1299,
      image: 'https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg?auto=compress&cs=tinysrgb&w=300',
      category: 'jewelry',
      rating: 4.5,
      reviews: 156,
      brand: 'Kalyan Jewellers',
      type: 'Sterling Silver'
    },
  ];

export const fashionProducts: FashionProduct[] = [
    {
      id: 'fashion-f1',
      name: 'Cotton Kurta Set',
      price: 1299,
      originalPrice: 1599,
      image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=300',
      category: 'men',
      rating: 4.5,
      reviews: 234,
      brand: 'Village Wear'
    },
    {
      id: 'fashion-f2',
      name: 'Handloom Saree',
      price: 2499,
      originalPrice: 3199,
      image: 'https://images.pexels.com/photos/1055691/pexels-photo-1055691.jpeg?auto=compress&cs=tinysrgb&w=300',
      category: 'women',
      rating: 4.8,
      reviews: 156,
      brand: 'Traditional Craft'
    },
    {
      id: 'fashion-f3',
      name: 'Kids Ethnic Wear',
      price: 899,
      originalPrice: 1199,
      image: 'https://images.pexels.com/photos/1620760/pexels-photo-1620760.jpeg?auto=compress&cs=tinysrgb&w=300',
      category: 'kids',
      rating: 4.6,
      reviews: 89,
      brand: 'Little Angels'
    },
    {
      id: 'fashion-f4',
      name: 'Leather Handbag',
      price: 1899,
      originalPrice: 2499,
      image: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=300',
      category: 'accessories',
      rating: 4.4,
      reviews: 67,
      brand: 'Craft House'
    },
    {
      id: 'fashion-f5',
      name: 'Casual T-Shirt',
      price: 599,
      originalPrice: 799,
      image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=300',
      category: 'men',
      rating: 4.2,
      reviews: 145,
      brand: 'Comfort Zone'
    },
    {
      id: 'fashion-f6',
      name: 'Designer Sandals',
      price: 1299,
      originalPrice: 1699,
      image: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=300',
      category: 'footwear',
      rating: 4.3,
      reviews: 78,
      brand: 'Step Style'
    },
  ];

   export const groceryItems : CategoryItems[]= [
    {
      id: 'g1',
      name: 'Basmati Rice',
      image: 'https://images.pexels.com/photos/723198/pexels-photo-723198.jpeg?auto=compress&cs=tinysrgb&w=200',
      category: '/shop'
    },
    {
      id: 'g2',
      name: 'Wheat Flour',
      image: 'https://images.pexels.com/photos/1117386/pexels-photo-1117386.jpeg?auto=compress&cs=tinysrgb&w=200',
      category: '/shop'
    },
    {
      id: 'g3',
      name: 'Turmeric Powder',
      image: 'https://images.pexels.com/photos/1340116/pexels-photo-1340116.jpeg?auto=compress&cs=tinysrgb&w=200',
      category: '/shop'
    },
    {
      id: 'g4',
      name: 'Red Chili Powder',
      image: 'https://images.pexels.com/photos/1340113/pexels-photo-1340113.jpeg?auto=compress&cs=tinysrgb&w=200',
      category: '/shop'
    }
  ];

  export const vegetableItems: CategoryItems[] = [
    {
      id: 'v1',
      name: 'Fresh Tomatoes',
      image: 'https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg?auto=compress&cs=tinysrgb&w=200',
      category: '/shop'
    },
    {
      id: 'v2',
      name: 'Fresh Potatoes',
      image: 'https://images.pexels.com/photos/144248/potatoes-vegetables-erdfrucht-bio-144248.jpeg?auto=compress&cs=tinysrgb&w=200',
      category: '/shop'
    },
    {
      id: 'v3',
      name: 'Fresh Carrots',
      image: 'https://images.pexels.com/photos/143133/pexels-photo-143133.jpeg?auto=compress&cs=tinysrgb&w=200',
      category: '/shop'
    },
    {
      id: 'v4',
      name: 'Fresh Apples',
      image: 'https://images.pexels.com/photos/102104/pexels-photo-102104.jpeg?auto=compress&cs=tinysrgb&w=200',
      category: '/shop'
    }
  ];

  export const fashionItems: CategoryItems[] = [
    {
      id: 'f1',
      name: 'Cotton Kurta Set',
      image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=200',
      category: '/fashion'
    },
    {
      id: 'f2',
      name: 'Handloom Saree',
      image: 'https://images.pexels.com/photos/1055691/pexels-photo-1055691.jpeg?auto=compress&cs=tinysrgb&w=200',
      category: '/fashion'
    },
    {
      id: 'f3',
      name: 'Casual T-Shirt',
      image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=200',
      category: '/fashion'
    },
    {
      id: 'f4',
      name: 'Designer Sandals',
      image: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=200',
      category: '/fashion'
    }
  ];

  export const beautyItems : CategoryItems[]= [
    {
      id: 'b1',
      name: 'Face Wash',
      image: 'https://images.pexels.com/photos/3685530/pexels-photo-3685530.jpeg?auto=compress&cs=tinysrgb&w=200',
      category: '/beauty'
    },
    {
      id: 'b2',
      name: 'Lipstick',
      image: 'https://images.pexels.com/photos/2533266/pexels-photo-2533266.jpeg?auto=compress&cs=tinysrgb&w=200',
      category: '/beauty'
    },
    {
      id: 'b3',
      name: 'Hair Shampoo',
      image: 'https://images.pexels.com/photos/4465124/pexels-photo-4465124.jpeg?auto=compress&cs=tinysrgb&w=200',
      category: '/beauty'
    },
    {
      id: 'b4',
      name: 'Moisturizer',
      image: 'https://images.pexels.com/photos/3685530/pexels-photo-3685530.jpeg?auto=compress&cs=tinysrgb&w=200',
      category: '/beauty'
    }
  ];


   export const allProducts: UnifiedProduct[] = [
    ...products,
    ...beautyProducts,
    ...fashionProducts,
  ];