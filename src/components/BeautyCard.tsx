import { ProductCard } from './ProductCard';
import { Product, CartItem } from '../types';
import { UniversalProductCard } from './UniversalProductCard';

interface BeautyCardProps {
  product: Product;
  cartItem?: CartItem;
  onAddToCart: (product: Product) => void;
  onUpdateQuantity: (productId: string, quantity: number) => void;
}

export const BeautyCard = (props: BeautyCardProps) => {
  return <UniversalProductCard {...props} variant="beauty" />;
};
