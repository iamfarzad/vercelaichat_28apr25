// This file intentionally left minimal for design work
// The original authentication middleware has been temporarily disabled

import { NextResponse, type NextRequest } from 'next/server';

// Simple pass-through middleware for design work
export function middleware(request: NextRequest) {
  return NextResponse.next();
}

// Limit middleware to specific paths
export const config = {
  matcher: ['/api/:path*'],
};
