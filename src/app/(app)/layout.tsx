import { auth } from '@clerk/nextjs/server'
import { AppShell } from '@/components/app-shell'
import { prisma } from '@/lib/prisma'
import { getBadgeProgress } from '@/lib/guitar-badges'

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { userId } = await auth()

  const sessionDates = userId
    ? await prisma.session.findMany({
        where: { userId },
        select: { date: true },
      })
    : []

  const badgeProgress = getBadgeProgress(sessionDates.map((session) => session.date))

  return (
    <AppShell currentGuitar={badgeProgress.currentBadge} streak={badgeProgress.streak}>
      {children}
    </AppShell>
  )
}
