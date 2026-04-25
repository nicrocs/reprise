# Reprise Project Status

Last updated: 2026-04-09

## Current Feature
**Branch:** `feature/session-tags`
**Focus:** Multi-select tag UI with pill display and removal

### Blockers
None

### In Progress
- [ ] Tag pill UI for selected tags
- [ ] Remove tag functionality (X on pill)
- [ ] Allow adding new tags on the fly (not just existing)

### Completed
- [x] Tag schema (Prisma)
- [x] `getTags` server action for typeahead
- [x] `TagsTypeahead` component (basic)
- [x] Create session with tags
- [x] Update session with tags (set replacement)

---

## Recently Completed
- Goal delete functionality with confirmation
- Tag backend (upsert, connect, set)

## Next Up (MVP Phase 1)
1. Window close warning (`beforeunload`)
2. Mood and focus rating UI
3. Music-themed visual design

## Post-MVP Ideas
- Pickup → intention flow
- Stats dashboard
- Voice logging via Whisper
```