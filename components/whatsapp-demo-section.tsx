"use client"

import { useEffect, useRef } from "react"

export function WhatsAppDemoSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

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
            Support WhatsApp <span className="bg-gradient-to-r from-[#04a3fe] to-[#122138] bg-clip-text text-transparent">24/7</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Nos étudiants bénéficient d'un support continu via WhatsApp pour répondre à leurs questions et les aider dans leur parcours d'apprentissage.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-[#04a3fe] text-white p-4">
            <h3 className="text-xl font-semibold">Conversation avec un étudiant</h3>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center flex-shrink-0">
                <span className="text-slate-600 font-semibold">JD</span>
              </div>
              <div className="bg-slate-100 rounded-lg p-3 max-w-[80%]">
                <p className="text-slate-800">Bonjour, j'ai une question sur l'exercice de React</p>
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
                <p className="text-slate-800">Le module 3 sur les hooks personnalisés</p>
              </div>
            </div>
            <div className="flex gap-3 justify-end">
              <div className="bg-[#04a3fe] text-white rounded-lg p-3 max-w-[80%]">
                <p>Je comprends. Les hooks personnalisés peuvent être déroutants au début. Pouvez-vous me montrer votre code actuel ?</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
