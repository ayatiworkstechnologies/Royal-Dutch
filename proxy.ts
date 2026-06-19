import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const LEGACY_TOKEN_KEY = 'rdmc_token';
const ADMIN_TOKEN_KEY = 'rdmc_admin_token';
const CUSTOMER_TOKEN_KEY = 'rdmc_customer_token';

export default function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const isAuthPage = pathname === '/login' || pathname === '/admin/login';
  const isAdminRoute = pathname.startsWith('/admin') && pathname !== '/admin/login';
  const isCustomerRoute = pathname.startsWith('/customer');

  if (isAuthPage) {
    return NextResponse.next();
  }

  if (isAdminRoute || isCustomerRoute) {
    const tokenKey = isAdminRoute ? ADMIN_TOKEN_KEY : CUSTOMER_TOKEN_KEY;
    const token = request.cookies.get(tokenKey)?.value || request.cookies.get(LEGACY_TOKEN_KEY)?.value;

    if (!token) {
      const loginUrl = new URL(isAdminRoute ? '/admin/login' : '/login', request.url);
      loginUrl.searchParams.set('from', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/customer/:path*', '/login'],
};
