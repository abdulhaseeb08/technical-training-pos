# the team wall

the demo project for the **dev flow workshop**. you are going to add yourself to this wall,
send it for review, and watch it go live.

## get it running

    npm install
    npm run dev

then open <http://localhost:3000>. you should see a few cards. click **details** on one.

the raw data behind the page is at <http://localhost:3000/api/team>.

## your job today

add **one** file, `src/data/members/<your-name>.json`:

    {
      "name": "sara",
      "role": "product owner",
      "emoji": "🌙",
      "tagline": "one short line, shows on the card",
      "about": "a few sentences, shows in the modal",
      "funFact": "shows in the modal"
    }

or just open the claude panel in vs code and say **"add me to the wall"** — the
`add-member` skill in `.claude/skills/` knows the shape and will do it for you.

refresh, click details on your own card, and that's the feature done.

`extras` is optional. add a flat object of strings to it and the modal renders whatever you
put there, with nobody touching a component:

    "extras": { "favourite word": "merged" }

## why one file each

git only conflicts when two branches change the same lines of the same file. everybody here
gets their own file, so six branches merge back into `main` cleanly. that is a deliberate
design choice, not an accident — see `.claude/rules/data-files.md`.

**so: never edit a card you did not create, and never commit `package-lock.json`.**

## what's in the harness

the `.claude/` folder is the point of the second half of the workshop. every piece in it is
real and running:

| file | what it is |
|---|---|
| `CLAUDE.md` | house rules. read automatically at the start of every session. |
| `.claude/rules/data-files.md` | the one-file-per-person rule, in detail |
| `.claude/skills/add-member/` | a **skill**. ask "add me to the wall" and it fires. |
| `.claude/agents/card-reviewer.md` | a **subagent**. read-only second opinion on your card before you open a PR. |
| `.claude/settings.json` | permissions. note the deny list: no rebase, no force push. |

copy that folder into your own projects on monday.

## the shape of the app

    src/app/page.tsx              reads the files, renders the wall
    src/app/api/team/route.ts     the same data, raw
    src/lib/members.ts            reads + validates src/data/members/*.json
    src/components/TeamWall.tsx   holds which card is open
    src/components/MemberCard.tsx the compact view
    src/components/MemberModal.tsx the detailed view

one modal for the whole page, not one per card.
