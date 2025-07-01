import { supabase } from '../lib/supabase';
import { Database } from '../lib/supabase';

type Order = Database['public']['Tables']['orders']['Row'];
type OrderInsert = Database['public']['Tables']['orders']['Insert'];

export const orderService = {
  // Create new order
  async createOrder(order: OrderInsert) {
    const { data, error } = await supabase
      .from('orders')
      .insert(order)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Get user orders
  async getUserOrders(userId: string) {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  // Get single order
  async getOrder(id: string) {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  },

  // Update order status
  async updateOrderStatus(id: string, status: string) {
    const { data, error } = await supabase
      .from('orders')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Admin: Get all orders
  async getAllOrders() {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        users (
          name,
          email,
          phone
        )
      `)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },
};