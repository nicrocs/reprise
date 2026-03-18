import { PrismaClient } from '../prisma/generated/prisma'
import { PrismaPg } from '@prisma/adapter-pg'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env' })

const adapter = new PrismaPg({
connectionString: process.env.DATABASE_URL!,
})

const prisma = new PrismaClient({
  adapter
})

function normalize(topic: string): string {
  return topic.trim().toLowerCase().replace(/\b\w/g, c => c.toUpperCase())
}

async function main() {
const sessions = await prisma.session.findMany({
  select: { id: true, userId: true, topic: true },
})

const withTopics = sessions.filter(s => s.topic?.trim())

  for (const session of withTopics) {
    if (!session.topic?.trim()) continue

    const name = normalize(session.topic)

    const goal = await prisma.goal.upsert({
      where: { userId_name: { userId: session.userId, name } },
      update: {},
      create: { userId: session.userId, name },
    })

    await prisma.session.update({
      where: { id: session.id },
      data: { goalId: goal.id },
    })

    console.log(`Session ${session.id}: "${session.topic}" → Goal "${name}"`)
  }

  console.log('Migration complete.')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())