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
      }}
    >
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-10 py-4 sm:py-5 flex items-center justify-between gap-3">
        <a href="#" className="flex items-center gap-2 sm:gap-3 group min-w-0">
          <img src="/photos/logo/newlogo-cross.png" alt="Pharmacie des Arcades" className="flex-shrink-0" style={{ width: 36, height: 36, objectFit: 'contain' }} />
          <span className="flex flex-col leading-tight min-w-0">
            <span className="ff-display font-medium tracking-tight whitespace-nowrap text-[14px] sm:text-[18px]" style={{ color: scrolled ? 'var(--ink)' : 'var(--cream)' }}>
              Pharmacie des Arcades
            </span>
            <span className="hidden sm:block text-[10px] tracking-[0.25em] uppercase font-medium" style={{ color: scrolled ? 'var(--ink-mid)' : 'rgba(244,236,216,0.85)' }}>
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
          className="hidden sm:flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-sm font-semibold hover:scale-105 shadow-lg transition-all duration-300 btn-glow flex-shrink-0"
          style={{ background: 'var(--green)', color: 'var(--cream)' }}
        >
          Prendre RDV
        </button>
      </div>
    </header>
  )
}
