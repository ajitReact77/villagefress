import React, { useEffect, useMemo, useState } from 'react';

import HomePage from './HomePage';
import AuthPage from './AuthPage';
import { Header } from '../components/Header';
import { CategoryGrid } from '../components/CategoryGrid';
import { ProductGrid } from '../components/ProductGrid';
import { Cart } from '../components/Cart';
import { StoreSettings } from '../components/StoreSettings';
import { UserProfile } from '../components/UserProfile';
import { PromoSlider } from '../components/PromoSlider';
import { SkeletonLoader } from '../components/SkeletonLoader';
import AdminDashboard from './AdminDashboard';

import { products } from '../data/products';
import { CartItem, Product, Store } from '../types';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useAuth } from '../hooks/useAuth';

// import { LocationRestrictionModal } from '../components/LocationRestrictionModal';
import { BottomTabBar } from '../components/BottomTabBar';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';
import { useOrderViaWhatsApp } from '../hooks/useOrderViaWhatsApp';
import { Search } from 'lucide-react';

const defaultStore: Store = {
  name: 'Village Store',
  ownerName: 'Store Owner',
  phone: '+9198989898',
  address: 'Khukhundoo Store',
  whatsappNumber: '+917617028576',
};

function Shop() {
  // --------------------- Auth and State ---------------------
  const { user, isAdmin, isAuthenticated, login, logout, loading } = useAuth();
  const navigate = useNavigate()

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  // const [cart, setCart] = useLocalStorage<CartItem[]>('village-fresh-cart', []);
  const [store, setStore] = useLocalStorage<Store>('village-fresh-store', defaultStore);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isStoreSettingsOpen, setIsStoreSettingsOpen] = useState(false);
  const [isUserProfileOpen, setIsUserProfileOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  // --------------------- PWA Install Prompt ---------------------

  const { cart, addToCart, updateQuantity, clearCart } = useCartStore();
  const { handleOrder } = useOrderViaWhatsApp(store, () => setIsCartOpen(false));

  // --------------------- Logic ---------------------
  const filteredProducts = useMemo(() => {
    if (!selectedCategory) return products;
    return products.filter(product => product.category === selectedCategory);
  }, [selectedCategory]);

  const handleLogin = (userData: any) => {
    login(userData);
    setShowLogin(false);
  };

  const handleLogout = () => {
    logout();
    setIsUserProfileOpen(false);
  };

  // --------------------- Conditional Renders ---------------------

  // 1. Show loading screen during auth check
  if (loading) return <SkeletonLoader />;

  // 2. Admin user? Show admin dashboard
  if (isAdmin) return <AdminDashboard />;

  // 3. Not authenticated? Show home/login
  if (!isAuthenticated) {
    return showLogin ? (
      <AuthPage onBack={() => setShowLogin(false)} onLogin={handleLogin} />
    ) : (
      <HomePage
        onGetStarted={() => setShowLogin(true)}
        onLogin={() => setShowLogin(true)}
      />
    );
  }

  // --------------------- Main App UI ---------------------
  return (
    <div className="min-h-screen bg-gray-50">
     
      <Header
        theme="grocery"
        cart={cart}
        store={store}
        user={user}
        onCartClick={() => setIsCartOpen(true)}
        onStoreSettingsClick={() => navigate('/store-settings')}
        onUserClick={() => setIsUserProfileOpen(true)}
      />
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
      <main className="flex max-w-7xl mx-auto w-full">
        <aside className="w-1/5 border-r border-gray-100 bg-white">
          <CategoryGrid
            selectedCategory={selectedCategory}
            onCategorySelect={setSelectedCategory}
          />
        </aside>

        <div className="flex-1 flex flex-col min-w-0 bg-gray-50">
          <div className="pt-4">
            <PromoSlider />
          </div>

          <section className="px-2 py-1 overflow-y-auto">
            <h2 className="text-lg font-semibold text-gray-900">
              {selectedCategory ? `${selectedCategory} Products` : 'All Products'}
            </h2>
            <p className="text-sm text-gray-600 mb-2">
              {filteredProducts.length} items available
            </p>

            <ProductGrid
              products={filteredProducts}
              cart={cart}
              onAddToCart={addToCart}
              onUpdateQuantity={updateQuantity}
            />
            {/* <LocationRestrictionModal
              isOpen={showRestrictedModal}
              onClose={() => console.log('User acknowledged restriction')}
              locationName={locationName}
              village={allVillages}
              onSelectVillage={(village) => {
                setMatchedVillage(village);
                localStorage.setItem('manual-village-id', village.id.toString());
              }}
            /> */}
          </section>
        </div>
        <BottomTabBar
          navigate={navigate}
        />
      </main>

      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        store={store}
        onUpdateQuantity={updateQuantity}
        onOrderViaWhatsApp={handleOrder}
      />

      <StoreSettings
        isOpen={isStoreSettingsOpen}
        onClose={() => setIsStoreSettingsOpen(false)}
        store={store}
        onSaveStore={setStore}
      />

      <UserProfile
        user={user}
        onLogout={handleLogout}
        onClose={() => setIsUserProfileOpen(false)}
        isOpen={isUserProfileOpen}
      />

      <div className="h-20" /> {/* spacing for mobile footer space */}
    </div>
  );
}

export default Shop;
