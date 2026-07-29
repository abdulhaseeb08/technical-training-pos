'use client'

import { useCallback, useRef, useState } from 'react'
import type { Member } from '@/lib/members'
import { MemberCard } from './MemberCard'
import { MemberModal } from './MemberModal'

export function TeamWall({ members }: { members: Member[] }) {
  const [openId, setOpenId] = useState<string | null>(null)
  // remembered so focus can go back to the button that opened the modal, not to the top
  const triggerRef = useRef<HTMLButtonElement | null>(null)

  const open = useCallback((id: string, trigger: HTMLButtonElement) => {
    triggerRef.current = trigger
    setOpenId(id)
  }, [])

  const close = useCallback(() => {
    setOpenId(null)
    triggerRef.current?.focus()
  }, [])

  if (members.length === 0) {
    return (
      <p className="empty">
        to put the first one up: fill in <code>TICKET.md</code> and paste it into the claude
        panel, or write <code>src/data/members/your-name.json</code> by hand. then refresh.
      </p>
    )
  }

  const openMember = members.find((member) => member.id === openId) ?? null

  return (
    <>
      <ul className="wall">
        {members.map((member) => (
          <li key={member.id}>
            <MemberCard member={member} onOpen={open} />
          </li>
        ))}
      </ul>
      {/* one modal for the whole page, never one per card */}
      {openMember && <MemberModal member={openMember} onClose={close} />}
    </>
  )
}
