import { createClient } from '@supabase/supabase-js';

// Updated Supabase configuration - using environment variables with fallbacks
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://lfzaegzajuiekngixhul.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxmemFlZ3phanVpZWtuZ2l4aHVsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEwNTcxMDYsImV4cCI6MjA2NjYzMzEwNn0.kstm_yOi3PYuLdLWuwd5t38do5ZWDBOq8_pxGlOC0HE';

// Validate configuration
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Missing Supabase configuration');
  throw new Error('Supabase configuration is missing');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: 'pkce'
  },
  global: {
    headers: {
      'X-Client-Info': 'village-fresh-app'
    }
  }
});

// Test connection with better error handling
const testConnection = async () => {
  try {
    console.log('🔄 Testing Supabase connection...');
    
    // Test basic connectivity
    const { data, error } = await supabase.auth.getSession();
    
    if (error) {
      console.error('❌ Supabase auth error:', error.message);
      return false;
    }
    
    // Test database connectivity
    const { data: testData, error: dbError } = await supabase
      .from('users')
      .select('count')
      .limit(1);
    
    if (dbError) {
      console.error('❌ Supabase database error:', dbError.message);
      return false;
    }
    
    console.log('✅ Supabase connected successfully');
    return true;
  } catch (error: any) {
    console.error('❌ Supabase connection failed:', error.message);
    return false;
  }
};

// Test connection on initialization
testConnection();

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