// hooks/useAuth.ts
import { useEffect, useState } from 'react';
import { auth, db } from '../firebase/firebaseConfig';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

export function useAuth() {
  const [user, setUser] = useState<any>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] =  useState(true)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async(firebaseUser) => {
      if (firebaseUser) {
         const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
        const userData = userDoc.data();
        setUser({ ...firebaseUser, ...userData });
        setIsAuthenticated(true);
        setIsAdmin(userData?.admin=== true)
      } else {
        setUser(null);
        setIsAuthenticated(false);
        setIsAdmin(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = (userData: any) => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    signOut(auth);
    setUser(null);
    setIsAdmin(false);
    setIsAuthenticated(false);
  };

  return { user, isAuthenticated,isAdmin, login, logout, loading };
}
