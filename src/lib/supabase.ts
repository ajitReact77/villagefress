import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://lfzaegzajuiekngixhul.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxmemFlZ3phanVpZWtuZ2l4aHVsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEwNTcxMDYsImV4cCI6MjA2NjYzMzEwNn0.kstm_yOi3PYuLdLWuwd5t38do5ZWDBOq8_pxGlOC0HE';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});

// Test connection
supabase.auth.getSession().then(({ data, error }) => {
  if (error) {
    console.error('Supabase connection error:', error);
  } else {
    console.log('✅ Supabase connected successfully');
  }
});

// Database types
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          name: string;
          phone?: string;
          avatar_url?: string;
          is_admin: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          name: string;
          phone?: string;
          avatar_url?: string;
          is_admin?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          name?: string;
          phone?: string;
          avatar_url?: string;
          is_admin?: boolean;
          updated_at?: string;
        };
      };
      products: {
        Row: {
          id: string;
          name: string;
          price: number;
          original_price?: number;
          image: string[];
          category: string;
          unit?: string;
          in_stock: boolean;
          description?: string;
          rating?: number;
          reviews?: number;
          brand?: string;
          type?: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          price: number;
          original_price?: number;
          image: string[];
          category: string;
          unit?: string;
          in_stock?: boolean;
          description?: string;
          rating?: number;
          reviews?: number;
          brand?: string;
          type?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          price?: number;
          original_price?: number;
          image?: string[];
          category?: string;
          unit?: string;
          in_stock?: boolean;
          description?: string;
          rating?: number;
          reviews?: number;
          brand?: string;
          type?: string;
          updated_at?: string;
        };
      };
      orders: {
        Row: {
          id: string;
          user_id: string;
          items: any[];
          total: number;
          status: string;
          delivery_address: any;
          payment_method: string;
          payment_details?: any;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          items: any[];
          total: number;
          status?: string;
          delivery_address: any;
          payment_method: string;
          payment_details?: any;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          items?: any[];
          total?: number;
          status?: string;
          delivery_address?: any;
          payment_method?: string;
          payment_details?: any;
          updated_at?: string;
        };
      };
    };
  };
}