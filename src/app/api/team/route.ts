import { getMembers } from '@/lib/members'

// force-static lets `output: 'export'` emit this as a real json file for github pages.
export const dynamic = 'force-static'

export function GET() {
  return Response.json({ members: getMembers() })
}
