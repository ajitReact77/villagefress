// stores/orderFlowStore.ts
import { create } from 'zustand';

export interface Address {
  id: string;
  type: 'home' | 'work' | 'other';
  name: string;
  phone: string;
  address: string;
  landmark?: string;
  pincode: string;
  isDefault: boolean;
}

type PaymentMethod = 'upi' | 'cod';

interface OrderFlowState {
  selectedAddress: Address | null;
  paymentMethod: PaymentMethod | null;
  paymentDetails: any;
  deliveryType: 'instant' | 'schedule';
  setAddress: (address: Address) => void;
  setPayment: (method: PaymentMethod, details?: any) => void;
  resetOrderFlow: () => void;
  setDeliveryType: (type: 'instant' | 'schedule') => void;
}

export const useOrderFlowStore = create<OrderFlowState>((set) => ({
  selectedAddress: null,
  paymentMethod: null,
  paymentDetails: null,
  deliveryType: 'instant',

  setAddress: (address) => set({ selectedAddress: address }),
  setPayment: (method, details = null) =>
    set({ paymentMethod: method, paymentDetails: details }),
  setDeliveryType: (type) => set({ deliveryType: type }),
  resetOrderFlow: () =>
    set({
      selectedAddress: null,
      paymentMethod: null,
      paymentDetails: null,
      deliveryType: 'instant',
    }),
}));
