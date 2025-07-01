import { CartItem, Store } from '../types';

interface Address {
  name: string;
  phone: string;
  address: string;
  pincode: string;
  landmark?: string;
}

interface PaymentDetails {
  upiId?: string;
  transactionId?: string;
}

export function generateWhatsAppMessage(
  cart: CartItem[],
  store: Store,
  total: number,
  address: Address,
  paymentMethod: 'upi' | 'cod',
  paymentDetails?: PaymentDetails,
  formattedOrderId:string,
): string {
  const itemsList = cart.map(item =>
    `• ${item.product.name} × ${item.quantity} = ₹${item.product.price * item.quantity}`
  ).join('\n');

  const paymentLine = paymentMethod === 'upi' && paymentDetails?.upiId
    ? `🧾 *Paid via UPI:* ${paymentDetails.upiId}`
    : '';

  const formattedDate = new Date().toLocaleString('en-IN');

  return `
🛒 *Order from ${store.name}*
🆔 *Order ID:* ${formattedOrderId}

📦 *Items:*
   ${itemsList}
💰 *Total:* ₹${total}

📍*Delivery Address:*  
    ${address.name}  
    ${address.address}, ${address.pincode}  
    Phone: ${address.phone}

💳 *Payment Method:* ${paymentMethod === 'upi' ? 'UPI' : 'Cash on Delivery'}
   ${paymentLine ? '\n' + paymentLine : ''}
🕒 *Order Time:* ${formattedDate}

`.trim();
}

export function openWhatsApp(whatsappNumber: string, message: string) {
  const cleanNumber = whatsappNumber.replace(/\D/g, '');
  const encodedMessage = encodeURIComponent(message);
  
  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

  const url = isMobile
    ? `whatsapp://send?phone=${cleanNumber}&text=${encodedMessage}`
    : `https://web.whatsapp.com/send?phone=${cleanNumber}&text=${encodedMessage}`;

  window.open(url, '_blank');
}
