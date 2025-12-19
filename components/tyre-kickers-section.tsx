"use client"
import { useEffect, useRef } from "react"

export function TyreKickersSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  const benefits = [
    {
      title: "Réponses Instantanées",
      description:
        "MBSkills répond à plus de 50 questions courantes sur les prérequis, les certifications et les carrières instantanément sur votre site web, téléphone et réseaux sociaux",
    },
    {
      title: "Qualification des Étudiants",
      description:
        "Filtre automatiquement les étudiants sérieux des simples curieux en posant les bonnes questions adaptées à votre centre de formation",
    },
    {
      title: "Gain de Temps",
      description:
        "Arrêtez de répondre aux mêmes questions répétitivement - laissez MBSkills gérer les demandes d'information générales",
    },
    {
      title: "Disponibilité 24/7",
      description:
        "Ne manquez jamais une demande sérieuse tout en filtrant les demandes d'information 24h/24 et 7j/7 - sur chaque canal",
    },
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elements = entry.target.querySelectorAll(".fade-in-element")
            elements.forEach((element, index) => {
              setTimeout(() => {
                element.classList.add("animate-fade-in-up")
              }, index * 100)
            })
          }
        })
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-16 sm:py-24 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Gestion Intelligente des <span className="bg-gradient-to-r from-[#04a3fe] to-[#122138] bg-clip-text text-transparent">Demandes</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Notre système IA filtre automatiquement les demandes pour vous aider à vous concentrer sur les étudiants les plus motivés.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6 border border-slate-200">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-[#04a3fe]/10 rounded-full flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-[#04a3fe]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-slate-900">{benefit.title}</h3>
              </div>
              <p className="text-slate-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
