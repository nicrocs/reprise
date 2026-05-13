import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'

type Props = {
  guitar: {
    name: string
    tierLabel: string
    image: string | null
  }
  streak: number
  className?: string
}

export function DashboardGuitarCard({ guitar, streak, className }: Props) {
  return (
    <aside className={cn('mx-3 mt-auto overflow-hidden', className)}>
      <div className="bg-white p-2.5">
        <div className="mb-2 flex items-start justify-between gap-2">
          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-[#9d724f]">
              Guitar
            </p>
            <h2 className="mt-1 text-xs font-semibold leading-tight text-[#2b170c]">{guitar.name}</h2>
            <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-[#9d724f]">{guitar.tierLabel}</p>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[0.9rem]">
          <div className="relative aspect-3/4">
            {guitar.image ? (
              <Image
                src={guitar.image}
                alt={`${guitar.name} acoustic guitar`}
                fill
                className="object-contain"
                sizes="180px"
              />
            ) : (
              <div className="flex h-full items-center justify-center bg-[linear-gradient(180deg,#fffaf4_0%,#f3e3d0_100%)]">
                <div className="flex h-[76%] w-[40%] flex-col items-center opacity-90">
                  <div className="h-[18%] w-[38%] rounded-t-[1rem] bg-[#49352a]" />
                  <div className="h-[36%] w-[16%] bg-[#6e5140]" />
                  <div className="h-[46%] w-full rounded-[42%] bg-[#cfb49a]" />
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-2 flex items-center justify-between gap-2">
          <p className="text-[11px] leading-4 text-[#72553e]">
            Current unlock · {streak} {streak === 1 ? 'day' : 'days'}
          </p>
          <Link
            href="/badges"
            className="shrink-0 rounded-full border border-[#d2ab86] bg-[#fff8f1] px-2.5 py-1 text-[11px] font-medium text-[#8a4a23] transition-colors hover:bg-[#f9ecdf]"
          >
            Badges
          </Link>
        </div>
      </div>
    </aside>
  )
}
