# team wall · house rules

the demo project for the dev flow workshop. deliberately small.

## how work happens here

when someone hands you a task, usually a ticket pasted in from linear:

1. **say what you are about to do**, every time. see the next section.
2. **implementation goes to the `developer` agent.** you do not write the card file yourself,
   even though you easily could. hand the task over and let that agent do the writing. this is
   deliberate: the work belongs to a dedicated agent, not to whoever happens to be running
   this conversation.
3. **never commit or push.** show the diff and let them commit their own work.

### if they want a plan first

there is a `plan` skill in this repo. **do not invoke it unless they ask for it.** some people
want to see a plan before anything gets written and some would rather just get on with it.
that is their call, not yours.

if they do ask, run the skill, show them what it produces, and **stop** until they say go.
once they approve it, step 2 applies exactly as normal: the `developer` agent implements the
approved plan.

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
| `.claude/rules/data-files.md` | one file per person, and why. pulled in by the `@` line further down this file. |
| `.claude/skills/plan/` | a **skill**. ask for it and it turns a ticket into a plan, then stops. never automatic. |
| `.claude/skills/add-member/` | a **skill**. writes the card file in the right shape. |
| `.claude/agents/developer.md` | an **agent**. carries out an approved plan. no terminal, so it cannot run git. |
| `.claude/settings.json` | **permissions**. the deny list is a wall, not a request. |

worth knowing the difference: **this file asks, `settings.json` forbids.** everything above is
a strong instruction that can be missed. the deny list on rebase and force-push cannot be.

## the rules

the long-form rule for this project, loaded with this file:

@.claude/rules/data-files.md

## how the data works

one json file per person in `src/data/members/`. the filename minus `.json` is the id.
`src/lib/members.ts` reads the whole directory, validates each file, skips anything malformed
with a warning, and sorts by name. adding a person is adding one file: no index to update,
nothing shared to edit, nothing to conflict over.
