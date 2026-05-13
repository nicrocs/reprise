'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import type { GuitarBadge } from '@/lib/guitar-badges'
import { Sidebar, SidebarContent } from '@/components/sidebar'
import { TopBar } from '@/components/topbar'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'

type Props = {
  children: React.ReactNode
  currentGuitar: GuitarBadge
  streak: number
}

export function AppShell({ children, currentGuitar, streak }: Props) {
  const pathname = usePathname()
  const [navigationState, setNavigationState] = useState({
    isOpen: false,
    pathname,
  })

  const isNavigationOpen =
    navigationState.isOpen && navigationState.pathname === pathname

  return (
    <>
      <div className='container mx-auto max-w-4xl px-3 py-3 sm:px-4 sm:py-6'>
        <div className='flex min-h-[80vh] flex-col overflow-hidden rounded-xl border border-border bg-white'>
          <TopBar
            onOpenNavigation={() => setNavigationState({ isOpen: true, pathname })}
          />
          <div className='flex flex-1'>
            <Sidebar currentGuitar={currentGuitar} streak={streak} />
            <main className='min-w-0 flex-1 p-4 sm:p-6 md:p-8'>
              {children}
            </main>
          </div>
        </div>
      </div>

      <Dialog
        open={isNavigationOpen}
        onOpenChange={(open) =>
          setNavigationState((current) => ({ ...current, isOpen: open }))
        }
      >
        <DialogContent
          showCloseButton
          className='left-0 top-0 h-dvh w-[min(20rem,calc(100%-2.5rem))] max-w-none translate-x-0 translate-y-0 rounded-none border-y-0 border-l-0 p-0 data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left'
        >
          <DialogHeader className='border-b px-4 py-4 text-left'>
            <DialogTitle className='text-base font-semibold tracking-tight'>Navigation</DialogTitle>
          </DialogHeader>
          <SidebarContent
            currentGuitar={currentGuitar}
            streak={streak}
            onNavigate={() =>
              setNavigationState((current) => ({ ...current, isOpen: false }))
            }
            className='overflow-y-auto'
          />
        </DialogContent>
      </Dialog>
    </>
  )
}
