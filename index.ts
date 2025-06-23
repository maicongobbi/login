//import prisma from '@/lib/prisma'

import { prisma } from "@/lib/prisma"



async function main() {
  const user = await prisma.user.create({
    data: {
      email: 'asd@asd.com',
      name: 'asd',

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