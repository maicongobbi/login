import { enhance } from "@zenstackhq/runtime";
import { getServerSession } from "next-auth";
import { authOptionsZenstack } from "./auth/config";
import prisma from "./prisma";

export async function getEnhancedPrisma() {
  const session = await getServerSession(authOptionsZenstack);

  return enhance(prisma, {
    // @ts-ignore
    user: session?.user
  });

}
