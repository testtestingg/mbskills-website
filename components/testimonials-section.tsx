"use client"

import { useEffect, useRef } from "react"
import { TestimonialsColumn } from "@/components/ui/testimonials-column"

export function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elements = entry.target.querySelectorAll(".fade-in-element")
            elements.forEach((element, index) => {
              setTimeout(() => {
                element.classList.add("animate-fade-in-up")
              }, index * 300)
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

  const testimonials = [
    {
      text: "MBSkills m'a offert une formation complète en cybersécurité. J'ai décroché un CDI dans une entreprise du CAC 40 juste après la certification. Un vrai tremplin.",
      name: "Fatma Baccouche",
      role: "Expert en Cybersécurité",
    },
    {
      text: "Grâce à MBSkills, j'ai pu me reconvertir dans le développement web après 10 ans dans un autre domaine. Le taux d'emploi parle de lui-même : j'en suis la preuve.",
      name: "Mohamed Sfaxi",
      role: "Développeur Web",
    },
    {
      text: "Les formateurs sont des experts du secteur qui partagent leur expérience réelle. J'ai appris plus en 3 mois qu'en 2 ans d'université. Formation dense et appliquée.",
      name: "Amine Trabelsi",
      role: "Ingénieur Logiciel",
    },
    {
      text: "Le support 24/7 m'a permis de progresser à mon rythme. J'ai obtenu ma certification en data science avec distinction. Je recommande sans hésiter.",
      name: "Mariem Touati",
      role: "Data Scientist",
    },
    {
      text: "Je suis passé de développeur junior à senior en seulement 6 mois. Mon salaire a augmenté de 40 %. MBSkills tient ses promesses.",
      name: "Youssef Ben Ali",
      role: "Développeur Full Stack",
    },
    {
      text: "Le réseau d'entreprises partenaires m'a permis de trouver un stage rapidement. J'ai été embauchée avant même la fin de ma formation.",
      name: "Khadija Mezni",
      role: "Spécialiste Cloud",
    },
    {
      text: "Mon fils a trouvé sa voie grâce au bootcamp Python. L'équipe est à l'écoute et les projets concrets l'ont motivé jusqu'à son premier emploi.",
      name: "Parent d'étudiant",
      role: "Témoignage parent",
    },
    {
      text: "Nous avons inscrit notre fille à la formation Robotique. Progression claire, encadrement sérieux et débouchés réels. Nous sommes ravis du résultat.",
      name: "Parent d'étudiant",
      role: "Témoignage parent",
    },
  ]

  return (
    <section id="testimonials" ref={sectionRef} className="relative pt-16 pb-16 px-4 sm:px-6 lg:px-8">
      {/* Grid Background */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header Section - Keep as user loves it */}
        <div className="text-center mb-16 md:mb-32">
          <div className="fade-in-element opacity-0 translate-y-8 transition-all duration-1000 ease-out inline-flex items-center gap-2 text-white/60 text-sm font-medium tracking-wider uppercase mb-6">
            <div className="w-8 h-px bg-white/30"></div>
            Témoignages
            <div className="w-8 h-px bg-white/30"></div>
          </div>
          <h2 className="fade-in-element opacity-0 translate-y-8 transition-all duration-1000 ease-out text-5xl md:text-6xl lg:text-7xl font-light text-white mb-8 tracking-tight text-balance">
            Les professionnels que nous <span className="font-medium italic">formons</span>
          </h2>
          <p className="fade-in-element opacity-0 translate-y-8 transition-all duration-1000 ease-out text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
            Découvrez comment nos étudiants ont transformé leur carrière grâce à nos formations technologiques
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="fade-in-element opacity-0 translate-y-8 transition-all duration-1000 ease-out relative flex justify-center items-center min-h-[600px] md:min-h-[800px] overflow-hidden">
          <div
            className="flex gap-8 max-w-6xl"
            style={{
              maskImage: "linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)",
            }}
          >
            <TestimonialsColumn testimonials={testimonials.slice(0, 3)} duration={15} className="flex-1" />
            <TestimonialsColumn
              testimonials={testimonials.slice(2, 5)}
              duration={12}
              className="flex-1 hidden md:block"
            />
            <TestimonialsColumn
              testimonials={testimonials.slice(1, 4)}
              duration={18}
              className="flex-1 hidden lg:block"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
