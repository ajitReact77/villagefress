import { ShoppingCart, MapPin, User } from 'lucide-react';
import { Store, User as UserType, HeaderTheme } from '../types';
import { useAuth } from '../hooks/useAuth';
import { useVillageStore } from '../store/villageStore';

interface HeaderProps {
  cart: any[];
  store?: Store;
  user: UserType | null;
  theme: HeaderTheme;
  onCartClick?: () => void;
  onUserClick: () => void;
  onStoreSettingsClick?: () => void;
}

export function Header({
  cart,
  store,
  theme,
  onCartClick,
  onUserClick,
  onStoreSettingsClick
}: HeaderProps) {
  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);
const { selectedVillage } = useVillageStore();
  const isGrocery = theme === 'grocery';
  const isFashion = theme === 'fashion';
  const isBeauty = theme === 'beauty';
  const {user} = useAuth()
  console.log("user", user?.photoURL)
  const themeColors = {
    icon: isGrocery ? '🌱' : isFashion ? '👗' : '💄',
    gradient: isGrocery
      ? 'bg-gradient-to-br from-emerald-500 to-emerald-600'
      : isFashion
      ? 'bg-gradient-to-br from-pink-500 to-pink-600'
      : 'bg-gradient-to-br from-purple-500 to-pink-600',
    hover: isGrocery ? 'hover:text-emerald-600' : isFashion ? 'hover:text-pink-600' : 'hover:text-purple-600',
    badge: isGrocery ? 'bg-emerald-500' : isFashion ? 'bg-pink-500' : 'bg-purple-500',
    border: isGrocery ? 'border-emerald-100' : isFashion ? 'border-pink-100' : 'border-purple-100',
    title: isGrocery ? 'VillageFresh' : isFashion ? 'Fashion Hub' : 'Beauty Hub',
    subtitle: isGrocery
      ? selectedVillage?.name
      : isFashion
      ? 'Trendy & Affordable'
      : 'Glow & Glamour',
  }; 
  return (
    <header className={`bg-white shadow-sm sticky top-0 z-50 border-b ${themeColors.border}`}>
      <div className="max-w-md mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Left */}
          <div className="flex items-center space-x-2">
            <div className={`w-8 h-8 ${themeColors.gradient} rounded-lg flex items-center justify-center`}>
              <span className="text-white font-bold text-sm">{themeColors.icon}</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">{themeColors.title}</h1>
              <div className="flex items-center space-x-1 text-xs text-gray-600">
                {isGrocery && <MapPin className="w-3 h-3" />}
                <span className="truncate max-w-[120px]">{themeColors.subtitle}</span>
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="flex items-center space-x-3">
            
              <button
                onClick={onUserClick}
                className={`relative p-2 text-gray-600 ${themeColors.hover} transition-colors`}
              >
                {user && (user?.photoURL || user.avatar) ? (
                  <img
                    src={user?.photoURL}
                    alt={user.displayName}
                    className="w-6 h-6 rounded-full object-cover"
                  />
                ) : (
                  <User className="w-6 h-6" />
                )}
              </button>
          

            {onCartClick && (
              <button
                onClick={onCartClick}
                className={`relative p-2 text-gray-600 ${themeColors.hover} transition-colors`}
              >
                <ShoppingCart className="w-6 h-6" />
                {cartItemsCount > 0 && (
                  <span
                    className={`absolute -top-1 -right-1 ${themeColors.badge} text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium`}
                  >
                    {cartItemsCount}
                  </span>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
