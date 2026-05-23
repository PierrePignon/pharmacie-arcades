'use client'
import { useState } from 'react'
import { PHARMA, wa } from '@/lib/constants'

export default function ContactFAB() {
  const [open, setOpen] = useState(false)
  const items = [
    {
      label: 'WhatsApp', sub: 'Réponse en journée',
      href: wa(`Bonjour, j'ai une question pour la ${PHARMA.name}.`),
      bg: 'var(--whatsapp)', external: true,
    },
    { label: 'SMS', sub: PHARMA.mobile, href: `sms:${PHARMA.mobileTel}`, bg: '#5B7FFF' },
    { label: 'Appeler', sub: PHARMA.phone, href: `tel:${PHARMA.phoneTel}`, bg: 'var(--green)' },
  ]
  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      {open && (
        <div className="flex flex-col gap-2 items-end">
          {items.map((it) => (
            <a key={it.label} href={it.href}
              target={it.external ? '_blank' : undefined} rel="noopener noreferrer"
              className="flex items-center gap-3 pl-4 pr-5 py-3 rounded-full shadow-lg text-white font-medium hover:scale-105 transition-transform"
              style={{ background: it.bg }}>
              <div className="flex flex-col leading-tight">
                <span className="text-sm font-semibold">{it.label}</span>
                <span className="text-xs opacity-90">{it.sub}</span>
              </div>
            </a>
          ))}
        </div>
      )}
      <button onClick={() => setOpen(!open)}
        aria-label={open ? 'Fermer' : 'Nous contacter'}
        className="w-16 h-16 rounded-full shadow-2xl flex items-center justify-center text-white hover:scale-110 transition-transform text-2xl"
        style={{ background: open ? 'var(--ink)' : 'var(--whatsapp)' }}>
        {open ? '✕' : '✉'}
      </button>
    </div>
  )
}
