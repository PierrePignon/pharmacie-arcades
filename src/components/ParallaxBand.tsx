'use client'
import { useEffect, useRef, useState } from 'react'

type Props = {
  src: string
  alt?: string
  position?: string
  className?: string
  children?: React.ReactNode
}

/** Bandeau photo pleine largeur avec parallax scroll */
export default function ParallaxBand({ src, alt = '', position = 'center 40%', className = '', children }: Props) {
  const ref = useRef<HTMLDivElement | null>(null)
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const el = ref.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height)
      setOffset((progress - 0.5) * 80)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div ref={ref} className={`h-[50vh] min-h-[400px] relative overflow-hidden ${className}`.trim()}>
      <div
        className="absolute inset-0 will-change-transform"
        style={{
          backgroundImage: `url('${src}')`,
          backgroundSize: 'cover',
          backgroundPosition: position,
          transform: `translate3d(0, ${offset}px, 0) scale(1.12)`,
        }}
        role="img"
        aria-label={alt}
      />
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(180deg, rgba(26,15,8,0.2) 0%, rgba(26,15,8,0.55) 100%)' }}
      />
      {children}
    </div>
  )
}
