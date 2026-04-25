import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { DeleteSessionButton } from '@/components/delete-session-button'

export default async function SessionsPage() {
  const { userId } = await auth()

  if (!userId) return null

    const sessions = await prisma.session.findMany({
        where: { userId },
        orderBy: { date: 'desc' },
        include: { song: true, tags: true },
    })

  return (
    <main className="p-2">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold">Sessions</h1>        
      </div>
      {sessions.length === 0 ? (
        <p className="text-gray-500">No sessions yet. Log your first one!</p>
      ) : (
          <div className="grid grid-cols-1 divide-y divide-zinc-200 divide-solid">
          {sessions.map((session, index) => (
            <Link href={`/sessions/${session.id}/edit`} key={session.id}>
            <div className='flex items-start justify-between py-4 gap-4'>
              <div className='flex items-stretch gap-3 min-w-0'> 
                <div className={`w-0.75 rounded-full place-self-stretch shrink-0 ${index === 0 ? 'bg-warm' : 'bg-border'}`} />                
                <div className='min-w-0'>
                {session.song && (
                  <h2 className='text-sm font-medium'>
                    {session.song.title}
                  </h2>
                )}
                  <p className="text-sm text-muted-foreground truncate">{session.intention}</p>
                  {session.tags.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {session.tags.map((tag) => (
                        <span
                          key={tag.id}
                          className="rounded-full bg-[#FBF0EB] px-2.5 py-1 text-xs text-foreground"
                        >
                          {tag.name}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="flex gap-4 text-sm">
                      <span><span className="text-gray-400">Duration</span> {session.duration}m</span>
                      {session.bpm && <span><span className="text-gray-400">BPM</span> {session.bpm}</span>}
                    
                  </div>
                </div>
              </div>


                  

                <DeleteSessionButton id={session.id} />                    

            </div>
            </Link>
          ))}
        </div>

      )}
    </main>
  )
}
