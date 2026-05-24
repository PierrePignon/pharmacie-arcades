'use client'
import { useEffect, useState } from 'react'
import { useRdv } from './RdvModal'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const { open: openRdv } = useRdv()
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <header
      data-scrolled={scrolled ? 'true' : 'false'}
      className="sticky top-0 z-40 transition-all duration-500"
      style={{
        background: scrolled ? 'rgba(244,236,216,0.96)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--cream-deep)' : '1px solid transparent',
        paddingTop: scrolled ? undefined : undefined,
      }}
    >
      <div className="max-w-[1500px] mx-auto px-6 lg:px-10 py-5 flex items-center justify-between">
        <a href="#" className="flex items-center gap-3 group">
          <img src="/photos/logo/logo-400.png" alt="Pharmacie des Arcades" className="flex-shrink-0 rounded-lg" style={{ width: 48, height: 48, objectFit: 'cover' }} />
          <span className="flex flex-col leading-tight">
            <span className="ff-display text-[18px] font-medium tracking-tight" style={{ color: scrolled ? 'var(--ink)' : 'var(--cream)' }}>
              Pharmacie des Arcades
            </span>
            <span className="text-[10px] tracking-[0.25em] uppercase font-medium" style={{ color: scrolled ? 'var(--ink-mid)' : 'rgba(244,236,216,0.85)' }}>
              CHÂTEAUNEUF-LE-ROUGE · PROVENCE
            </span>
          </span>
        </a>
        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium" style={{ color: scrolled ? 'var(--ink)' : 'var(--cream)' }}>
          <a href="#gammes" className="nav-link link-underline">Nos gammes</a>
          <a href="#services" className="nav-link link-underline">Services</a>
          <a href="#equipe" className="nav-link link-underline">L'équipe</a>
          <a href="#contact" className="nav-link link-underline">Accès</a>
        </nav>
        <button
          onClick={() => openRdv()}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold hover:scale-105 shadow-lg transition-all duration-300 btn-glow"
          style={{ background: 'var(--terra)', color: 'var(--cream)' }}
        >
          Prendre RDV
        </button>
      </div>
    </header>
  )
}

