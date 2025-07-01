import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ProductDetailPage } from '../pages/ProductDetailPage';
import { beautyProducts, fashionProducts, products } from '../data/products'; // all your product list
import { useCartStore } from '../store/cartStore';
import { useOrderViaWhatsApp } from '../hooks/useOrderViaWhatsApp';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Store } from '../types';
type UnifiedProduct = {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  unit?: string;
  inStock?: boolean;
  description?: string;
  rating?: number;
  reviews?: number;
  brand?: string;
  type?: string;
};
const defaultStore: Store = {
    name: 'Village Store',
    ownerName: 'Store Owner',
    phone: '+9198989898',
    address: 'Khukhundoo Store',
    whatsappNumber: '+917617028576',
};
export function ProductDetailWrapper() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [store, setStore] = useLocalStorage<Store>('village-fresh-store', defaultStore);
  
      const cart = useCartStore(s => s.cart);
      const addToCart = useCartStore(s => s.addToCart);
      const updateQuantity = useCartStore(s => s.updateQuantity);
  const { handleOrder } = useOrderViaWhatsApp(store, () => setIsCartOpen(false));
  const [isCartOpen, setIsCartOpen] = useState(false);

 const allProducts: UnifiedProduct[] = [
  ...products,
  ...beautyProducts,
  ...fashionProducts,
];
console.log(allProducts)

  const product = allProducts.find(p => p.id === id);

  if (!product) return <div className="p-6 text-red-500">Product not found</div>;

  return (
    <ProductDetailPage
      product={product}
      cart={cart}
      onBack={() => navigate(-1)}
      onAddToCart={addToCart}
      onUpdateQuantity={updateQuantity}
      onCartClick={() => setIsCartOpen(true)} // or open cart modal
      handleOrder={handleOrder}
      isCartOpen={isCartOpen}
      store={store}
    />
  );
}
