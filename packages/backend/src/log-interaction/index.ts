import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { successResponse, errorResponse } from '../common/response.js';
import { getUserFromEvent } from '../common/auth.js';

const s3Client = new S3Client({});
const BUCKET_NAME = process.env.BUCKET_NAME || 'aura-interaction-logs';

interface InteractionLog {
  userId?: string;
  errorType: string;
  originalText: string;
  correctedText: string;
  action: 'accepted' | 'rejected' | 'explained';
  timestamp: string;
}

/**
 * Log Interaction Function - Records user interactions for analysis
 * Stores anonymized interaction data in S3 for future model training
 */
export async function handler(
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> {
  try {
    // Get user info (optional - can be anonymous)
    const user = getUserFromEvent(event);

    // Parse interaction data
    const body = JSON.parse(event.body || '{}');
    const { errorType, originalText, correctedText, action } = body;

    const log: InteractionLog = {
      userId: user?.userId,
      errorType,
      originalText,
      correctedText,
      action,
      timestamp: new Date().toISOString(),
    };

    // Generate a unique key for the log
    const date = new Date();
    const key = `interactions/${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getDate()}/${Date.now()}-${Math.random().toString(36).substring(7)}.json`;

    // Store in S3
    await s3Client.send(
      new PutObjectCommand({
        Bucket: BUCKET_NAME,
        Key: key,
        Body: JSON.stringify(log),
        ContentType: 'application/json',
      })
    );

    return successResponse({ logged: true });
  } catch (error) {
    console.error('Log interaction error:', error);
    return errorResponse(
      error instanceof Error ? error.message : 'Internal server error',
      500
    );
  }
}

