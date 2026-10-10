# Reprise task completion checks

- For Prisma schema changes: `npx prisma validate`, apply/create migration as appropriate, and `npx prisma generate`.
- Run `npm run lint` and `npm run build` for app changes.
- Root package has no configured test runner/test script; use targeted manual verification or add tests only where an established test setup exists.
- Preserve existing working-tree changes; inspect `git status` and targeted diffs before Prisma schema edits because schema/generated files may already be modified.