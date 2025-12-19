"use client"

import { useState, useEffect, useRef } from "react"

export function InstagramServiceSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  const benefits = [
    {
      title: "Planification des Formations",
      description:
        "MBSkills planifie automatiquement les séances de formation et envoie des confirmations sur tous les canaux - site web, téléphone et réseaux sociaux, personnalisé selon votre flux de travail",
    },
    {
      title: "Questions sur les Programmes",
      description:
        "Répond aux questions sur la disponibilité des programmes, les tarifs et les prérequis en temps réel basé sur notre catalogue, que les étudiants nous contactent par téléphone, site web ou réseaux sociaux",
    },
    {
      title: "Gestion des Inscriptions",
      description:
        "Traite les inscriptions et fournit les mises à jour de statut sans intervention humaine sur chaque point de contact étudiant, adapté à nos systèmes",
    },
    {
      title: "Suivi des Étudiants",
      description:
        "Maintient les étudiants informés sur leur progression et la disponibilité des ressources 24/7 en temps réel via la messagerie ou les notifications push, le tout personnalisé selon notre style de communication",
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
            Apprentissage Continue <span className="bg-gradient-to-r from-[#04a3fe] to-[#122138] bg-clip-text text-transparent">24/7</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Notre plateforme d'apprentissage en ligne vous permet d'accéder à vos formations à tout moment, de n'importe où, pour développer vos compétences à votre rythme.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-[#04a3fe] to-[#122138] text-white p-4">
              <h3 className="text-xl font-semibold">Plateforme d'Apprentissage</h3>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center flex-shrink-0">
                  <span className="text-slate-600 font-semibold">JD</span>
                </div>
                <div className="bg-slate-100 rounded-lg p-3 max-w-[80%]">
                  <p className="text-slate-800 text-sm">Bonjour, j'ai une question sur l'exercice de React</p>
                </div>
              </div>
              <div className="flex gap-3 justify-end">
                <div className="bg-[#04a3fe] text-white rounded-lg p-3 max-w-[80%]">
                  <p>Bonjour ! Je serais ravi de vous aider. Quel exercice en particulier vous pose problème ?</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center flex-shrink-0">
                  <span className="text-slate-600 font-semibold">JD</span>
                </div>
                <div className="bg-slate-100 rounded-lg p-3 max-w-[80%]">
                  <p className="text-slate-800 text-sm">Le module 3 sur les hooks personnalisés</p>
                </div>
              </div>
              <div className="flex gap-3 justify-end">
                <div className="bg-[#04a3fe] text-white rounded-lg p-3 max-w-[80%]">
                  <p>Je comprends. Les hooks personnalisés peuvent être déroutants au début. Pouvez-vous me montrer votre code actuel ?</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl overflow-hidden mt-8 md:mt-0">
            <div className="bg-gradient-to-r from-[#04a3fe] to-[#122138] text-white p-4">
              <h3 className="text-xl font-semibold">Ressources Disponibles</h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 rounded-lg p-4 text-center">
                  <div className="w-12 h-12 bg-[#04a3fe]/10 rounded-full flex items-center justify-center mx-auto mb-2">
                    <svg className="w-6 h-6 text-[#04a3fe]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>
                  </div>
                  <h4 className="text-sm font-semibold text-slate-700">Vidéos</h4>
                  <p className="text-xs text-slate-500 mt-1">200+ heures</p>
                </div>
                <div className="bg-slate-50 rounded-lg p-4 text-center">
                  <div className="w-12 h-12 bg-[#04a3fe]/10 rounded-full flex items-center justify-center mx-auto mb-2">
                    <svg className="w-6 h-6 text-[#04a3fe]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H8m-2-5V7m0 8a2 2 0 100-4 2 2 0 012 2v4a2 2 0 002 2H4a2 2 0 01-2-2V7a2 2 0 012-2z" />
                    </svg>
                  </div>
                  <h4 className="text-sm font-semibold text-slate-700">Exercices</h4>
                  <p className="text-xs text-slate-500 mt-1">500+ projets</p>
                </div>
                <div className="bg-slate-50 rounded-lg p-4 text-center">
                  <div className="w-12 h-12 bg-[#04a3fe]/10 rounded-full flex items-center justify-center mx-auto mb-2">
                    <svg className="w-6 h-6 text-[#04a3fe]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>
                  </div>
                  <h4 className="text-sm font-semibold text-slate-700">Documents</h4>
                  <p className="text-xs text-slate-500 mt-1">100+ guides</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl overflow-hidden mt-8 md:mt-0">
            <div className="bg-gradient-to-r from-[#04a3fe] to-[#122138] text-white p-4">
              <h3 className="text-xl font-semibold">Avantages de l'Apprentissage en Ligne</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#04a3fe]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3 h-3 text-[#04a3fe]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.293-7.293a1 1 0 00-1.414 0L10 12.414l-7.293 7.293a1 1 0 001.414 1.414L10 10.586 12.707 7.293a1 1 0 001.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-semibold text-slate-900">Flexibilité Totale</h4>
                  <p className="text-sm text-slate-600 mt-1">Apprenez à votre propre rythme, où que vous soyez et quand vous le souhaitez</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#04a3fe]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3 h-3 text-[#04a3fe]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-semibold text-slate-900">Accès à Vie</h4>
                  <p className="text-sm text-slate-600 mt-1">Accédez à votre formation et aux ressources pour toujours, même après l'obtention de votre certificat</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#04a3fe]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3 h-3 text-[#04a3fe]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                      <path
                        fillRule="evenodd"
                        d="M4 5a2 2 0 012-2 3 3 0 003 3h2a2 2 0 002 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <h4 className="text-lg font-semibold text-slate-900">Mises à Jour Continuelles</h4>
                  <p className="text-sm text-slate-600 mt-1">Contenu régulièrement mis à jour avec les dernières technologies et tendances du marché</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}