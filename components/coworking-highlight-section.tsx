"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import {
  ArrowRight,
  Building2,
  Users,
  CalendarRange,
  Wifi,
  Coffee,
  CheckCircle2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  SPACE_TYPE_LABELS,
  STATUS_LABELS,
  type SpaceWithAvailability,
} from "@/lib/coworking/types"

const statusDot: Record<string, string> = {
  available: "bg-emerald-400",
  limited: "bg-amber-400",
  full: "bg-rose-400",
  closed: "bg-slate-400",
}

export function CoworkingHighlightSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [spaces, setSpaces] = useState<SpaceWithAvailability[]>([])

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

  useEffect(() => {
    let cancelled = false
    fetch("/api/coworking", { cache: "no-store" })
      .then((r) => r.json())
      .then((json) => {
        if (!cancelled && Array.isArray(json?.spaces)) setSpaces(json.spaces)
      })
      .catch(() => {})
    return () => {
      cancelled = true
    }
  }, [])

  const totalAvailable = spaces.reduce(
    (sum, s) => sum + (s.availability?.available_units ?? 0),
    0,
  )

  const preview = spaces.length
    ? spaces.slice(0, 6)
    : ([
        { id: "p1", name: "Poste Open Space", type: "desk", total_units: 20, availability: null } as any,
        { id: "p2", name: "Bureau Privé", type: "office", total_units: 6, availability: null } as any,
        { id: "p3", name: "Salle de Réunion", type: "meeting_room", total_units: 3, availability: null } as any,
      ] as SpaceWithAvailability[])

  return (
    <section
      id="coworking"
      ref={sectionRef}
      className="relative py-16 sm:py-24 px-4 z-10"
    >
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div
          className={`text-center mb-12 sm:mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium mb-6">
            <Building2 className="w-4 h-4 mr-2 text-[#04a3fe]" />
            Nouveau · Coworking Space
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white text-balance mb-4">
            Un espace de travail{" "}
            <span className="bg-gradient-to-r from-[#04a3fe] to-[#3ab5fe] bg-clip-text text-transparent">
              pensé pour les pros
            </span>
          </h2>
          <p className="text-base sm:text-lg text-white/70 max-w-2xl mx-auto font-light">
            Bureaux, salles de réunion et espaces événementiels — disponibles à l'heure,
            à la journée ou au mois, pour les individus comme pour les entreprises.
          </p>
        </div>

        {/* Feature grid */}
        <div
          className={`grid md:grid-cols-3 gap-4 sm:gap-6 mb-10 transition-all duration-1000 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <FeatureCard
            icon={<Users className="w-5 h-5" />}
            title="Individus & équipes"
            body="Hot desks pour freelances, bureaux privés pour startups, salles pour toute l'entreprise."
          />
          <FeatureCard
            icon={<CalendarRange className="w-5 h-5" />}
            title="Réservation flexible"
            body="À l'heure, à la journée ou au mois — payez uniquement ce dont vous avez besoin."
          />
          <FeatureCard
            icon={<Wifi className="w-5 h-5" />}
            title="Tout inclus"
            body="Wi-Fi fibre, café illimité, salles équipées, impressions, lounge et plus."
          />
        </div>

        {/* Live availability card */}
        <div
          className={`rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md p-6 sm:p-8 transition-all duration-1000 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-white/60 mb-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                </span>
                Disponibilité en direct
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold text-white">
                {totalAvailable > 0
                  ? `${totalAvailable} places disponibles aujourd'hui`
                  : "Contactez-nous pour vérifier la disponibilité"}
              </h3>
            </div>
            <Button
              asChild
              className="rounded-full bg-white text-black hover:bg-gray-100 font-medium shrink-0"
            >
              <Link href="/coworking">
                Découvrir le Coworking
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {preview.map((space) => {
              const av = space.availability
              const status = av?.status ?? "available"
              return (
                <div
                  key={space.id}
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0f1e36]/60 p-4 hover:border-[#04a3fe]/40 hover:bg-[#0f1e36] transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs uppercase tracking-wider text-white/50">
                      {SPACE_TYPE_LABELS[space.type] ?? "Espace"}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-[11px] text-white/80">
                      <span className={`h-1.5 w-1.5 rounded-full ${statusDot[status] ?? "bg-emerald-400"}`} />
                      {STATUS_LABELS[status] ?? "Disponible"}
                    </span>
                  </div>
                  <div className="text-white font-semibold text-base mb-2">
                    {space.name}
                  </div>
                  {av && (
                    <div className="text-white/70 text-sm flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#04a3fe]" />
                      {av.available_units} / {space.total_units} disponibles
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-white/60">
            <span className="inline-flex items-center gap-1.5">
              <Coffee className="w-3.5 h-3.5" /> Café illimité
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Wifi className="w-3.5 h-3.5" /> Wi-Fi fibre
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CalendarRange className="w-3.5 h-3.5" /> Ouvert 7j/7
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

function FeatureCard({
  icon,
  title,
  body,
}: {
  icon: React.ReactNode
  title: string
  body: string
}) {
  return (
    <div className="group rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-5 hover:bg-white/10 hover:border-white/20 transition-all duration-500">
      <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-[#04a3fe]/15 text-[#3ab5fe] mb-3">
        {icon}
      </div>
      <h3 className="text-white font-semibold mb-1">{title}</h3>
      <p className="text-white/70 text-sm leading-relaxed">{body}</p>
    </div>
  )
}
