# team wall · house rules

the demo project for the dev flow workshop. deliberately small.

## the one rule that matters today

six people are branching off `main` at the same time, and all of those branches get merged
back within the hour. that only stays painless if nobody edits a file somebody else is
editing.

so: **the only file you create or change is `src/data/members/<your-name>.json`.**

detail in `.claude/rules/data-files.md`.

## rules for you, claude

- never rewrite history or force anything. no rebase, no `--force`. ever.
- never commit or push unless i ask. show me first.
- show me the diff before changing any file. every time.
- change only the files i named. no tidying while you're in there.
- if you're unsure, stop and ask. don't guess.

## project specifics

- never touch `package.json` or `package-lock.json`. an unasked-for lockfile change is the
  single most likely cause of a merge conflict in this workshop.
- never touch `src/components/` or `src/lib/`. everybody shares those.
- never touch another person's file in `src/data/members/`.
- `npm run dev` is already running in a terminal tab. don't start a second one.

## how the data works

one json file per person in `src/data/members/`. the filename minus `.json` is the id.
`src/lib/members.ts` reads the whole directory, validates each file, skips anything malformed
with a warning, and sorts by name. adding a person is adding one file: no index to update,
nothing shared to edit, nothing to conflict over.
