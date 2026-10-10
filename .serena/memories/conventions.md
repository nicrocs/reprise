# Reprise conventions

- Use `@/` aliases for `src` imports; Prisma generated imports use relative paths into `prisma/generated/prisma`.
- Server actions in `src/app/actions/` begin with `'use server'`; authenticate via Clerk `auth()` and scope every DB lookup/mutation to the current `userId`.
- Put interactive components in `src/components/` with `'use client'`; keep server page data loading in App Router pages.
- Prisma schema is source; generated client files are never manually edited. Use migrations for schema changes.
- Existing TS style is strict, single quotes, no semicolons, function components, Tailwind/shadcn UI.