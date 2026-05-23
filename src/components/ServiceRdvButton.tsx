'use client'
import { useRdv } from './RdvModal'

export default function ServiceRdvButton({ preset }: { preset?: string }) {
  const { open } = useRdv()
  return (
    <button onClick={() => open(preset)}
      className="text-xs font-semibold px-3 py-1.5 rounded-full whitespace-nowrap flex items-center gap-1.5 hover:scale-105"
      style={{ background: 'var(--terra)', color: 'var(--cream)' }}>
      Sur RDV
    </button>
  )
}
