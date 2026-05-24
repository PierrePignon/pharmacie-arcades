'use client'
import { useEffect, useState } from 'react'
import StatusBadge from './StatusBadge'
import { AnimatedNumber, MagneticButton } from './ScrollEffects'
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

  const parallax = Math.min(scrollY * 0.45, 180)
  const scale = 1.08 + scrollY * 0.00015
  const fade = Math.max(0, 1 - scrollY / 520)

  return (
    <section className="relative" style={{ marginTop: '-84px' }}>
      <div className="relative h-screen min-h-[720px] max-h-[1100px] overflow-hidden">
        <div
          className="absolute inset-0 hero-photo will-change-transform"
          style={{
            transform: `translate3d(0, ${parallax}px, 0) scale(${scale})`,
            transformOrigin: 'center center',
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              radial-gradient(ellipse 80% 60% at 20% 80%, rgba(181,87,31,0.18) 0%, transparent 55%),
              radial-gradient(ellipse 60% 50% at 85% 20%, rgba(28,79,56,0.12) 0%, transparent 50%),
              linear-gradient(180deg, rgba(26,15,8,0.72) 0%, rgba(26,15,8,0.08) 32%, rgba(26,15,8,0) 52%, rgba(26,15,8,0.82) 100%)
            `,
          }}
        />
        <div
          className="absolute inset-0 flex flex-col transition-opacity duration-700"
          style={{ opacity: fade }}
        >
          <div className="flex-1" />
          <div className="max-w-[1500px] mx-auto w-full px-6 lg:px-10 pb-20 lg:pb-28">
            <div className="grid lg:grid-cols-12 gap-8 items-end">
              <div className="lg:col-span-8">
                <div className={`hero-stagger ${ready ? 'is-ready' : ''}`}>
                  <div className="hero-stagger-item">
                    <StatusBadge variant="hero" />
                  </div>
                  <h1
                    className="h-mega hero-stagger-item"
                    style={{
                      color: 'var(--cream)',
                      fontSize: 'clamp(3.5rem, 8vw, 8.5rem)',
                      letterSpacing: '-0.025em',
                    }}
                  >
                    Pharmacie
                    <br />
                    <em style={{ color: 'var(--green-light)' }}>des Arcades</em>
                    <span
                      className="hero-stagger-item block"
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontStyle: 'normal',
                        fontWeight: 400,
                        fontSize: '0.16em',
                        marginTop: '1.2em',
                        letterSpacing: '0.3em',
                        opacity: 0.85,
                        textTransform: 'uppercase',
                      }}
                    >
                      {PHARMA.city} · Provence
                    </span>
                  </h1>
                </div>
              </div>
              <div className={`lg:col-span-4 lg:pb-3 hero-stagger ${ready ? 'is-ready' : ''}`}>
                <p
                  className="ff-display text-xl leading-relaxed mb-7 text-pretty hero-stagger-item hero-stagger-item-delay-2"
                  style={{ color: 'var(--cream)', opacity: 0.92, fontWeight: 300 }}
                >
                  {PHARMA.address}, Châteauneuf-le-Rouge. Conseil pharmaceutique, entretiens,
                  parapharmacie sélectionnée. Officine indépendante depuis {PHARMA.since}
                </p>
                <div className="flex flex-wrap gap-3 hero-stagger-item hero-stagger-item-delay-3">
                  <MagneticButton strength={0.18}>
                    <a
                      href={wa("Bonjour, j'ai une question rapide :")}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-glow inline-flex items-center gap-2 px-7 py-4 rounded-full font-semibold text-sm shadow-xl"
                      style={{ background: 'var(--whatsapp)', color: 'white' }}
                    >
                      Une question
                    </a>
                  </MagneticButton>
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
          <span className="eyebrow opacity-70" style={{ fontSize: 9 }}>
            Découvrir
          </span>
          <span className="scroll-cue-line" />
        </a>
      </div>

      <div className="border-y relative overflow-hidden" style={{ background: 'var(--cream)', borderColor: 'var(--cream-deep)' }}>
        <div className="section-orb section-orb-terra" aria-hidden />
        <div className="max-w-[1500px] mx-auto px-6 lg:px-10 py-12 grid grid-cols-2 lg:grid-cols-4 gap-y-8">
          {STATS.map((s, i) => (
            <div
              key={i}
              className={`stat-cell flex items-baseline gap-3 px-2 ${i > 0 ? 'lg:border-l' : ''}`}
              style={{ borderColor: 'var(--cream-deep)' }}
            >
              <AnimatedNumber
                value={s.n}
                className="ff-display italic leading-none stat-number"
                style={{
                  color: 'var(--terra)',
                  fontSize: 'clamp(3rem, 5vw, 4.5rem)',
                  fontWeight: 500,
                }}
              />
              <span className="eyebrow whitespace-pre-line" style={{ color: 'var(--ink-mid)', fontSize: 10 }}>
                {s.l}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
