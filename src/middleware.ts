
// middleware.ts
import { auth } from '@/lib/utils/auth';
import { betterFetch } from '@better-fetch/fetch';

import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

type Session = typeof auth.$Infer.Session;

export async function middleware(request: NextRequest) {
  const { data: session } = await betterFetch<Session>("/api/auth/get-session", {
    baseURL: request.nextUrl.origin,
    headers: {
      cookie: request.headers.get("cookie") || "", // Forward the cookies from the request
    },
  });

  console.log('Session:', session);


  const path = request.nextUrl.pathname;

  const isPublicPath = [
    '/sign-in',
    '/sign-up',
    '/forgot-account',
    '/forgot-account/forgot-password',
    '/forgot-account/forgot-password/reset-password',
    '/api/auth',
    '/welcome'].includes(path);

  console.log('\n\n\nMiddleware:', path);
  console.log('isPublicPath:', isPublicPath);

  if (isPublicPath || session) {

    return NextResponse.next();
  }

  return NextResponse.redirect(new URL('/welcome', request.url));
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|api/auth|public|images|welcome|sign-in).*)',
  ],
};

