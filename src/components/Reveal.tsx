'use client'
import { useEffect, useRef, useState } from 'react'

type Props = {
  children: React.ReactNode
  delay?: 0 | 1 | 2 | 3
  className?: string
  as?: keyof JSX.IntrinsicElements
}

export default function Reveal({ children, delay = 0, className = '', as: Tag = 'div' }: Props) {
  const ref = useRef<HTMLElement | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    // Si déjà dans le viewport (hero, etc.), reveal direct
    const rect = node.getBoundingClientRect()
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setVisible(true)
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true)
            io.disconnect()
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    )
    io.observe(node)
    return () => io.disconnect()
  }, [])

  const delayClass = delay ? `reveal-delay-${delay}` : ''
  return (
    // @ts-expect-error generic Tag
    <Tag ref={ref} className={`reveal ${visible ? 'is-visible' : ''} ${delayClass} ${className}`.trim()}>
      {children}
    </Tag>
  )
}
