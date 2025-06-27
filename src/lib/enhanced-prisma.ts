import { enhance } from "@zenstackhq/runtime";
//import prisma from "./prisma";
import { prisma } from "@/lib/prisma";
import { authClient } from "./auth/betterAuthClient/client";
export async function getEnhancedPrisma() {
  /*   const session = await getServerSession(authOptionsZenstack); */
  const { data: session } = authClient.useSession()

  return enhance(prisma, {
    user: session?.user
  });

}
