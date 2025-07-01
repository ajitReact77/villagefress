// src/supabase.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://lfzaegzajuiekngixhul.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxmemFlZ3phanVpZWtuZ2l4aHVsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEwNTcxMDYsImV4cCI6MjA2NjYzMzEwNn0.kstm_yOi3PYuLdLWuwd5t38do5ZWDBOq8_pxGlOC0HE'

export const supabase = createClient(supabaseUrl, supabaseKey);
