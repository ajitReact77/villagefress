import { Routes, Route, useNavigate } from 'react-router-dom';
import Home from '../pages/HomePage';
import Auth from '../pages/AuthPage';
import Shop from '../pages/Shop';
import AdminDashboard from '../pages/AdminDashboard';
import { PrivateRoute } from './PrivateRoute';
import AdminRoute from './AdminRoute';
import BeautyPage from '../pages/BeutyPage';
import FashionPage from '../pages/FashionPage';
import { WelcomeHomePage } from '../pages/WelcomeHomePage';
import { ProductDetailWrapper } from '../components/ProductDetailWrapper';
import { SearchPage } from '../pages/SearchPage';
import { useCartStore } from '../store/cartStore';
import { useState } from 'react';
import { allProducts } from '../data/products';
import { DeliveryAddressPage } from '../pages/DeliveryAddressPage';
import { OrderConfirmationPage } from '../pages/OrderConfirmationPage';
import { PaymentPage } from '../pages/PaymentPage';


const AppRoutes = () => {
  const navigate = useNavigate()
  const { addToCart, updateQuantity } = useCartStore()
  const [cart, setCart] = useState<any[]>([]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<Auth />} />

      <Route
        path="/home"
        element={
          <PrivateRoute>
            <WelcomeHomePage />
          </PrivateRoute>
        }
      />

      {/* Category Pages */}
      <Route
        path="/shop"
        element={
          <PrivateRoute>
            <Shop />
          </PrivateRoute>
        }
      />
      <Route
        path="/fashion"
        element={
          <PrivateRoute>
            <FashionPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/beauty"
        element={
          <PrivateRoute>
            <BeautyPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/search"
        element={
          <PrivateRoute>
            <SearchPage
              user={null}
              onBack={() => navigate(-1)}
              onProductClick={(product) => navigate(`/shop/product/${product.id}`)}
              cart={cart}
              onAddToCart={addToCart}
              onUpdateQuantity={updateQuantity}
            />
          </PrivateRoute>
        }
      />
      <Route path="/delivery-address" element={<DeliveryAddressPage />} />
      <Route path="/payment" element={<PaymentPage/>} />
      <Route path="/confirm-order" element={<OrderConfirmationPage />} />


      {/* Product Details for Each Category */}
      <Route
        path="/shop/product/:id"
        element={
          <PrivateRoute>
            <ProductDetailWrapper />
          </PrivateRoute>
        }
      />
      <Route
        path="/fashion/product/:id"
        element={
          <PrivateRoute>
            <ProductDetailWrapper />
          </PrivateRoute>
        }
      />
      <Route
        path="/beauty/product/:id"
        element={
          <PrivateRoute>
            <ProductDetailWrapper />
          </PrivateRoute>
        }
      />

      {/* Optional fallback */}
      <Route
        path="/product/:id"
        element={
          <PrivateRoute>
            <ProductDetailWrapper />
          </PrivateRoute>
        }
      />

      {/* Admin */}
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
