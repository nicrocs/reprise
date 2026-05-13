'use client'

import Link from 'next/link'
import { MenuIcon } from 'lucide-react'
import { Button, buttonVariants } from '@/components/ui/button'

type Props = {
  onOpenNavigation?: () => void
}

export function TopBar({ onOpenNavigation }: Props) {
  return (
    <header className="flex items-center justify-between gap-3 border-b px-4 py-3 sm:px-6">
      <div className="flex min-w-0 items-center gap-2">
        {onOpenNavigation ? (
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            className="md:hidden"
            aria-label="Open navigation menu"
            onClick={onOpenNavigation}
          >
            <MenuIcon />
          </Button>
        ) : null}
        <Link href="/sessions" className="flex min-w-0 items-center gap-1.5 font-semibold tracking-tight transition-opacity hover:opacity-70">
          <span className="w-1.5 h-1.5 rounded-full bg-warm shrink-0" />
          <span className="truncate">Reprise</span>
        </Link>
      </div>
        <Link
            href="/sessions/new"
            className={`${buttonVariants({ size: 'sm', variant: "outline" })} w-fit shrink-0 border-[#B85C2A] px-2.5 text-[#B85C2A] hover:bg-[#FBF0EB] hover:text-[#7A3A1A] sm:px-3`}
          >
            Log Session
        </Link>
    </header>
  )
}
