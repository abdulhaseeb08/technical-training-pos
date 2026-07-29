import fs from 'node:fs'
import path from 'node:path'
import { z } from 'zod'

const MEMBERS_DIR = path.join(process.cwd(), 'src', 'data', 'members')

// CI sets this so a malformed card file fails the build instead of being skipped quietly.
// locally it stays unset, so one person's typo never blanks the page for the whole room.
const isStrict = process.env.STRICT_MEMBERS === '1'

const memberSchema = z.object({
  name: z.string().min(1),
  role: z.string().min(1),
  emoji: z.string().min(1),
  tagline: z.string().min(1),
  about: z.string().min(1),
  funFact: z.string().min(1),
  extras: z.record(z.string(), z.string()).optional(),
})

export type Member = z.infer<typeof memberSchema> & { id: string }

function describe(error: z.ZodError): string {
  return error.issues
    .map((issue) => `${issue.path.join('.') || '(root)'}: ${issue.message}`)
    .join(', ')
}

function readMember(file: string): Member | null {
  const id = path.basename(file, '.json')
  let problem: string

  try {
    const raw = fs.readFileSync(path.join(MEMBERS_DIR, file), 'utf8')
    const result = memberSchema.safeParse(JSON.parse(raw))
    if (result.success) return { ...result.data, id }
    problem = describe(result.error)
  } catch (error) {
    problem = error instanceof Error ? error.message : String(error)
  }

  if (isStrict) throw new Error(`${file} is not a valid member card — ${problem}`)
  console.warn(`[team-wall] skipping ${file} — ${problem}`)
  return null
}

/**
 * every person on the wall is one file in src/data/members/. the directory is read at
 * request time, so adding somebody means adding a single file with no index to update and
 * nothing shared to edit. that is what keeps everyone's branch free of merge conflicts.
 */
export function getMembers(): Member[] {
  if (!fs.existsSync(MEMBERS_DIR)) return []

  return fs
    .readdirSync(MEMBERS_DIR)
    .filter((file) => file.endsWith('.json'))
    .map(readMember)
    .filter((member): member is Member => member !== null)
    .toSorted((a, b) => a.name.localeCompare(b.name))
}
