# 03 — Add useOffline network resilience

**What to build:** Enable Next.js 16.3 experimental `useOffline` support and surface an offline banner so users understand when soft navigations and Server Actions are pending due to a dropped connection.

**Blocked by:** 01 — Update Next.js to 16.3 and enable the Rust React Compiler.

**Status:** ready-for-agent

- [ ] Enable `experimental.useOffline: true` in `next.config.ts`
- [ ] Create `src/components/offline-banner.tsx` using `useOffline` from `next/offline`
- [ ] Mount the banner in `src/app/layout.tsx`
- [ ] Audit Server Actions and client `fetch` calls for offline UX (disable submit buttons, show pending state)
- [ ] Test with browser DevTools Network offline throttle
- [ ] Verify prefetched route shells render while offline
- [ ] Verify pending Server Actions complete after reconnecting

## Context

See `USE_OFFLINE_PLAN.md` for the full implementation plan.
