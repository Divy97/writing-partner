import { APIGatewayProxyResult } from 'aws-lambda';
import { ApiResponse } from './types.js';

export function successResponse<T>(data: T, statusCode = 200): APIGatewayProxyResult {
  const response: ApiResponse<T> = {
    success: true,
    data,
  };

  return {
    statusCode,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type,Authorization',
    },
    body: JSON.stringify(response),
  };
}

export function errorResponse(
  error: string,
  statusCode = 400
): APIGatewayProxyResult {
  const response: ApiResponse = {
    success: false,
    error,
  };

  return {
    statusCode,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type,Authorization',
    },
    body: JSON.stringify(response),
  };
}

