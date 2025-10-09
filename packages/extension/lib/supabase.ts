import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/supabase';

// Get environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing Supabase environment variables. Please check your .env file.'
  );
}

// Create a single supabase client for interacting with your database
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: false,
  },
});

// Helper type exports
export type Tables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Row'];

export type Enums<T extends keyof Database['public']['Enums']> =
  Database['public']['Enums'][T];

// Export commonly used types
export type User = Tables<'users'>;
export type ErrorLog = Tables<'error_logs'>;
export type UserSettings = Tables<'user_settings'>;
export type WeeklyDigest = Tables<'weekly_digests'>;

export type UserInteractionType = Enums<'user_interaction_type'>;
export type SubscriptionStatus = Enums<'subscription_status'>;
export type WritingNicheType = Enums<'writing_niche_type'>;
export type DigestStatusType = Enums<'digest_status_type'>;

