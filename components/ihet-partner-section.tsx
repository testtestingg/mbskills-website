"use client"

import { useEffect, useRef, useState } from "react"
import { GraduationCap, Award, HandshakeIcon, CheckCircle2 } from "lucide-react"

export function IhetPartnerSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.15, rootMargin: "0px 0px -80px 0px" }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const benefits = [
    {
      icon: GraduationCap,
      title: "Cadre académique",
      description:
        "Un environnement pédagogique reconnu et structuré, adossé à l'expertise de l'IHET.",
    },
    {
      icon: Award,
      title: "Certifications officielles",
      description:
        "Des parcours certifiants valorisés auprès des employeurs et du marché de l'emploi.",
    },
    {
      icon: HandshakeIcon,
      title: "Accompagnement pro",
      description:
        "Coaching, mentorat et insertion professionnelle grâce à notre réseau commun.",
    },
  ]

  return (
    <section
      ref={sectionRef}
      className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 z-10"
    >
      <div className="max-w-6xl mx-auto">
        <div
          className={`relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Decorative gradient */}
          <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-[#04a3fe]/10 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-[#04a3fe]/5 blur-3xl pointer-events-none" />

          <div className="relative p-8 sm:p-12 lg:p-16">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              {/* Left column — copy */}
              <div>
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#04a3fe]/10 border border-[#04a3fe]/30 text-[#04a3fe] text-sm font-medium mb-6">
                  <span className="w-2 h-2 bg-[#04a3fe] rounded-full mr-2 animate-pulse" />
                  Partenariat officiel
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white text-balance mb-6 leading-tight">
                  En collaboration avec{" "}
                  <span className="bg-gradient-to-r from-[#04a3fe] to-[#3ab5fe] bg-clip-text text-transparent">
                    l'IHET
                  </span>
                </h2>
                <p className="text-base sm:text-lg text-white/70 font-light leading-relaxed mb-6">
                  MBSkills s'associe à <strong className="text-white font-medium">l'IHET</strong>{" "}
                  (Institut des Hautes Études Technologiques) pour offrir des
                  formations adossées à un cadre académique reconnu, combinant
                  excellence pédagogique et expérience terrain.
                </p>

                <ul className="space-y-3 mb-8">
                  {[
                    "Programmes co-construits avec des experts académiques",
                    "Certifications valorisées sur le marché professionnel",
                    "Accès à un réseau d'alumni et de partenaires",
                  ].map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-white/80 text-sm sm:text-base"
                    >
                      <CheckCircle2 className="w-5 h-5 text-[#04a3fe] flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right column — benefit cards */}
              <div className="grid gap-4">
                {benefits.map((benefit, index) => {
                  const Icon = benefit.icon
                  return (
                    <div
                      key={benefit.title}
                      className={`group p-5 sm:p-6 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all duration-500 ${
                        isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
                      }`}
                      style={{
                        transitionDelay: isVisible ? `${200 + index * 120}ms` : "0ms",
                      }}
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-[#04a3fe]/15 border border-[#04a3fe]/30 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                          <Icon className="w-6 h-6 text-[#04a3fe]" />
                        </div>
                        <div>
                          <h3 className="text-white font-semibold text-base sm:text-lg mb-1">
                            {benefit.title}
                          </h3>
                          <p className="text-white/60 text-sm leading-relaxed">
                            {benefit.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
