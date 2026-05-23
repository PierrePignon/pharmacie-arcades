import Header from '@/components/Header'
import { RdvProvider } from '@/components/RdvModal'
import ContactFAB from '@/components/ContactFAB'
import StatusBadge from '@/components/StatusBadge'
import ServiceRdvButton from '@/components/ServiceRdvButton'
import Reveal from '@/components/Reveal'
import { ScrollProgress, AnimatedNumber, MagneticButton, TiltCard } from '@/components/ScrollEffects'
import { PHARMA, UNIVERS, SERVICES, HORAIRES, GALLERY, EQUIPE, wa } from '@/lib/constants'
import { getPromosFromSheet } from '@/lib/sheet'

const BADGE_COLORS: Record<string, string> = {
  terra: 'rgba(181,87,31,0.95)',
  green: 'rgba(28,79,56,0.95)',
  ocre: 'rgba(201,165,107,0.95)',
  terraDeep: 'rgba(122,51,21,0.95)',
}

// Les promos viennent d'un Google Sheet édité par la pharmacienne (voir docs/GOOGLE_SHEET.md).
// Fallback sur DEMO_PROMOS si le sheet n'est pas encore configuré.
async function getPromos() {
  const fromSheet = await getPromosFromSheet()
  return fromSheet || []
}

// L'équipe change rarement (1x/an max), donc en dur dans DEMO_EQUIPE.
async function getEquipe() {
  return [] as any[]
}

// Fallback : promos de démo si Sanity pas encore peuplé (commentaire retiré, juste titre)
const DEMO_PROMOS = [
  { id: '1', titre: 'Allergiques, anticipez vos sorties', badge: 'SPÉCIAL ALLERGIE', badgeColor: 'green',
    commentaire: '', image: { url: '/photos/promo/promo-allergie.jpg', alt: 'Allerdol' } },
  { id: '2', titre: "Le déodorant dès l'adolescence", badge: 'ADOLESCENCE', badgeColor: 'terra',
    commentaire: '', image: { url: '/photos/promo/promo-deodorant.jpg', alt: 'La Rosée déodorant' } },
  { id: '3', titre: 'Avril, la qualité bio à petit prix', badge: 'QUALITÉ', badgeColor: 'ocre',
    commentaire: '', image: { url: '/photos/promo/promo-avril-creme.jpg', alt: 'Avril Crème' } },
  { id: '4', titre: 'Anti-moustiques toute la famille', badge: 'FAMILLE', badgeColor: 'terraDeep',
    commentaire: '', image: { url: '/photos/promo/promo-moustique.jpg', alt: 'Cinq sur Cinq Famille' } },
]

// Équipe importée depuis constants.ts (Cécile Pignon + Lucie + Myriam + Lisa)
const DEMO_EQUIPE = EQUIPE

const AVATAR_CLASS: Record<string, string> = {
  terra: 'avatar-1', sage: 'avatar-2', sand: 'avatar-3', ocre: 'avatar-4',
}

export default async function Home() {
  const promosFromDb = await getPromos()
  const equipeFromDb = await getEquipe()
  const promos = promosFromDb.length > 0 ? promosFromDb : DEMO_PROMOS
  const equipe = equipeFromDb.length > 0 ? equipeFromDb : DEMO_EQUIPE

  return (
    <RdvProvider>
      <ScrollProgress />
      {/* Top bar */}
      <div className="hidden md:block text-xs" style={{ background: 'var(--ink)', color: 'var(--cream)' }}>
        <div className="max-w-[1500px] mx-auto px-6 lg:px-10 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-6 opacity-95">
            <StatusBadge variant="inline" />
            <span className="opacity-80">📍 {PHARMA.address} · {PHARMA.postal}</span>
          </div>
          <div className="flex items-center gap-6 opacity-90">
            <a href={wa("Bonjour, j'ai une question rapide :")} target="_blank" rel="noopener noreferrer" className="hover:opacity-100">
              WhatsApp {PHARMA.mobile}
            </a>
            <a href={`tel:${PHARMA.phoneTel}`} className="hover:opacity-100">📞 {PHARMA.phone}</a>
          </div>
        </div>
      </div>

      <Header />

      {/* HERO */}
      <section className="relative" style={{ marginTop: '-84px' }}>
        <div className="relative h-screen min-h-[720px] max-h-[1100px] overflow-hidden">
          <div className="absolute inset-0 hero-photo kenburns-slow" />
          <div className="absolute inset-0"
            style={{ background: 'linear-gradient(180deg, rgba(26,15,8,0.6) 0%, rgba(26,15,8,0.1) 28%, rgba(26,15,8,0) 50%, rgba(26,15,8,0.7) 100%)' }} />
          <div className="absolute inset-0 flex flex-col">
            <div className="flex-1" />
            <div className="max-w-[1500px] mx-auto w-full px-6 lg:px-10 pb-20 lg:pb-28">
              <div className="grid lg:grid-cols-12 gap-8 items-end">
                <div className="lg:col-span-8">
                  <StatusBadge variant="hero" />
                  {/* Titre en mode signature classique, plus petit et italique pour effet "tampon manuscrit" */}
                  <h1 className="h-mega" style={{ color: 'var(--cream)', fontSize: 'clamp(3.5rem, 8vw, 8.5rem)', letterSpacing: '-0.025em' }}>
                    Pharmacie<br/>
                    <em style={{ color: 'var(--green-light)' }}>des Arcades</em>
                    <span style={{ display: 'block', fontFamily: 'Inter, sans-serif', fontStyle: 'normal', fontWeight: 400, fontSize: '0.16em', marginTop: '1.2em', letterSpacing: '0.3em', opacity: 0.85, textTransform: 'uppercase' }}>{PHARMA.city} · Provence</span>
                  </h1>
                </div>
                <div className="lg:col-span-4 lg:pb-3">
                  <p className="ff-display text-xl leading-relaxed mb-7 text-pretty" style={{ color: 'var(--cream)', opacity: 0.92, fontWeight: 300 }}>
                    {PHARMA.address}, Châteauneuf-le-Rouge. Conseil pharmaceutique, entretiens, parapharmacie sélectionnée. Officine indépendante depuis {PHARMA.since}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <MagneticButton strength={0.18}>
                      <a href={wa("Bonjour, j'ai une question rapide :")} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-7 py-4 rounded-full font-semibold text-sm shadow-xl hover:shadow-2xl transition-shadow"
                        style={{ background: 'var(--whatsapp)', color: 'white' }}>
                        Une question
                      </a>
                    </MagneticButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="border-y" style={{ background: 'var(--cream)', borderColor: 'var(--cream-deep)' }}>
          <div className="max-w-[1500px] mx-auto px-6 lg:px-10 py-12 grid grid-cols-2 lg:grid-cols-4 gap-y-8 gap-x-6">
            {[
              { n: PHARMA.since.toString(), l: "depuis\nl'ouverture" },
              { n: PHARMA.rating, l: `/5 sur Google\n${PHARMA.reviews} avis` },
              { n: '5', l: "membres\nde l'équipe" },
              { n: '5', l: 'univers\nparapharmacie' },
            ].map((s, i) => (
              <div key={i} className="flex items-baseline gap-3">
                <AnimatedNumber value={s.n} className="ff-display italic leading-none" style={{ color: 'var(--terra)', fontSize: 'clamp(3rem, 5vw, 4.5rem)', fontWeight: 500 }} />
                <span className="eyebrow whitespace-pre-line" style={{ color: 'var(--ink-mid)', fontSize: 10 }}>{s.l}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bandeau horaires + pharmacie de garde */}
      <section className="py-12 lg:py-16" style={{ background: 'var(--ink)', color: 'var(--cream)' }}>
        <div className="max-w-[1500px] mx-auto px-6 lg:px-10 space-y-10">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-4">
              <span className="eyebrow opacity-80" style={{ color: 'var(--ocre)', fontSize: 11 }}>— HORAIRES D'OUVERTURE</span>
              <h3 className="h-section mt-3" style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)' }}>
                Du <em style={{ color: 'var(--ocre)' }}>lundi au samedi</em>
              </h3>
            </div>
            <div className="lg:col-span-8">
              <div className="grid sm:grid-cols-3 gap-px" style={{ background: 'rgba(244,236,216,0.18)' }}>
                {HORAIRES.map((h, i) => (
                  <div key={i} className="p-6" style={{ background: 'var(--ink)' }}>
                    <span className="eyebrow opacity-60" style={{ fontSize: 10 }}>{h.jour.toUpperCase()}</span>
                    <p className={`ff-display text-xl lg:text-2xl mt-2 leading-tight ${h.closed ? 'opacity-50' : ''}`}>
                      {h.creneaux.split(' · ').map((c, j) => <span key={j}>{c}{j < h.creneaux.split(' · ').length - 1 && <br/>}</span>)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Pharmacie de garde — bloc bien visible juste après les horaires */}
          <div className="rounded-2xl grid lg:grid-cols-12 gap-6 items-center p-6 lg:p-8 shadow-xl" style={{ background: 'var(--cream)', color: 'var(--ink)' }}>
            <div className="lg:col-span-1 flex lg:justify-center">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl" style={{ background: 'var(--ink)', color: 'var(--ocre)' }}>☾</div>
            </div>
            <div className="lg:col-span-7">
              <span className="eyebrow" style={{ color: 'var(--terra)', fontSize: 10 }}>EN DEHORS DES HEURES D'OUVERTURE</span>
              <p className="text-sm lg:text-base mt-2 leading-relaxed text-pretty" style={{ color: 'var(--ink-mid)' }}>
                Composez le <a href="tel:3237" className="link-underline font-semibold" style={{ color: 'var(--terra)' }}>3237</a> ou rendez-vous sur <a href="https://www.3237.fr/" target="_blank" rel="noopener noreferrer" className="link-underline font-semibold" style={{ color: 'var(--terra)' }}>3237.fr</a> pour trouver la pharmacie de garde du secteur. Service assuré nuits, dimanches et jours fériés.
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col sm:flex-row gap-3">
              <a href="tel:3237" className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full font-semibold text-sm hover:scale-105 flex-1" style={{ background: 'var(--terra)', color: 'white' }}>
                Appeler le 3237
              </a>
              <a href="https://www.3237.fr/" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full font-semibold text-sm border hover:bg-black/5 flex-1"
                style={{ borderColor: 'var(--ink)', color: 'var(--ink)' }}>
                3237.fr ↗
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* GAMMES — Lookbook */}
      <section id="gammes" className="py-28 lg:py-40" style={{ background: 'var(--cream)' }}>
        <div className="max-w-[1500px] mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-12 gap-10 mb-24 items-end">
            <div className="lg:col-span-7">
              <span className="eyebrow" style={{ color: 'var(--terra)' }}>— NOS UNIVERS</span>
              <h2 className="h-section text-balance mt-5" style={{ color: 'var(--ink)' }}>
                Nos univers<br/>
                <em style={{ color: 'var(--terra)' }}>parapharmacie</em>
              </h2>
            </div>
            <div className="lg:col-span-5 lg:pb-4">
              <p className="ff-display text-xl leading-relaxed text-pretty" style={{ color: 'var(--ink-mid)', fontWeight: 300 }}>
                Une sélection établie par l'équipe sur des critères de formulation, d'origine et de qualité de service. Chaque référence présentée ici est disponible à l'officine.
              </p>
            </div>
          </div>

          {UNIVERS.map((u, idx) => (
            <Reveal key={u.num} className="grid lg:grid-cols-12 gap-10 lg:gap-12 mb-32 last:mb-0">
              <div className={`lg:col-span-5 ${u.reverse ? 'lg:order-2' : ''}`}>
                <div className="aspect-[4/5] rounded-2xl overflow-hidden relative"
                  style={{ backgroundImage: `url('${u.bgImage}')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(26,15,8,0.5), transparent 55%)' }} />
                  <div className={`absolute top-5 ${u.reverse ? 'right-5' : 'left-5'} rounded-full flex items-center justify-center`}
                    style={{ background: 'var(--cream)', color: 'var(--ink)', width: 64, height: 64, boxShadow: '0 8px 24px -8px rgba(26,15,8,0.4)' }}>
                    <span className="ff-display italic leading-none" style={{ fontSize: 28, fontWeight: 500 }}>
                      {u.num}
                    </span>
                  </div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <span className="eyebrow rounded-full px-3 py-1.5 inline-block"
                      style={{ background: 'rgba(244,236,216,0.2)', color: 'var(--cream)', backdropFilter: 'blur(8px)', fontSize: 10 }}>
                      UNIVERS
                    </span>
                  </div>
                </div>
              </div>

              <div className={`lg:col-span-7 ${u.reverse ? 'lg:order-1' : ''}`}>
                <span className="eyebrow" style={{ color: `var(--${u.color})` }}>N° {u.num} — {u.eyebrow}</span>
                <h3 className="h-section text-balance mt-4 mb-4" style={{ color: 'var(--ink)', fontSize: 'clamp(2.25rem, 4vw, 3.5rem)' }}
                  dangerouslySetInnerHTML={{ __html: u.titleHtml }} />
                <p className="ff-display text-base leading-relaxed text-pretty mb-8 max-w-md" style={{ color: 'var(--ink-mid)', fontWeight: 300 }}>
                  {u.desc}
                </p>

                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mb-8">
                  {u.marques.map((m) => (
                    <TiltCard key={m.name} max={8} className="brand-card">
                      <img className="product" src={m.img} alt={m.name} loading="lazy" />
                      <span className="brand-name">{m.name}</span>
                    </TiltCard>
                  ))}
                </div>

                <a href={wa(`Bonjour, je cherche à savoir si vous avez en stock : `)} target="_blank" rel="noopener noreferrer"
                  className="btn-outline inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-semibold ui-sans">
                  Demander la disponibilité
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* HISTOIRE */}
      <section className="relative">
        <div className="h-[50vh] min-h-[400px] relative overflow-hidden">
          <div className="absolute inset-0 hero-photo" style={{ backgroundPosition: 'center 40%' }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(26,15,8,0.2) 0%, rgba(26,15,8,0.5) 100%)' }} />
          <div className="absolute bottom-8 left-0 right-0 max-w-[1500px] mx-auto px-6 lg:px-10">
            <span className="eyebrow" style={{ color: 'var(--ocre)' }}>— L'OFFICINE</span>
          </div>
        </div>
        <div className="py-24 lg:py-32" style={{ background: 'var(--cream)' }}>
          <div className="max-w-[1500px] mx-auto px-6 lg:px-10 grid lg:grid-cols-12 gap-12 lg:gap-16">
            <div className="lg:col-span-6">
              <span className="eyebrow" style={{ color: 'var(--terra)' }}>— PLACE AUGUSTE BARET</span>
              <h2 className="h-section text-balance mt-5" style={{ color: 'var(--ink)' }}>
                L'officine
              </h2>
            </div>
            <div className="lg:col-span-6 space-y-5 text-pretty" style={{ color: 'var(--ink-mid)' }}>
              <p className="text-base leading-relaxed">
                Ouverte en {PHARMA.since} sur la place Auguste Baret, l'officine est reprise en {PHARMA.sinceTitulaires} par Cécile et Pierre-François Pignon. L'équipe accompagne les patients au quotidien sur l'ensemble des spécialités : conseil pharmaceutique, vaccination, grossesse, orthopédie, parapharmacie.
              </p>
              <p className="text-base leading-relaxed">
                Bord de Nationale 7, parking gratuit à 20 mètres de l'enseigne — un accès très facile en voiture, rare pour une pharmacie de village.
              </p>
              <div className="flex items-center gap-4 pt-6" style={{ borderTop: '1px solid var(--cream-deep)' }}>
                <hr className="w-12" style={{ borderColor: 'var(--terra)', borderWidth: 1 }} />
                <span className="ff-display italic text-lg" style={{ color: 'var(--terra)' }}>Cécile et Pierre-François Pignon</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROMOS */}
      <section className="py-28 lg:py-36" style={{ background: 'var(--cream-deep)' }}>
        <div className="max-w-[1500px] mx-auto px-6 lg:px-10">
          <div className="flex items-end justify-between mb-14 flex-wrap gap-6">
            <div className="max-w-2xl">
              <span className="eyebrow" style={{ color: 'var(--terra)' }}>— SÉLECTION DU MOMENT</span>
              <h2 className="h-section text-balance mt-5" style={{ color: 'var(--ink)' }}>
                Sélection<br/>
                <em style={{ color: 'var(--terra)' }}>du moment</em>
              </h2>
            </div>
            <p className="text-sm max-w-sm" style={{ color: 'var(--ink-mid)' }}>
              Coups de cœur de l'équipe, renouvelés régulièrement. Tous disponibles à l'officine.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {promos.map((p: any, idx: number) => {
              const imgUrl = p.image?.url || ''
              const delay = ((idx % 4) as 0 | 1 | 2 | 3)
              return (
                <Reveal key={p.id} delay={delay} className="rounded-2xl overflow-hidden hover-lift flex flex-col" >
                <article style={{ background: 'white' }}>
                  <div className="aspect-square relative overflow-hidden promo-bg" style={{ backgroundImage: `url('${imgUrl}')` }}>
                    {p.badge && (
                      <span className="absolute top-4 left-4 px-3 py-1 rounded-full eyebrow"
                        style={{ background: BADGE_COLORS[p.badgeColor || 'terra'], color: 'var(--cream)', fontSize: 9 }}>
                        {p.badge}
                      </span>
                    )}
                  </div>
                  <div className="p-6 flex-1 flex flex-col items-center justify-center text-center">
                    <h3 className="ff-display text-xl lg:text-2xl font-medium leading-tight text-balance" style={{ color: 'var(--ink)' }}>
                      {p.titre}
                    </h3>
                  </div>
                </article>
                </Reveal>
              )
            })}
          </div>

          {promosFromDb.length === 0 && (
            <p className="text-xs italic text-center mt-10 opacity-60" style={{ color: 'var(--ink)' }}>
              Données de démo. Configurer le Google Sheet pour éditer les vraies mises en avant (voir docs/GOOGLE_SHEET.md).
            </p>
          )}
        </div>
      </section>

      <ServicesSection />

      {/* ÉQUIPE */}
      <section id="equipe" className="py-28 lg:py-36 relative overflow-hidden" style={{ background: 'var(--cream)' }}>
        <div className="max-w-[1500px] mx-auto px-6 lg:px-10 relative">
          <div className="grid lg:grid-cols-12 gap-12 mb-16 items-end">
            <div className="lg:col-span-6">
              <span className="eyebrow" style={{ color: 'var(--terra)' }}>— L'ÉQUIPE</span>
              <h2 className="h-section text-balance mt-5" style={{ color: 'var(--ink)' }}>
                L'équipe<br/>
                de <em style={{ color: 'var(--terra)' }}>l'officine</em>
              </h2>
            </div>
            <div className="lg:col-span-6 lg:pb-6">
              <p className="ff-display italic leading-snug text-pretty" style={{ color: 'var(--ink)', fontSize: 'clamp(1.5rem, 2.4vw, 2.25rem)', fontWeight: 300 }}>
                « Une équipe au complet, chacun spécialisé sur un domaine. Conseil, accompagnement et discrétion. »
              </p>
              <p className="eyebrow mt-5" style={{ color: 'var(--ink-mid)', fontSize: 10 }}>— CÉCILE et PIERRE-FRANÇOIS PIGNON</p>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {equipe.map((p: any, i: number) => (
              <Reveal key={p.id} delay={((i % 4) as 0 | 1 | 2 | 3)}>
              <article className="flex flex-col" style={{ marginTop: i % 2 === 1 ? '2.5rem' : '0', opacity: p.upcoming ? 0.55 : 1 }}>
                <div className={`aspect-[4/5] rounded-2xl overflow-hidden mb-5 relative shadow-md ${AVATAR_CLASS[p.colorScheme] || 'avatar-1'} flex items-end justify-center`}>
                  <svg viewBox="0 0 280 360" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
                    <path d="M 60 360 L 60 290 Q 80 250 140 250 Q 200 250 220 290 L 220 360 Z" fill="#3A2F1E" opacity="0.85" />
                    <rect x="125" y="220" width="30" height="40" fill="#F2D6B8" opacity="0.7" />
                    <ellipse cx="140" cy="180" rx="55" ry="65" fill="#F2D6B8" />
                    <path d="M 85 180 Q 85 110 140 110 Q 195 110 195 180 Q 195 145 175 135 Q 155 130 140 135 Q 110 138 95 155 Q 85 165 85 180 Z" fill="#3A2F1E" />
                    <text x="20" y="345" fontFamily="Fraunces,serif" fontSize="22" fontWeight="bold" fill="white" opacity="0.6" fontStyle="italic">{p.initials}</text>
                  </svg>
                  <span className="absolute top-3 right-3 bg-white/90 backdrop-blur rounded-full px-2.5 py-1 text-[9px] italic font-medium tracking-wider" style={{ color: 'var(--ink-mid)' }}>
                    {p.upcoming ? 'à venir' : 'illustration'}
                  </span>
                </div>
                <h3 className="ff-display text-xl font-medium leading-tight" style={{ color: 'var(--ink)' }}>{p.nom}</h3>
                <span className="text-sm font-medium mt-1" style={{ color: 'var(--terra)' }}>{p.role}</span>
                {p.specialite && <span className="eyebrow mt-1 mb-3" style={{ color: 'var(--ink-mid)', fontSize: 9 }}>{p.specialite}</span>}
                {p.bio && <p className="ff-display italic text-sm leading-relaxed" style={{ color: 'var(--ink-mid)' }}>« {p.bio} »</p>}
              </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* GALERIE OFFICINE */}
      <section className="py-28 lg:py-36" style={{ background: 'var(--cream-deep)' }}>
        <div className="max-w-[1500px] mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-12 gap-12 mb-14 items-end">
            <div className="lg:col-span-7">
              <h2 className="h-section text-balance mt-5" style={{ color: 'var(--ink)' }}>
                L'officine<br/>
                <em style={{ color: 'var(--terra)' }}>en images</em>
              </h2>
            </div>
            <div className="lg:col-span-5 lg:pb-4">
              <p className="ff-display text-lg leading-relaxed text-pretty" style={{ color: 'var(--ink-mid)', fontWeight: 300 }}>
                Un aperçu des rayons et de l'organisation de l'officine. Une présentation par univers, pensée pour faciliter le conseil.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
            {GALLERY.map((g, i) => (
              <Reveal key={g.src} delay={((i % 4) as 0 | 1 | 2 | 3)} className="aspect-[4/3] rounded-2xl overflow-hidden relative hover-lift">
                <div className="absolute inset-0" style={{ backgroundImage: `url('${g.src}')`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(26,15,8,0.45), transparent 60%)' }} />
                <div className="absolute bottom-5 left-5">
                  <span className="eyebrow rounded-full px-3 py-1.5 inline-block" style={{ background: 'rgba(244,236,216,0.92)', color: 'var(--ink)', fontSize: 9 }}>
                    {g.label}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-28 lg:py-36" style={{ background: 'var(--cream)' }}>
        <div className="max-w-[1500px] mx-auto px-6 lg:px-10 grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <span className="eyebrow" style={{ color: 'var(--terra)' }}>— ACCÈS et CONTACT</span>
            <h2 className="h-section text-balance mt-5 mb-10" style={{ color: 'var(--ink)' }}>
              Accès<br/>et <em style={{ color: 'var(--terra)' }}>contact</em>
            </h2>
            <div>
              {[
                { label: 'Adresse', value: `${PHARMA.address}, ${PHARMA.postal} ${PHARMA.city}` },
                { label: 'Accès en voiture', value: 'Bord de Nationale 7, parking gratuit à 20 mètres de l\'enseigne.' },
                { label: 'Téléphone', value: PHARMA.phone, link: `tel:${PHARMA.phoneTel}` },
                { label: 'WhatsApp / SMS', value: `${PHARMA.mobile} — pour vos questions rapides` },
                { label: 'Horaires', value: 'Lun–Ven 9h–12h15 · 15h–19h | Sam 9h–12h15' },
              ].map((row, i) => (
                <div key={i} className="flex gap-5 py-6" style={{ borderTop: '1px solid var(--cream-deep)' }}>
                  <div className="flex-1 pt-1">
                    <strong className="block ff-display text-lg font-medium mb-1" style={{ color: 'var(--ink)' }}>{row.label}</strong>
                    {row.link ? <a href={row.link} className="link-underline text-sm" style={{ color: 'var(--ink-mid)' }}>{row.value}</a> : <p className="text-sm" style={{ color: 'var(--ink-mid)' }}>{row.value}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-7 space-y-6">
            <div className="aspect-[4/3] rounded-3xl shadow-xl overflow-hidden relative">
              <iframe
                src={`https://www.google.com/maps?q=Pharmacie+des+Arcades+${encodeURIComponent(PHARMA.address)}+${PHARMA.postal}+${encodeURIComponent(PHARMA.city)}&output=embed`}
                className="absolute inset-0 w-full h-full" style={{ border: 0 }}
                loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                title="Carte de la pharmacie" />
            </div>

            {/* Pharmacie de garde — bloc visible sous la map */}
            <div className="rounded-3xl p-6 lg:p-8 grid lg:grid-cols-12 gap-6 items-center" style={{ background: 'var(--ink)', color: 'var(--cream)' }}>
              <div className="lg:col-span-1 flex lg:justify-center">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl" style={{ background: 'rgba(244,236,216,0.1)', color: 'var(--ocre)' }}>☾</div>
              </div>
              <div className="lg:col-span-7">
                <span className="eyebrow" style={{ color: 'var(--ocre)', fontSize: 10 }}>EN DEHORS DES HEURES D'OUVERTURE</span>
                <p className="text-sm lg:text-base mt-2 leading-relaxed text-pretty opacity-90">
                  Composez le <a href="tel:3237" className="link-underline font-semibold" style={{ color: 'var(--ocre)' }}>3237</a> ou rendez-vous sur <a href="https://www.3237.fr/" target="_blank" rel="noopener noreferrer" className="link-underline font-semibold" style={{ color: 'var(--ocre)' }}>3237.fr</a> pour trouver la pharmacie de garde du secteur. Service assuré nuits, dimanches et jours fériés.
                </p>
              </div>
              <div className="lg:col-span-4 flex flex-col sm:flex-row gap-3">
                <a href="tel:3237" className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full font-semibold text-sm hover:scale-105 flex-1" style={{ background: 'var(--terra)', color: 'white' }}>
                  Appeler le 3237
                </a>
                <a href="https://www.3237.fr/" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full font-semibold text-sm border hover:bg-white/10 flex-1"
                  style={{ borderColor: 'var(--cream)', color: 'var(--cream)' }}>
                  3237.fr ↗
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: 'var(--ink)', color: 'var(--cream)' }}>
        <div className="max-w-[1500px] mx-auto px-6 lg:px-10 py-20">
          <div className="grid md:grid-cols-4 gap-12 mb-14">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-5">
                <img src="/photos/logo/logo-400.png" alt="Pharmacie des Arcades" className="rounded-lg" style={{ width: 52, height: 52, objectFit: 'cover' }} />
                <span className="ff-display text-xl font-medium">{PHARMA.name}</span>
              </div>
              <p className="ff-display leading-relaxed opacity-80 max-w-md" style={{ fontSize: '1.05rem', fontWeight: 300 }}>
                Pharmacie indépendante. {PHARMA.address}, {PHARMA.city}. Depuis {PHARMA.since}.
              </p>
            </div>
            <div>
              <h4 className="eyebrow mb-4 opacity-60" style={{ fontSize: 10 }}>LE SITE</h4>
              <ul className="space-y-3 text-sm opacity-80">
                <li><a href="#gammes" className="link-underline">Nos gammes</a></li>
                <li><a href="#services" className="link-underline">Services</a></li>
                <li><a href="#equipe" className="link-underline">L'équipe</a></li>
                <li><a href="#contact" className="link-underline">Accès</a></li>
              </ul>
            </div>
            <div>
              <h4 className="eyebrow mb-4 opacity-60" style={{ fontSize: 10 }}>CADRE LÉGAL</h4>
              <ul className="space-y-3 text-sm opacity-80">
                <li><a href="#" className="link-underline">Mentions légales</a></li>
                <li><a href="#" className="link-underline">Confidentialité</a></li>
                <li><a href={PHARMA.doctolib} target="_blank" rel="noopener noreferrer" className="link-underline">Profil Doctolib</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-3 text-xs opacity-50" style={{ borderTop: '1px solid rgba(244,236,216,0.15)' }}>
            <span>© 2026 {PHARMA.name} — Tous droits réservés</span>
            <span>Site conforme au Code de déontologie des pharmaciens (R4235)</span>
          </div>
        </div>
      </footer>

      <ContactFAB />
    </RdvProvider>
  )
}

// Composant services (client pour le bouton openRdv)
function ServicesSection() {
  return (
    <section id="services" className="py-28 lg:py-36" style={{ background: 'var(--cream)' }}>
      <div className="max-w-[1500px] mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-12 mb-16 items-end">
          <div className="lg:col-span-7">
            <span className="eyebrow" style={{ color: 'var(--terra)' }}>— NOS SERVICES</span>
            <h2 className="h-section text-balance mt-5" style={{ color: 'var(--ink)' }}>
              Nos<br/><em style={{ color: 'var(--terra)' }}>services</em>
            </h2>
          </div>
          <div className="lg:col-span-5 lg:pb-4">
            <p className="ff-display text-lg leading-relaxed text-pretty" style={{ color: 'var(--ink-mid)', fontWeight: 300 }}>
              Vaccinations, dépistages, entretiens pharmaceutiques, accompagnement grossesse, location de matériel médical.
            </p>
          </div>
        </div>
        <ServicesList />
      </div>
    </section>
  )
}

function ServicesList() {
  return (
    <div className="grid md:grid-cols-2 gap-x-12 gap-y-0">
      {SERVICES.map((s, i) => (
        <div key={i} className="flex items-start gap-6 py-7" style={{ borderTop: '1px solid var(--cream-deep)' }}>
          <div className="ff-display italic text-2xl font-light pt-1 flex-shrink-0 w-10" style={{ color: 'var(--terra)' }}>
            {String(i + 1).padStart(2, '0')}
          </div>
          <div className="flex-1">
            <h3 className="ff-display text-xl font-medium mb-2" style={{ color: 'var(--ink)' }}>{s.title}</h3>
            <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--ink-mid)' }}>{s.desc}</p>
            {s.mode === 'rdv' ? (
              <ServiceRdvButton preset={(s as any).preset} />
            ) : (
              <span className="eyebrow" style={{ color: 'var(--terra)', fontSize: 10 }}>SANS RENDEZ-VOUS</span>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
      {SERVICES.map((s, i) => (
        <div key={i} className="flex items-start gap-6 py-7" style={{ borderTop: '1px solid var(--cream-deep)' }}>
          <div className="ff-display italic text-2xl font-light pt-1 flex-shrink-0 w-10" style={{ color: 'var(--terra)' }}>
            {String(i + 1).padStart(2, '0')}
          </div>
          <div className="flex-1">
            <h3 className="ff-display text-xl font-medium mb-2" style={{ color: 'var(--ink)' }}>{s.title}</h3>
            <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--ink-mid)' }}>{s.desc}</p>
            {s.mode === 'rdv' ? (
              <ServiceRdvButton preset={(s as any).preset} />
            ) : (
              <span className="eyebrow" style={{ color: 'var(--terra)', fontSize: 10 }}>SANS RENDEZ-VOUS</span>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
