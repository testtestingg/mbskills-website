export interface Formation {
  id: string
  slug: string
  title: string
  shortDescription: string
  description: string
  poster: string
  duration: string
  level: string
  highlight?: boolean
  sessionImages?: string[]
}

export const formations: Formation[] = [
  {
    id: "robotique-bootcamp",
    slug: "robotique-bootcamp",
    title: "Robotique Bootcamp",
    shortDescription: "Conception, programmation et déploiement de robots et systèmes automatisés.",
    description:
      "Formation intensive en robotique : électronique, programmation embarquée, capteurs et actionneurs, projets pratiques avec kits et séances en présentiel.",
    poster: "https://images.unsplash.com/photo-1561557944-6e7860c0131b?w=800&q=80",
    duration: "8 semaines",
    level: "Débutant à Intermédiaire",
    highlight: true,
    sessionImages: [
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&q=80",
      "https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=400&q=80",
      "https://images.unsplash.com/photo-1561557944-6e7860c0131b?w=400&q=80",
    ],
  },
  {
    id: "python-bootcamp",
    slug: "python-bootcamp",
    title: "Python Bootcamp",
    shortDescription: "Python de A à Z : bases, données, automatisation et premiers pas en IA.",
    description:
      "Bootcamp Python complet : syntaxe, structures de données, APIs, scripts d'automatisation et introduction au machine learning. Projets réels et séances en groupe.",
    poster: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80",
    duration: "6 semaines",
    level: "Débutant",
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
    shortDescription: "Rédiger une documentation technique claire et maintenable.",
    description:
      "Apprenez à structurer et rédiger une documentation technique (APIs, produits, procédures), outils (Markdown, Docusaurus, Swagger) et bonnes pratiques pour développeurs et équipes produit.",
    poster: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&q=80",
    duration: "4 semaines",
    level: "Tous niveaux",
  },
  {
    id: "cybersecurite",
    slug: "cybersecurite",
    title: "Cybersécurité",
    shortDescription: "Fondements de la sécurité informatique et bonnes pratiques.",
    description:
      "Sécurité des réseaux, cryptographie, tests d'intrusion, conformité et sensibilisation. Préparation aux certifications et mises en situation réelles.",
    poster: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80",
    duration: "10 semaines",
    level: "Intermédiaire",
  },
  {
    id: "developpement-web",
    slug: "developpement-web",
    title: "Développement Web",
    shortDescription: "Full stack : front-end, back-end et déploiement.",
    description:
      "HTML, CSS, JavaScript, React, Node.js et bases de données. Projets de A à Z et bonnes pratiques pour un emploi en développement web.",
    poster: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80",
    duration: "12 semaines",
    level: "Débutant",
  },
  {
    id: "data-science",
    slug: "data-science",
    title: "Data Science",
    shortDescription: "Analyse de données, statistiques et machine learning.",
    description:
      "Python pour la data, pandas, visualisation, modèles de ML et mise en production. Projets sur jeux de données réels.",
    poster: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    duration: "10 semaines",
    level: "Intermédiaire",
  },
  {
    id: "intelligence-artificielle",
    slug: "intelligence-artificielle",
    title: "Intelligence Artificielle",
    shortDescription: "ML, deep learning et applications métier.",
    description:
      "Fondements du ML et du deep learning, frameworks (TensorFlow/PyTorch), NLP et vision par ordinateur. Projets concrets et bonnes pratiques.",
    poster: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
    duration: "12 semaines",
    level: "Intermédiaire",
  },
]

export function getFormationBySlug(slug: string): Formation | undefined {
  return formations.find((f) => f.slug === slug)
}

export function getHighlightedFormations(): Formation[] {
  return formations.filter((f) => f.highlight === true)
}
