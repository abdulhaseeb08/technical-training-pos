---
name: plan
description: Work out what a task will change before anything gets written. Produces the blast radius, the exact file content, and what will deliberately not be touched, then stops for a human. Use whenever a ticket or task is handed over, before any implementation.
---

# plan before touching anything

turns a task into a short, checkable plan. it writes **nothing**. the output exists for a
human to read and approve.

## steps

1. read the task. if it arrived as a ticket, pull the real ask out of the description and the
   acceptance criteria.
2. work out **the single file** this touches. on this project that is almost always
   `src/data/members/<their-name>.json`. if a task looks like it needs more than one file, or
   needs anything in `src/components/` or `src/lib/`, **stop and say so**. that is a scoping
   problem, not something to solve by editing more files.
3. collect what's missing: name, role, emoji, tagline, about, fun fact. never invent details
   about a real person sitting in the room.
4. output the plan in exactly this shape:

       PLAN

       what you asked for:    <one line, in their words>
       the file i will make:  src/data/members/<name>.json
       what goes in it:       <the full json, formatted>
       what i will not touch: package-lock.json, src/components/, src/lib/,
                              anybody else's card
       what happens after:    you refresh localhost:3000 and your card is there

       waiting for you to say go.

5. **stop here.** do not write the file. do not call `add-member`. do not invoke the
   `developer` agent. the next move belongs to a human.

## why it stops

a plan you can read in ten seconds is the cheapest way to catch "it is about to edit four
files when i asked about one". that instinct is the most useful thing anyone takes out of this
workshop, and it only works if something pauses long enough for you to look.
