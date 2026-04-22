"use client"

import { useEffect, useRef, useState } from "react"
import { GlassmorphismNav } from "@/components/glassmorphism-nav"
import Aurora from "@/components/Aurora"
import { Footer } from "@/components/footer"
import { IhetPartnerSection } from "@/components/ihet-partner-section"
import {
  Target,
  Compass,
  Users,
  Rocket,
  Award,
  GraduationCap,
  Lightbulb,
  HeartHandshake,
} from "lucide-react"

export default function AProposPage() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.1, rootMargin: "0px 0px -80px 0px" },
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const values = [
    {
      icon: Lightbulb,
      title: "Excellence pédagogique",
      description:
        "Des contenus rigoureux, à jour et centrés sur la pratique pour un apprentissage qui dure.",
    },
    {
      icon: Users,
      title: "Accompagnement humain",
      description:
        "Chaque apprenant est suivi : mentors dédiés, feedback régulier et communauté active.",
    },
    {
      icon: Rocket,
      title: "Orientation résultat",
      description:
        "Nos formations sont pensées pour l'employabilité et l'impact immédiat sur votre carrière.",
    },
    {
      icon: HeartHandshake,
      title: "Proximité & confiance",
      description:
        "Un cadre bienveillant, transparent et exigeant, fondé sur des relations durables.",
    },
  ]

  const stats = [
    { value: "8+", label: "Domaines de formation" },
    { value: "92%", label: "Taux d'insertion" },
    { value: "24/7", label: "Support apprenants" },
    { value: "100%", label: "Approche pratique" },
  ]

  return (
    <div className="min-h-screen bg-brand-navy overflow-hidden">
      <main className="min-h-screen relative overflow-hidden">
        <div className="fixed inset-0 w-full h-full bg-brand-radial">
          <Aurora colorStops={["#04a3fe", "#1a2f4f", "#04a3fe"]} amplitude={1.1} blend={0.5} speed={0.7} />
        </div>
        <div className="relative z-10">
          <GlassmorphismNav />

          {/* Hero */}
          <section ref={sectionRef} className="pt-28 md:pt-36 pb-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto text-center">
              <div
                className={`transition-all duration-1000 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              >
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium mb-6">
                  <span className="w-2 h-2 bg-[#04a3fe] rounded-full mr-2 animate-pulse" />
                  À propos de MBSkills
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white text-balance mb-6 leading-tight">
                  Former les{" "}
                  <span className="bg-gradient-to-r from-[#04a3fe] to-[#3ab5fe] bg-clip-text text-transparent">
                    talents de demain
                  </span>{" "}
                  avec exigence et proximité
                </h1>
                <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto font-light leading-relaxed">
                  MBSkills est un centre de formation technologique dédié au développement des
                  compétences qui transforment les carrières et les organisations.
                </p>
              </div>
            </div>
          </section>

          {/* Mission / Vision */}
          <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6">
              <div className="p-8 sm:p-10 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-[#04a3fe]/30 transition-all duration-500">
                <div className="w-12 h-12 rounded-xl bg-[#04a3fe]/15 border border-[#04a3fe]/30 flex items-center justify-center mb-5">
                  <Target className="w-6 h-6 text-[#04a3fe]" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Notre mission</h2>
                <p className="text-white/70 leading-relaxed">
                  Rendre accessibles des formations professionnelles de haute qualité,
                  pragmatiques et alignées sur les besoins réels du marché, afin d'aider
                  chaque apprenant à construire une carrière solide et durable.
                </p>
              </div>
              <div className="p-8 sm:p-10 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-[#04a3fe]/30 transition-all duration-500">
                <div className="w-12 h-12 rounded-xl bg-[#04a3fe]/15 border border-[#04a3fe]/30 flex items-center justify-center mb-5">
                  <Compass className="w-6 h-6 text-[#04a3fe]" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Notre vision</h2>
                <p className="text-white/70 leading-relaxed">
                  Devenir la référence régionale en matière de formation technologique
                  professionnelle, en combinant rigueur académique, innovation pédagogique
                  et ancrage concret dans le monde de l'entreprise.
                </p>
              </div>
            </div>
          </section>

          {/* Stats */}
          <section className="py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                {stats.map((s) => (
                  <div
                    key={s.label}
                    className="p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 text-center hover:bg-white/10 hover:border-[#04a3fe]/30 transition-all duration-500"
                  >
                    <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-[#04a3fe] to-[#3ab5fe] bg-clip-text text-transparent mb-2">
                      {s.value}
                    </div>
                    <div className="text-white/70 text-sm">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Values */}
          <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium mb-6">
                  <span className="w-2 h-2 bg-[#04a3fe] rounded-full mr-2 animate-pulse" />
                  Nos valeurs
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
                  Ce qui nous{" "}
                  <span className="bg-gradient-to-r from-[#04a3fe] to-[#3ab5fe] bg-clip-text text-transparent">
                    anime
                  </span>
                </h2>
                <p className="text-white/60 max-w-2xl mx-auto">
                  Quatre principes qui guident chaque décision, chaque programme et chaque
                  interaction avec nos apprenants.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {values.map((v, i) => {
                  const Icon = v.icon
                  return (
                    <div
                      key={v.title}
                      className="group p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 hover:border-[#04a3fe]/30 transition-all duration-500"
                      style={{ transitionDelay: `${i * 80}ms` }}
                    >
                      <div className="w-12 h-12 rounded-xl bg-[#04a3fe]/15 border border-[#04a3fe]/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                        <Icon className="w-6 h-6 text-[#04a3fe]" />
                      </div>
                      <h3 className="text-white font-semibold text-lg mb-2">{v.title}</h3>
                      <p className="text-white/60 text-sm leading-relaxed">{v.description}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          </section>

          {/* IHET Partnership */}
          <IhetPartnerSection />

          {/* Approach */}
          <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
              <div className="p-8 sm:p-12 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-[#04a3fe]/15 border border-[#04a3fe]/30 flex items-center justify-center flex-shrink-0">
                    <GraduationCap className="w-6 h-6 text-[#04a3fe]" />
                  </div>
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                      Notre approche pédagogique
                    </h2>
                    <p className="text-white/60">Apprendre par la pratique, progresser par le feedback.</p>
                  </div>
                </div>
                <div className="grid md:grid-cols-3 gap-6 mt-8">
                  {[
                    {
                      title: "85% de pratique",
                      text:
                        "Des projets concrets dès la première semaine pour ancrer les compétences.",
                    },
                    {
                      title: "Mentorat 1:1",
                      text:
                        "Un accompagnement personnalisé par des professionnels du secteur.",
                    },
                    {
                      title: "Certifications",
                      text:
                        "Des parcours certifiants reconnus et valorisables sur le marché.",
                    },
                  ].map((b) => (
                    <div key={b.title} className="p-5 rounded-xl bg-white/5 border border-white/10">
                      <div className="flex items-center gap-2 mb-2">
                        <Award className="w-4 h-4 text-[#04a3fe]" />
                        <h3 className="text-white font-semibold">{b.title}</h3>
                      </div>
                      <p className="text-white/60 text-sm leading-relaxed">{b.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <Footer />
        </div>
      </main>
    </div>
  )
}
