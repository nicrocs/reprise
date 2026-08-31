# 01 — Update Next.js to 16.3 and enable the Rust React Compiler

**What to build:** Upgrade the framework to Next.js 16.3, update the matching ESLint config package, and opt into the Rust-based React Compiler experiment so builds and dev start faster.

**Blocked by:** None — can start immediately.

**Status:** ready-for-agent

- [x] `next` updated to `^16.3.0` (resolved to `16.3.1`)
- [x] `eslint-config-next` updated to `^16.3.0`
- [x] `experimental.turbopackRustReactCompiler` enabled alongside existing `reactCompiler: true`
- [x] `npm run install` succeeds
- [x] `npm run lint` passes
- [x] `npm run build` passes
- [x] `npm run dev` starts successfully
