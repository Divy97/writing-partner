import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { ExplanationRequestSchema } from '../common/types.js';
import { successResponse, errorResponse } from '../common/response.js';
import { getClaudeClient } from '../common/api-client.js';

/**
 * Explanation Function - AI-powered grammar explanations
 * Uses Claude for high-quality, educational explanations
 */
export async function handler(
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> {
  try {
    // Parse and validate request
    const body = JSON.parse(event.body || '{}');
    const { original_text, corrected_text, error_type } =
      ExplanationRequestSchema.parse(body);

    // Call Claude API
    const claude = getClaudeClient();
    const prompt = `You are an expert English teacher. A student made this error:

Original: "${original_text}"
Corrected: "${corrected_text}"
Error Type: ${error_type}

Provide:
1. A brief, clear explanation (2-3 sentences) of why the original was incorrect
2. The underlying grammar rule
3. Two additional correct examples using the same rule

Format your response as JSON:
{
  "explanation": "...",
  "rule": "...",
  "examples": ["example 1", "example 2"]
}`;

    const message = await claude.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    // Parse the response
    const responseText =
      message.content[0].type === 'text' ? message.content[0].text : '{}';
    
    let explanation;
    try {
      // Extract JSON from markdown code blocks if present
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        explanation = JSON.parse(jsonMatch[0]);
      } else {
        explanation = JSON.parse(responseText);
      }
    } catch (parseError) {
      console.error('Failed to parse explanation:', parseError);
      explanation = {
        explanation: 'Unable to generate explanation',
        rule: '',
        examples: [],
      };
    }

    return successResponse(explanation);
  } catch (error) {
    console.error('Explanation error:', error);
    return errorResponse(
      error instanceof Error ? error.message : 'Internal server error',
      500
    );
  }
}

