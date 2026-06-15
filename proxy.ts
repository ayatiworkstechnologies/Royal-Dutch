import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default function proxy(request: NextRequest) {
  const token = request.cookies.get('rdmc_token')?.value;

  const isAuthPage = request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/admin/login';
  const isAdminRoute = request.nextUrl.pathname.startsWith('/admin') && request.nextUrl.pathname !== '/admin/login';
  const isCustomerRoute = request.nextUrl.pathname.startsWith('/customer');

  if (isAuthPage) {
    if (token) {
      // Decode JWT token to check role (not easily done without library in Edge, so we let the client side handle redirect if they are on /login but already logged in)
      // or we can redirect to / as default fallback
      // return NextResponse.redirect(new URL('/', request.url));
    }
    return NextResponse.next();
  }

  if (isAdminRoute || isCustomerRoute) {
    if (!token) {
      const loginUrl = new URL(isAdminRoute ? '/admin/login' : '/login', request.url);
      loginUrl.searchParams.set('from', request.nextUrl.pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/customer/:path*', '/login'],
};
