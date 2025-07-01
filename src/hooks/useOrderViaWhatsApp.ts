// hooks/useOrderViaWhatsApp.ts
import { useCartStore } from '../store/cartStore';
import { useOrderFlowStore } from '../store/orderFlowStore';
import { generateWhatsAppMessage, openWhatsApp } from '../utils/whatsapp';
import { Store } from '../types';
import { useNavigate } from 'react-router-dom';

export function useOrderViaWhatsApp(store: Store, onClose?: () => void) {
  const { cart, clearCart } = useCartStore();
  const navigate = useNavigate();
  const {
    selectedAddress,
    paymentMethod,
    paymentDetails,
    resetOrderFlow,
  } = useOrderFlowStore();

  const handleOrder = () => {
    if (!selectedAddress || !paymentMethod) {
      alert('Please complete address and payment first.');
      return;
    }

    if (cart.length === 0) return;

    const total = cart.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
    console.log(store,"store")
    const message = generateWhatsAppMessage(
      cart,
      store,
      total,
      selectedAddress,
      paymentMethod,
      paymentDetails
    );

    openWhatsApp(store.whatsappNumber, message);
    clearCart();
    resetOrderFlow();
    if (onClose) onClose();
  };

  const handleProceedToOrder = () => {
    if (!selectedAddress) {
      navigate('/delivery-address');
    } else if (!paymentMethod) {
      navigate('/payment');
    } else {
      handleOrder();
    }
  };

  return { handleOrder, handleProceedToOrder };
}
