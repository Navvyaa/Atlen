// middleware.ts (or equivalent in your Next.js project)
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const accessToken = req.cookies.get('accessToken');
  const refreshToken = req.cookies.get('refreshToken');

  const publicPaths = ['/', '/login', '/register', '/forgot-password'];

  
  if (!accessToken || !refreshToken) {
    if (!publicPaths.includes(req.nextUrl.pathname)) {
      return NextResponse.redirect(new URL('/', req.url));
    }
  } else {
    // Redirect authenticated users away from public paths
    if (publicPaths.includes(req.nextUrl.pathname)) {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/login', '/register', '/forgot-password', '/dashboard/:path*'], 
};