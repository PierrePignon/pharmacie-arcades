'use client'
import { useEffect, useState } from 'react'
import StatusBadge from './StatusBadge'
import { AnimatedNumber } from './ScrollEffects'
import { useRdv } from './RdvModal'
import { PHARMA, wa } from '@/lib/constants'

const STATS = [
  { n: PHARMA.since.toString(), l: "depuis\nl'ouverture" },
  { n: PHARMA.rating, l: `/5 sur Google\n${PHARMA.reviews} avis` },
  { n: '5', l: "membres\nde l'équipe" },
  { n: '5', l: 'univers\nparapharmacie' },
]

export default function HeroSection() {
  const [scrollY, setScrollY] = useState(0)
  const [ready, setReady] = useState(false)
  const { open: openRdv } = useRdv()

  useEffect(() => {
    const t = requestAnimationFrame(() => setReady(true))
    const onScroll = () => setScrollY(window.scrollY)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(t)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
  const parallax = isMobile ? 0 : Math.min(scrollY * 0.45, 180)
  const scale = isMobile ? 1 : (1.08 + scrollY * 0.00015)
  const fade = Math.max(0, 1 - scrollY / 520)

  return (
    <section className="relative" style={{ marginTop: '-84px' }}>
      <div className="relative h-screen min-h-[680px] max-h-[1100px] overflow-hidden">
        <div
          className="absolute inset-0 hero-photo will-change-transform"
          style={{
            transform: `translate3d(0, ${parallax}px, 0) scale(${scale})`,
            transformOrigin: 'center center',
          }}
        />
        {/* Overlay sombre subtil — laisse la pharmacie respirer */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(180deg, rgba(26,15,8,0.45) 0%, rgba(26,15,8,0.05) 25%, rgba(26,15,8,0.0) 55%, rgba(26,15,8,0.55) 100%)`,
          }}
        />

        {/* Contenu */}
        <div
          className="absolute inset-0 flex items-center transition-opacity duration-700"
          style={{ opacity: fade }}
        >
          <div className="max-w-[1500px] mx-auto w-full px-6 lg:px-10 pt-20 lg:pt-0">
            <div className={`hero-stagger flex justify-center lg:justify-end ${ready ? 'is-ready' : ''}`}>
              {/* Carte info à droite — cache la boutique voisine, laisse voir la pharmacie */}
              <div className="hero-card hero-stagger-item">
                <div className="hero-card-inner">
                  <div className="hero-card-eyebrow">— PHARMACIE DES ARCADES</div>
                  <div className="hero-card-title ff-display">
                    <span>Cécile et Pierre-François</span>
                    <em>Pignon</em>
                  </div>

                  <div className="hero-card-status">
                    <StatusBadge variant="inline" />
                  </div>

                  <div className="hero-card-divider" />

                  <div className="hero-card-row">
                    <span className="hero-card-label">Adresse</span>
                    <span className="hero-card-value">{PHARMA.address}</span>
                    <span className="hero-card-sub">{PHARMA.postal} {PHARMA.city}</span>
                  </div>

                  <div className="hero-card-row">
                    <span className="hero-card-label">Téléphone</span>
                    <a href={`tel:${PHARMA.phoneTel}`} className="hero-card-value hero-card-link">{PHARMA.phone}</a>
                  </div>

                  <div className="hero-card-row">
                    <span className="hero-card-label">Horaires</span>
                    <span className="hero-card-value">Lun – Ven : 9h – 12h · 15h – 19h</span>
                    <span className="hero-card-value">Samedi : 9h – 12h</span>
                  </div>

                  <div className="hero-card-cta">
                    <button
                      onClick={() => openRdv()}
                      className="hero-btn hero-btn-primary"
                    >
                      Prendre rendez-vous
                    </button>
                    <a
                      href={wa("Bonjour, j'ai une question rapide :")}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hero-btn hero-btn-secondary"
                    >
                      Une question
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <a
          href="#gammes"
          className="scroll-cue absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 transition-opacity duration-500"
          style={{ opacity: fade * 0.9, color: 'var(--cream)' }}
          aria-label="Défiler vers le contenu"
        >
          <span className="eyebrow opacity-70" style={{ fontSize: 9 }}>Découvrir</span>
          <span className="scroll-cue-line" />
        </a>
      </div>

      <div className="border-y relative overflow-hidden" style={{ background: 'var(--cream)', borderColor: 'var(--cream-deep)' }}>
        <div className="section-orb section-orb-terra" aria-hidden />
        <div className="max-w-[1500px] mx-auto px-6 lg:px-10 py-12 grid grid-cols-2 lg:grid-cols-4 gap-y-8">
          {STATS.map((s, i) => (
            <div key={i} className={`stat-cell flex items-baseline gap-3 px-2 ${i > 0 ? 'lg:border-l' : ''}`} style={{ borderColor: 'var(--cream-deep)' }}>
              <AnimatedNumber value={s.n} className="ff-display italic leading-none stat-number" style={{ color: 'var(--terra)', fontSize: 'clamp(3rem, 5vw, 4.5rem)', fontWeight: 500 }} />
              <span className="eyebrow whitespace-pre-line" style={{ color: 'var(--ink-mid)', fontSize: 10 }}>{s.l}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
