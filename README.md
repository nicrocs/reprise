# Reprise

A practice session tracker for guitarists. Log what you practiced, track your tempo progress on specific songs, and build a searchable history of your musical development over time.

**Live:** [reprise.nicguestjelley.com](https://reprise.nicguestjelley.com)

---

## Features

- **Session logging** — record date, duration, topic, BPM, notes, and intention for each practice session
- **Song management** — songs are first-class entities with tuning, key, and capo stored once and reused across sessions
- **Song typeahead** — type a song name and existing songs appear as suggestions; new songs are created on the fly
- **BPM progression** — chart your tempo improvement on a specific song over time
- **Songs index** — browse all your songs sorted by most recently practiced, with total practice time per song
- **Session history** — full log of past sessions with edit and delete
- **Mood and focus ratings** — optional 1–5 ratings per session
- **Tags** — categorize sessions (repertoire, technique, songwriting, etc.)
- **Instructor tracking** — associate sessions with a specific instructor

## Stack

- **Framework:** [Next.js](https://nextjs.org) 16 (App Router)
- **Language:** TypeScript
- **Auth:** [Clerk](https://clerk.com)
- **Database:** PostgreSQL via [Neon](https://neon.tech)
- **ORM:** [Prisma](https://prisma.io) v7
- **UI:** [shadcn/ui](https://ui.shadcn.com) + [Tailwind CSS](https://tailwindcss.com)
- **Charts:** [Recharts](https://recharts.org)
- **Deployment:** [Vercel](https://vercel.com)

---

## Getting Started

### Prerequisites

- Node.js 18+
- A [Clerk](https://clerk.com) account and application
- A [Neon](https://neon.tech) Postgres database (or any Postgres database)

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/nicrocs/reprise.git
cd reprise
```

**2. Install dependencies**

```bash
npm install
```

**3. Set up environment variables**

Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

```env
# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

# Database
DATABASE_URL=
```

**4. Run database migrations**

```bash
npx prisma migrate dev
npx prisma generate
```

**5. Start the development server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Project Structure

```
src/
  app/
    (app)/              # Authenticated routes (with nav)
      sessions/         # Session list, new, edit
      songs/            # Songs index and detail
    sign-in/
    sign-up/
    actions/
      sessions.ts       # Server actions: create, update, delete session
      songs.ts          # Server actions: song queries
  components/
    session-form.tsx    # Reusable form for create and edit
    song-typeahead.tsx  # Debounced song search with tuning display
    tuning-select.tsx   # Tuning dropdown with hidden input for FormData
    bpm-chart.tsx       # Recharts line chart for BPM progression
    delete-button.tsx   # Delete with pending state
    submit-button.tsx   # Submit with pending state via useFormStatus
    back-button.tsx     # router.back() navigation
    nav.tsx             # Top nav with active state
  lib/
    prisma.ts           # Prisma client singleton with PrismaPg adapter
    constants.ts        # Shared constants (TUNING_LABELS, etc.)
prisma/
  schema.prisma
  generated/prisma/     # Generated Prisma client (do not edit)
```

---

## Data Model

### Song
Stores song metadata that persists across sessions. Tuning, key, and capo are properties of the song — not the session — so they're entered once and reused.

### Session
A single practice session. References a Song (optional), Instructor (optional), and Tags (many-to-many). Key fields include `duration` (minutes), `bpm`, `topic`, `notes`, `intention`, `mood`, and `focus`.

### Tag
User-scoped tags created on the fly via typeahead. Examples: repertoire, technique, songwriting, improv.

### Instructor
User-scoped instructors created on the fly via typeahead. Allows filtering sessions by instructor and tracking which songs came from which teacher.

### Recording
Stores a URL reference to an audio recording associated with a session. File storage not yet implemented.

---

## Technical Notes

**Server actions and the client/server boundary**

All files in `src/app/actions/` are marked `'use server'`. This is required — without it, Next.js may attempt to bundle server-only code (including the Prisma client and the `pg` adapter) into the browser bundle, causing build failures. Server actions can be called directly from client components; Next.js handles the network boundary transparently.

**Prisma client generation**

Prisma v7 generates the client locally into `prisma/generated/prisma` rather than `node_modules`. The `postinstall` script runs `prisma generate` automatically on each Vercel deploy to ensure the generated client is always in sync with the schema.

**shadcn Select and FormData**

shadcn's `Select` component doesn't use a native `<select>` element, so its value isn't automatically included in FormData on form submission. The `TuningSelect` component uses a hidden `<input>` that mirrors the selected value to work around this.

**Dynamic route params in Next.js 15+**

`params` in dynamic route pages is now a Promise and must be awaited: `const { id } = await params`. This applies to all dynamic routes (`[id]`, `[slug]`, etc.).

---

## Roadmap

- [ ] Tags UI (schema complete)
- [ ] Instructor typeahead UI (schema complete)
- [ ] Key and capo fields on song form (schema complete)
- [X] Intention field on session form (schema complete)
- [ ] Mood and focus rating UI (schema complete)
- [ ] Filter sessions by tag, tuning, instructor
- [ ] Search across sessions
- [ ] Practice streak tracking
- [ ] Weekly practice summary
- [ ] AI feature: practice recommendations based on session history
- [ ] AI feature: voice logging via Whisper API + LLM structured extraction
- [ ] Audio recording upload via Vercel Blob

---

## License

MIT