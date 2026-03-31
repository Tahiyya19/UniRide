import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_for_dev_only';
const secret = new TextEncoder().encode(JWT_SECRET);

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Public paths
    if (pathname === '/' || pathname.startsWith('/login')) {
        return NextResponse.next();
    }

    const token = request.cookies.get('uniride_session')?.value;

    if (!token) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    try {
        const { payload } = await jwtVerify(token, secret);
        const role = payload.role as string;
        
        // Admin routes protection
        if (pathname.startsWith('/admin') && role !== 'ADMIN') {
            return NextResponse.redirect(new URL('/', request.url));
        }
        
        // Driver routes protection
        if (pathname.startsWith('/driver') && role !== 'DRIVER') {
            return NextResponse.redirect(new URL('/', request.url));
        }

        // Rider routes protection
        if (pathname.startsWith('/rider') && role !== 'RIDER') {
            return NextResponse.redirect(new URL('/', request.url));
        }

        return NextResponse.next();
    } catch {
        // Invalid token
        const response = NextResponse.redirect(new URL('/', request.url));
        response.cookies.delete('uniride_session');
        return response;
    }
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
