'use client'

import { useEffect, useRef } from 'react'
import type { Member } from '@/lib/members'

const FOCUSABLE = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'

type MemberModalProps = {
  member: Member
  onClose: () => void
}

/** the detailed view. one instance lives on the page and swaps which member it shows. */
export function MemberModal({ member, onClose }: MemberModalProps) {
  const dialogRef = useRef<HTMLDivElement | null>(null)
  const closeRef = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    // lock the page behind the modal, and restore whatever it was afterwards
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose()
        return
      }
      if (event.key !== 'Tab') return

      // keep tab inside the dialog while it is open
      const nodes = dialogRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE)
      if (!nodes || nodes.length === 0) return

      const first = nodes[0]
      const last = nodes[nodes.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [onClose])

  const extras = Object.entries(member.extras ?? {})

  return (
    <div className="backdrop" onClick={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-name"
        ref={dialogRef}
        onClick={(event) => event.stopPropagation()}
      >
        <header className="modal-head">
          <span className="modal-emoji" aria-hidden="true">
            {member.emoji}
          </span>
          <div className="modal-title">
            <h2 id="modal-name">{member.name}</h2>
            <p className="modal-role">{member.role}</p>
          </div>
          <button
            type="button"
            className="modal-close"
            onClick={onClose}
            ref={closeRef}
            aria-label="close"
          >
            &#10005;
          </button>
        </header>

        <div className="modal-body">
          <section>
            <h3>about</h3>
            <p>{member.about}</p>
          </section>
          <section>
            <h3>fun fact</h3>
            <p>{member.funFact}</p>
          </section>
          {extras.length > 0 && (
            <section>
              <h3>anything else</h3>
              <dl className="extras">
                {extras.map(([key, value]) => (
                  <div key={key}>
                    <dt>{key}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>
            </section>
          )}
        </div>
      </div>
    </div>
  )
}
