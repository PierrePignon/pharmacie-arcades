export const PHARMA = {
  name: 'Pharmacie des Arcades',
  city: 'Châteauneuf-le-Rouge',
  postal: '13790',
  address: 'Place Auguste Baret',
  phone: '04 42 12 54 65',
  phoneTel: '+33442125465',
  mobile: '07 69 31 22 35',
  mobileTel: '+33769312235',
  mobileDigits: '33769312235',
  email: 'contact@pharmacie-des-arcades.fr',
  since: 1998,
  sinceTitulaires: 2003,
  rating: '4,8',
  reviews: 17,
  doctolib:
    'https://www.doctolib.fr/pharmacie/chateauneuf-le-rouge/pharmacie-des-arcades-chateauneuf-le-rouge?pid=practice-291189',
}

export const wa = (msg: string) =>
  `https://wa.me/${PHARMA.mobileDigits}?text=${encodeURIComponent(msg)}`

export const HORAIRES = [
  { jour: 'Lun – Ven', creneaux: '09h – 12h15 · 15h – 19h' },
  { jour: 'Samedi', creneaux: '09h – 12h15' },
  { jour: 'Dimanche', creneaux: 'Fermée', closed: true },
]

export const UNIVERS = [
  {
    num: '01',
    eyebrow: 'PHYTOTHÉRAPIE',
    title: 'Phytothérapie compléments alimentaires',
    titleHtml: 'Phytothérapie<br><em style="color: var(--green);">compléments alimentaires</em>',
    desc: "Huiles essentielles, compléments alimentaires, gemmothérapie. Marques européennes sélectionnées sur leurs exigences de formulation et leurs certifications biologiques.",
    color: 'green',
    bgImage: '/photos/MainPhoto/soignerParLesPlantes.png',
    marques: [
      { name: 'Aboca', img: '/photos/marques/Aboca.jpg' },
      { name: 'Dayang', img: '/photos/marques/dayang.jfif' },
      { name: 'Novoma', img: '/photos/marques/novoma.webp' },
      { name: 'Nutergia', img: '/photos/marques/nutergia.jpg' },
      { name: 'Pharmasmile', img: '/photos/marques/Pharmasmile.png' },
      { name: 'Pranarôm', img: '/photos/marques/pranarom.webp' },
      { name: 'Prescription Nature', img: '/photos/marques/prescriptionNature.jfif' },
    ],
  },
  {
    num: '02',
    eyebrow: 'PARAPHARMACIE',
    title: 'Visage et corps',
    titleHtml: 'Visage<br>et <em style="color: var(--terra);">corps</em>',
    desc: "Références essentielles pour peaux sensibles, atopiques, sèches ou mixtes. Laboratoires français reconnus.",
    color: 'terra',
    bgImage: '/photos/MainPhoto/soinDuVisageEtDuCorp.png',
    reverse: true,
    marques: [
      { name: 'A-Derma', img: '/photos/marques/aderma.png' },
      { name: 'Avène', img: '/photos/marques/Avene.avif' },
      { name: 'Avril', img: '/photos/marques/avril.jpg' },
      { name: 'Bioderma', img: '/photos/marques/Bioderma.webp' },
      { name: 'CeraVe', img: '/photos/marques/cerave.jpg' },
      { name: 'La Roche-Posay', img: '/photos/marques/LaRochePosay.jpg' },
      { name: 'La Rosée', img: '/photos/marques/LaRosee.webp' },
      { name: 'Uriage', img: '/photos/marques/Uriage.webp' },
    ],
  },
  {
    num: '03',
    eyebrow: 'HYGIÈNE DENTAIRE',
    title: 'Dentaire',
    titleHtml: 'Hygiène<br><em style="color: var(--ocre);">dentaire</em>',
    desc: "Brosses, dentifrices, bains de bouche, fixateurs prothèses. Sélection couvrant les sensibilités gingivales, les parodontites et les orthodonties.",
    color: 'ocre',
    bgImage: '/photos/MainPhoto/SoinDentaire.png',
    marques: [
      { name: 'CB12', img: '/photos/marques/cb12.jpg' },
      { name: 'Elmex', img: '/photos/marques/elmex.webp' },
      { name: 'Fixodent', img: '/photos/marques/fixodent.avif' },
      { name: 'Fluocaril', img: '/photos/marques/fluocaril.jpg' },
      { name: 'GUM', img: '/photos/marques/gum.jpg' },
      { name: 'Listerine', img: '/photos/marques/listerine.jfif' },
      { name: 'Parodontax', img: '/photos/marques/parodontax.avif' },
    ],
  },
  {
    num: '04',
    eyebrow: 'HYGIÈNE INTIME',
    title: 'Intime',
    titleHtml: 'Hygiène<br><em style="color: var(--green-sage);">intime</em>',
    desc: "Gels lavants doux, soins quotidiens et traitements ponctuels. Références sélectionnées pour leur tolérance et leur respect de l'équilibre physiologique.",
    color: 'green-sage',
    bgImage: '/photos/MainPhoto/hygieneIntime.webp',
    reverse: true,
    marques: [
      { name: 'Beauterra', img: '/photos/marques/beauterra.png' },
      { name: 'Hydralin', img: '/photos/marques/hydralin.jpg' },
      { name: 'Saforelle', img: '/photos/marques/saforelle.webp' },
      { name: 'Saugella', img: '/photos/marques/saugella.jpg' },
    ],
  },
  {
    num: '05',
    eyebrow: 'ORTHOPÉDIE',
    title: 'Orthopédie',
    titleHtml: 'Orthopédie',
    desc: "Matériel orthopédique adapté aux besoins du quotidien : ceintures lombaires, attelles cheville, genouillères, contention et soutien.",
    color: 'terra-deep',
    bgImage: '/photos/MainPhoto/orthopiedie1.jpg',
    marques: [
      { name: 'Donjoy', img: '/photos/marques/genouillere-ldonjoy.avif' },
      { name: 'Thuasne', img: '/photos/marques/ceinture-lombaire-thuasne-1_1_.jpg' },
    ],
  },
]

export const SERVICES = [
  { icon: 'stethoscope', title: 'Entretien pharmaceutique', mode: 'rdv',
    desc: 'Échange confidentiel sur votre traitement avec un pharmacien, sur rendez-vous.' },
  { icon: 'baby', title: 'Accompagnement grossesse', mode: 'rdv', preset: 'grossesse',
    desc: 'Conseil pré-conception, suivi de grossesse, allaitement et retour de couches.' },
  { icon: 'heart-pulse', title: 'Bilan partagé de médication', mode: 'rdv',
    desc: 'Service destiné aux patients de plus de 65 ans avec traitements chroniques, sur rendez-vous.' },
  { icon: 'syringe', title: 'Vaccination', mode: 'walkin',
    desc: 'Grippe, covid, voyages, rappels DTP. Accueil sans rendez-vous aux heures d\'ouverture.' },
  { icon: 'test-tube', title: 'Dépistages TROD', mode: 'walkin',
    desc: 'Tests rapides angine, cystite, covid. Résultat délivré sur place en quelques minutes.' },
  { icon: 'heart-pulse', title: 'Location matériel médical', mode: 'walkin',
    desc: 'Tire-laits, béquilles, fauteuils, lits médicalisés. Tarifs et conditions à consulter en officine.' },
]

// Nouvelles photos intérieures (mai 2026) — remplacent l'ancienne galerie
export const GALLERY = [
  { src: '/photos/officine-interieur/interieur-1.jpg', label: "L'OFFICINE" },
  { src: '/photos/officine-interieur/interieur-2.jpg', label: "L'OFFICINE" },
  { src: '/photos/officine-interieur/interieur-3.jpg', label: "L'OFFICINE" },
  { src: '/photos/officine-interieur/interieur-4.jpg', label: "L'OFFICINE" },
]

// Équipe — prénoms seulement sur les cartes (sans noms de famille)
export const EQUIPE = [
  { id: '1', nom: 'Cécile', role: 'Pharmacienne titulaire', specialite: 'PHARMACIENNE TITULAIRE',
    bio: "Titulaire de l'officine depuis 2003.", initials: 'C', colorScheme: 'terra' },
  { id: '2', nom: 'Pierre-François', role: 'Préparateur', specialite: 'PRÉPARATEUR EN PHARMACIE',
    bio: "Co-gère l'officine depuis 2003.", initials: 'PF', colorScheme: 'sage' },
  { id: '3', nom: 'Lucie', role: 'Préparatrice', specialite: 'CONSEIL EN OFFICINE',
    bio: 'Préparatrice en pharmacie.', initials: 'L', colorScheme: 'sand' },
  { id: '4', nom: 'Myriam', role: 'Préparatrice', specialite: 'CONSEIL EN OFFICINE',
    bio: 'Préparatrice en pharmacie.', initials: 'M', colorScheme: 'ocre' },
  { id: '5', nom: 'Lisa', role: 'Apprentie préparatrice', specialite: 'EN FORMATION',
    bio: 'En formation pour devenir préparatrice en pharmacie.', initials: 'L', colorScheme: 'terra' },
]
