import { GoogleGenerativeAI } from '@google/generative-ai';
import Anthropic from '@anthropic-ai/sdk';

// Gemini client for fast corrections
const geminiApiKey = process.env.GEMINI_API_KEY || '';
const gemini = new GoogleGenerativeAI(geminiApiKey);

export function getGeminiModel() {
  return gemini.getGenerativeModel({ model: 'gemini-1.5-flash' });
}

// Claude client for detailed explanations
const claudeApiKey = process.env.CLAUDE_API_KEY || '';
const claude = new Anthropic({ apiKey: claudeApiKey });

export function getClaudeClient() {
  return claude;
}

// Simple rule-based corrections for triage
const commonCorrections: Record<string, string> = {
  'teh': 'the',
  'taht': 'that',
  'adn': 'and',
  'nad': 'and',
  'thier': 'their',
  'recieve': 'receive',
  'occured': 'occurred',
  'seperate': 'separate',
  'definately': 'definitely',
  'untill': 'until',
};

export function getCommonCorrections() {
  return commonCorrections;
}

