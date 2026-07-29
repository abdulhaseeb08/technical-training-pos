import type { Member } from '@/lib/members'

type MemberCardProps = {
  member: Member
  onOpen: (id: string, trigger: HTMLButtonElement) => void
}

/** the compact view. anything longer than a line belongs in the modal instead. */
export function MemberCard({ member, onOpen }: MemberCardProps) {
  return (
    <article className="card">
      <span className="card-emoji" aria-hidden="true">
        {member.emoji}
      </span>
      <h2 className="card-name">{member.name}</h2>
      <p className="card-role">{member.role}</p>
      <p className="card-tagline">{member.tagline}</p>
      <button
        type="button"
        className="card-button"
        onClick={(event) => onOpen(member.id, event.currentTarget)}
      >
        details
      </button>
    </article>
  )
}
