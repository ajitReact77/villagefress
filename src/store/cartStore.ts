import { create } from 'zustand';

type Product = { id: string; name: string; price: number; category: string };
type CartItem = { product: Product; quantity: number };

interface CartState {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  setToastHandler: (fn: (msg: string) => void) => void; // ✅ setter for toast
}

let showToast: (msg: string) => void = () => {}; // local variable to hold the function

export const useCartStore = create<CartState>((set) => ({
  cart: [],
  addToCart: (product) =>
    set((state) => {
      const existing = state.cart.find(item => item.product.id === product.id);
      let updatedCart;

      if (existing) {
        updatedCart = state.cart.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        updatedCart = [...state.cart, { product, quantity: 1 }];
      }

      // ✅ Call toast function
      showToast(`✅ ${product.name} added`);

      return { cart: updatedCart };
    }),

  updateQuantity: (id, qty) =>
    set(state => ({
      cart: qty <= 0
        ? state.cart.filter(item => item.product.id !== id)
        : state.cart.map(item =>
            item.product.id === id ? { ...item, quantity: qty } : item
          )
    })),

  clearCart: () => set({ cart: [] }),

  // ✅ Assign external toast handler
  setToastHandler: (fn) => {
    showToast = fn;
  },
}));
