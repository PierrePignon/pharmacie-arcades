'use client'
import { useEffect, useRef } from 'react'

type Props = {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
  speed?: number
}

/** Image de fond avec parallax au scroll + zoom au survol */
export default function ParallaxImage({ children, className = '', style, speed = 0.22 }: Props) {
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const onScroll = () => {
      const rect = el.getBoundingClientRect()
      const centerOffset = rect.top + rect.height / 2 - window.innerHeight / 2
      el.style.setProperty('--parallax-y', `${-centerOffset * speed}px`)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [speed])

  return (
    <div ref={ref} className={`img-parallax-wrap ${className}`.trim()} style={style}>
      {children}
    </div>
  )
}
