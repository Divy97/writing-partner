import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Missing Supabase environment variables');
}

// Backend uses service role key for admin operations
export const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

/**
 * Log an error interaction from the backend
 * This is called when users interact with corrections
 */
export async function logInteraction(params: {
  userId: string;
  errorType: string;
  originalText: string;
  suggestedCorrection: string;
  interaction: 'accepted' | 'rejected' | 'ignored';
  modelVersion?: string;
  contextMetadata?: Record<string, unknown>;
}) {
  const { data, error } = await supabase
    .from('error_logs')
    .insert({
      user_id: params.userId,
      error_type: params.errorType,
      original_text: params.originalText,
      suggested_correction: params.suggestedCorrection,
      interaction: params.interaction,
      interaction_at: new Date().toISOString(),
      model_version: params.modelVersion,
      context_metadata: params.contextMetadata,
    })
    .select()
    .single();

  return { data, error };
}

/**
 * Get user settings for personalization
 */
export async function getUserSettings(userId: string) {
  const { data, error } = await supabase
    .from('user_settings')
    .select('*')
    .eq('user_id', userId)
    .single();

  return { data, error };
}

/**
 * Check if user has premium access
 */
export async function checkUserAccess(userId: string) {
  const { data, error } = await supabase
    .from('users')
    .select('status, subscription_ends_at')
    .eq('id', userId)
    .single();

  if (error || !data) {
    return { isPremium: false, status: 'free' };
  }

  const isPremium =
    data.status !== 'free' &&
    (!data.subscription_ends_at || new Date(data.subscription_ends_at) > new Date());

  return { isPremium, status: data.status };
}


