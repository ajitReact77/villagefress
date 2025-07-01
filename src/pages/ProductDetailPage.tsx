import React, { useState } from 'react';
import { ArrowLeft, ShoppingCart, Plus, Minus, Star, Clock, Truck, Shield, Heart, Share2 } from 'lucide-react';
import { Product, CartItem } from '../types';
import { Cart } from '../components/Cart';

interface ProductDetailPageProps {
  product: Product;
  cart: CartItem[];
  onBack: () => void;
  onAddToCart: (product: Product) => void;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onCartClick: () => void;
  handleOrder: () => void;
  isCartOpen: boolean;
  store: any; // Replace 'any' with a more specific type if available
  setIsCartOpen: () => void;
}

export function ProductDetailPage({
  product,
  cart,
  onBack,
  onAddToCart,
  onUpdateQuantity,
  onCartClick,
  isCartOpen,
  handleOrder,
  store,
}: ProductDetailPageProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  const cartItem = cart.find(item => item.product.id === product.id);
  const quantity = cartItem?.quantity || 0;
  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Mock additional images for the product
  const productImages = [
    product.image,
    product.image, // In real app, these would be different angles
    product.image,
  ];

  const handleIncrement = () => {
    if (quantity === 0) {
      onAddToCart(product);
    } else {
      onUpdateQuantity(product.id, quantity + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 0) {
      onUpdateQuantity(product.id, quantity - 1);
    }
  };

  const nutritionInfo = [
    { label: 'Energy', value: '52 kcal' },
    { label: 'Protein', value: '0.9g' },
    { label: 'Carbs', value: '12g' },
    { label: 'Fat', value: '0.2g' },
    { label: 'Fiber', value: '2.6g' },
    { label: 'Sugar', value: '9g' },
  ];

  const features = [
    { icon: <Clock className="w-4 h-4" />, text: '8 min delivery' },
    { icon: <Shield className="w-4 h-4" />, text: '100% Fresh' },
    { icon: <Truck className="w-4 h-4" />, text: 'Free delivery' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50 border-b">
        <div className="max-w-md mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button
                onClick={onBack}
                className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h1 className="text-lg font-semibold text-gray-900 truncate">
                {product.name}
              </h1>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className={`p-2 transition-colors ${isFavorite ? 'text-red-500' : 'text-gray-600 hover:text-red-500'
                  }`}
              >
                <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
              </button>
              <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
              <button
                onClick={onCartClick}
                className="relative p-2 text-gray-600 hover:text-emerald-600 transition-colors"
              >
                <ShoppingCart className="w-5 h-5" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-emerald-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                    {cartItemsCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-md mx-auto">
        {/* Product Images */}
        <section className="relative">
          <div className="aspect-square bg-gray-50">
            <img
              src={productImages[selectedImageIndex]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {product.originalPrice && (
              <div className="absolute top-4 left-4 bg-emerald-500 text-white text-sm px-3 py-1 rounded-full font-medium">
                {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
              </div>
            )}
          </div>

          {/* Image Thumbnails */}
          <div className="flex space-x-2 p-4 overflow-x-auto">
            {productImages.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImageIndex(index)}
                className={`flex-shrink-0 w-16 h-16 rounded-lg border-2 overflow-hidden ${selectedImageIndex === index ? 'border-emerald-500' : 'border-gray-200'
                  }`}
              >
                <img
                  src={image}
                  alt={`${product.name} ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </section>

        {/* Product Info */}
        <section className="px-4 py-6 border-b border-gray-100">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h1 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <p className="text-gray-600 text-sm mb-3">{product.unit}</p>

              <div className="flex items-center space-x-3 mb-4">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl font-bold text-gray-900">₹{product.price}</span>
                  {product.originalPrice && (
                    <span className="text-lg text-gray-500 line-through">₹{product.originalPrice}</span>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium text-gray-900">4.3</span>
                  <span className="text-sm text-gray-600">(127 reviews)</span>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-1 text-emerald-600">
                    {feature.icon}
                    <span className="text-xs font-medium">{feature.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Add to Cart Section */}
          <div className="flex items-center justify-between">
            {quantity === 0 ? (
              <button
                onClick={handleIncrement}
                className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white py-3 px-6 rounded-xl font-semibold flex items-center justify-center space-x-2 transition-colors"
              >
                <Plus className="w-5 h-5" />
                <span>Add to Cart</span>
              </button>
            ) : (
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center space-x-3 bg-emerald-500 rounded-xl">
                  <button
                    onClick={handleDecrement}
                    className="text-white p-3 hover:bg-emerald-600 rounded-l-xl transition-colors"
                  >
                    <Minus className="w-5 h-5" />
                  </button>
                  <span className="text-white font-bold px-4 min-w-12 text-center text-lg">
                    {quantity}
                  </span>
                  <button
                    onClick={handleIncrement}
                    className="text-white p-3 hover:bg-emerald-600 rounded-r-xl transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Total</p>
                  <p className="text-xl font-bold text-gray-900">₹{product.price * quantity}</p>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Product Description */}
        <section className="px-4 py-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">About this product</h3>
          <p className="text-gray-600 leading-relaxed">
            {product.description || `Fresh ${product.name.toLowerCase()} sourced directly from local farms. 
            Carefully selected for quality and freshness. Rich in nutrients and perfect for your daily needs. 
            Stored in optimal conditions to maintain freshness until delivery.`}
          </p>
        </section>

        {/* Nutrition Information */}
        <section className="px-4 py-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Nutrition Information</h3>
          <div className="bg-gray-50 rounded-xl p-4">
            <p className="text-sm text-gray-600 mb-3">Per 100g serving</p>
            <div className="grid grid-cols-2 gap-3">
              {nutritionInfo.map((item, index) => (
                <div key={index} className="flex justify-between items-center py-1">
                  <span className="text-sm text-gray-700">{item.label}</span>
                  <span className="text-sm font-medium text-gray-900">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Storage Instructions */}
        <section className="px-4 py-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Storage Instructions</h3>
          <div className="bg-blue-50 rounded-xl p-4">
            <p className="text-sm text-blue-800">
              Store in a cool, dry place. For best freshness, consume within 3-5 days of delivery.
              Keep refrigerated if needed.
            </p>
          </div>
        </section>

        {/* Delivery Info */}
        <section className="px-4 py-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Delivery Information</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3 p-3 bg-emerald-50 rounded-lg">
              <Clock className="w-5 h-5 text-emerald-600" />
              <div>
                <p className="font-medium text-emerald-800">Express Delivery</p>
                <p className="text-sm text-emerald-600">Delivered in 20 minutes</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
              <Shield className="w-5 h-5 text-blue-600" />
              <div>
                <p className="font-medium text-blue-800">Quality Guarantee</p>
                <p className="text-sm text-blue-600">100% fresh or money back</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-orange-50 rounded-lg">
              <Truck className="w-5 h-5 text-orange-600" />
              <div>
                <p className="font-medium text-orange-800">Free Delivery</p>
                <p className="text-sm text-orange-600">On orders above ₹199</p>
              </div>
            </div>
          </div>
        </section>
        <Cart
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          cart={cart}
          store={store}
          onUpdateQuantity={onUpdateQuantity}
          onOrderViaWhatsApp={handleOrder}
        />
        <div className="h-20"></div>
      </div>
    </div>
  );
}