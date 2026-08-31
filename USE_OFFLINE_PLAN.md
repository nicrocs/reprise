# useOffline Plan

## Goal
Enable Next.js 16.3 experimental network resilience so soft navigations, data fetches, and Server Actions stay pending when the network drops, then retry automatically when connectivity returns.

## Steps

1. **Enable the flag in `next.config.ts`**
   ```ts
   experimental: {
     useOffline: true,
   }
   ```

2. **Create an `OfflineBanner` component**
   - Path: `src/components/offline-banner.tsx`
   - Use the `useOffline` hook from `next/offline`
   - Render a non-intrusive banner when `isOffline` is true
   - Keep it client-only (`'use client'`)

3. **Mount the banner in the root layout**
   - Add `<OfflineBanner />` inside `<body>` in `src/app/layout.tsx`
   - Place it before `{children}` so it appears at the top of the viewport

4. **Audit user-facing async actions**
   - Forms that call Server Actions (session creation, goal edits, etc.)
   - Any `fetch` calls in client components
   - With `useOffline`, pending actions will auto-retry; consider adding optimistic UI or disabling submit buttons while offline for better UX

5. **Test offline behavior**
   - Start `next dev`
   - Use browser DevTools Network → Offline throttle
   - Confirm the banner appears
   - Navigate to a prefetched route and confirm the shell renders immediately; data streams in after reconnecting
   - Submit a form while offline and confirm it completes after reconnecting

## Acceptance criteria
- `npm run build` passes with `useOffline: true`
- Banner is visible only when the browser reports offline
- Prefetched route shells render while offline
- Server Actions/forms recover after reconnecting
