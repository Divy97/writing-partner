// Shared types for the extension

export interface User {
  id: string;
  email: string;
  fullName?: string;
}

export interface UserStats {
  corrections: number;
  wordsImproved: number;
  lessonsLearned: number;
  accuracyRate: number;
}

export interface Correction {
  id: string;
  original_text: string;
  corrected_text: string;
  offset: number;
  length: number;
  error_type: string;
}

export interface Explanation {
  explanation: string;
  rule: string;
  examples: string[];
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}

