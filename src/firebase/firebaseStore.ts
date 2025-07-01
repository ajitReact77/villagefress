// firestoreService.ts

import { doc, setDoc, addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';

interface User {
  uid: string;
  displayName?: string;
  email?: string;
  phoneNumber?: string;
}

interface Store {
  id?: string;
  name?: string;
  ownerName?: string;
  phone?: string;
  address?: string;
  whatsappNumber?: string;
}

interface Order {
  userId: string;
  storeId: string;
  items: any[]; // You can define a specific type for items
  total: number;
}

// ✅ Save new or existing user
export async function saveUserToFirestore(user: User) {
  const userRef = doc(db, 'users', user.uid);
  await setDoc(userRef, {
    name: user.displayName || 'User',
    email: user.email || '',
    phone: user.phoneNumber || '',
    createdAt: new Date(),
    updatedAt: new Date(),
  }, { merge: true });
}

// ✅ Save store (you can pass a dynamic storeId if needed)
export async function saveStoreToFirestore(store: Store) {
  const storeRef = doc(db, 'stores', store.id || 'village-fresh');
  await setDoc(storeRef, {
    name: store.name || 'Village Store',
    ownerName: store.ownerName || 'Store Owner',
    phone: store.phone || '+9198989898',
    address: store.address || 'Khukhundoo Store',
    whatsappNumber: store.whatsappNumber || '+917617028576',
    updatedAt: new Date(),
  }, { merge: true });
}

// ✅ Save new order
export async function saveOrderToFirestore(order: Order) {
  const ordersRef = collection(db, 'orders');
  await addDoc(ordersRef, {
    userId: order.userId,
    storeId: order.storeId,
    items: order.items,
    total: order.total,
    status: 'pending',
    createdAt: new Date(),
  });
}

// ✅ Update only status of order
export async function updateOrderStatus(orderId: string, status: string) {
  const orderRef = doc(db, 'orders', orderId);
  await setDoc(orderRef, {
    status,
    updatedAt: new Date(),
  }, { merge: true });
}
