import { db } from './firebaseConfig';
import { doc, setDoc, collection, getDocs, deleteDoc } from 'firebase/firestore';

export async function addOrUpdateProduct(product: any) {
  await setDoc(doc(db, 'products', product.id), {
  ...product,
  updatedAt: new Date()
}, { merge: true });
}

export async function getAllProducts() {
  const snapshot = await getDocs(collection(db, 'products'));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function deleteProduct(productId: string) {
  const productRef = doc(db, 'products', productId);
  await deleteDoc(productRef);
}
