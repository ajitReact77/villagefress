// SearchPage.tsx
import React, { useState, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, X, Clock, TrendingUp } from 'lucide-react';
import { Product } from '../types';

import { allProducts } from '../data/products';
import { ProductCard } from '../components/ProductCard';

interface SearchPageProps {
  user: any;
  onBack: () => void;
  onProductClick: (product: Product) => void;
  cart: any[];
  onAddToCart: (product: Product) => void;
  onUpdateQuantity: (productId: string, quantity: number) => void;
}

export function SearchPage({ 
  user, 
  onBack, 
  onProductClick, 
  cart, 
  onAddToCart, 
  onUpdateQuantity 
}: SearchPageProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParam = new URLSearchParams(location.search).get('q');

  const [searchQuery, setSearchQuery] = useState(queryParam || '');
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [isSearching, setIsSearching] = useState(!!queryParam);

 
  useEffect(() => {
    const saved = localStorage.getItem('village-fresh-recent-searches');
    if (saved) setRecentSearches(JSON.parse(saved));
  }, []);

  useEffect(() => {
    if (queryParam) {
      saveRecentSearch(queryParam);
    }
  }, [queryParam]);

  const saveRecentSearch = (query: string) => {
    if (query.trim() && !recentSearches.includes(query.trim())) {
      const updated = [query.trim(), ...recentSearches.slice(0, 4)];
      setRecentSearches(updated);
      localStorage.setItem('village-fresh-recent-searches', JSON.stringify(updated));
    }
  };

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase().trim();
    return allProducts.filter(product => 
      product.name.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query) ||
      product.description?.toLowerCase().includes(query)
    );
  }, [searchQuery, allProducts]);

  const getCartItem = (productId: string) => cart.find(item => item.product.id === productId);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setIsSearching(true);
    if (query.trim()) saveRecentSearch(query);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setIsSearching(false);
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('village-fresh-recent-searches');
  };

  const removeRecentSearch = (query: string) => {
    const updated = recentSearches.filter(s => s !== query);
    setRecentSearches(updated);
    localStorage.setItem('village-fresh-recent-searches', JSON.stringify(updated));
  };

  const quickCategories = [
    { name: 'Vegetables', icon: '🥬', query: 'vegetables' },
    { name: 'Fruits', icon: '🍎', query: 'fruits' },
    { name: 'Dairy', icon: '🥛', query: 'dairy' },
    { name: 'Grains', icon: '🌾', query: 'grains' },
    { name: 'Fashion', icon: '👗', query: 'fashion' },
    { name: 'Beauty', icon: '💄', query: 'beauty' },
  ];

  const popularSearches = ['Tomatoes', 'Rice', 'Milk', 'Apples', 'Kurta', 'Lipstick'];

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-white shadow-sm sticky top-0 z-50 border-b">
        <div className="max-w-md mx-auto px-4 py-3">
          <div className="flex items-center space-x-3">
            <button onClick={onBack} className="p-2 text-gray-600 hover:text-gray-900">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search for products..."
                className="w-full pl-10 pr-10 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-gray-50"
                autoFocus
              />
              {searchQuery && (
                <button onClick={clearSearch} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-md mx-auto">
        {isSearching && searchQuery ? (
          <section className="px-4 py-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold">Search Results</h3>
              <span className="text-sm text-gray-600">{searchResults.length} results</span>
            </div>
            {searchResults.length > 0 ? (
              <div className="grid grid-cols-2 gap-4">
                {searchResults.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    cartItem={getCartItem(product.id)}
                    onAddToCart={onAddToCart}
                    onUpdateQuantity={onUpdateQuantity}
                    onProductClick={onProductClick}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-600">No results found.</div>
            )}
          </section>
        ) : (
          <>
            {recentSearches.length > 0 && (
              <section className="px-4 py-6 border-b">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold flex items-center gap-2"><Clock className="w-5 h-5" /> Recent</h3>
                  <button onClick={clearRecentSearches} className="text-sm text-emerald-600">Clear All</button>
                </div>
                <div className="space-y-2">
                  {recentSearches.map((search, idx) => (
                    <div key={idx} className="flex justify-between items-center">
                      <button onClick={() => handleSearch(search)} className="text-left flex-1 px-2 py-1 hover:bg-gray-100 rounded">
                        {search}
                      </button>
                      <button onClick={() => removeRecentSearch(search)} className="text-gray-400"><X className="w-4 h-4" /></button>
                    </div>
                  ))}
                </div>
              </section>
            )}

            <section className="px-4 py-6 border-b">
              <h3 className="text-lg font-bold mb-4">Browse Categories</h3>
              <div className="grid grid-cols-3 gap-3">
                {quickCategories.map((cat, idx) => (
                  <button key={idx} onClick={() => handleSearch(cat.query)} className="flex flex-col items-center border p-4 rounded-xl bg-white hover:shadow">
                    <div className="text-2xl mb-1">{cat.icon}</div>
                    <span className="text-sm font-medium">{cat.name}</span>
                  </button>
                ))}
              </div>
            </section>

            <section className="px-4 py-6">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><TrendingUp className="w-5 h-5" /> Popular Searches</h3>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map((search, i) => (
                  <button key={i} onClick={() => handleSearch(search)} className="px-4 py-2 bg-gray-100 hover:bg-emerald-100 rounded-full text-sm">
                    {search}
                  </button>
                ))}
              </div>
            </section>
          </>
        )}

        <div className="h-20"></div>
      </div>
    </div>
  );
}
