'use client'
import { useEffect, useState } from 'react'

type Status = { open: boolean; label: string; sub: string }

function computeStatus(now: Date): Status {
  const day = now.getDay()
  const mins = now.getHours() * 60 + now.getMinutes()
  // 9h-12h15 puis 15h-19h
  const M_OPEN = 9 * 60, M_CLOSE = 12 * 60 + 15, A_OPEN = 15 * 60, A_CLOSE = 19 * 60
  if (day === 0) return { open: false, label: 'Fermée', sub: 'Dimanche' }
  if (day === 6) {
    if (mins >= M_OPEN && mins < M_CLOSE) return { open: true, label: 'Ouverte', sub: 'Ferme à 12h15' }
    return { open: false, label: 'Fermée', sub: 'Samedi après-midi' }
  }
  if (mins >= M_OPEN && mins < M_CLOSE) return { open: true, label: 'Ouverte', sub: 'Ferme à 12h15' }
  if (mins >= A_OPEN && mins < A_CLOSE) return { open: true, label: 'Ouverte', sub: 'Ferme à 19h' }
  if (mins < M_OPEN) return { open: false, label: 'Fermée', sub: 'Ouvre à 9h' }
  if (mins < A_OPEN) return { open: false, label: 'Pause méridienne', sub: 'Ouvre à 15h' }
  return { open: false, label: 'Fermée', sub: 'Ouvre demain à 9h' }
}

export default function StatusBadge({
  variant = 'inline',
}: {
  variant?: 'inline' | 'hero'
}) {
  const [status, setStatus] = useState<Status>(() => computeStatus(new Date()))
  useEffect(() => {
    const tick = () => setStatus(computeStatus(new Date()))
    tick()
    const id = setInterval(tick, 60000)
    return () => clearInterval(id)
  }, [])

  const dotColor = status.open ? '#4ADE80' : '#F87171'

  if (variant === 'hero') {
    return (
      <div
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-10 backdrop-blur-md"
        style={{
          background: 'rgba(244,236,216,0.15)',
          color: 'var(--cream)',
          border: '1px solid rgba(244,236,216,0.3)',
        }}
      >
        <span className="w-1.5 h-1.5 rounded-full" style={{ background: dotColor }} />
        <span className="eyebrow" style={{ fontSize: 10 }}>
          {status.label.toUpperCase()} · {status.sub.toUpperCase()}
        </span>
      </div>
    )
  }

  return (
    <span className="flex items-center gap-2">
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: dotColor }} />
      <strong className="font-semibold tracking-wide eyebrow" style={{ fontSize: 11 }}>
        {status.label.toUpperCase()}
      </strong>
      <span className="opacity-75">— {status.sub}</span>
    </span>
  )
}
