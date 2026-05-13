import Image from 'next/image'
import Link from 'next/link'

const galleryItems = [
  {
    name: 'Epiphone DR-100',
    tier: 'Starter Guitar',
    status: 'Unlocked',
    image: '/epiphone.webp',
    accent: 'from-[#f8d39b] via-[#f3be7c] to-[#7f4a28]',
  },
  {
    name: 'Next Acoustic',
    tier: '25 sessions',
    status: 'Locked',
    image: null,
    accent: 'from-[#efe7db] via-[#dfd2c0] to-[#bda68e]',
  },
  {
    name: 'Stage Upgrade',
    tier: '60 sessions',
    status: 'Locked',
    image: null,
    accent: 'from-[#e7dfd7] via-[#d2c5b7] to-[#9a7d63]',
  },
  {
    name: 'Martin Goal',
    tier: '120 sessions',
    status: 'Locked',
    image: null,
    accent: 'from-[#ece7df] via-[#ddd1c0] to-[#8d6f56]',
  },
]

export function GuitarCollectionShowcase() {
  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-[#eadfce] bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.96),_rgba(251,240,235,0.9)_38%,_rgba(236,221,206,0.96)_100%)] p-6 shadow-[0_24px_70px_rgba(99,56,24,0.12)]">
      <div className="absolute inset-x-0 top-0 h-28 bg-[linear-gradient(180deg,rgba(255,255,255,0.7),rgba(255,255,255,0))]" />
      <div className="absolute -right-10 top-6 h-40 w-40 rounded-full bg-[#f7dfba]/45 blur-3xl" />
      <div className="absolute -left-12 bottom-0 h-40 w-40 rounded-full bg-[#d8a26e]/20 blur-3xl" />

      <div className="relative grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(280px,0.9fr)]">
        <div className="flex flex-col gap-5">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-[#d7b28c] bg-white/85 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.26em] text-[#8a4a23]">
              Guitar Goals
            </span>
            <span className="text-xs uppercase tracking-[0.26em] text-[#9b7d62]">
              Portrait collection
            </span>
          </div>

          <div className="max-w-xl space-y-3">
            <h2 className="text-3xl font-semibold tracking-tight text-[#28150b]">
              Practice unlocks a guitar wall, not a badge row.
            </h2>
            <p className="text-sm leading-6 text-[#72553e]">
              Start with an Epiphone portrait card, then grow a gallery of instruments as session goals stack up.
              This can live on the dashboard now and collapse into a smaller summary later if you want it in the header.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-[1.4rem] border border-white/80 bg-white/75 p-4 shadow-[0_10px_30px_rgba(118,74,38,0.08)] backdrop-blur">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#9d724f]">
                Current Unlock
              </p>
              <p className="mt-2 text-lg font-semibold text-[#2e180d]">Epiphone DR-100</p>
              <p className="mt-1 text-sm text-[#7a604d]">Starter guitar earned at the beginning of the journey.</p>
            </div>
            <div className="rounded-[1.4rem] border border-white/80 bg-[#fffaf5]/80 p-4 shadow-[0_10px_30px_rgba(118,74,38,0.08)] backdrop-blur">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#9d724f]">
                Next Reveal
              </p>
              <p className="mt-2 text-lg font-semibold text-[#2e180d]">Portrait Gallery</p>
              <p className="mt-1 text-sm text-[#7a604d]">Each goal adds another full-height guitar card instead of a circular medal.</p>
            </div>
          </div>
        </div>

        <article className="relative overflow-hidden rounded-[1.8rem] border border-[#e4cfb6] bg-[linear-gradient(180deg,rgba(255,251,247,0.96),rgba(245,230,214,0.95))] p-4 shadow-[0_20px_50px_rgba(118,74,38,0.14)]">
          <div className="absolute inset-x-5 top-5 rounded-full border border-white/80 bg-white/55 px-3 py-1 text-center text-[11px] font-semibold uppercase tracking-[0.26em] text-[#8f5a32]">
            Dashboard collectible
          </div>
          <div className="relative flex min-h-[29rem] flex-col justify-between rounded-[1.4rem] bg-[linear-gradient(180deg,#fffdf9_0%,#f7ebde_50%,#ead4be_100%)] px-5 pb-5 pt-12">
            <div className="absolute inset-x-6 top-20 h-px bg-[linear-gradient(90deg,transparent,rgba(153,97,54,0.35),transparent)]" />
            <div className="absolute left-5 top-24 bottom-5 w-px bg-[linear-gradient(180deg,rgba(148,95,54,0.15),rgba(148,95,54,0))]" />
            <div className="absolute right-5 top-24 bottom-5 w-px bg-[linear-gradient(180deg,rgba(148,95,54,0.15),rgba(148,95,54,0))]" />

            <div className="relative mx-auto mt-4 flex h-[21rem] w-full max-w-[14rem] items-end justify-center">
              <div className="absolute inset-x-4 bottom-4 h-16 rounded-full bg-[#a96a39]/20 blur-2xl" />
              <Image
                src="/epiphone.png"
                alt="Epiphone DR-100 acoustic guitar portrait"
                fill
                className="object-contain drop-shadow-[0_22px_30px_rgba(64,33,11,0.28)]"
                sizes="(max-width: 1024px) 240px, 320px"
                priority
              />
            </div>

            <div className="relative mt-4 rounded-[1.25rem] border border-white/75 bg-white/70 p-4 backdrop-blur">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#9d724f]">
                    Collection No. 01
                  </p>
                  <h3 className="mt-2 text-xl font-semibold text-[#26140a]">Epiphone DR-100</h3>
                  <p className="mt-1 text-sm text-[#72553e]">
                    Natural top, student-first, the guitar that starts the wall.
                  </p>
                </div>
                <span className="rounded-full bg-[#2c1a12] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#f6eadf]">
                  Unlocked
                </span>
              </div>

              <div className="mt-4 flex items-center justify-between gap-3 border-t border-[#ebdcc9] pt-4">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.24em] text-[#9d724f]">Display</p>
                  <p className="text-sm font-medium text-[#3a2113]">Dashboard hero or profile header</p>
                </div>
                <Link
                  href="/goals"
                  className="rounded-full border border-[#cfa27d] bg-[#fff8f1] px-4 py-2 text-sm font-medium text-[#8a4a23] transition-colors hover:bg-[#f9ecdf]"
                >
                  View goals
                </Link>
              </div>
            </div>
          </div>
        </article>
      </div>

      <div className="relative mt-6">
        <div className="mb-3 flex items-center justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-[#9d724f]">
              Gallery progression
            </p>
            <p className="mt-1 text-sm text-[#72553e]">
              A portrait shelf of guitars that unlock as bigger milestones are met.
            </p>
          </div>
          <Link href="/goals" className="text-sm font-medium text-[#8a4a23] transition-opacity hover:opacity-70">
            See all goals
          </Link>
        </div>

        <div className="grid gap-3 md:grid-cols-4">
          {galleryItems.map((item) => (
            <article
              key={item.name}
              className="group relative overflow-hidden rounded-[1.5rem] border border-white/80 bg-white/70 p-3 shadow-[0_14px_35px_rgba(113,74,42,0.08)] backdrop-blur"
            >
              <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${item.accent}`} />
              <div className="relative overflow-hidden rounded-[1.1rem] bg-[linear-gradient(180deg,#fffaf4_0%,#f3e3d0_100%)]">
                <div className="relative aspect-[3/4]">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-contain p-4 transition-transform duration-300 group-hover:scale-[1.03]"
                      sizes="(max-width: 768px) 50vw, 18vw"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <div className="flex h-[78%] w-[42%] flex-col items-center">
                        <div className="h-[18%] w-[38%] rounded-t-[1rem] bg-[#49352a]" />
                        <div className="h-[36%] w-[16%] bg-[#6e5140]" />
                        <div className="h-[46%] w-full rounded-[42%] bg-[#cfb49a]" />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-3 space-y-1">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-sm font-semibold text-[#2c170c]">{item.name}</h3>
                  <span
                    className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] ${
                      item.status === 'Unlocked'
                        ? 'bg-[#2c1a12] text-[#f8ede2]'
                        : 'bg-[#efe7dc] text-[#8a715d]'
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
                <p className="text-xs uppercase tracking-[0.22em] text-[#9d724f]">{item.tier}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
