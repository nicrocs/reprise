# Design: Instrument Selection for Practice Sessions

## Goal

Let users choose the instrument they are practicing when starting a session. Users should begin with Guitar and Bass available, while being able to maintain their own instrument catalog. Practice templates may provide a default instrument without preventing a different choice for an individual session.

## Data Model

Add a user-owned `Instrument` model with:

- `id`
- `userId`
- `name`
- `isArchived`
- `createdAt` and `updatedAt`

Instrument names are unique per user, case-insensitively after trimming. Guitar and Bass are ensured idempotently when the catalog is read, so existing users receive the defaults without a user-specific migration.

Add an optional `defaultInstrumentId` relation from `SessionTemplate` to `Instrument`.

Keep the existing `Session.instrument` string as a snapshot of the selected instrument name. When a session is saved, the selected catalog instrument's current name is copied into this field. Historical sessions therefore remain accurate if an instrument is later renamed or archived.

Archived instruments are unavailable for new sessions. Existing templates and historical sessions may continue to reference their values until the user changes them.

## User Experience

Add an `/instruments` page with a compact list and inline controls to:

- Add an instrument.
- Rename an instrument.
- Archive an instrument.
- Restore an archived instrument.

Add an `InstrumentPicker` to the new-session page alongside the practice-mode picker. The picker uses the existing selectable-pill style and links to instrument management rather than embedding CRUD controls in the session flow.

Selection behavior:

1. A selected template preselects its default instrument.
2. An explicit user selection overrides the template default.
3. Without a template, the most recently used instrument is preferred.
4. If no prior instrument exists, the picker may remain unselected.

Pass the selected instrument through `ActiveSession`, show it on the active and finish screens, and submit it as `instrument` when persisting the session. Include it in pickup settings and the pickup banner summary.

Add an optional default-instrument picker to the template create/edit form.

## Validation and Error Handling

- Reject empty or whitespace-only instrument names.
- Trim names before storing them.
- Reject case-insensitive duplicate names for the same user.
- Do not allow archiving the final available instrument if that would leave the user with no selectable instruments.
- Archived instruments should not be offered by the new-session or template pickers.
- Instrument catalog reads should ensure the Guitar and Bass defaults exist.

## Verification

Test the following behaviors:

- Instrument add, rename, archive, restore, duplicate validation, and final-instrument protection.
- Template default instrument persistence and loading.
- New-session selection, template preselection, and explicit override.
- Active-session and finish-screen propagation.
- Persisted `Session.instrument` snapshots and pickup reuse.
- TypeScript, lint, and the project's available test/build checks.

The change is intentionally limited to instrument selection, instrument management, and the related template/session plumbing.
