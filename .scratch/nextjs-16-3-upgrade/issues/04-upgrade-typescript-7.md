# 04 — Upgrade to TypeScript 7

**What to build:** Bump TypeScript to version 7 so `next build` uses the faster native `tsc` CLI for type checking.

**Blocked by:** External — waiting for `typescript-eslint` to support TypeScript 7 ([typescript-eslint#10940](https://github.com/typescript-eslint/typescript-eslint/issues/10940)). `eslint-config-next@16.3.1` bundles `typescript-eslint@8.67.0`, which requires `typescript: ">=4.8.4 <6.1.0"`.

**Status:** blocked

- [ ] `typescript-eslint` releases a version compatible with `typescript@^7`
- [ ] Bump `typescript` to `^7` in `package.json`
- [ ] Verify `npm run build` still passes (Next.js uses the `tsc` CLI by default)
- [ ] Verify `npm run lint` passes

## Notes

Next.js 16.3 already supports TypeScript 7 for builds via the project-local `tsc` CLI. The only blocker is the ESLint toolchain. Once that resolves, this should be a one-line dependency change.
