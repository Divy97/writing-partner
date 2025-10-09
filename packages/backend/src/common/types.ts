import { z } from 'zod';

// Request/Response schemas
export const CorrectionRequestSchema = z.object({
  text: z.string().min(1).max(10000),
  userId: z.string().optional(),
});

export const CorrectionSchema = z.object({
  original_text: z.string(),
  corrected_text: z.string(),
  offset: z.number(),
  length: z.number(),
  error_type: z.string(),
});

export const CorrectionResponseSchema = z.object({
  corrections: z.array(CorrectionSchema),
});

export const ExplanationRequestSchema = z.object({
  original_text: z.string(),
  corrected_text: z.string(),
  error_type: z.string(),
});

export const ExplanationResponseSchema = z.object({
  explanation: z.string(),
  examples: z.array(z.string()),
  rule: z.string(),
});

// Type exports
export type CorrectionRequest = z.infer<typeof CorrectionRequestSchema>;
export type Correction = z.infer<typeof CorrectionSchema>;
export type CorrectionResponse = z.infer<typeof CorrectionResponseSchema>;
export type ExplanationRequest = z.infer<typeof ExplanationRequestSchema>;
export type ExplanationResponse = z.infer<typeof ExplanationResponseSchema>;

// API Response wrapper
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}

