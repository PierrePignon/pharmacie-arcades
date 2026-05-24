'use client'

/** Grain cinématique + lueur ambiante fixe sur tout le site */
export default function SiteChrome() {
  return (
    <>
      <div className="grain-overlay" aria-hidden />
      <div className="ambient-glow ambient-glow-top" aria-hidden />
      <div className="ambient-glow ambient-glow-bottom" aria-hidden />
    </>
  )
}
