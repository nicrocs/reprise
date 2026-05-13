import { auth } from '@clerk/nextjs/server'
import Image from 'next/image'
import { prisma } from '@/lib/prisma'
import { getBadgeProgress } from '@/lib/guitar-badges'

function LockedGuitarSilhouette({ unlocked }: { unlocked: boolean }) {
  return (
    <div className="flex h-full items-center justify-center">
      <div className={`flex h-[78%] w-[42%] flex-col items-center ${unlocked ? 'opacity-100' : 'opacity-70'}`}>
        <div className={`h-[18%] w-[38%] rounded-t-[1rem] ${unlocked ? 'bg-[#49352a]' : 'bg-[#766456]'}`} />
        <div className={`h-[36%] w-[16%] ${unlocked ? 'bg-[#6e5140]' : 'bg-[#927e6d]'}`} />
        <div className={`h-[46%] w-full rounded-[42%] ${unlocked ? 'bg-[#cfb49a]' : 'bg-[#d8cbbc]'}`} />
      </div>
    </div>
  )
}

export default async function BadgesPage() {
  const { userId } = await auth()
  if (!userId) return null

  const sessions = await prisma.session.findMany({
    where: { userId },
    select: { date: true },
  })

  const progress = getBadgeProgress(sessions.map((session) => session.date))

  return (
    <main className="space-y-8 p-2">
      <section className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_320px] lg:items-start">
        <div className="space-y-5">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-[11px] font-semibold uppercase tracking-[0.26em] text-[#8a4a23]">
              Badges
            </span>
            <span className="text-xs uppercase tracking-[0.26em] text-[#9b7d62]">
              Acoustic collection
            </span>
          </div>

          <div className="max-w-2xl space-y-3">
            <h1 className="text-3xl font-semibold tracking-tight text-[#28150b]">
              Your practice streak unlocks acoustic guitars.
            </h1>
            <p className="text-sm leading-6 text-[#72553e]">
              Every consecutive practice day moves you from common starter instruments toward rarer, higher-end
              acoustics.
            </p>
          </div>

          <div className="grid gap-6 border-t border-[#efe1d2] pt-5 sm:grid-cols-2">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#9d724f]">
                Current streak
              </p>
              <p className="mt-2 text-3xl font-semibold text-[#2e180d]">
                {progress.streak} <span className="text-lg">{progress.streak === 1 ? 'day' : 'days'}</span>
              </p>
              <p className="mt-1 text-sm text-[#7a604d]">
                {progress.currentBadge.tierLabel} unlocked with your current run.
              </p>
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#9d724f]">
                Next reveal
              </p>
              {progress.nextBadge ? (
                <>
                  <p className="mt-2 text-lg font-semibold text-[#2e180d]">{progress.nextBadge.name}</p>
                  <p className="mt-1 text-sm text-[#7a604d]">
                    {progress.remainingDays} more {progress.remainingDays === 1 ? 'day' : 'days'} to reach{' '}
                    {progress.nextBadge.unlockStreakDays}.
                  </p>
                </>
              ) : (
                <>
                  <p className="mt-2 text-lg font-semibold text-[#2e180d]">Collection complete</p>
                  <p className="mt-1 text-sm text-[#7a604d]">You have unlocked the final acoustic in the ladder.</p>
                </>
              )}
            </div>
          </div>
        </div>

        <article className="border border-[#eadfce] bg-[#fffaf5] p-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#9d724f]">
            Active guitar
          </p>

          <div className="mt-4 aspect-[4/5] bg-[#f8efe4] p-6">
            <div className="relative mx-auto h-full w-full max-w-[15rem]">
              {progress.currentBadge.image ? (
                <Image
                  src={progress.currentBadge.image}
                  alt={`${progress.currentBadge.name} acoustic guitar portrait`}
                  fill
                  className="object-contain"
                  sizes="(max-width: 1024px) 220px, 280px"
                  priority
                />
              ) : (
                <LockedGuitarSilhouette unlocked />
              )}
            </div>
          </div>

          <div className="mt-4 space-y-3 border-t border-[#eadfce] pt-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-[#26140a]">{progress.currentBadge.name}</h2>
                <p className="mt-2 text-sm leading-6 text-[#72553e]">{progress.currentBadge.description}</p>
              </div>
              <span className="shrink-0 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#7a3a1a]">
                Unlocked
              </span>
            </div>

            <div className="flex items-center justify-between gap-3 pt-2 text-sm">
              <div>
                <p className="text-[11px] uppercase tracking-[0.24em] text-[#9d724f]">Prestige</p>
                <p className="font-medium text-[#3a2113]">{progress.currentBadge.priceBand}</p>
              </div>
              <div className="text-right">
                <p className="text-[11px] uppercase tracking-[0.24em] text-[#9d724f]">Tier</p>
                <p className="font-medium text-[#3a2113]">{progress.currentBadge.tierLabel}</p>
              </div>
            </div>
          </div>
        </article>
      </section>

      <section>
        <div className="mb-4 flex items-end justify-between gap-4 border-b border-[#efe1d2] pb-4">
          <div className="flex flex-col gap-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-[#9d724f]">
              Full collection
            </p>
            <p className="mt-1 max-w-2xl text-sm leading-6 text-[#72553e]">
              Starter guitars come first. Legendary acoustics wait at the far end of the streak ladder.
            </p>
          </div>
          <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#8a4a23]">
            {progress.badges.filter((badge) => badge.unlocked).length}/{progress.badges.length} unlocked
          </div>
        </div>

        <div className="grid gap-x-8 gap-y-10 md:grid-cols-2 xl:grid-cols-3">
          {progress.badges.map((badge) => (
            <article
              key={badge.slug}
              className="group min-w-0"
            >
              <div className="relative aspect-[4/5] border border-[#efe2d4] bg-[#fbf5ef]">
                <div className="relative h-full w-full p-6">
                  {badge.image ? (
                    <Image
                      src={badge.image}
                      alt={badge.name}
                      fill
                      className="object-contain p-6"
                      sizes="(max-width: 768px) 44vw, 28vw"
                    />
                  ) : (
                    <LockedGuitarSilhouette unlocked={badge.unlocked} />
                  )}
                </div>
              </div>

              <div className="mt-4 space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-xl font-semibold leading-tight text-[#2c170c]">{badge.name}</h3>
                  <span className="shrink-0 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8a715d]">
                    {badge.isCurrent ? 'Active' : badge.unlocked ? 'Unlocked' : 'Locked'}
                  </span>
                </div>
                <p className="text-[11px] uppercase tracking-[0.24em] text-[#9d724f]">{badge.tierLabel}</p>
                <p className="max-w-[28ch] text-sm leading-7 text-[#72553e]">{badge.description}</p>
                <div className="flex items-start justify-between gap-4 border-t border-[#ebdcc9] pt-3 text-sm">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.18em] text-[#9d724f]">Streak</p>
                    <p className="font-medium text-[#3a2113]">
                      {badge.unlockStreakDays} {badge.unlockStreakDays === 1 ? 'day' : 'days'}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[11px] uppercase tracking-[0.18em] text-[#9d724f]">Prestige</p>
                    <p className="font-medium text-[#3a2113]">{badge.priceBand}</p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
