import React from 'react';
import { Plus, Minus } from 'lucide-react';
import { Product, CartItem } from '../types';
import { useNavigate } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
  cartItem?: CartItem;
  onAddToCart: (product: Product) => void;
  onUpdateQuantity: (productId: string, quantity: number) => void;
}

export function ProductCard({ product, cartItem, onAddToCart, onUpdateQuantity }: ProductCardProps) {
  const quantity = cartItem?.quantity || 0;
  const navigate = useNavigate()
  const handleIncrement = () => {
    if (quantity === 0) {
      onAddToCart(product);
    } else {
      onUpdateQuantity(product.id, quantity + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 0) {
      onUpdateQuantity(product.id, quantity - 1);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      <div className="aspect-square relative overflow-hidden">
        <img
          onClick={() => navigate(`/shop/product/${product.id}`)}
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        {product.originalPrice && (
          <div className="absolute top-2 left-2 bg-emerald-500 text-white text-xs px-2 py-1 rounded-full font-medium">
            {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
          </div>
        )}
         <div className='absolute bottom-0 right-2'>
          {quantity === 0 ? (
            <button
              onClick={handleIncrement}
              className="bg-emerald-500 hover:bg-emerald-600 text-white p-2 rounded-lg transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          ) : (
            <div className="flex items-center space-x-2 bg-emerald-500 rounded-lg">
              <button
                onClick={handleDecrement}
                className="text-white p-2 hover:bg-emerald-600 rounded-l-lg transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="text-white font-medium px-2 min-w-8 text-center">
                {quantity}
              </span>
              <button
                onClick={handleIncrement}
                className="text-white p-2 hover:bg-emerald-600 rounded-r-lg transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          )}
          </div>
      </div>
      
      <div className="p-2">
        <h3 className="font-semibold text-gray-900 text-sm mb-1 leading-tight">
          {product.name}
        </h3>
        <p className="text-xs text-gray-600 mb-2">{product.unit}</p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-gray-900">₹{product.price}</span>
            {product.originalPrice && (
              <span className="text-xs text-gray-500 line-through">₹{product.originalPrice}</span>
            )}
          </div>
         
        </div>
      </div>
    </div>
  );
}