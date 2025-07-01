import React, { useState } from 'react';
import {
  ArrowLeft, Smartphone, Banknote, Copy, Check, ExternalLink
} from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { useOrderFlowStore } from '../store/orderFlowStore';
import { Store } from '../types';
import { useNavigate } from 'react-router-dom';
import { useStoreInfo } from '../store/storeInfo';



export function PaymentPage() {
  const {store, setStore}= useStoreInfo()
  const { cart, clearCart } = useCartStore();
  const { selectedAddress, setPayment } = useOrderFlowStore();
  const navigate = useNavigate();

  const [selectedPayment, setSelectedPayment] = useState<'upi' | 'cod' | null>(null);
  const [upiId, setUpiId] = useState('ajitkushawaha@ybl');
  const [copied, setCopied] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const deliveryFee = total >= 149 ? 0 : 20;
  const finalTotal = total + deliveryFee;

  const copyUpiId = () => {
    navigator.clipboard.writeText(upiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleUpiPayment = () => {
    setIsProcessing(true);
    const upiUrl = `upi://pay?pa=${upiId}&pn=${store.name}&am=${finalTotal}&cu=INR&tn=Order from VillageFresh`;

    const a = document.createElement('a');
    a.href = upiUrl;
    a.click();

    setTimeout(() => {
      setPayment('upi', {
        upiId,
        amount: finalTotal,
        transactionId: `TXN${Date.now()}`,
        status: 'pending'
      });
      setIsProcessing(false);
      navigate('/confirm-order');
    }, 3000);
  };

  const handleCodPayment = () => {
    setPayment('cod', {
      amount: finalTotal,
      paymentMethod: 'Cash on Delivery'
    });
    navigate('/confirm-order');
  };

  const paymentMethods = [
    {
      id: 'upi',
      name: 'UPI Payment',
      description: 'Pay using UPI apps like PhonePe, Paytm, GPay',
      icon: <Smartphone className="w-6 h-6" />,
      color: 'bg-blue-50 border-blue-200 text-blue-700'
    },
    {
      id: 'cod',
      name: 'Cash on Delivery',
      description: 'Pay when your order is delivered',
      icon: <Banknote className="w-6 h-6" />,
      color: 'bg-green-50 border-green-200 text-green-700'
    }
  ];
const onBack = ()=>{
  window.history.back()
}
  return (
    <div className="min-h-screen bg-white">
      <header className="bg-white shadow-sm sticky top-0 z-50 border-b">
        <div className="max-w-md mx-auto px-4 py-3">
          <div className="flex items-center space-x-3">
            <button onClick={onBack} className="p-2 text-gray-600 hover:text-gray-900">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-lg font-semibold text-gray-900">Payment</h1>
          </div>
        </div>
      </header>

      <div className="max-w-md mx-auto px-4 py-6">
        {/* Address */}
        {selectedAddress && (
          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <h3 className="font-semibold text-gray-900 mb-2">Deliver To</h3>
            <div className="text-sm text-gray-600">
              <p className="font-medium text-gray-900">{selectedAddress.name}</p>
              <p>{selectedAddress.address}</p>
              <p>{selectedAddress.phone}</p>
            </div>
          </div>
        )}

        {/* Order Summary */}
        <div className="bg-gray-50 rounded-xl p-4 mb-6">
          <h3 className="font-semibold text-gray-900 mb-3">Order Summary</h3>
          <div className="space-y-2 text-sm">
            {cart.map(item => (
              <div key={item.product.id} className="flex justify-between">
                <span>{item.product.name} × {item.quantity}</span>
                <span>₹{item.product.price * item.quantity}</span>
              </div>
            ))}
            <div className="border-t pt-2 mt-2 space-y-1">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{total}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery</span>
                <span>{deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}</span>
              </div>
              <div className="flex justify-between font-semibold text-lg pt-2">
                <span>Total</span>
                <span className="text-emerald-600">₹{finalTotal}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Method */}
        <h3 className="font-semibold text-gray-900 mb-3">Choose Payment Method</h3>
        <div className="space-y-4 mb-6">
          {paymentMethods.map(method => (
            <button
              key={method.id}
              onClick={() => setSelectedPayment(method.id as 'upi' | 'cod')}
              className={`w-full flex items-center space-x-3 p-4 rounded-xl border-2 ${
                selectedPayment === method.id
                  ? 'border-emerald-500 bg-emerald-50'
                  : 'border-gray-200'
              }`}
            >
              <div className={`p-2 rounded-lg ${method.color}`}>{method.icon}</div>
              <div className="flex-1 text-left">
                <p className="font-medium">{method.name}</p>
                <p className="text-sm text-gray-500">{method.description}</p>
              </div>
              {selectedPayment === method.id && (
                <Check className="text-emerald-600 w-5 h-5" />
              )}
            </button>
          ))}
        </div>

        {/* UPI ID Section */}
        {selectedPayment === 'upi' && (
          <div className="bg-blue-50 p-4 rounded-xl mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              UPI ID
            </label>
            <div className="flex space-x-2">
              <input
                className="flex-1 border border-gray-300 px-3 py-2 rounded-lg"
                value={upiId}
                onChange={e => setUpiId(e.target.value)}
              />
              <button
                onClick={copyUpiId}
                className="bg-blue-600 text-white p-2 rounded-lg"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
            <p className="mt-2 text-sm text-gray-600">
              Amount: ₹{finalTotal} — You'll be redirected to your UPI app
            </p>
          </div>
        )}

        {/* COD Note */}
        {selectedPayment === 'cod' && (
          <div className="bg-green-50 p-4 rounded-xl mb-6 text-sm text-gray-700">
            <p>Pay ₹{finalTotal} in cash when your order is delivered.</p>
            <p className="text-xs mt-1 text-gray-500">Please keep exact change ready.</p>
          </div>
        )}

        {/* Pay Button */}
        {selectedPayment && (
          <button
            onClick={selectedPayment === 'upi' ? handleUpiPayment : handleCodPayment}
            disabled={isProcessing}
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-4 rounded-xl font-semibold flex justify-center items-center space-x-2"
          >
            {isProcessing ? (
              <>
                <div className="animate-spin h-5 w-5 border-2 border-white rounded-full border-b-transparent" />
                <span>Processing...</span>
              </>
            ) : selectedPayment === 'upi' ? (
              <>
                <ExternalLink className="w-5 h-5" />
                <span>Pay ₹{finalTotal} via UPI</span>
              </>
            ) : (
              <>
                <Banknote className="w-5 h-5" />
                <span>Place Order (COD)</span>
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
