import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, MessageCircle, Home, Copy } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { useOrderFlowStore } from '../store/orderFlowStore';
import { generateWhatsAppMessage, openWhatsApp } from '../utils/whatsapp';
import { useStoreInfo } from '../store/storeInfo';

export function OrderConfirmationPage() {
  const navigate = useNavigate();
  const { cart, clearCart } = useCartStore();
  const { store, setStore } = useStoreInfo();
  const {
    selectedAddress,
    paymentMethod,
    paymentDetails,
    deliveryType,
    resetOrderFlow,
    setDeliveryType,
  } = useOrderFlowStore();

  const total = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const deliveryFee = total >= 99 ? 0 : 20;
  const finalTotal = total + deliveryFee;
  const orderId = `VF${Date.now()}`;

  useEffect(() => {
    if (!selectedAddress || !paymentMethod || !store) {
      navigate('/confirm-order');
    }
  }, [selectedAddress, paymentMethod, store, navigate]);

  const handleSendToWhatsApp = () => {
    if (!selectedAddress || !paymentMethod || !store) {
      return;
    }

    let message = '';
    const address = selectedAddress;
    const formattedOrderId = `VF${Date.now()}`;
    const deliveryNote = deliveryType === 'instant'
      ? '⚡ Instant Delivery (Extra charges may apply)'
      : '🕕 Scheduled Delivery (6 PM - 8 PM) Free';

    if (paymentMethod === 'upi') {
      message = `
🛒 *Order Confirmation - ${store.name}*

📋 *Order ID:* ${formattedOrderId}
💳 *Payment:* UPI Payment Completed
💰 *Amount Paid:* ₹${finalTotal}
🆔 *Transaction ID:* ${paymentDetails?.transactionId}

📍*Delivery Address:*
   ${selectedAddress.name}
   ${selectedAddress.address}, ${selectedAddress.pincode}
   Phone: ${selectedAddress.phone}

📋 *Order Details:*
${cart.map(item =>
        `• ${item.product.name} - ${item.quantity} ${item.product.unit} = ₹${item.product.price * item.quantity}`
      ).join('\n')}

✅ *UPI ID:* ${paymentDetails?.upiId}
🕒 *Time:* ${new Date().toLocaleString('en-IN')}
🚚 *Delivery Type:* ${deliveryNote}

🙏 Please confirm my order and share delivery details.
`.trim();
    } else {
      message = generateWhatsAppMessage(
        cart,
        store,
        finalTotal,
        selectedAddress,
        paymentMethod,
        paymentDetails,
        formattedOrderId,
      ) + `

🚚 *Delivery Type:* ${deliveryNote}
   🙏 Please confirm this order and let me know the delivery time.`;
    }

    openWhatsApp(store.whatsappNumber, (message));
    clearCart();
    resetOrderFlow();
    navigate('/shop');
  };

  const copyOrderId = () => {
    navigator.clipboard.writeText(orderId);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-md mx-auto px-4 py-8">
        {/* ✅ Confirmation Message */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Order {paymentMethod === 'upi' ? 'Placed' : 'Confirmed'}!
          </h1>
          <p className="text-gray-600">
            {paymentMethod === 'upi'
              ? 'Your payment has been processed successfully'
              : 'Your order has been placed successfully'}
          </p>
        </div>

        {/* ✅ Delivery Option Selector */}
        <div className="bg-gray-100 rounded-xl p-4 mb-6">
          <h3 className="font-semibold text-gray-900 mb-2">Choose Delivery Time</h3>
          <div className="flex space-x-3">
            <button
              onClick={() => setDeliveryType('instant')}
              className={`px-4 py-2 rounded-lg font-medium ${deliveryType === 'instant' ? 'bg-green-500 text-white' : 'bg-white border border-gray-300 text-gray-700'}`}
            >
              Instant Delivery (₹20)
            </button>
            <button
              onClick={() => setDeliveryType('schedule')}
              className={`px-4 py-2 rounded-lg font-medium ${deliveryType === 'schedule' ? 'bg-green-500 text-white' : 'bg-white border border-gray-300 text-gray-700'}`}
            >
              Schedule 6–8 PM (Free)
            </button>
          </div>
        </div>

        {/* ✅ Order ID */}
        <div className="bg-gray-50 rounded-xl p-4 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Order ID</p>
              <p className="font-bold text-lg text-gray-900">{orderId}</p>
            </div>
            <button
              onClick={copyOrderId}
              className="p-2 bg-gray-200 rounded-lg hover:bg-gray-300"
            >
              <Copy className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>
        {/* ✅ Payment Summary */}
        <div className={`rounded-xl p-4 mb-6 ${paymentMethod === 'upi'
          ? 'bg-green-50 border border-green-200'
          : 'bg-blue-50 border border-blue-200'
          }`}>
          <h3 className="font-semibold text-gray-900 mb-2">Payment Details</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Method</span>
              <span className="font-medium text-gray-900">
                {paymentMethod === 'upi' ? 'UPI' : 'Cash on Delivery'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Amount</span>
              <span className="font-medium text-gray-900">₹{finalTotal}</span>
            </div>
            {paymentMethod === 'upi' && (
              <>
                <div className="flex justify-between">
                  <span className="text-gray-600">Transaction ID</span>
                  <span className="font-medium text-gray-900">{paymentDetails.transactionId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status</span>
                  <span className="font-medium text-green-600">✅ Completed</span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* ✅ Delivery Type */}
        <div className="bg-yellow-50 rounded-xl p-4 mb-6">
          <h3 className="font-semibold text-gray-900 mb-2">Delivery Time</h3>
          <div className="text-sm text-gray-700">
            {deliveryType === 'instant'
              ? '⚡ Instant Delivery (additional charge may apply)'
              : '🕕 Scheduled Delivery (between 6 PM - 8 PM)'}
          </div>
        </div>

        {/* ✅ Delivery Address */}
        <div className="bg-gray-50 rounded-xl p-4 mb-6">
          <h3 className="font-semibold text-gray-900 mb-2">Delivery Address</h3>
          <div className="text-sm text-gray-600">
            <p className="font-medium text-gray-900">{selectedAddress?.name}</p>
            <p>{selectedAddress?.address}</p>
            {selectedAddress?.landmark && <p>Landmark: {selectedAddress?.landmark}</p>}
            <p>{selectedAddress?.phone}</p>
            <p>Pincode: {selectedAddress?.pincode}</p>
          </div>
        </div>

        {/* ✅ Ordered Items */}
        <div className="bg-gray-50 rounded-xl p-4 mb-6">
          <h3 className="font-semibold text-gray-900 mb-3">Items</h3>
          <div className="space-y-3">
            {cart.map((item) => (
              <div key={item.product.id} className="flex items-center space-x-3">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-12 h-12 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <p className="font-medium text-gray-900 text-sm">{item.product.name}</p>
                  <p className="text-xs text-gray-600">
                    {item.quantity} × ₹{item.product.price} = ₹{item.product.price * item.quantity}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ✅ Next Steps */}
        <div className="bg-emerald-50 rounded-xl p-4 mb-6">
          <h3 className="font-semibold text-gray-900 mb-2">What's Next?</h3>
          <div className="space-y-2 text-sm text-gray-600">
            <p>• Send your order to the store via WhatsApp</p>
            <p>• Store confirms order & delivery time</p>
            <p>• Enjoy fresh delivery 🚚</p>
          </div>
        </div>

        {/* ✅ Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={handleSendToWhatsApp}
            className="w-full bg-green-500 hover:bg-green-600 text-white py-4 px-6 rounded-xl font-semibold flex items-center justify-center space-x-2"
          >
            <MessageCircle className="w-5 h-5" />
            <span>Send Order to Store via WhatsApp</span>
          </button>
          <button
            onClick={() => navigate('/home')}
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-4 px-6 rounded-xl font-semibold flex items-center justify-center space-x-2"
          >
            <Home className="w-5 h-5" />
            <span>Back to Home</span>
          </button>
        </div>

        {/* Support */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            Need help? Contact us at {store?.phone || 'N/A'}
          </p>
        </div>
      </div>
    </div>
  );
}