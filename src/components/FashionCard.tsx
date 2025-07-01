import { UniversalProductCard } from './UniversalProductCard';
import { Product, CartItem } from '../types';

interface FashionCardProps {
  product: Product;
  cartItem?: CartItem;
  onAddToCart: (product: Product) => void;
  onUpdateQuantity: (productId: string, quantity: number) => void;
}

export const FashionCard = (props: FashionCardProps) => {
  return <UniversalProductCard {...props} variant="fashion" />;
};
