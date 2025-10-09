import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { CorrectionRequestSchema, Correction } from '../common/types.js';
import { successResponse, errorResponse } from '../common/response.js';
import { getGeminiModel } from '../common/api-client.js';

/**
 * Correction Function - LLM-powered grammar and style corrections
 * Uses Google's Gemini 1.5 Flash for fast, accurate corrections
 */
export async function handler(
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> {
  try {
    // Parse and validate request
    const body = JSON.parse(event.body || '{}');
    const { text } = CorrectionRequestSchema.parse(body);

    // Call Gemini API
    const model = getGeminiModel();
    const prompt = `You are a grammar correction assistant. Analyze the following text and return ONLY a JSON array of corrections.

Text: "${text}"

Return a JSON array where each correction has:
- original_text: the incorrect text
- corrected_text: the correct version
- offset: character position in the original text
- length: length of the incorrect text
- error_type: one of "GRAMMAR", "SPELLING", "PUNCTUATION", "STYLE"

If there are no errors, return an empty array.

Example response format:
[
  {
    "original_text": "teh",
    "corrected_text": "the",
    "offset": 0,
    "length": 3,
    "error_type": "SPELLING"
  }
]`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const responseText = response.text();

    // Parse the JSON response
    let corrections: Correction[] = [];
    try {
      // Extract JSON from markdown code blocks if present
      const jsonMatch = responseText.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        corrections = JSON.parse(jsonMatch[0]);
      }
    } catch (parseError) {
      console.error('Failed to parse LLM response:', parseError);
      corrections = [];
    }

    return successResponse({ corrections });
  } catch (error) {
    console.error('Correction error:', error);
    return errorResponse(
      error instanceof Error ? error.message : 'Internal server error',
      500
    );
  }
}

