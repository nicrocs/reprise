import { TopBar } from '@/components/topbar'
import { Sidebar } from '@/components/sidebar'

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className='container mx-auto max-w-4xl px-4 py-6'>

      <div className='border border-border rounded-xl bg-white overflow-hidden min-h-[80vh] flex flex-col'>
        <TopBar />
        <div className='flex flex-1'>
          <Sidebar />
          <main className='flex-1 min-w-0 p-8'>
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}