// middleware.ts
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';


export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  // Exclua rotas de autenticação do middleware
  if (path.startsWith('/api/auth')) {
    return NextResponse.next();
  }

  // ... resto do seu middleware
}