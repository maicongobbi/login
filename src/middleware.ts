
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isPublicRoute = createRouteMatcher([
  '/sign-in(.*)',
  '/sign-up(.*)'
])

export default clerkMiddleware(async (auth, req) => {



  console.log('\n\n\nauth for', await auth())
  if (!isPublicRoute(req)) {
    console.log('\n\n\nMiddleware: Protecting route', req.nextUrl.pathname)
    await auth.protect()
  }
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}

/* // middleware.ts
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

 */