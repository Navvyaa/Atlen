
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';


const publicPaths = [
  '/',
  '/explore',
  '/api/auth/(.*)', // Allow auth API routes
];


const protectedPaths = [
  '/dashboard',

];

export function middleware(req: NextRequest) {
  const accessToken = req.cookies.get('accessToken');
  const refreshToken = req.cookies.get('refreshToken');
  const { pathname } = req.nextUrl;

  // Check if path is public or protected
  const isPublicPath = publicPaths.some(path => 
    pathname.startsWith(path) || pathname.match(path)
  );
  const isProtectedPath = protectedPaths.some(path => 
    pathname.startsWith(path)
  );

  if (!accessToken || !refreshToken) {
    if (isProtectedPath) {
      return NextResponse.redirect(new URL('/', req.url));
    }
  } else {
    if (pathname === '/') {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api/auth|_next/static|_next/image|images|favicon.ico).*)',
  ],
};

