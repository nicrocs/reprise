# 02 — Adopt Instant Navigations (cacheComponents + partialPrefetching)

**What to build:** Enable Next.js 16.3 Instant Navigations and add the required `<Suspense>` boundaries so authenticated routes can prerender their shells and stream dynamic content instantly.

**Blocked by:** 01 — Update Next.js to 16.3 and enable the Rust React Compiler.

**Status:** ready-for-agent

- [ ] Enable `cacheComponents: true` and `partialPrefetching: true` in `next.config.ts`
- [ ] Wrap `ClerkProvider` in `<Suspense>` in the root layout (`src/app/layout.tsx`)
- [ ] Extract async auth/Prisma work in `src/app/(app)/layout.tsx` into a suspense-bounded inner component
- [ ] Ensure `AppShell` / `SidebarContent` `usePathname()` usage is inside a `<Suspense>` boundary
- [ ] Add `loading.tsx` shells for the root and `(app)` route groups
- [ ] Verify `npm run build` passes with no `CLIENT_HOOK_DYNAMIC` or `blocking-prerender-dynamic` errors
- [ ] Verify navigations between authenticated routes show an instant shell

## Context

See `INSTANT_NAVIGATIONS_PLAN.md` for the full implementation plan.
