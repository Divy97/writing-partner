import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { CorrectionRequestSchema, Correction } from '../common/types.js';
import { successResponse, errorResponse } from '../common/response.js';
import { getCommonCorrections } from '../common/api-client.js';

/**
 * Triage Function - Fast, rule-based grammar checks
 * This is the first line of defense, handling simple typos and common errors
 * using a dictionary-based approach for maximum speed and cost efficiency.
 */
export async function handler(
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> {
  try {
    // Parse and validate request
    const body = JSON.parse(event.body || '{}');
    const { text } = CorrectionRequestSchema.parse(body);

    // Find corrections using rule-based system
    const corrections: Correction[] = [];
    const commonCorrections = getCommonCorrections();
    const words = text.split(/\b/);
    let offset = 0;

    for (const word of words) {
      const lowerWord = word.toLowerCase();
      
      if (commonCorrections[lowerWord]) {
        corrections.push({
          original_text: word,
          corrected_text: commonCorrections[lowerWord],
          offset,
          length: word.length,
          error_type: 'TYPO',
        });
      }
      
      offset += word.length;
    }

    // If triage found corrections, return them
    // Otherwise, the text should be passed to the LLM-based correction service
    return successResponse({
      corrections,
      needsLlmCheck: corrections.length === 0,
    });
  } catch (error) {
    console.error('Triage error:', error);
    return errorResponse(
      error instanceof Error ? error.message : 'Internal server error',
      500
    );
  }
}

