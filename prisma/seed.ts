import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
    const tim = await prisma.user.upsert({
        where: { email: 'tim@example.com'},
        update: {},
        create: {
            name: "Tim",
            email: "tim@example.com"
        }
    })
    const Bob = await prisma.user.upsert({
        where: { email: 'Bob@example.com'},
        update: {},
        create: {
            name: "Bob",
            email: "Bob@example.com"
        }
    })
    const Kira = await prisma.user.upsert({
        where: { email: 'Kira@example.com'},
        update: {},
        create: {
            name: "Kira",
            email: "Kira@example.com"
        }
    })
    const Fred = await prisma.user.upsert({
        where: { email: 'Fred@example.com'},
        update: {},
        create: {
            name: "Fred",
            email: "Fred@example.com"
        }
    })
    const Adom = await prisma.user.upsert({
        where: { email: 'Adom@example.com'},
        update: {},
        create: {
            name: "Adom",
            email: "Adom@example.com"
        }
    })
    const George = await prisma.user.upsert({
        where: { email: 'George@example.com'},
        update: {},
        create: {
            name: "George",
            email: "George@example.com"
        }
    })

    await prisma.friend.createMany({
        data: [
            {userById: tim.id, friendById: Kira.id}
        ]
    })
    await prisma.friend.createMany({
        data: [
            {userById: tim.id, friendById: Fred.id}
        ]
    })
    await prisma.friend.createMany({
        data: [
            {userById: Kira.id, friendById: tim.id}
        ]
    })
    await prisma.friend.createMany({
        data: [
            {userById: Kira.id, friendById: Adom.id}
        ]
    })
    await prisma.friend.createMany({
        data: [
            {userById: Adom.id, friendById: George.id}
        ]
    })
    await prisma.friend.createMany({
        data: [
            {userById: Fred.id, friendById: tim.id}
        ]
    })
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
