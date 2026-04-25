'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

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
    ],
  },
]

export function Sidebar() {
  const pathname = usePathname()
  return (
    <aside className='w-48 shrink-0 border-r border-border py-6 flex flex-col gap-6'>
      {sections.map((section) => (
        <div key={section.label} className='px-3'>
          <p className='text-xs uppercase tracking-widest text-muted-foreground mb-1 px-2'>
            {section.label}
          </p>
          {section.links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
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
    </aside>
  )
}