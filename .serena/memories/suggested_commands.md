# Reprise commands (Darwin)

- `npm run dev` — local Next dev server.
- `npm run lint` — ESLint.
- `npm run build` — production Next build.
- `npx prisma validate` — validate schema (Prisma config loads `.env`).
- `npx prisma migrate dev --name <name>` — create/apply local migration.
- `npx prisma generate` — regenerate Prisma Client.
- `npx tsx <script.ts> ...` — run TypeScript maintenance scripts.
- No test script is currently defined in root `package.json`.