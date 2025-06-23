import { enhance } from "@zenstackhq/runtime";
import { getServerSession } from "next-auth";
import { authOptionsZenstack } from "./auth/config";
//import prisma from "./prisma";
import { prisma } from "@/lib/prisma";
export async function getEnhancedPrisma() {
  const session = await getServerSession(authOptionsZenstack);

  return enhance(prisma, {
    // @ts-ignore
    user: session?.user
  });

}
