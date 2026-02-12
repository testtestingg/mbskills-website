"use client"

import { useEffect, useRef, useState, useMemo } from "react"
import Image from "next/image"
import { GlassmorphismNav } from "@/components/glassmorphism-nav"
import Aurora from "@/components/Aurora"
import { Footer } from "@/components/footer"
import { formations, type Formation } from "@/lib/data/formations"
import { ArrowRight, Calendar, BarChart3, Search, LayoutGrid, List } from "lucide-react"
import { Button } from "@/components/ui/button"
import { InscriptionDialog } from "@/components/inscription-dialog"
import { Input } from "@/components/ui/input"

export default function FormationPage() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [search, setSearch] = useState("")
  const [viewMode, setViewMode] = useState<"cards" | "list">("cards")
  const [inscriptionOpen, setInscriptionOpen] = useState(false)
  const [selectedFormation, setSelectedFormation] = useState<Formation | null>(null)

  const filteredFormations = useMemo(() => {
    if (!search.trim()) return formations
    const q = search.trim().toLowerCase()
    return formations.filter(
      (f) =>
        f.title.toLowerCase().includes(q) ||
        f.shortDescription.toLowerCase().includes(q) ||
        f.description.toLowerCase().includes(q)
    )
  }, [search])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.08, rootMargin: "0px 0px -80px 0px" }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const openInscription = (formation: Formation) => {
    setSelectedFormation(formation)
    setInscriptionOpen(true)
  }

  return (
    <div className="min-h-screen bg-black overflow-hidden">
      <main className="min-h-screen relative overflow-hidden">
        <div className="fixed inset-0 w-full h-full">
          <Aurora colorStops={["#475569", "#64748b", "#475569"]} amplitude={1.2} blend={0.6} speed={0.8} />
        </div>
        <div className="relative z-10">
          <GlassmorphismNav />
          <InscriptionDialog
            open={inscriptionOpen}
            onOpenChange={setInscriptionOpen}
            preselectedFormation={selectedFormation}
          />

          <section ref={sectionRef} className="pt-28 md:pt-36 pb-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div
                className={`text-center mb-10 transition-all duration-1000 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              >
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium mb-6">
                  <span className="w-2 h-2 bg-white/60 rounded-full mr-2 animate-pulse" />
                  Nos programmes
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white text-balance mb-4">
                  Formations{" "}
                  <span className="bg-gradient-to-r from-[#04a3fe] to-[#122138] bg-clip-text text-transparent">
                    technologiques
                  </span>
                </h1>
                <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto font-light mb-8">
                  Choisissez votre parcours et inscrivez-vous à la prochaine session.
                </p>

                {/* Search + view toggle */}
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
                    <button
                      type="button"
                      onClick={() => setViewMode("cards")}
                      className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        viewMode === "cards"
                          ? "bg-white/20 text-white"
                          : "text-white/70 hover:text-white"
                      }`}
                    >
                      <LayoutGrid className="w-4 h-4" />
                      Cartes
                    </button>
                    <button
                      type="button"
                      onClick={() => setViewMode("list")}
                      className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        viewMode === "list"
                          ? "bg-white/20 text-white"
                          : "text-white/70 hover:text-white"
                      }`}
                    >
                      <List className="w-4 h-4" />
                      Liste
                    </button>
                  </div>
                </div>
              </div>

              {filteredFormations.length === 0 ? (
                <div
                  className={`text-center py-16 transition-all duration-500 ${
                    isVisible ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <p className="text-white/70">Aucune formation ne correspond à votre recherche.</p>
                </div>
              ) : viewMode === "cards" ? (
                <div
                  className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-1000 delay-200 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                  }`}
                >
                  {filteredFormations.map((formation, index) => (
                    <div
                      key={formation.id}
                      className="group bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 hover:border-white/20 transition-all duration-500 flex flex-col"
                      style={{
                        transitionDelay: isVisible ? `${300 + index * 60}ms` : "0ms",
                      }}
                    >
                      <div className="relative aspect-video bg-white/5">
                        <Image
                          src={formation.poster}
                          alt={formation.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          unoptimized
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                          <span className="inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur text-white text-xs font-medium">
                            {formation.duration}
                          </span>
                        </div>
                      </div>
                      <div className="p-5 flex flex-col flex-1">
                        <h2 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-white transition-colors">
                          {formation.title}
                        </h2>
                        <p className="text-white/80 text-sm mb-4 line-clamp-2 flex-1">
                          {formation.shortDescription}
                        </p>
                        <div className="flex flex-wrap gap-2 text-white/60 text-xs mb-4">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            {formation.duration}
                          </span>
                          <span className="flex items-center gap-1">
                            <BarChart3 className="w-3.5 h-3.5" />
                            {formation.level}
                          </span>
                        </div>
                        <Button
                          size="sm"
                          className="rounded-full bg-white text-black hover:bg-gray-100 font-medium w-full sm:w-auto"
                          onClick={() => openInscription(formation)}
                        >
                          Inscription
                          <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div
                  className={`grid gap-8 sm:gap-10 transition-all duration-1000 delay-200 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                  }`}
                >
                  {filteredFormations.map((formation, index) => (
                    <div
                      key={formation.id}
                      className="group bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 hover:border-white/20 transition-all duration-500"
                      style={{
                        transitionDelay: isVisible ? `${300 + index * 80}ms` : "0ms",
                      }}
                    >
                      <div className="grid md:grid-cols-[minmax(0,340px)_1fr] gap-0">
                        <div className="relative aspect-video md:aspect-auto md:min-h-[280px] bg-white/5">
                          <Image
                            src={formation.poster}
                            alt={formation.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                            sizes="(max-width: 768px) 100vw, 340px"
                            unoptimized
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent md:bg-gradient-to-r md:from-black/40 md:via-transparent" />
                          <div className="absolute bottom-3 left-3 right-3 md:bottom-4 md:left-4">
                            <span className="inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur text-white text-xs font-medium">
                              {formation.duration}
                            </span>
                          </div>
                        </div>
                        <div className="p-6 md:p-8 flex flex-col justify-center">
                          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 group-hover:text-white transition-colors">
                            {formation.title}
                          </h2>
                          <p className="text-white/80 text-sm md:text-base mb-4 leading-relaxed">
                            {formation.shortDescription}
                          </p>
                          <div className="flex flex-wrap gap-3 text-white/60 text-xs md:text-sm mb-6">
                            <span className="flex items-center gap-1.5">
                              <Calendar className="w-4 h-4" />
                              {formation.duration}
                            </span>
                            <span className="flex items-center gap-1.5">
                              <BarChart3 className="w-4 h-4" />
                              {formation.level}
                            </span>
                          </div>
                          <div className="mt-auto">
                            <Button
                              size="lg"
                              className="rounded-full bg-white text-black hover:bg-gray-100 font-medium px-6 py-3 group/btn transition-all duration-300 hover:scale-105 hover:shadow-lg"
                              onClick={() => openInscription(formation)}
                            >
                              Inscription
                              <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>

          <Footer />
        </div>
      </main>
    </div>
  )
}
