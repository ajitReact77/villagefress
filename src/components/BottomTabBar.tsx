import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Grid3X3, Shirt, Sparkles } from 'lucide-react';

type TabType = 'shop' | 'home' | 'fashion' | 'beauty';

export function BottomTabBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname.slice(1);

  const activeTab = ['home', 'shop', 'fashion', 'beauty'].includes(currentPath)
    ? (currentPath as TabType)
    : 'home';

  const tabs = [
    { id: 'home', label: 'Home', icon: Home, activeColor: 'text-emerald-600', inactiveColor: 'text-gray-500' },
    { id: 'shop', label: 'Grocery', icon: Grid3X3, activeColor: 'text-emerald-600', inactiveColor: 'text-gray-500' },
    { id: 'fashion', label: 'Fashion', icon: Shirt, activeColor: 'text-pink-600', inactiveColor: 'text-gray-500' },
    { id: 'beauty', label: 'Beauty', icon: Sparkles, activeColor: 'text-purple-600', inactiveColor: 'text-gray-500' }
  ] as const;

  const [showTabBar, setShowTabBar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY > lastScrollY + 10) {
        setShowTabBar(false); // scrolling down
      } else if (currentY < lastScrollY - 10) {
        setShowTabBar(true); // scrolling up
      }
      setLastScrollY(currentY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50 transition-all duration-700 ease-in-out transform ${showTabBar ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 pointer-events-none'
        }`}
    >
      <div className="max-w-md mx-auto h-16">
        <div className="flex items-center justify-around">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => navigate(`/${tab.id}`)}
                className={`flex flex-col items-center justify-center min-w-16 transition-all duration-200 ${isActive ? 'transform scale-105' : 'hover:scale-105'}`}
              >
                <div className={`p-2 rounded-xl ${isActive ? 'bg-gradient-to-br from-emerald-50 to-emerald-100 shadow-sm' : 'hover:bg-gray-50'}`}>
                  <Icon className={`w-5 h-5 ${isActive ? tab.activeColor : tab.inactiveColor}`} />
                </div>
                <span className={`text-xs font-medium mt-1 ${isActive ? tab.activeColor : tab.inactiveColor}`}>
                  {tab.label}
                </span>
                {isActive && (
                  <div className="w-1 h-1 bg-emerald-500 rounded-full mt-1 animate-pulse"></div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
