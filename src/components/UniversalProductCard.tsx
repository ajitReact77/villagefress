import React from 'react';
import { Plus, Minus, Star } from 'lucide-react';
import { Product, CartItem } from '../types';
import { useLocation, useNavigate } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
  cartItem?: CartItem;
  variant?: 'beauty' | 'fashion'; // Optional styling
  onAddToCart: (product: Product) => void;
  onUpdateQuantity: (productId: string, quantity: number) => void;
}

export const UniversalProductCard = ({ product, cartItem, variant, onAddToCart, onUpdateQuantity }: ProductCardProps) => {
  const quantity = cartItem?.quantity || 0;
  const location = useLocation();
  const navigate = useNavigate();  
  
  const basePath = location.pathname.split('/')[1];
const targetPath = `/${basePath}/product/${product.id}`;

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative aspect-[3/4]">
        <img 
        onClick={() => navigate(targetPath)}
        src={product.image}
         alt={product.name} 
         className="w-full h-full object-cover"
          />

        {product.originalPrice && (
          <div className="absolute top-2 left-2 bg-pink-500 text-white text-xs px-2 py-1 rounded-full font-medium">
            {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
          </div>
        )}
         <div className='absolute bottom-0 right-2'>
          {quantity === 0 ? (
            <button
              onClick={() => onAddToCart(product)}
              className="bg-emerald-500 hover:bg-emerald-600 text-white p-2 rounded-lg transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          ) : (
            <div className="flex items-center space-x-2 bg-emerald-500 rounded-lg">
              <button onClick={() => onUpdateQuantity(product.id, quantity - 1)} className="text-white p-2 hover:bg-emerald-600 rounded-l-lg">
                <Minus className="w-4 h-4" />
              </button>
              <span className="text-white font-medium px-2">{quantity}</span>
              <button onClick={() => onUpdateQuantity(product.id, quantity + 1)} className="text-white p-2 hover:bg-emerald-600 rounded-r-lg">
                <Plus className="w-4 h-4" />
              </button>
            </div>
          )}

          </div>
      </div>

      <div className="p-3">
        <p className="text-xs text-gray-500 mb-1">{product.brand}</p>

        <h4 className="font-semibold text-gray-900 text-sm mb-1">{product.name}</h4>

        {variant === 'beauty' && product.type && (
          <p className="text-xs text-pink-500 mb-2">{product.type}</p>
        )}

        <div className="flex items-center space-x-1 text-sm mb-2">
          <Star className="w-4 h-4 text-yellow-400 fill-current" />
          <span className="text-gray-600">{product.rating} ({product.reviews})</span>
        </div>

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
};
