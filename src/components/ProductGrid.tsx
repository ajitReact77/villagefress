import React from 'react';
import { ProductCard } from './ProductCard';
import { Product, CartItem } from '../types';
import { PromoSlider } from './PromoSlider';

interface ProductGridProps {
  products: Product[];
  cart: CartItem[];
  onAddToCart: (product: Product) => void;
  onUpdateQuantity: (productId: string, quantity: number) => void;
}

export function ProductGrid({ products, cart, onAddToCart, onUpdateQuantity }: ProductGridProps) {
  const getCartItem = (productId: string) => {
    return cart.find(item => item.product.id === productId);
  };

  if (products.length === 0) {
    return (
      <div className=" py-8 text-center">
        <div className="text-6xl mb-4">🛒</div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No products found</h3>
        <p className="text-gray-600">Try selecting a different category or check back later.</p>
      </div>
    );
  }

  return (
    <div className=" pb-2">
     <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-1">
 
        {products.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            cartItem={getCartItem(product.id)}
            onAddToCart={onAddToCart}
            onUpdateQuantity={onUpdateQuantity}
          />
        ))}
      </div>
    </div>
  );
}