import { NextResponse } from 'next/server';

export function middleware(request) {
    const userToken = request.cookies.get('accessToken');
    const path = request.nextUrl.pathname;
    const isPublicPath = path === '/auth';
    if (isPublicPath && userToken) {
        return NextResponse.redirect(new URL('/', request.nextUrl));
    }

    if (!isPublicPath && !userToken) {
        return NextResponse.redirect(new URL('/auth', request.nextUrl));
    }
}

export const config = {
    matcher: ['/', '/auth', '/events/:path*', '/tickets'],
};
