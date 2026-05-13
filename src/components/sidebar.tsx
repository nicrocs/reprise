'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { DashboardGuitarCard } from './dashboard-guitar-card'
import type { GuitarBadge } from '@/lib/guitar-badges'

const sections = [
  {
    label: 'Practice',
    links: [
      { href: '/dashboard', label: 'Dashboard' },
      { href: '/goals', label: 'Goals' },
      { href: '/sessions', label: 'Sessions' },
      { href: '/songs', label: 'Songs' },
    ],
  },
  {
    label: 'Progress',
    links: [
      { href: '/stats', label: 'Stats' },
      { href: '/badges', label: 'Badges' },
    ],
  },
]

type Props = {
  currentGuitar: GuitarBadge
  streak: number
}

type SidebarContentProps = Props & {
  onNavigate?: () => void
  className?: string
}

export function SidebarContent({
  currentGuitar,
  streak,
  onNavigate,
  className,
}: SidebarContentProps) {
  const pathname = usePathname()

  return (
    <div className={cn('flex h-full flex-col gap-6 py-6', className)}>
      {sections.map((section) => (
        <div key={section.label} className='px-3'>
          <p className='text-xs uppercase tracking-widest text-muted-foreground mb-1 px-2'>
            {section.label}
          </p>
          {section.links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onNavigate}
              className={cn(
                'flex items-center gap-2 px-2 py-1.5 rounded-md text-sm transition-colors',
                pathname.startsWith(link.href)
                  ? 'text-[#7A3A1A] bg-[#FBF0EB]'
                  : 'text-muted-foreground hover:text-foreground hover:bg-zinc-50'
              )}
            >
              <div className={cn(
                'w-1 h-1 rounded-full shrink-0',
                pathname.startsWith(link.href) ? 'bg-[#B85C2A]' : 'bg-transparent'
              )} />
              {link.label}
            </Link>
          ))}
        </div>
      ))}

      <DashboardGuitarCard guitar={currentGuitar} streak={streak} />
    </div>
  )
}

export function Sidebar({ currentGuitar, streak }: Props) {
  return (
    <aside className='hidden w-48 shrink-0 border-r border-border md:flex'>
      <SidebarContent currentGuitar={currentGuitar} streak={streak} className='w-full' />
    </aside>
  )
}
