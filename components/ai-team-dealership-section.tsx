"use client" 

import { useEffect, useRef, useState } from "react"
 
export function AiTeamDealershipSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [enrollmentsToday, setEnrollmentsToday] = useState(142)
  const [activeStudents, setActiveStudents] = useState(8)
  const [certificationsIssued, setCertificationsIssued] = useState(23)
  const [jobPlacementsMonthly, setJobPlacementsMonthly] = useState(17)

  useEffect(() => {
    const currentRef = sectionRef.current

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px",
      },
    )

    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [])

  useEffect(() => {
    if (!isVisible) return

    const intervals = [
      setInterval(() => setEnrollmentsToday((prev) => prev + 1), 8000),
      setInterval(() => setActiveStudents((prev) => Math.min(prev + 1, 12)), 12000),
      setInterval(() => setCertificationsIssued((prev) => prev + 1), 15000),
      setInterval(() => setJobPlacementsMonthly((prev) => prev + 1), 10000),
    ]

    return () => intervals.forEach(clearInterval)
  }, [isVisible])

  return (
    <section ref={sectionRef} className="py-16 sm:py-24 relative z-10">
      <div className="bg-white/98 backdrop-blur-2xl rounded-[2rem] shadow-[0_20px_80px_-20px_rgba(0,0,0,0.3)] border border-white/40 relative overflow-hidden mx-4">
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-gradient-to-br from-[#04a3fe]/20 via-[#122138]/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-gradient-to-tr from-[#04a3fe]/20 via-[#122138]/10 to-transparent rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-8 sm:py-12 lg:py-16 relative z-10">
          <div
            className={`text-center mb-12 sm:mb-16 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="inline-flex items-center px-5 py-2.5 rounded-full bg-gradient-to-r from-slate-100 to-slate-50 border border-slate-200/80 shadow-sm text-slate-700 text-sm font-semibold mb-6">
              <span className="w-2.5 h-2.5 bg-[#04a3fe] rounded-full mr-2.5 animate-pulse shadow-lg shadow-[#04a3fe]/50"></span>
              Formations 24/7 - Accélérez Votre Carrière
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#122138] mb-4 sm:mb-6 tracking-tight">
              Vos Compétences{" "}
              <span className="bg-gradient-to-r from-[#04a3fe] via-[#122138] to-[#04a3fe] bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
                Sans Limites
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Explorez nos formations pratiques en développement web, ingénierie logicielle, intelligence artificielle et data science. Obtenez des certifications reconnues et trouvez un emploi dans le secteur tech.
            </p>
          </div>

          <div
            className={`grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 transition-all duration-1000 delay-200 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            {/* Chat Support - Large widget spanning 2 columns */}
            <div className="lg:col-span-2 bg-gradient-to-br from-slate-50 to-[#04a3fe]/10 rounded-2xl p-6 border border-slate-200/60 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#04a3fe] to-[#122138] rounded-xl flex items-center justify-center shadow-lg shadow-[#04a3fe]/30">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#122138]">Support Apprenant 24/7</h3>
                    <p className="text-xs text-slate-500">Accompagnement multi-canal</p>
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  {/* Live chat preview */}
                  <div className="bg-white rounded-xl p-4 border border-slate-200/60 shadow-sm">
                    <div className="flex items-center gap-2 mb-3 pb-2 border-b border-slate-100">
                      <div className="w-2 h-2 bg-[#04a3fe] rounded-full animate-pulse"></div>
                      <span className="text-xs font-semibold text-slate-700">Chat en Direct</span>
                      <div className="ml-auto flex gap-1">
                        {/* Platform badges */}
                        <div className="w-5 h-5 bg-[#25D366] rounded-full flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                          </svg>
                        </div>
                        <div className="w-5 h-5 bg-gradient-to-br from-[#00B2FF] to-[#006AFF] rounded-full flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0C5.373 0 0 4.975 0 11.111c0 3.497 1.745 6.616 4.472 8.652V24l4.086-2.242c1.09.301 2.246.464 3.442.464 6.627 0 12-4.974 12-11.11C24 4.975 18.627 0 12 0zm1.191 14.963l-3.055-3.26-5.963 3.26L10.732 8l3.131 3.259L19.752 8l-6.561 6.963z" />
                          </svg>
                        </div>
                        <div className="w-5 h-5 bg-gradient-to-br from-[#04a3fe] to-[#122138] rounded-full flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex gap-2 animate-slide-in-left">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#04a3fe] to-[#122138] flex-shrink-0"></div>
                        <div className="bg-slate-100 rounded-lg rounded-tl-sm px-3 py-1.5 text-xs text-slate-800">
                          Bonjour ! Comment puis-je vous aider ?
                        </div>
                      </div>
                      <div className="flex gap-2 justify-end animate-slide-in-right animation-delay-500">
                        <div className="bg-[#04a3fe] rounded-lg rounded-tr-sm px-3 py-1.5 text-xs text-white">
                          Quels prérequis pour le React avancé ?
                        </div>
                      </div>
                      <div className="flex gap-2 animate-slide-in-left animation-delay-1000">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#04a3fe] to-[#122138] flex-shrink-0"></div>
                        <div className="bg-slate-100 rounded-lg rounded-tl-sm px-3 py-1.5 text-xs text-slate-800">
                          JavaScript solide. Inscription ouverte !
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Metrics */}
                  <div className="space-y-3">
                    <div className="bg-white rounded-xl p-4 border border-slate-200/60 shadow-sm">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-slate-500 font-medium">Temps de Réponse</span>
                        <span className="text-xs text-[#04a3fe] font-bold">Immédiat</span>
                      </div>
                      <div className="text-2xl font-bold text-[#122138]">
                        <span className="animate-pulse">2</span>
                        <span className="text-sm text-slate-500 ml-1">minutes</span>
                      </div>
                      <div className="mt-2 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-[#04a3fe] to-[#122138] rounded-full w-[95%] animate-pulse"></div>
                      </div>
                    </div>

                    <div className="bg-white rounded-xl p-4 border border-slate-200/60 shadow-sm">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-slate-500 font-medium">Inscriptions</span>
                        <span className="text-xs text-[#04a3fe] font-bold">Aujourd'hui</span>
                      </div>
                      <div className="text-2xl font-bold text-[#122138]">
                        <span className="tabular-nums">34</span>
                        <span className="text-sm text-[#04a3fe] ml-2">+12%</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Phone Support - Smaller widget */}
                <div className="bg-gradient-to-br from-slate-50 to-[#04a3fe]/10 rounded-2xl p-6 border border-slate-200/60 shadow-lg hover:shadow-xl transition-all duration-300 group">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="relative">
                      <div className="absolute inset-0 bg-[#04a3fe] rounded-xl animate-ping opacity-20"></div>
                      <div className="relative w-10 h-10 bg-gradient-to-br from-[#04a3fe] to-[#122138] rounded-xl flex items-center justify-center shadow-lg shadow-[#04a3fe]/30">
                        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                          />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-[#122138]">Support Téléphonique</h3>
                      <p className="text-xs text-slate-500">Conseillers disponibles</p>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-4 mb-4 border border-slate-200/60 shadow-sm">
                    <div className="text-center mb-3">
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#04a3fe]/10 text-[#04a3fe] rounded-full text-xs font-bold mb-2">
                        <span className="w-1.5 h-1.5 bg-[#04a3fe] rounded-full animate-pulse"></span>
                        Appel en Cours
                      </div>
                      <p className="text-sm font-semibold text-slate-900">Marie Dupont</p>
                      <p className="text-xs text-slate-500">Question formation</p>
                    </div>
                    <div className="flex items-center justify-center gap-4 text-center pt-3 border-t border-slate-100">
                      <div>
                        <p className="text-xl font-bold text-[#122138] tabular-nums">{enrollmentsToday}</p>
                        <p className="text-xs text-slate-500">Appels Aujourd'hui</p>
                      </div>
                      <div className="w-px h-8 bg-slate-200"></div>
                      <div>
                        <p className="text-xl font-bold text-[#04a3fe]">24/7</p>
                        <p className="text-xs text-slate-500">Disponibles</p>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-slate-600">
                    Nos conseillers pédagogiques répondent à vos questions, vous orientent et vous inscrivent rapidement.
                  </p>
                </div>

                {/* Course Enrollment - Medium widget */}
                <div className="bg-gradient-to-br from-slate-50 to-[#04a3fe]/10 rounded-2xl p-6 border border-slate-200/60 shadow-lg hover:shadow-xl transition-all duration-300 group">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#04a3fe] to-[#122138] rounded-xl flex items-center justify-center shadow-lg shadow-[#04a3fe]/30">
                      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-[#122138]">Inscription aux Formations</h3>
                      <p className="text-xs text-slate-500">Calendrier en temps réel</p>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-4 mb-4 border border-slate-200/60 shadow-sm">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-semibold text-slate-700">Démarrages Prochains</span>
                      <span className="px-2 py-1 bg-[#04a3fe]/10 text-[#04a3fe] text-xs font-bold rounded">
                        {certificationsIssued} Places
                      </span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 p-2 bg-[#04a3fe]/5 rounded-lg animate-slide-in-left">
                        <div className="w-2 h-2 bg-[#04a3fe] rounded-full"></div>
                        <div className="flex-1">
                          <p className="text-xs font-semibold text-slate-900">React Avancé</p>
                          <p className="text-xs text-slate-500">05 Jan 2025</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 p-2 bg-[#04a3fe]/5 rounded-lg animate-slide-in-left animation-delay-300">
                        <div className="w-2 h-2 bg-[#04a3fe] rounded-full"></div>
                        <div className="flex-1">
                          <p className="text-xs font-semibold text-slate-900">Python Data Science</p>
                          <p className="text-xs text-slate-500">12 Jan 2025</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 p-2 bg-[#04a3fe]/10 rounded-lg border border-[#04a3fe]/40 animate-scale-in animation-delay-600">
                        <svg className="w-3 h-3 text-[#04a3fe]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <p className="text-xs font-semibold text-[#04a3fe]">Confirmé : 20 Jan</p>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-slate-600">
                    Inscription instantanée, confirmations automatiques et accès immédiat à vos supports de cours.
                  </p>
                </div>

                {/* Certifications - Medium widget */}
                <div className="lg:col-span-2 bg-gradient-to-br from-slate-50 to-[#04a3fe]/10 rounded-2xl p-6 border border-slate-200/60 shadow-lg hover:shadow-xl transition-all duration-300 group">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-[#04a3fe] to-[#122138] rounded-xl flex items-center justify-center shadow-lg shadow-[#04a3fe]/30">
                        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                          />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-[#122138]">Certifications & Diplômes</h3>
                        <p className="text-xs text-slate-500">Reconnues par l'industrie</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-[#04a3fe]/10 text-[#04a3fe] text-xs font-bold rounded-full">
                      {jobPlacementsMonthly} Ce Mois
                    </span>
                  </div>

                  <div className="grid sm:grid-cols-3 gap-3 mb-4">
                    <div className="bg-white rounded-xl p-4 border border-slate-200/60 shadow-sm">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-[#04a3fe] to-[#122138] rounded-lg flex items-center justify-center">
                          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                            />
                          </svg>
                        </div>
                        <span className="px-2 py-0.5 bg-[#04a3fe]/10 text-[#04a3fe] text-xs font-bold rounded">
                          Actif
                        </span>
                      </div>
                      <p className="text-sm font-bold text-slate-900 mb-1">Dev Web Complet</p>
                      <p className="text-xs text-slate-500 mb-2">HTML, CSS, React • 3 mois</p>
                      <p className="text-lg font-bold text-[#04a3fe]">Diplôme</p>
                    </div>

                    <div className="bg-white rounded-xl p-4 border border-slate-200/60 shadow-sm">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-[#04a3fe] to-[#122138] rounded-lg flex items-center justify-center">
                          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                            />
                          </svg>
                        </div>
                        <span className="px-2 py-0.5 bg-[#04a3fe]/10 text-[#04a3fe] text-xs font-bold rounded">
                          Actif
                        </span>
                      </div>
                      <p className="text-sm font-bold text-slate-900 mb-1">IA & Machine Learning</p>
                      <p className="text-xs text-slate-500 mb-2">Python, TensorFlow • 4 mois</p>
                      <p className="text-lg font-bold text-[#04a3fe]">Certification</p>
                    </div> 

                    <div className="bg-gradient-to-br from-[#04a3fe]/10 to-[#122138]/5 rounded-xl p-4 border-2 border-[#04a3fe]/40 shadow-md animate-scale-in">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-[#04a3fe] to-[#122138] rounded-full flex items-center justify-center">
                          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      </div>
                      <p className="text-sm font-bold text-[#122138] mb-1">Diplômé avec Succès</p>
                      <p className="text-xs text-[#04a3fe]">Placement en CDI</p>
                      <p className="text-xs text-[#122138] mt-2">Entreprise du secteur tech</p>
                    </div>
                  </div>

                  <p className="text-sm text-slate-600">
                    Obtenez des certifications professionnelles, développez vos compétences et accélérez votre carrière dans la technologie.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
