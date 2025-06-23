import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from 'bcrypt';
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import FacebookProvider from 'next-auth/providers/facebook';
import GoogleProvider from 'next-auth/providers/google';
import { prisma } from "../prisma";


//src/lib/auth/index.ts
export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 2, // 2 horas
    updateAge: 1 * 60 * 60, // 1 hora
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    }),

    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" }, // Alterado para email
        password: { label: "Senha", type: "password" }
      },
      async authorize(credentials) {
        const user = await prisma.user.findFirst({
          where: {
            email: credentials?.email,
          },
        });

        // Verificação segura de senha (use bcrypt em produção)
        console.log('confirmar metodo Autenticando usuário:', credentials?.email);
        /* @ts-ignore */
        if (user && await bcrypt.compare(credentials?.password, user.password)) {
          return user;
        }
        console.log('verificar esse tratamento');
        /* @ts-ignore */
        if (user && !user.active) {
          throw new Error('Sua conta está desativada');
        }


        return null;
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      //@ts-ignore
      session.user.id = token.id as string;
      return session;
    }
  }
};
