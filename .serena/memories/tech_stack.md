# Reprise tech stack

- npm workspaces monorepo; root Next app. `package.json` pins React 19.2.3, Next `^16.3.0`, Prisma/Client `^7.4.1`, TypeScript `^5`, `tsx` `^4.19.0`.
- TypeScript strict; module resolution bundler; `@/*` aliases `src/*`.
- Clerk auth, PostgreSQL/Neon, Prisma 7 with `@prisma/adapter-pg`.
- Prisma config in `prisma.config.ts` loads `dotenv/config`, schema at `prisma/schema.prisma`, migrations at `prisma/migrations`, DB URL from `DATABASE_URL`.
- Client output generated to `prisma/generated/prisma`; root postinstall runs `prisma generate`.