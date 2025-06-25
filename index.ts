//import prisma from '@/lib/prisma'

import { prisma } from "@/lib/prisma"



async function main() {
  const user = await prisma.user.create({
    data: {
      id: '123',
      email: 'asd@asd.com',
      name: 'asd',
      createdAt: new Date(),
      updatedAt: new Date(),
      emailVerified: false
    }
  })
  console.log('User created:', user)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })