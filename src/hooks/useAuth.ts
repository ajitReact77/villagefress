import { useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

interface UserProfile {
  id: string;
  email: string;
  name: string;
  phone?: string;
  avatar_url?: string;
  is_admin: boolean;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [connectionError, setConnectionError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const initializeAuth = async () => {
      try {
        // Test Supabase connection first
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Auth session error:', error);
          setConnectionError(`Authentication error: ${error.message}`);
          setLoading(false);
          return;
        }

        if (mounted) {
          setUser(session?.user ?? null);
          setIsAuthenticated(!!session?.user);
          
          if (session?.user) {
            await fetchUserProfile(session.user.id);
          } else {
            setLoading(false);
          }
        }
      } catch (error: any) {
        console.error('Auth initialization error:', error);
        if (mounted) {
          setConnectionError(`Connection failed: ${error.message}`);
          setLoading(false);
        }
      }
    };

    initializeAuth();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event, session?.user?.email);
      
      if (mounted) {
        setUser(session?.user ?? null);
        setIsAuthenticated(!!session?.user);
        setConnectionError(null);
        
        if (session?.user) {
          await fetchUserProfile(session.user.id);
        } else {
          setUserProfile(null);
          setIsAdmin(false);
          setLoading(false);
        }
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching user profile:', error);
        // Don't set connection error for profile fetch issues
        setLoading(false);
        return;
      }

      if (data) {
        setUserProfile(data);
        setIsAdmin(data.is_admin);
      }
      setLoading(false);
    } catch (error: any) {
      console.error('Error fetching user profile:', error);
      setLoading(false);
    }
  };

  const signInWithEmail = async (email: string, password: string) => {
    try {
      setConnectionError(null);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        console.error('Sign in error:', error);
        return { data: null, error };
      }
      
      console.log('Sign in successful:', data.user?.email);
      return { data, error: null };
    } catch (error: any) {
      console.error('Sign in exception:', error);
      setConnectionError(`Sign in failed: ${error.message}`);
      return { data: null, error };
    }
  };

  const signUpWithEmail = async (email: string, password: string, name: string) => {
    try {
      setConnectionError(null);
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
          },
        },
      });

      if (error) {
        console.error('Sign up error:', error);
        return { data: null, error };
      }

      if (data.user && !error) {
        // Create user profile
        const { error: profileError } = await supabase.from('users').insert({
          id: data.user.id,
          email: data.user.email!,
          name,
          is_admin: false,
        });
        
        if (profileError) {
          console.error('Profile creation error:', profileError);
        }
      }

      console.log('Sign up successful:', data.user?.email);
      return { data, error: null };
    } catch (error: any) {
      console.error('Sign up exception:', error);
      setConnectionError(`Sign up failed: ${error.message}`);
      return { data: null, error };
    }
  };

  const signInWithGoogle = async () => {
    try {
      setConnectionError(null);
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/home`,
        },
      });
      
      if (error) {
        console.error('Google sign in error:', error);
        return { data: null, error };
      }
      
      return { data, error: null };
    } catch (error: any) {
      console.error('Google sign in exception:', error);
      setConnectionError(`Google sign in failed: ${error.message}`);
      return { data: null, error };
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (!error) {
        setUser(null);
        setUserProfile(null);
        setIsAuthenticated(false);
        setIsAdmin(false);
        setConnectionError(null);
      }
      return { error };
    } catch (error: any) {
      console.error('Sign out error:', error);
      return { error };
    }
  };

  // Legacy methods for backward compatibility
  const login = (userData: any) => {
    console.log('Legacy login method called');
  };

  const logout = async () => {
    await signOut();
  };

  return {
    user,
    userProfile,
    isAuthenticated,
    isAdmin,
    loading,
    connectionError,
    signInWithEmail,
    signUpWithEmail,
    signInWithGoogle,
    signOut,
    login, // Legacy
    logout, // Legacy
  };
}