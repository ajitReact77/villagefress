import React, { useState } from 'react';
import { Search, User, Star, Heart, Filter, Sparkles, Crown, BeanIcon } from 'lucide-react';
import { Store, User as UserType } from '../types';
import { BottomTabBar } from '../components/BottomTabBar';
import { useNavigate } from 'react-router-dom';
import { beautyCategories } from '../data/categories';
import { beautyProducts } from '../data/products';
import { useCartStore } from '../store/cartStore';
import { BeautyCard } from '../components/BeautyCard';
import { Header } from '../components/Header';
import { useOrderViaWhatsApp } from '../hooks/useOrderViaWhatsApp';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Cart } from '../components/Cart';
import { UserProfile } from '../components/UserProfile';
import { useAuth } from '../hooks/useAuth';


const defaultStore: Store = {
  name: 'Village Store',
  ownerName: 'Store Owner',
  phone: '+9198989898',
  address: 'Khukhundoo Store',
  whatsappNumber: '+917617028576',
};

const BeautyPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const navigate = useNavigate()
  const {logout}= useAuth()
  const cart = useCartStore(s => s.cart);
  const addToCart = useCartStore(s => s.addToCart);
  const updateQuantity = useCartStore(s => s.updateQuantity);
  const [store, setStore] = useLocalStorage<Store>('village-fresh-store', defaultStore);
  const [isUserProfileOpen, setIsUserProfileOpen] = useState(false);
  const {user}= useAuth()

  const { handleOrder } = useOrderViaWhatsApp(store, () => setIsCartOpen(false));
  const [isCartOpen, setIsCartOpen] = useState(false);
  const filteredProducts = selectedCategory === 'all'
    ? beautyProducts
    : beautyProducts.filter(product => product.category === selectedCategory);

const handleLogout = () => {
  logout();
  setIsUserProfileOpen(false);
};

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header
        theme="beauty"
        cart={cart}
        store={undefined} // not needed for beauty
        user={user}
        onCartClick={() => setIsCartOpen(true)}
        onUserClick={()=>setIsUserProfileOpen(true)}

      />

      {/* Search Bar */}
      <section className="px-4 py-4 bg-gray-50">
        <div className="max-w-md mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              onClick={() => navigate('/search')}
              type="text"
              placeholder="Search beauty products..."
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white"
            />
          </div>
        </div>
      </section>

      {/* Banner */}
      <section className="px-4 py-6 bg-gradient-to-r from-purple-500 to-pink-600">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-1">
                  Beauty Sale ✨
                </h2>
                <p className="text-gray-600 text-sm mb-3">
                  Up to 60% off on skincare & makeup
                </p>
                <div className="flex items-center space-x-4 text-xs text-gray-600 mb-3">
                  <div className="flex items-center space-x-1">
                    <Crown className="w-3 h-3 text-purple-600" />
                    <span>Premium Brands</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Sparkles className="w-3 h-3 text-purple-600" />
                    <span>Authentic Products</span>
                  </div>
                </div>
                <button className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                  Shop Now
                </button>
              </div>
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-3xl">💄</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="px-4 py-6">
        <div className="max-w-md mx-auto">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Shop by Category</h3>
          <div className="flex space-x-3 overflow-x-auto pb-2">
            {beautyCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex-shrink-0 flex flex-col items-center p-3 rounded-xl border-2 transition-all ${selectedCategory === category.id
                  ? 'border-purple-500 bg-purple-50'
                  : 'border-gray-200 bg-white hover:border-purple-200'
                  }`}
              >
                <div className="text-2xl mb-1">{category.icon}</div>
                <span className="text-xs font-medium text-gray-700">{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Brands */}
      <section className="px-4 py-6 bg-gray-50">
        <div className="max-w-md mx-auto">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Featured Brands</h3>
          <div className="flex space-x-4 overflow-x-auto pb-2">
            {['Lakme', 'Himalaya', 'L\'Oreal', 'Maybelline', 'Nivea', 'Fogg'].map((brand, index) => (
              <div key={index} className="flex-shrink-0 bg-white rounded-xl p-4 border border-gray-200 min-w-20 text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-purple-600 font-bold text-sm">{brand.charAt(0)}</span>
                </div>
                <span className="text-xs font-medium text-gray-700">{brand}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="px-4 py-6">
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900">
              {selectedCategory === 'all' ? 'All Products' : `${beautyCategories.find(c => c.id === selectedCategory)?.name} Products`}
            </h3>
            <span className="text-sm text-gray-600">{filteredProducts.length} items</span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {filteredProducts.map(product => (
              <BeautyCard
                key={product.id}
                product={product}
                cartItem={cart.find(item => item.product.id === product.id)}
                onAddToCart={addToCart}
                onUpdateQuantity={updateQuantity}
              />
            ))}
          </div>
        </div>
      </section>
      <BottomTabBar
        navigate={navigate}
      />
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        store={store}
        onUpdateQuantity={updateQuantity}
        onOrderViaWhatsApp={handleOrder}
      />
      <UserProfile
        user={user}
        onLogout={handleLogout}
        onClose={() => setIsUserProfileOpen(false)}
        isOpen={isUserProfileOpen}
      />
      <div className="h-20"></div>
    </div>
  );
}
export default BeautyPage