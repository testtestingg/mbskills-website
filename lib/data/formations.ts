export type FormationCategory =
  | "digital-marketing"
  | "ai"
  | "developpement-personnel"
  | "robotique"
  | "dev-web"
  | "data"
  | "cyber"
  | "autres"

export interface Formation {
  id: string
  slug: string
  title: string
  shortDescription: string
  description: string
  poster: string
  duration: string
  level: string
  category: FormationCategory
  status?: "active" | "bientot"
  highlight?: boolean
  sessionImages?: string[]
}

export const formationCategories: Record<
  FormationCategory,
  { label: string; description: string; icon: string }
> = {
  robotique: {
    label: "Robotique",
    description:
      "Conception, programmation et déploiement de robots et systèmes automatisés.",
    icon: "Cpu",
  },
  "digital-marketing": {
    label: "Digital Marketing",
    description:
      "Stratégies digitales, SEO, social media et performance marketing.",
    icon: "Megaphone",
  },
  ai: {
    label: "Intelligence Artificielle",
    description:
      "Machine learning, deep learning et applications métier de l'IA.",
    icon: "Brain",
  },
  "developpement-personnel": {
    label: "Développement Personnel",
    description:
      "Soft skills, leadership, communication et productivité professionnelle.",
    icon: "Sparkles",
  },
  "dev-web": {
    label: "Développement Web",
    description: "Front-end, back-end et full stack moderne.",
    icon: "Code2",
  },
  data: {
    label: "Data Science",
    description: "Analyse, visualisation et science des données.",
    icon: "BarChart3",
  },
  cyber: {
    label: "Cybersécurité",
    description: "Protection des systèmes, réseaux et données sensibles.",
    icon: "ShieldCheck",
  },
  autres: {
    label: "Autres programmes",
    description: "Formations transverses et documentation technique.",
    icon: "BookOpen",
  },
}

export const formations: Formation[] = [
  {
    id: "robotique-bootcamp",
    slug: "robotique-bootcamp",
    title: "Robotique Bootcamp",
    shortDescription:
      "Conception, programmation et déploiement de robots et systèmes automatisés.",
    description:
      "Formation intensive en robotique : électronique, programmation embarquée, capteurs et actionneurs, projets pratiques avec kits et séances en présentiel.",
    poster:
      "https://i.ibb.co/RGxL3c8v/Whats-App-Image-2026-04-27-at-18-02-26.jpg",
    duration: "8 semaines",
    level: "Débutant à Intermédiaire",
    category: "robotique",
    status: "active",
    highlight: true,
    sessionImages: [
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&q=80",
      "https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=400&q=80",
      "https://i.ibb.co/DD1vgJmQ/6a29e82b-af34-49b4-994a-6358762ea238.png",
    ],
  },
  {
    id: "digital-marketing-essentials",
    slug: "digital-marketing-essentials",
    title: "Digital Marketing Essentials",
    shortDescription:
      "Stratégie digitale, SEO, social ads et analytics pour générer de la croissance.",
    description:
      "Programme complet couvrant la stratégie marketing digitale, le SEO, le content marketing, les campagnes Meta & Google Ads, l'email marketing et l'analyse de la performance.",
    poster:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    duration: "6 semaines",
    level: "Tous niveaux",
    category: "digital-marketing",
    status: "bientot",
  },
  {
    id: "social-media-manager",
    slug: "social-media-manager",
    title: "Social Media Manager",
    shortDescription:
      "Gestion de communautés, création de contenu et stratégie social media.",
    description:
      "Apprenez à construire une présence digitale forte : ligne éditoriale, création de contenu, community management, KPIs et outils professionnels.",
    poster:
      "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&q=80",
    duration: "4 semaines",
    level: "Débutant",
    category: "digital-marketing",
    status: "bientot",
  },
  {
    id: "intelligence-artificielle",
    slug: "intelligence-artificielle",
    title: "Intelligence Artificielle",
    shortDescription: "ML, deep learning et applications métier.",
    description:
      "Fondements du ML et du deep learning, frameworks (TensorFlow/PyTorch), NLP et vision par ordinateur. Projets concrets et bonnes pratiques.",
    poster:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
    duration: "12 semaines",
    level: "Intermédiaire",
    category: "ai",
    status: "bientot",
  },
  {
    id: "ai-for-business",
    slug: "ai-for-business",
    title: "IA pour les Professionnels",
    shortDescription:
      "Exploiter l'IA générative et les outils intelligents dans votre métier.",
    description:
      "Formation pratique sur l'usage de l'IA (ChatGPT, Copilot, outils no-code) pour booster la productivité, automatiser les tâches et créer de la valeur métier.",
    poster:
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80",
    duration: "4 semaines",
    level: "Tous niveaux",
    category: "ai",
    status: "bientot",
  },
  {
    id: "leadership-communication",
    slug: "leadership-communication",
    title: "Leadership & Communication",
    shortDescription:
      "Développer son leadership, sa prise de parole et sa posture professionnelle.",
    description:
      "Programme axé sur l'intelligence émotionnelle, la communication interpersonnelle, la prise de parole en public, le management d'équipe et la gestion de conflits.",
    poster:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
    duration: "5 semaines",
    level: "Tous niveaux",
    category: "developpement-personnel",
    status: "bientot",
  },
  {
    id: "productivite-mindset",
    slug: "productivite-mindset",
    title: "Productivité & Mindset",
    shortDescription:
      "Gestion du temps, focus, objectifs et méthodes de travail performantes.",
    description:
      "Des méthodes concrètes pour mieux s'organiser, prioriser, rester concentré et adopter un mindset de croissance dans un environnement professionnel exigeant.",
    poster:
      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&q=80",
    duration: "3 semaines",
    level: "Tous niveaux",
    category: "developpement-personnel",
    status: "bientot",
  },
  {
    id: "python-bootcamp",
    slug: "python-bootcamp",
    title: "Python Bootcamp",
    shortDescription:
      "Python de A à Z : bases, données, automatisation et premiers pas en IA.",
    description:
      "Bootcamp Python complet : syntaxe, structures de données, APIs, scripts d'automatisation et introduction au machine learning. Projets réels et séances en groupe.",
    poster:
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80",
    duration: "6 semaines",
    level: "Débutant",
    category: "ai",
    status: "bientot",
    highlight: true,
    sessionImages: [
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&q=80",
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&q=80",
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&q=80",
    ],
  },
  {
    id: "docs",
    slug: "docs",
    title: "Documentation Technique & Rédaction",
    shortDescription:
      "Rédiger une documentation technique claire et maintenable.",
    description:
      "Apprenez à structurer et rédiger une documentation technique (APIs, produits, procédures), outils (Markdown, Docusaurus, Swagger) et bonnes pratiques pour développeurs et équipes produit.",
    poster:
      "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&q=80",
    duration: "4 semaines",
    level: "Tous niveaux",
    category: "autres",
    status: "bientot",
  },
  {
    id: "cybersecurite",
    slug: "cybersecurite",
    title: "Cybersécurité",
    shortDescription: "Fondements de la sécurité informatique et bonnes pratiques.",
    description:
      "Sécurité des réseaux, cryptographie, tests d'intrusion, conformité et sensibilisation. Préparation aux certifications et mises en situation réelles.",
    poster:
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80",
    duration: "10 semaines",
    level: "Intermédiaire",
    category: "cyber",
    status: "bientot",
  },
  {
    id: "developpement-web",
    slug: "developpement-web",
    title: "Développement Web",
    shortDescription: "Full stack : front-end, back-end et déploiement.",
    description:
      "HTML, CSS, JavaScript, React, Node.js et bases de données. Projets de A à Z et bonnes pratiques pour un emploi en développement web.",
    poster:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80",
    duration: "12 semaines",
    level: "Débutant",
    category: "dev-web",
    status: "bientot",
  },
  {
    id: "data-science",
    slug: "data-science",
    title: "Data Science",
    shortDescription: "Analyse de données, statistiques et machine learning.",
    description:
      "Python pour la data, pandas, visualisation, modèles de ML et mise en production. Projets sur jeux de données réels.",
    poster:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    duration: "10 semaines",
    level: "Intermédiaire",
    category: "data",
    status: "bientot",
  },
]

export function getFormationBySlug(slug: string): Formation | undefined {
  return formations.find((f) => f.slug === slug)
}

export function getHighlightedFormations(): Formation[] {
  return formations.filter((f) => f.highlight === true)
}

export function getFormationsByCategory(category: FormationCategory): Formation[] {
  return formations.filter((f) => f.category === category)
}
