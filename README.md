# the team wall

the demo project for the **dev flow workshop**. you are going to add yourself to this wall,
send it for review, and watch it go live.

## get it running

    npm install
    npm run dev

then open <http://localhost:3000>. you should see a few cards. click **details** on one.

the raw data behind the page is at <http://localhost:3000/api/team>.

## your job today

open `TICKET.md`, fill it in, and paste the whole thing into the claude panel in vs code.

the `developer` agent will write your card and show you the diff.

if you would rather see what it intends to do **before** anything is written, add
*"plan this first"* when you paste the ticket. you will get back the file it means to create
and exactly what goes in it, and nothing happens until you say go.

then refresh, click details on your own card, and the feature is done.

you never have to say which files to change. that is what the harness is for.

### doing it by hand instead

it is one file, `src/data/members/<your-name>.json`:

    {
      "name": "sara",
      "role": "product owner",
      "emoji": "🌙",
      "tagline": "one short line, shows on the card",
      "about": "a few sentences, shows in the modal",
      "funFact": "shows in the modal"
    }

`extras` is optional. add a flat object of strings and the modal renders whatever you put
there, without anybody touching a component:

    "extras": { "favourite word": "merged" }

## why one file each

git only conflicts when two branches change the same lines of the same file. everybody here
gets their own file, so six branches merge back into `main` cleanly. that is a deliberate
design choice, not an accident — see `.claude/rules/data-files.md`.

**so: never edit a card you did not create, and never commit `package-lock.json`.**

## what's in the harness

the `.claude/` folder is the point of the second half of the workshop. every piece is real and
running.

| file | what it is |
|---|---|
| `CLAUDE.md` | **rules.** read automatically at the start of every session. |
| `.claude/rules/data-files.md` | the one-file-per-person rule, in detail |
| `.claude/skills/plan/` | a **skill**. ask for it and it turns your ticket into a plan, then stops. |
| `.claude/skills/add-member/` | a **skill**. writes the card file in the right shape. |
| `.claude/agents/developer.md` | an **agent**. carries out a plan you approved. |
| `.claude/settings.json` | **permissions.** the deny list is a wall, not a request. |

the flow those add up to:

    your ticket  ->  [ plan skill  ->  YOU APPROVE ]  ->  developer agent  ->  add-member skill
                     \____ only if you ask for it ____/

the plan step is **opt-in on purpose**. some people want to see what is coming before anything
is written, some would rather get on with it, and that is a preference, not a house rule. ask
for a plan and you get one, and nothing is written until you approve it.

when you do ask, the approval is not decoration. a subagent cannot stop halfway to ask you
something, so the gate has to sit with you, in the chat, between the two halves. **you are the
handoff.**

the `developer` agent, on the other hand, is not optional. `CLAUDE.md` routes every
implementation to it rather than letting the main conversation write the file itself.

and one distinction worth keeping: **`CLAUDE.md` asks, `settings.json` forbids.** the house
rules are strong instructions that can be missed. the deny list on rebase and force-push
cannot be. the `developer` agent has no terminal at all, which is why it cannot run git even
if it wanted to.

copy this folder into your own projects on monday.

## the shape of the app

    src/app/page.tsx               reads the files, renders the wall
    src/app/api/team/route.ts      the same data, raw
    src/lib/members.ts             reads + validates src/data/members/*.json
    src/components/TeamWall.tsx    holds which card is open
    src/components/MemberCard.tsx  the compact view
    src/components/MemberModal.tsx the detailed view

one modal for the whole page, not one per card.
