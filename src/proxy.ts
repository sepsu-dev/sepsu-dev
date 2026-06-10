import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const adminToken = request.cookies.get('admin_token')?.value;

    const isLoginPage = pathname === '/login';
    const isAdminRoute = pathname.startsWith('/admin');

    // If accessing login page but already has token, redirect to admin
    if (isLoginPage && adminToken) {
        return NextResponse.redirect(new URL('/admin', request.url));
    }

    // If accessing admin routes without token, redirect to login
    if (isAdminRoute && !adminToken) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*', '/login'],
};
