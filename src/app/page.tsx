import { TeamWall } from '@/components/TeamWall'
import { getMembers } from '@/lib/members'

export default function HomePage() {
  const members = getMembers()

  return (
    <main className="page">
      <header className="masthead">
        <p className="eyebrow">carbonteq · the dev flow workshop</p>
        <h1>the team wall</h1>
        <p className="lede">
          {members.length} {members.length === 1 ? 'card' : 'cards'} up here, and every one of
          them is a file somebody added on their own branch.
        </p>
      </header>
      <TeamWall members={members} />
    </main>
  )
}
