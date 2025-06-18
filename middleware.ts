// middleware.ts
import { getToken } from 'next-auth/jwt';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {


  const path = req.nextUrl.pathname;
  const token = await getToken({ req, secret: process.env.SECRET });

  const isPublicPath = ['/signin', '/welcome'].includes(path);
  console.log('\n\n\nMiddleware:', path);

  if (isPublicPath || token) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL('/welcome', req.url));
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|api/auth|public|images|welcome|signin).*)',
  ],
};

