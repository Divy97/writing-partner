import { supabase } from './supabase';
import type { UserInteractionType } from './supabase';

/**
 * Database Helper Functions
 * Provides convenient methods for common database operations
 */

/**
 * Get or create user record
 * Called after successful authentication to ensure user exists in public.users
 */
export async function ensureUserExists(userId: string) {
  const { data: existingUser, error: fetchError } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single();

  if (existingUser) {
    return { data: existingUser, error: null };
  }

  // Create user record
  const { data: newUser, error: createError } = await supabase
    .from('users')
    .insert({
      id: userId,
      status: 'free',
    })
    .select()
    .single();

  if (createError) {
    return { data: null, error: createError };
  }

  // Create default settings
  await supabase.from('user_settings').insert({
    user_id: userId,
    weekly_digest_enabled: true,
    writing_niche: 'general',
  });

  return { data: newUser, error: null };
}

/**
 * Log an error correction interaction
 */
export async function logErrorInteraction(params: {
  userId: string;
  errorType: string;
  originalText: string;
  suggestedCorrection: string;
  interaction: UserInteractionType;
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
 * Get user settings
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
 * Update user settings
 */
export async function updateUserSettings(
  userId: string,
  settings: {
    weekly_digest_enabled?: boolean;
    writing_niche?: 'general' | 'technical' | 'academic' | 'casual' | 'business';
  }
) {
  const { data, error } = await supabase
    .from('user_settings')
    .update(settings)
    .eq('user_id', userId)
    .select()
    .single();

  return { data, error };
}

/**
 * Get user statistics for a date range
 */
export async function getUserStats(userId: string, startDate: Date, endDate: Date) {
  const { data, error } = await supabase
    .from('error_logs')
    .select('*')
    .eq('user_id', userId)
    .gte('created_at', startDate.toISOString())
    .lte('created_at', endDate.toISOString());

  if (error || !data) {
    return { data: null, error };
  }

  // Calculate statistics
  const totalCorrections = data.length;
  const acceptedCorrections = data.filter(log => log.interaction === 'accepted').length;
  const rejectedCorrections = data.filter(log => log.interaction === 'rejected').length;
  const ignoredCorrections = data.filter(log => log.interaction === 'ignored').length;

  // Count by error type
  const errorTypeBreakdown: Record<string, number> = {};
  data.forEach(log => {
    errorTypeBreakdown[log.error_type] = (errorTypeBreakdown[log.error_type] || 0) + 1;
  });

  return {
    data: {
      totalCorrections,
      acceptedCorrections,
      rejectedCorrections,
      ignoredCorrections,
      acceptanceRate:
        totalCorrections > 0 ? (acceptedCorrections / totalCorrections) * 100 : 0,
      errorTypeBreakdown,
    },
    error: null,
  };
}

/**
 * Get recent error logs
 */
export async function getRecentErrors(userId: string, limit = 50) {
  const { data, error } = await supabase
    .from('error_logs')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(limit);

  return { data, error };
}

/**
 * Get weekly digests
 */
export async function getWeeklyDigests(userId: string, limit = 10) {
  const { data, error } = await supabase
    .from('weekly_digests')
    .select('*')
    .eq('user_id', userId)
    .order('period_start_date', { ascending: false })
    .limit(limit);

  return { data, error };
}

