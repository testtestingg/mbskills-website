"use client"

import { useEffect, useRef, useState, useMemo } from "react"
import Image from "next/image"
import { GlassmorphismNav } from "@/components/glassmorphism-nav"
import Aurora from "@/components/Aurora"
import { Footer } from "@/components/footer"
import {
  formations,
  formationCategories,
  type Formation,
  type FormationCategory,
} from "@/lib/data/formations"
import {
  ArrowRight,
  Calendar,
  BarChart3,
  Search,
  Megaphone,
  Brain,
  Sparkles,
  Cpu,
  Code2,
  ShieldCheck,
  BookOpen,
  Clock,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { InscriptionDialog } from "@/components/inscription-dialog"
import { Input } from "@/components/ui/input"
import { IhetPartnerSection } from "@/components/ihet-partner-section"

const iconMap = {
  Megaphone,
  Brain,
  Sparkles,
  Cpu,
  Code2,
  BarChart3,
  ShieldCheck,
  BookOpen,
}

// Categories shown as prominent sections on the Formation page
const FEATURED_CATEGORIES: FormationCategory[] = [
  "robotique",
  "digital-marketing",
  "ai",
  "developpement-personnel",
]

export default function FormationPage() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [search, setSearch] = useState("")
  const [activeFilter, setActiveFilter] = useState<"all" | "active" | "bientot">("all")
  const [inscriptionOpen, setInscriptionOpen] = useState(false)
  const [selectedFormation, setSelectedFormation] = useState<Formation | null>(null)

  const filteredFormations = useMemo(() => {
    let list = formations
    if (activeFilter === "active") list = list.filter((f) => f.status !== "bientot")
    if (activeFilter === "bientot") list = list.filter((f) => f.status === "bientot")
    if (!search.trim()) return list
    const q = search.trim().toLowerCase()
    return list.filter(
      (f) =>
        f.title.toLowerCase().includes(q) ||
        f.shortDescription.toLowerCase().includes(q) ||
        f.description.toLowerCase().includes(q),
    )
  }, [search, activeFilter])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.08, rootMargin: "0px 0px -80px 0px" },
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const openInscription = (formation: Formation) => {
    if (formation.status === "bientot") return
    setSelectedFormation(formation)
    setInscriptionOpen(true)
  }

  const scrollToCategory = (cat: FormationCategory) => {
    const el = document.getElementById(`category-${cat}`)
    if (el) {
      const y = el.getBoundingClientRect().top + window.pageYOffset - 120
      window.scrollTo({ top: y, behavior: "smooth" })
    }
  }

  return (
    <div className="min-h-screen bg-brand-navy overflow-hidden">
      <main className="min-h-screen relative overflow-hidden">
        <div className="fixed inset-0 w-full h-full bg-brand-radial">
          <Aurora colorStops={["#04a3fe", "#1a2f4f", "#04a3fe"]} amplitude={1.1} blend={0.5} speed={0.7} />
        </div>
        <div className="relative z-10">
          <GlassmorphismNav />
          <InscriptionDialog
            open={inscriptionOpen}
            onOpenChange={setInscriptionOpen}
            preselectedFormation={selectedFormation}
          />

          {/* Hero */}
          <section ref={sectionRef} className="pt-28 md:pt-36 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div
                className={`text-center mb-10 transition-all duration-1000 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              >
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium mb-6">
                  <span className="w-2 h-2 bg-[#04a3fe] rounded-full mr-2 animate-pulse" />
                  Nos programmes
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white text-balance mb-4">
                  Formations{" "}
                  <span className="bg-gradient-to-r from-[#04a3fe] to-[#3ab5fe] bg-clip-text text-transparent">
                    professionnelles
                  </span>
                </h1>
                <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto font-light mb-8">
                  Des parcours structurés par domaine pour développer les compétences qui comptent — aujourd'hui et demain.
                </p>

                {/* Category quick-nav */}
                <div
                  className={`flex flex-wrap gap-2 sm:gap-3 justify-center max-w-3xl mx-auto mb-6 transition-all duration-1000 delay-100 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                  }`}
                >
                  {FEATURED_CATEGORIES.map((cat) => {
                    const meta = formationCategories[cat]
                    const Icon = iconMap[meta.icon as keyof typeof iconMap]
                    return (
                      <button
                        key={cat}
                        onClick={() => scrollToCategory(cat)}
                        className="group inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-[#04a3fe]/40 text-white/80 hover:text-white text-sm font-medium transition-all duration-300"
                      >
                        {Icon && <Icon className="w-4 h-4 text-[#04a3fe]" />}
                        {meta.label}
                      </button>
                    )
                  })}
                </div>

                {/* Search + status filter */}
                <div
                  className={`flex flex-col sm:flex-row gap-3 justify-center items-stretch sm:items-center max-w-2xl mx-auto transition-all duration-1000 delay-150 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                  }`}
                >
                  <div className="relative flex-1 w-full sm:max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
                    <Input
                      type="search"
                      placeholder="Rechercher une formation..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="pl-9 bg-white/5 border-white/20 text-white placeholder:text-white/40 w-full"
                    />
                  </div>
                  <div className="flex rounded-lg border border-white/20 bg-white/5 p-1">
                    {(
                      [
                        { id: "all", label: "Toutes" },
                        { id: "active", label: "Actives" },
                        { id: "bientot", label: "Bientôt" },
                      ] as const
                    ).map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setActiveFilter(opt.id)}
                        className={`px-3 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
                          activeFilter === opt.id
                            ? "bg-white/20 text-white"
                            : "text-white/70 hover:text-white"
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Featured category sections */}
          {FEATURED_CATEGORIES.map((cat, catIdx) => {
            const catList = filteredFormations.filter((f) => f.category === cat)
            if (catList.length === 0) return null
            const meta = formationCategories[cat]
            const Icon = iconMap[meta.icon as keyof typeof iconMap]
            return (
              <CategorySection
                key={cat}
                id={`category-${cat}`}
                label={meta.label}
                description={meta.description}
                Icon={Icon}
                formations={catList}
                onOpen={openInscription}
                index={catIdx}
              />
            )
          })}

          {/* Other programs */}
          {(() => {
            const others = filteredFormations.filter(
              (f) => !FEATURED_CATEGORIES.includes(f.category),
            )
            if (others.length === 0) return null
            return (
              <CategorySection
                id="category-autres"
                label="Autres programmes"
                description="Formations complémentaires en tech et compétences transverses."
                Icon={BookOpen}
                formations={others}
                onOpen={openInscription}
                index={FEATURED_CATEGORIES.length}
              />
            )
          })()}

          {filteredFormations.length === 0 && (
            <div className="text-center py-20 px-4">
              <p className="text-white/70">Aucune formation ne correspond à votre recherche.</p>
            </div>
          )}

          {/* IHET partnership */}
          <IhetPartnerSection />

          <Footer />
        </div>
      </main>
    </div>
  )
}

/* -------------------------------------------------------------- */
/* Category Section                                                */
/* -------------------------------------------------------------- */

interface CategorySectionProps {
  id: string
  label: string
  description: string
  Icon: React.ComponentType<{ className?: string }>
  formations: Formation[]
  onOpen: (f: Formation) => void
  index: number
}

function CategorySection({
  id,
  label,
  description,
  Icon,
  formations,
  onOpen,
  index,
}: CategorySectionProps) {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true)
      },
      { threshold: 0.08, rootMargin: "0px 0px -60px 0px" },
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id={id}
      ref={ref}
      className="relative py-14 sm:py-20 px-4 sm:px-6 lg:px-8 z-10 scroll-mt-28"
    >
      <div className="max-w-6xl mx-auto">
        <div
          className={`flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8 sm:mb-10 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#04a3fe]/10 border border-[#04a3fe]/30 text-[#04a3fe] text-xs font-semibold uppercase tracking-wider mb-4">
              {Icon && <Icon className="w-3.5 h-3.5" />}
              Catégorie
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">
              {label}
            </h2>
            <p className="text-white/60 text-sm sm:text-base max-w-2xl">{description}</p>
          </div>
          <div className="text-white/40 text-sm hidden md:block">
            {formations.length} formation{formations.length > 1 ? "s" : ""}
          </div>
        </div>

        <div
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 transition-all duration-700 delay-150 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {formations.map((formation, i) => (
            <FormationCard
              key={formation.id}
              formation={formation}
              onOpen={onOpen}
              delay={200 + i * 70}
              visible={visible}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------- */
/* Formation Card                                                  */
/* -------------------------------------------------------------- */

interface FormationCardProps {
  formation: Formation
  onOpen: (f: Formation) => void
  delay: number
  visible: boolean
}

function FormationCard({ formation, onOpen, delay, visible }: FormationCardProps) {
  const isBientot = formation.status === "bientot"
  return (
    <div
      className={`group relative bg-white/5 backdrop-blur-md border rounded-2xl overflow-hidden flex flex-col transition-all duration-500 ${
        isBientot
          ? "border-white/10 hover:border-white/20"
          : "border-white/10 hover:border-[#04a3fe]/40 hover:bg-white/10"
      }`}
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
    >
      <div className="relative aspect-video bg-white/5 overflow-hidden">
        <Image
          src={formation.poster}
          alt={formation.title}
          fill
          className={`object-cover transition-transform duration-500 ${
            isBientot ? "grayscale-[40%] opacity-80" : "group-hover:scale-105"
          }`}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a1327] via-[#0a1327]/40 to-transparent" />

        {/* Status badges */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 items-end">
          {isBientot ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#04a3fe]/20 backdrop-blur border border-[#04a3fe]/40 text-[#04a3fe] text-xs font-semibold uppercase tracking-wider">
              <Clock className="w-3 h-3" />
              Bientôt
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/20 backdrop-blur border border-green-400/40 text-green-300 text-xs font-semibold uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              Active
            </span>
          )}
        </div>

        <div className="absolute bottom-3 left-3">
          <span className="inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur text-white text-xs font-medium">
            {formation.duration}
          </span>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-white transition-colors line-clamp-2">
          {formation.title}
        </h3>
        <p className="text-white/70 text-sm mb-4 line-clamp-3 flex-1">
          {formation.shortDescription}
        </p>
        <div className="flex flex-wrap gap-3 text-white/50 text-xs mb-4">
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            {formation.duration}
          </span>
          <span className="flex items-center gap-1">
            <BarChart3 className="w-3.5 h-3.5" />
            {formation.level}
          </span>
        </div>
        {isBientot ? (
          <Button
            size="sm"
            disabled
            className="rounded-full bg-white/10 border border-white/20 text-white/60 font-medium w-full cursor-not-allowed"
          >
            <Clock className="mr-2 w-4 h-4" />
            Bientôt disponible
          </Button>
        ) : (
          <Button
            size="sm"
            className="rounded-full bg-white text-[#0a1327] hover:bg-gray-100 font-medium w-full group/btn"
            onClick={() => onOpen(formation)}
          >
            Inscription
            <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
          </Button>
        )}
      </div>
    </div>
  )
}
