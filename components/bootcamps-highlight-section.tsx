"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { getHighlightedFormations } from "@/lib/data/formations"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function BootcampsHighlightSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const bootcamps = getHighlightedFormations()

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
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-[#04a3fe] rounded-full mr-2 animate-pulse" />
            Bootcamps à la une
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white text-balance mb-4">
            Robotique & Python{" "}
            <span className="bg-gradient-to-r from-[#04a3fe] to-[#122138] bg-clip-text text-transparent">
              en sessions réelles
            </span>
          </h2>
          <p className="text-base sm:text-lg text-white/70 max-w-2xl mx-auto font-light">
            Découvrez nos bootcamps phares avec des séances en présentiel et des projets concrets.
          </p>
        </div>

        <div
          className={`grid md:grid-cols-2 gap-8 sm:gap-10 transition-all duration-1000 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {bootcamps.map((bootcamp, index) => (
            <div
              key={bootcamp.id}
              className="group rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 hover:border-white/20 transition-all duration-500"
              style={{ transitionDelay: isVisible ? `${400 + index * 100}ms` : "0ms" }}
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={bootcamp.poster}
                  alt={bootcamp.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">{bootcamp.title}</h3>
                  <p className="text-white/90 text-sm">{bootcamp.duration} · {bootcamp.level}</p>
                </div>
              </div>
              {bootcamp.sessionImages && bootcamp.sessionImages.length > 0 && (
                <div className="p-4 flex gap-2 overflow-x-auto scrollbar-hide">
                  {bootcamp.sessionImages.map((img, i) => (
                    <div
                      key={i}
                      className="relative flex-shrink-0 w-24 h-24 sm:w-28 sm:h-28 rounded-lg overflow-hidden border border-white/10"
                    >
                      <Image
                        src={img}
                        alt={`Session ${i + 1}`}
                        fill
                        className="object-cover"
                        sizes="112px"
                        unoptimized
                      />
                    </div>
                  ))}
                </div>
              )}
              <div className="p-4 sm:p-6 flex flex-wrap items-center justify-between gap-3">
                <p className="text-white/80 text-sm flex-1 min-w-0">{bootcamp.shortDescription}</p>
                <Button
                  asChild
                  size="default"
                  className="rounded-full bg-white text-black hover:bg-gray-100 font-medium shrink-0"
                >
                  <Link href="/formation">
                    Voir la formation
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
