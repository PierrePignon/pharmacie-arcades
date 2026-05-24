'use client'
import { useEffect, useRef, useState } from 'react'

/* ============================================================
   ScrollProgress — barre fine en haut qui indique la progression
   ============================================================ */
export function ScrollProgress() {
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement
      const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight)
      setProgress(Math.min(Math.max(scrolled, 0), 1))
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0,
      height: 3, zIndex: 100, background: 'rgba(0,0,0,0.04)',
      pointerEvents: 'none',
    }}>
      <div style={{
        height: '100%',
        width: `${progress * 100}%`,
        background: 'linear-gradient(90deg, var(--terra) 0%, var(--ocre) 60%, var(--green-light) 100%)',
        boxShadow: '0 0 12px rgba(181,87,31,0.45)',
        transition: 'width .08s linear',
      }} />
    </div>
  )
}

/* ============================================================
   AnimatedNumber — compteur qui s'anime de 0 à value à l'entrée
   ============================================================ */
type AnimatedNumberProps = {
  value: string  // ex: "1998", "4,8", "5"
  duration?: number  // ms
  className?: string
  style?: React.CSSProperties
}
export function AnimatedNumber({ value, duration = 1400, className = '', style }: AnimatedNumberProps) {
  const ref = useRef<HTMLSpanElement | null>(null)
  const [display, setDisplay] = useState(value)
  const startedRef = useRef(false)

  // Détecter si c'est un nombre (entier ou décimal avec virgule)
  const numericMatch = value.match(/^(\d+)([,.]\d+)?$/)
  const isNumeric = !!numericMatch

  useEffect(() => {
    if (!isNumeric) { setDisplay(value); return }
    const node = ref.current
    if (!node) return

    const target = parseFloat(value.replace(',', '.'))
    const hasDecimal = value.includes(',') || value.includes('.')
    const decimals = hasDecimal ? (value.split(/[,.]/)[1]?.length || 1) : 0

    const start = () => {
      if (startedRef.current) return
      startedRef.current = true
      const t0 = performance.now()
      const tick = (now: number) => {
        const t = Math.min((now - t0) / duration, 1)
        // easeOutQuart
        const eased = 1 - Math.pow(1 - t, 4)
        const current = target * eased
        const formatted = decimals > 0
          ? current.toFixed(decimals).replace('.', ',')
          : Math.round(current).toString()
        setDisplay(formatted)
        if (t < 1) requestAnimationFrame(tick)
      }
      // Init à 0
      setDisplay(decimals > 0 ? '0,0' : '0')
      requestAnimationFrame(tick)
    }

    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) start() })
    }, { threshold: 0.4 })
    io.observe(node)
    return () => io.disconnect()
  }, [value, duration, isNumeric])

  return <span ref={ref} className={className} style={style}>{display}</span>
}

/* ============================================================
   MagneticButton — wrapper qui fait suivre subtilement la souris
   ============================================================ */
export function MagneticButton({ children, strength = 0.25, className = '', style }: {
  children: React.ReactNode
  strength?: number
  className?: string
  style?: React.CSSProperties
}) {
  const ref = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2
      el.style.transform = `translate(${x * strength}px, ${y * strength}px)`
    }
    const onLeave = () => { el.style.transform = '' }
    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [strength])
  return (
    <div ref={ref} className={`inline-block ${className}`} style={{ transition: 'transform .35s cubic-bezier(.2,.7,.3,1)', ...style }}>
      {children}
    </div>
  )
}

/* ============================================================
   TiltCard — wrapper qui penche en 3D selon position souris
   ============================================================ */
export function TiltCard({ children, max = 6, className = '', style }: {
  children: React.ReactNode
  max?: number  // degrés max
  className?: string
  style?: React.CSSProperties
}) {
  const ref = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const px = (e.clientX - rect.left) / rect.width  // 0..1
      const py = (e.clientY - rect.top) / rect.height
      const rx = (0.5 - py) * max
      const ry = (px - 0.5) * max
      el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(0)`
    }
    const onLeave = () => { el.style.transform = '' }
    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [max])
  return (
    <div ref={ref} className={className} style={{ transition: 'transform .35s cubic-bezier(.2,.7,.3,1)', transformStyle: 'preserve-3d', ...style }}>
      {children}
    </div>
  )
}

/* ============================================================
   Parallax — élément qui bouge plus lentement que le scroll
   ============================================================ */
export function Parallax({ children, speed = 0.3, className = '', style }: {
  children: React.ReactNode
  speed?: number  // 0 = fixe, 0.3 = 30% du scroll
  className?: string
  style?: React.CSSProperties
}) {
  const ref = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const onScroll = () => {
      const rect = el.getBoundingClientRect()
      const centerOffset = rect.top + rect.height / 2 - window.innerHeight / 2
      el.style.transform = `translate3d(0, ${-centerOffset * speed}px, 0)`
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [speed])
  return (
    <div ref={ref} className={className} style={{ willChange: 'transform', ...style }}>
      {children}
    </div>
  )
}
