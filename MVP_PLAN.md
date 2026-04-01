# MVP Plan for Reprise

## Overview
This document tracks progress toward MVP launch for Reprise, a practice session tracker for guitarists.

---

## MVP Phase 1 (In Progress)

### ✅ Fix typeahead dropdown
- Issue: Dropdown remained visible after selecting a song or goal
- Fix: Added check in useEffect to skip fetching suggestions when query matches selected item
- Files: `src/components/goal-typeahead.tsx`, `src/components/song-typeahead.tsx`

### ✅ CRUD on goals page
- **Create:** New page at `/goals/new` with multiple goal creation
- **Read:** Goals list and detail pages working
- **Update:** Inline editing on goal detail page
- **Delete:** Not yet implemented

#### Remaining work:
- [ ] Add delete functionality to goal detail page
- [ ] Confirmation dialog before deletion
- [ ] Server action: `deleteGoal(id: string)`

### ⬜ Window close warning
- Warn user that unsaved session data will be lost if they close the window
- Likely: `beforeunload` event handler on finish page
- Need to detect when there's an active session that hasn't been saved

### ⬜ Mood and focus UI
- Schema already exists (`mood` and `focus` fields on Session)
- Add inputs to finish page
- Persist values via `createSession` and `updateSession` actions

---

## MVP Phase 2

### ⬜ Pickup → intention flow
- Allow previous session's "pickup" to become the new session's intention
- Could be: suggested text, auto-fill, or a "use previous pickup" button

### ⬜ Music-themed design
- Visual polish to make the app feel more music-oriented
- Consider: colors, typography, icons, imagery

---

## Post-MVP

### ⬜ Prettier
- Add Prettier for consistent code formatting
- Dev workflow improvement, not user-facing

### ⬜ Stats dashboard
- View recent activity and streaks
- Aggregate session data into meaningful insights

### ⬜ Search and filter
- Search sessions, goals, and songs
- Filter by date range, goal, song, etc.

### ⬜ Calendar view
- Click on a date to add or view sessions for that day
- Visual calendar layout for session history

---

## Notes

### Goal deletion behavior
- When a goal is deleted, sessions with that goal get `goalId: null`
- Sessions keep their data, just lose the goal association
- User can edit session to assign a different goal

### Case-insensitive goal deduping
- `createGoals` fetches existing goals and filters out case-insensitive duplicates
- Prevents "Sight reading" and "Sight Reading" from being created as separate goals
- Preserves existing casing when matching

---

## Next Actions

1. Implement delete goal functionality
   - Add `deleteGoal` server action
   - Add delete button to goal detail page
   - Add confirmation dialog

2. Add window close warning on finish page

3. Add mood and focus inputs to finish page