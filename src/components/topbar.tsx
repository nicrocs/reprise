'use client'

import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'

export function TopBar() {
  return (
    <header className="flex items-center justify-between px-6 py-3 border-b">
        <Link href="/sessions" className="flex items-center gap-1.5 font-semibold tracking-tight transition-opacity hover:opacity-70">
          <span className="w-1.5 h-1.5 rounded-full bg-warm shrink-0" />
          Reprise
        </Link>
        <Link
            href="/sessions/new"
            className={`${buttonVariants({ size: 'sm', variant: "outline" })} w-fit border-[#B85C2A] text-[#B85C2A] hover:bg-[#FBF0EB] hover:text-[#7A3A1A]`}
          >
            Log Session
        </Link>
    </header>
  )
}
