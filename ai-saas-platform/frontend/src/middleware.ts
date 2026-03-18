import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
 
export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value || request.headers.get('authorization')?.replace('Bearer ', '');
 
  const protectedPaths = ['/dashboard'];
  const authPaths = ['/login', '/register'];
 
  if (protectedPaths.some(path => request.nextUrl.pathname.startsWith(path)) && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
 
  if (authPaths.some(path => request.nextUrl.pathname.startsWith(path)) && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
 
  return NextResponse.next();
}
 
export const config = {
  matcher: ['/dashboard/:path*', '/login', '/register'],
};
