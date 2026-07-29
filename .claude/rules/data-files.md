# rule · one file per person

## why this exists

git only conflicts when two branches change **the same lines of the same file**. so this
project gives everybody their own file:

    src/data/members/sara.json
    src/data/members/omar.json
    src/data/members/zoya.json

six branches adding six different files is six clean merges. if this project kept everyone in
one array in one shared file, every merge after the first would conflict, and we would spend
the workshop untangling them instead of shipping.

## the rule

- create exactly one file: `src/data/members/<your-name>.json`
- lowercase, hyphens instead of spaces. `ali-raza.json`, not `Ali Raza.json`
- never open a file in that folder you did not create
- never touch `package.json`, `package-lock.json`, `src/components/`, or `src/lib/`

## the shape

    {
      "name": "sara",
      "role": "product owner",
      "emoji": "🌙",
      "tagline": "one short line, shows on the card",
      "about": "a few sentences, shows in the modal",
      "funFact": "shows in the modal",
      "extras": { "anything": "optional, free-form, shows in the modal" }
    }

every field except `extras` is required and must be a non-empty string. `extras` is an
optional flat object of strings. put whatever you like in it and the modal renders it
without anybody editing a component.
