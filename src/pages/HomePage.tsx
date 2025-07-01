import React, { useEffect, useState } from 'react';
import { ArrowRight, Clock, Truck, Shield, Star, MapPin, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';



const HomePage =()=> {
    const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
    const [showInstall, setShowInstall] = useState(false);
  
  const categories = [
    { name: 'Vegetables & Fruits', icon: '🥬', color: 'bg-green-100' },
    { name: 'Dairy & Breakfast', icon: '🥛', color: 'bg-blue-100' },
    { name: 'Munchies', icon: '🍿', color: 'bg-orange-100' },
    { name: 'Cold Drinks & Juices', icon: '🥤', color: 'bg-red-100' },
    { name: 'Instant & Frozen Food', icon: '🍜', color: 'bg-purple-100' },
    { name: 'Tea, Coffee & Health Drink', icon: '☕', color: 'bg-yellow-100' },
    { name: 'Bakery & Biscuits', icon: '🍞', color: 'bg-pink-100' },
    { name: 'Sweet Tooth', icon: '🍭', color: 'bg-indigo-100' },
  ];
const navigate = useNavigate()
  const quickPicks = [
    { name: 'Fresh Tomatoes', price: '₹40', originalPrice: '₹50', image: 'https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg?auto=compress&cs=tinysrgb&w=200', time: '20 MINS' },
    { name: 'Fresh Milk', price: '₹55', image: 'https://images.pexels.com/photos/248412/pexels-photo-248412.jpeg?auto=compress&cs=tinysrgb&w=200', time: '20 MINS' },
    { name: 'Bananas', price: '₹60', image: 'https://images.pexels.com/photos/61127/pexels-photo-61127.jpeg?auto=compress&cs=tinysrgb&w=200', time: '20 MINS' },
    { name: 'Fresh Apples', price: '₹120', originalPrice: '₹140', image: 'https://images.pexels.com/photos/102104/pexels-photo-102104.jpeg?auto=compress&cs=tinysrgb&w=200', time: '20 MINS' },
  ];

   useEffect(() => {
      const handleBeforeInstallPrompt = (e: any) => {
        e.preventDefault();
        setDeferredPrompt(e);
        setShowInstall(true);
      };
      window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      return () => {
        window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      };
    }, []);
    
   const handleInstall = async () => {
      if (!deferredPrompt) return;
      deferredPrompt.prompt();
      const result = await deferredPrompt.userChoice;
      if (result.outcome === 'accepted') {
        console.log('✅ PWA installed');
      }
      setDeferredPrompt(null);
      setShowInstall(false);
    };
  
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50 border-b">
        <div className="max-w-md mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">🌱</span>
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">VillageFresh</h1>
                <div className="flex items-center space-x-1 text-xs text-gray-600">
                  <MapPin className="w-3 h-3" />
                  <span>Delivery in 20 minutes</span>
                </div>
              </div>
            </div>
            <button
              onClick={()=>navigate('/auth')}
              className="text-emerald-600 font-medium text-sm hover:text-emerald-700 transition-colors"
            >
              Login
            </button>
          </div>
        </div>
      </header>
     
      {/* Hero Banner */}
      <section className="px-4 py-6 bg-gradient-to-r from-emerald-500 to-emerald-600">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-1">
                  गांव का भरोसा, मिनटों में।
                </h2>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4 text-emerald-600" />
                    <span>20 minutes</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Truck className="w-4 h-4 text-emerald-600" />
                    <span>Free delivery</span>
                  </div>
                </div>
              </div>
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">🛒</span>
              </div>
            </div>
            
            {/* Search Bar */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search for products..."
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-gray-50"
              />
            </div>

            <button
              onClick={()=>navigate('/auth')}
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-3 px-6 rounded-xl font-semibold flex items-center justify-center space-x-2 transition-colors"
            >
              <span>Start Shopping</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>
       {/* PWA Install Button */}
            {showInstall && (
              <div className="fixed bottom-6 right-6 z-50">
                <button
                  onClick={handleInstall}
                  className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-5 py-3 rounded-xl shadow-xl hover:scale-105 transition-all duration-300 animate-pulse"
                >
                  📲 Install Village Store App
                </button>
              </div>
            )}
      {/* Categories */}
      <section className="px-4 py-6">
        <div className="max-w-md mx-auto">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Shop by category</h3>
          <div className="grid grid-cols-4 gap-3">
            {categories.map((category, index) => (
              <button
                key={index}
                className="flex flex-col items-center p-3 rounded-xl border border-gray-100 hover:border-emerald-200 transition-colors"
              >
                <div className={`w-12 h-12 ${category.color} rounded-full flex items-center justify-center mb-2`}>
                  <span className="text-xl">{category.icon}</span>
                </div>
                <span className="text-xs font-medium text-gray-700 text-center leading-tight">
                  {category.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Picks */}
      <section className="px-4 py-6 bg-gray-50">
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900">Quick picks for you</h3>
            <button className="text-emerald-600 font-medium text-sm">See all</button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {quickPicks.map((product, index) => (
              <div key={index} className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-32 object-cover"
                  />
                  <div className="absolute top-2 left-2 bg-emerald-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                    {product.time}
                  </div>
                </div>
                <div className="p-3">
                  <h4 className="font-semibold text-gray-900 text-sm mb-1">{product.name}</h4>
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="font-bold text-gray-900">{product.price}</span>
                    {product.originalPrice && (
                      <span className="text-xs text-gray-500 line-through">{product.originalPrice}</span>
                    )}
                  </div>
                  <button onClick={()=>navigate('/auth')} className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-2 px-3 rounded-lg text-sm font-medium transition-colors">
                    ADD
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-4 py-6">
        <div className="max-w-md mx-auto">
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Clock className="w-6 h-6 text-emerald-600" />
              </div>
              <h4 className="font-semibold text-gray-900 text-sm mb-1">20 minutes</h4>
              <p className="text-xs text-gray-600">Fastest delivery</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900 text-sm mb-1">100% Fresh</h4>
              <p className="text-xs text-gray-600">Quality guaranteed</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Truck className="w-6 h-6 text-orange-600" />
              </div>
              <h4 className="font-semibold text-gray-900 text-sm mb-1">Free delivery</h4>
              <p className="text-xs text-gray-600">On orders above ₹149</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="px-4 py-6 bg-gray-50">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-xl p-4 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-1 mb-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-semibold text-gray-900 ml-1">4.9</span>
                </div>
                <p className="text-xs text-gray-600">500+ happy customers</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-gray-900">1000+ products</p>
                <p className="text-xs text-gray-600">Fresh from farms</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="px-4 py-8">
        <div className="max-w-md mx-auto text-center">
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Ready to get fresh groceries?
          </h3>
          <p className="text-gray-600 mb-6">
            Join thousands of happy customers getting fresh produce delivered in minutes
          </p>
          <button
            onClick={()=>navigate('/auth')}
            className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white py-4 px-6 rounded-xl font-semibold flex items-center justify-center space-x-2 transition-all transform hover:scale-105 shadow-lg"
          >
            <span>Start Shopping Now</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      <div className="h-8"></div>
    </div>
  );
} 
export default HomePage