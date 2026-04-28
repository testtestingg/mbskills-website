"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Calendar, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const journees = [
  {
    id: "orientation",
    title: "Journée d'Orientation",
    description: "Découvrez nos formations, rencontrez les formateurs et posez toutes vos questions dans une ambiance conviviale.",
    image: "https://i.ibb.co/9kXtZMS4/Whats-App-Image-2026-04-27-at-18-06-07.jpg",
    cta: "En savoir plus",
  },
  {
    id: "olympiade",
    title: "Journée Olympiade",
    description: "Compétitions, défis techniques et moments d'échange pour célébrer les compétences et la communauté MBSkills.",
    image: "https://i.ibb.co/k2Qv3dVv/Whats-App-Image-2026-04-27-at-18-05-33.jpg",
    cta: "En savoir plus",
  },
]

export function JourneesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.1, rootMargin: "0px 0px -80px 0px" }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="relative py-16 sm:py-24 px-4 z-10">
      <div className="max-w-6xl mx-auto">
        <div
          className={`text-center mb-12 sm:mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium mb-6">
            <Calendar className="w-4 h-4" />
            Événements
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white text-balance mb-4">
            Journée d'Orientation &{" "}
            <span className="bg-gradient-to-r from-[#04a3fe] to-[#122138] bg-clip-text text-transparent">
              Journée Olympiade
            </span>
          </h2>
          <p className="text-base sm:text-lg text-white/70 max-w-2xl mx-auto font-light">
            Participez à nos journées événements avec de vrais moments partagés et des photos de nos sessions.
          </p>
        </div>

        <div
          className={`grid md:grid-cols-2 gap-8 transition-all duration-1000 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {journees.map((event, index) => (
            <div
              key={event.id}
              className="group rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 hover:border-white/20 transition-all duration-500"
              style={{ transitionDelay: isVisible ? `${400 + index * 100}ms` : "0ms" }}
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src="https://i.ibb.co/bMfSx5M4/Whats-App-Image-2026-04-27-at-18-05-42.jpg"
                  alt={event.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-xl sm:text-2xl font-bold text-white">{event.title}</h3>
                </div>
              </div>
              <div className="p-5 sm:p-6">
                <p className="text-white/80 text-sm sm:text-base mb-4 leading-relaxed">{event.description}</p>
                <Button
                  asChild
                  variant="outline"
                  size="default"
                  className="rounded-full border-white/30 text-white hover:bg-white/10"
                >
                  <Link href="/#contact">
                    {event.cta}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
