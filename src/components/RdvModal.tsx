'use client'
import { createContext, useContext, useState } from 'react'
import { PHARMA, wa } from '@/lib/constants'

type Ctx = { open: (preset?: string) => void }
const RdvCtx = createContext<Ctx>({ open: () => {} })

export const useRdv = () => useContext(RdvCtx)

export function RdvProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [preset, setPreset] = useState<string | undefined>()
  const open = (p?: string) => { setPreset(p); setIsOpen(true) }
  const close = () => setIsOpen(false)
  return (
    <RdvCtx.Provider value={{ open }}>
      {children}
      <RdvModal isOpen={isOpen} onClose={close} preset={preset} />
    </RdvCtx.Provider>
  )
}

function RdvModal({ isOpen, onClose, preset }: { isOpen: boolean; onClose: () => void; preset?: string }) {
  const [name, setName] = useState('')
  const [motif, setMotif] = useState(preset === 'grossesse' ? 'Conseil grossesse / femme enceinte' : 'Entretien pharmaceutique')
  const [slot, setSlot] = useState('')
  const [note, setNote] = useState('')

  if (!isOpen) return null

  const submit = () => {
    const msg = `Bonjour, je souhaite prendre RDV à la ${PHARMA.name}.\n\nNom : ${name || '[à compléter]'}\nMotif : ${motif}\nCréneau souhaité : ${slot || '[à compléter]'}${note ? `\nDétails : ${note}` : ''}`
    window.open(wa(msg), '_blank')
    onClose()
  }

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 modal-backdrop"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="bg-white rounded-2xl max-w-2xl w-full p-8 lg:p-10 relative shadow-2xl max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-10 h-10 rounded-full flex items-center justify-center hover:scale-110"
          style={{ background: 'var(--cream)', color: 'var(--ink)' }}
          aria-label="Fermer"
        >✕</button>
        <span className="eyebrow" style={{ color: 'var(--terra)', fontSize: 10 }}>— DEMANDE DE RDV</span>
        <h3 className="h-section leading-tight mt-3 mb-3" style={{ color: 'var(--ink)', fontSize: 'clamp(1.75rem, 3vw, 2.5rem)' }}>
          Réservons un créneau<br/>pour <em style={{ color: 'var(--terra)' }}>votre entretien</em>.
        </h3>
        <p className="text-sm leading-relaxed mb-7" style={{ color: 'var(--ink-mid)' }}>
          Remplissez ce mini-formulaire, on vous confirme par WhatsApp dans la journée. Pas de paiement, pas de compte à créer.
        </p>
        <div className="space-y-4">
          {[
            { label: 'VOTRE NOM', el: <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Marie Dupont" className="w-full px-4 py-3 rounded-xl text-base focus:outline-none" style={{ background: 'var(--cream)', color: 'var(--ink)', border: '1px solid var(--cream-deep)' }} /> },
            { label: 'MOTIF', el:
              <select value={motif} onChange={(e) => setMotif(e.target.value)} className="w-full px-4 py-3 rounded-xl text-base focus:outline-none" style={{ background: 'var(--cream)', color: 'var(--ink)', border: '1px solid var(--cream-deep)' }}>
                <option>Entretien pharmaceutique</option>
                <option>Conseil grossesse / femme enceinte</option>
                <option>Bilan partagé de médication (65+)</option>
                <option>Conseil traitement chronique</option>
                <option>Conseil voyage</option>
                <option>Autre — je précise ci-dessous</option>
              </select>
            },
            { label: 'CRÉNEAU SOUHAITÉ', el: <input type="text" value={slot} onChange={(e) => setSlot(e.target.value)} placeholder="ex: jeudi 14h, ou vendredi matin" className="w-full px-4 py-3 rounded-xl text-base focus:outline-none" style={{ background: 'var(--cream)', color: 'var(--ink)', border: '1px solid var(--cream-deep)' }} /> },
            { label: 'PRÉCISIONS (OPTIONNEL)', el: <textarea value={note} onChange={(e) => setNote(e.target.value)} rows={3} placeholder="Quelques mots sur votre besoin" className="w-full px-4 py-3 rounded-xl text-base focus:outline-none resize-none" style={{ background: 'var(--cream)', color: 'var(--ink)', border: '1px solid var(--cream-deep)' }} /> },
          ].map((f, i) => (
            <label key={i} className="block">
              <span className="eyebrow block mb-2" style={{ color: 'var(--ink-mid)', fontSize: 10 }}>{f.label}</span>
              {f.el}
            </label>
          ))}
        </div>
        <button onClick={submit} className="mt-7 w-full inline-flex items-center justify-center gap-3 px-6 py-4 rounded-full font-semibold shadow-xl hover:scale-[1.02]" style={{ background: 'var(--whatsapp)', color: 'white' }}>
          Envoyer la demande sur WhatsApp ↗
        </button>
        <p className="text-[11px] text-center mt-4 leading-relaxed" style={{ color: 'var(--ink-light)' }}>
          Vos infos ne sont pas stockées sur le site. On reçoit votre demande dans WhatsApp et on revient vers vous pour confirmer.
        </p>
      </div>
    </div>
  )
}
