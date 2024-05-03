import { NextResponse } from 'next/server';

export function middleware(request) {
    const userToken = request.cookies.get('accessTokenClient');
    const path = request.nextUrl.pathname;
    const isPublicPath = path === '/';

    if (!isPublicPath && !userToken) {
        return NextResponse.redirect(new URL('/', request.nextUrl));
    }
}

export const config = {
    matcher: ['/events/:path*', '/my-page/:path*'],
};
