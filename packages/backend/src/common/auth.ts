import jwt from 'jsonwebtoken';
import { APIGatewayProxyEvent } from 'aws-lambda';

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-change-in-production';

export interface JwtPayload {
  userId: string;
  email: string;
  iat?: number;
  exp?: number;
}

export function verifyToken(token: string): JwtPayload {
  try {
    return jwt.verify(token, JWT_SECRET) as JwtPayload;
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
}

export function extractToken(event: APIGatewayProxyEvent): string | null {
  const authHeader = event.headers.Authorization || event.headers.authorization;
  
  if (!authHeader) {
    return null;
  }

  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return null;
  }

  return parts[1];
}

export function getUserFromEvent(event: APIGatewayProxyEvent): JwtPayload | null {
  const token = extractToken(event);
  
  if (!token) {
    return null;
  }

  try {
    return verifyToken(token);
  } catch (error) {
    return null;
  }
}

