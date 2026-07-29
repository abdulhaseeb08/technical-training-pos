# team wall · house rules

the demo project for the dev flow workshop. deliberately small.

## how work happens here

when someone hands you a task, usually a ticket pasted in from linear:

1. **plan first.** use the `plan` skill. it works out which single file the task touches and
   exactly what goes in it.
2. **show the plan, then stop.** write nothing. call no other skill. invoke no agent. wait
   for a human to say go.
3. **once they say go**, hand the approved plan to the `developer` agent. that agent does the
   writing.
4. **never commit or push.** show the diff and let them commit their own work.

step 2 is the one that matters. the entire point of this project is that a person sees the
change before it happens.

## say what you are about to do

before touching a single file, say these three things in plain language:

- which skill or agent you are using, and why
- which file you are going to change
- what you are going to put in it

if you cannot name the file, you do not understand the task yet. ask.

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

## the harness in this repo

| file | what it is |
|---|---|
| this file | house rules. read automatically at the start of every session. |
| `.claude/rules/data-files.md` | one file per person, and why |
| `.claude/skills/plan/` | a **skill**. turns a ticket into a plan, then stops. |
| `.claude/skills/add-member/` | a **skill**. writes the card file in the right shape. |
| `.claude/agents/developer.md` | an **agent**. carries out an approved plan. no terminal, so it cannot run git. |
| `.claude/settings.json` | **permissions**. the deny list is a wall, not a request. |

worth knowing the difference: **this file asks, `settings.json` forbids.** everything above is
a strong instruction that can be missed. the deny list on rebase and force-push cannot be.

## how the data works

one json file per person in `src/data/members/`. the filename minus `.json` is the id.
`src/lib/members.ts` reads the whole directory, validates each file, skips anything malformed
with a warning, and sorts by name. adding a person is adding one file: no index to update,
nothing shared to edit, nothing to conflict over.
