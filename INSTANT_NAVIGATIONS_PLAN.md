# Instant Navigations Plan

## Goal
Adopt Next.js 16.3 Instant Navigations by enabling `cacheComponents` and `partialPrefetching`, adding the required `<Suspense>` boundaries around runtime data so routes can prerender their shells and stream dynamic content.

## Why this needs work
The app currently reads runtime/dynamic data outside of `<Suspense>`:
- `ClerkProvider` in `src/app/layout.tsx` calls `usePathname()`
- `src/app/(app)/layout.tsx` calls `await auth()` and `prisma.session.findMany()`
- Every `(app)` page calls `await auth()` and various Prisma queries
- `AppShell` / `SidebarContent` call `usePathname()`

With `cacheComponents: true`, any uncached runtime access must be inside a `<Suspense>` boundary or the route must opt out with `export const instant = false`.

## Steps

1. **Enable the flags in `next.config.ts`**
   ```ts
   cacheComponents: true,
   partialPrefetching: true,
   ```

2. **Root layout: isolate `ClerkProvider` in `<Suspense>`**
   - Wrap `<ClerkProvider>` in `<Suspense>` in `src/app/layout.tsx`
   - Provide a fallback that renders the same `<html>` / `<body>` structure without the Clerk runtime logic
   - Verify sign-in / sign-up pages still render correctly

3. **(app) layout: isolate auth + badge data in `<Suspense>`**
   - Extract the async auth/Prisma work into a new `AppLayoutInner` Server Component
   - Wrap it in `<Suspense>` in the layout, using a shell fallback (`AppShellFallback`)
   - Keep the fallback visually close to the real shell to avoid layout shift

4. **AppShell / Sidebar: isolate `usePathname()` in `<Suspense>`**
   - Ensure `AppShell` and `SidebarContent` pathname-dependent UI is rendered inside the layout-level `<Suspense>` boundary
   - If needed, extract pathname usage into a small inner Client Component wrapped in its own `<Suspense>`

5. **Add `loading.tsx` shells**
   - `src/app/loading.tsx`: root-level loading shell
   - `src/app/(app)/loading.tsx`: shared shell for authenticated routes
   - Use the same visual container/skeletons as `AppShellFallback`

6. **Per-page dynamic data**
   - Each `(app)` page currently awaits `auth()` and Prisma data at the top level
   - Option A (preferred): wrap each page’s async body in a page-level `<Suspense>` with a matching skeleton, or add a local `loading.tsx`
   - Option B: mark genuinely dynamic routes as blocking with `export const instant = false`

7. **Test and iterate**
   - `npm run build` must pass with no `CLIENT_HOOK_DYNAMIC` or `blocking-prerender-dynamic` errors
   - `npm run dev` starts cleanly
   - Use the Next.js DevTools Navigation Inspector to verify loading shells
   - Use Instant Insights to catch any remaining slow navigations

## Acceptance criteria
- `cacheComponents: true` and `partialPrefetching: true` are enabled
- `npm run build` passes
- Navigations between authenticated routes show an instant shell
- Dynamic content streams in without full-page reloads
- No route uses `export const instant = false` unless absolutely necessary
