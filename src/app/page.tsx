import { TeamWall } from '@/components/TeamWall'
import { getMembers } from '@/lib/members'

/** reads sensibly at nought, one, and many, since the wall starts out empty. */
function lede(count: number): string {
  if (count === 0) {
    return 'nothing up here yet. the first card on this wall will be a file somebody added on their own branch.'
  }
  if (count === 1) {
    return "one card up here, and it's a file somebody added on their own branch."
  }
  return `${count} cards up here, and every one of them is a file somebody added on their own branch.`
}

export default function HomePage() {
  const members = getMembers()

  return (
    <main className="page">
      <header className="masthead">
        <p className="eyebrow">carbonteq · the dev flow workshop</p>
        <h1>the team wall</h1>
        <p className="lede">{lede(members.length)}</p>
      </header>
      <TeamWall members={members} />
    </main>
  )
}
