'use server'
import { prisma } from "../prisma";

export default async function findAccountAction(email: string) {
  console.log('findAccountAction:', email);

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
    select: {
      email: true,
      name: true,
    }

  });

  return user;

}