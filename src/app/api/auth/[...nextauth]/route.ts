// src/app/api/auth/[...nextauth]/route.ts

//########## DFESCOMENTAR O SESSIONPROVIDER PARA USAR O NEXTAUTH COM O PRISMA ##########
import { authOptions } from "@/lib/auth";
import NextAuth from "next-auth";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
