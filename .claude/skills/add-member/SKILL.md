---
name: add-member
description: Add a person to the team wall by creating their own JSON file under src/data/members/. Use whenever someone asks to be added to the wall, to add their card, or to put themselves on the team page.
---

# add a member to the team wall

creates exactly one new file, `src/data/members/<name>.json`, in the shape the app expects.
it never touches a shared file, which is what keeps every branch conflict-free.

## steps

1. ask for anything missing: name, role, emoji, a one-line tagline for the card, a couple of
   sentences for the modal, and a fun fact. **do not invent these** — they are about a real
   person sitting in the room.
2. work out the filename: lowercase, spaces to hyphens, drop anything that is not a letter,
   number or hyphen. "Ali Raza" becomes `ali-raza.json`.
3. check `src/data/members/` for that filename first. if it exists, stop and say so rather
   than overwriting somebody else.
4. show the file you are about to write, then create it once they confirm.
5. tell them to refresh `localhost:3000` and click details on their card.

## the shape

    {
      "name": "sara",
      "role": "product owner",
      "emoji": "🌙",
      "tagline": "one short line, shows on the card",
      "about": "a few sentences, shows in the modal",
      "funFact": "shows in the modal"
    }

`extras` is optional: a flat object of string keys to string values, rendered in the modal.

## do not

- do not edit `src/lib/members.ts`, any component, or another person's file
- do not add an import or a registry entry anywhere. the directory is read at runtime.
- do not commit or push. show the diff and let them do it.
