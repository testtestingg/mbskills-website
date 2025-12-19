"use client"


import { useState, useEffect, useRef } from "react"
import { MessageCircle, Clock } from "lucide-react"

export function AITeamSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [currentConversation, setCurrentConversation] = useState(0)
  const [displayedMessages, setDisplayedMessages] = useState<any[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const chatContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          console.log("[v0] Support Team Section is now visible")
          setIsVisible(true)
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px",
      },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [displayedMessages, isTyping])

  const conversations = [
    {
      title: "Accompagnement Personnalisé & Carrière",
      messages: [
        { text: "Bonjour ! Je suis intéressé par votre formation en développement web. Quelles sont les prérequis ?", sender: "student", delay: 0 },
        {
          text: "Bonjour ! Notre formation Développement Web ne nécessite aucun prérequis technique. Nous partons des bases et vous accompagnons jusqu'au niveau professionnel. Avez-vous une expérience en programmation ?",
          sender: "instructor",
          delay: 1000,
        },
        {
          text: "Non, je suis complètement débutant. Est-ce que je peux vraiment trouver un emploi après la formation ?",
          sender: "student",
          delay: 2500,
        },
        {
          text: "Absolument ! 92% de nos étudiants débutants trouvent un emploi dans les 6 mois suivant la formation. Notre programme inclut des projets réels, un portfolio personnalisé, et des ateliers de préparation aux entretiens.",
          sender: "instructor",
          delay: 3500,
        },
        { text: "C'est impressionnant ! Quelle est la durée de la formation et les modalités ?", sender: "student", delay: 5000 },
        {
          text: "Parfait ! Je vous envoie immédiatement notre programme détaillé par email. Concernant le financement, nous proposons plusieurs options : paiement échelonné sans frais, CPF (Compte Personnel de Formation), et partenariats avec des organismes de prêt. Un conseiller vous contactera dans les 24h pour discuter de votre situation.",
          sender: "instructor",
          delay: 6000,
        },
      ],
    },
    {
      title: "Support Technique & Projets Pratiques",
      messages: [
        { text: "Bonjour, je suis bloqué sur mon projet React. Pouvez-vous m'aider ?", sender: "student", delay: 0 },
        {
          text: "Bonjour ! Bien sûr, je serais ravi de vous aider. Quelle partie de votre projet vous pose problème ? Pouvez-vous me montrer votre code ou me décrire l'erreur que vous rencontrez ?",
          sender: "instructor",
          delay: 1000,
        },
        {
          text: "J'ai un problème avec la gestion d'état dans mon application. Les données ne se mettent pas à jour correctement.",
          sender: "student",
          delay: 2500,
        },
        {
          text: "Je comprends. La gestion d'état dans React peut être délicate au début. Pouvez-vous partager la partie de votre code qui gère l'état ? Je pourrais vous montrer quelques exemples concrets.",
          sender: "instructor",
          delay: 3500,
        },
        { text: "Merci ! Je vous envoie le code. Est-ce que vous avez des ressources supplémentaires sur ce sujet ?", sender: "student", delay: 5000 },
        {
          text: "Absolument ! Je vais vous envoyer notre guide complet sur la gestion d'état dans React, ainsi que quelques projets d'exemple. Je peux également vous organiser une session de tutorat individuel cette semaine si nécessaire.",
          sender: "instructor",
          delay: 6000,
        },
      ],
    },
    {
      title: "Orientation Carrière & Certification",
      messages: [
        {
          text: "Bonsoir, je suis en fin de formation et je commence à chercher un emploi. Avez-vous des conseils ?",
          sender: "student",
          delay: 0,
        },
        {
          text: "Bonsoir ! Félicitations pour votre progression ! Notre équipe carrière est là pour vous aider. Avez-vous déjà mis à jour votre CV et votre portfolio avec les projets réalisés pendant la formation ?",
          sender: "instructor",
          delay: 1000,
        },
        {
          text: "J'ai commencé mais je ne suis pas sûr de comment présenter mes projets de manière professionnelle.",
          sender: "student",
          delay: 2500,
        },
        {
          text: "C'est une excellente question ! Je peux vous aider à structurer votre portfolio pour mettre en valeur vos compétences. Nous organisons également des ateliers de préparation aux entretiens chaque semaine. Souhaitez-vous participer au prochain ?",
          sender: "instructor",
          delay: 3500,
        },
        {
          text: "Oui, ce serait parfait ! Et connaissez-vous des entreprises qui recrutent actuellement ?",
          sender: "student",
          delay: 5000
        },
        {
          text: "Absolument ! Nous avons plusieurs partenaires qui recrutent activement nos diplômés. Je vais vous mettre en contact avec notre conseiller carrière qui pourra vous présenter les opportunités actuelles et vous préparer aux entretiens.",
          sender: "instructor",
          delay: 6000,
        },
      ],
    },
  ]

  useEffect(() => {
    const conversation = conversations[currentConversation]
    setDisplayedMessages([])
    setIsTyping(false)

    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    let messageIndex = 0

    const showNextMessage = () => {
      if (messageIndex >= conversation.messages.length) {
        // Wait 3 seconds then move to next conversation
        timeoutRef.current = setTimeout(() => {
          setCurrentConversation((prev) => (prev + 1) % conversations.length)
        }, 3000)
        return
      }

      const message = conversation.messages[messageIndex]

      timeoutRef.current = setTimeout(() => {
        if (message.sender === "instructor") {
          setIsTyping(true)
          timeoutRef.current = setTimeout(() => {
            setDisplayedMessages((prev) => [...prev, message])
            setIsTyping(false)
            messageIndex++
            showNextMessage()
          }, 800) // Reduced typing delay from 1500ms to 800ms for faster replies
        } else {
          setDisplayedMessages((prev) => [...prev, message])
          messageIndex++
          showNextMessage()
        }
      }, message.delay)
    }

    showNextMessage()

    // Cleanup timeout on unmount or conversation change
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [currentConversation])

  return (
    <section id="support-team" ref={sectionRef} className="relative z-10">
      <div className="bg-white rounded-b-[3rem] pt-16 sm:pt-24 pb-16 sm:pb-24 px-4 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div
              className={`inline-flex items-center gap-2 bg-slate-50 border border-slate-200 text-slate-700 px-4 py-2 rounded-full text-sm font-medium mb-6 transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <MessageCircle className="w-4 h-4" />
              Support Pédagogique Démo
            </div>

            <h2
              className={`text-4xl md:text-5xl font-bold text-slate-900 mb-4 transition-all duration-1000 delay-200 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              Découvrez notre{" "}
              <span className="bg-gradient-to-r from-[#04a3fe] to-[#122138] bg-clip-text text-transparent">
                Accompagnement Personnalisé
              </span>
            </h2>

            <p
              className={`text-xl text-slate-600 max-w-2xl mx-auto transition-all duration-1000 delay-400 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              Voyez comment nos formateurs guident les étudiants, répondent à leurs questions et personnalisent leur parcours d'apprentissage.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20 max-w-7xl mx-auto">
            {/* Left side - Text content */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center lg:h-[600px] space-y-6 lg:space-y-8 order-2 lg:order-1">
              <div
                className={`transition-all duration-1000 delay-600 ${
                  isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
                }`}
              >
                <h3 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-4 lg:mb-6">
                  C'est ce que voient nos étudiants
                </h3>

                <div className="space-y-3 lg:space-y-4 text-base lg:text-lg text-slate-700 leading-relaxed">
                  <p>
                    Pendant que nos formateurs se concentrent sur l'enseignement en classe, notre équipe de support répond aux questions individuelles, fournit des ressources personnalisées et aide les étudiants à progresser.
                  </p>

                  <p>
                    Chaque conversation que vous regardez pourrait avoir lieu à minuit, le week-end, ou lorsque nos formateurs sont avec d'autres étudiants.
                  </p>

                  <p className="text-lg lg:text-xl font-semibold text-slate-900">
                    Les autres centres de formation manquent ces opportunités d'apprentissage personnalisé.
                  </p>
                </div>
              </div>

              <div
                className={`transition-all duration-1000 delay-800 ${
                  isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
                }`}
              >
                <div className="p-4 lg:p-6 bg-slate-50 rounded-xl border-l-4 border-[#04a3fe]">
                  <p className="text-slate-800 font-medium text-sm lg:text-base">
                    "Le taux de réussite de nos étudiants a augmenté de 35% depuis que nous avons mis en place notre programme de support personnalisé. Ils peuvent apprendre à leur rythme et obtenir de l'aide quand ils en ont besoin."
                  </p>
                  <p className="text-xs lg:text-sm text-slate-600 mt-2">— Safa Kaabi, Directeur MBSkills</p>
                </div>
              </div>
            </div>

            {/* Right side - Phone mockup */}
            <div className="w-full lg:w-1/2 flex justify-center order-1 lg:order-2">
              <div className="max-w-md w-full">
                <div
                  className={`relative transition-all duration-1000 delay-600 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                >
                  <div className="bg-[#122138] rounded-[2.5rem] p-2 shadow-2xl">
                    <div className="bg-black rounded-[2rem] p-1">
                      <div className="bg-white rounded-[1.5rem] overflow-hidden">
                        {/* Status bar */}
                        <div className="bg-slate-50 px-6 py-3 flex justify-between items-center text-sm">
                          <div className="flex items-center gap-1">
                            <div className="w-2 h-2 bg-[#122138] rounded-full"></div>
                            <span className="font-medium text-slate-700">MBSkills Support</span>
                          </div>
                          <div className="flex items-center gap-1 text-slate-500">
                            <Clock className="w-3 h-3" />
                            <span className="text-xs">Disponible</span>
                          </div>
                        </div>

                        <div className="bg-[#122138] px-6 py-4 text-white">
                          <div className="flex items-center gap-3">
                            <img
                              src="/images/mb-instructor.jpg"
                              alt="Formateur MBSkills"
                              className="w-8 h-8 rounded-full object-cover mr-2 mt-1 flex-shrink-0"
                            />
                            <div className="flex-1">
                              <h3 className="font-semibold text-sm">Formateur MBSkills</h3>
                              <p className="text-slate-300 text-xs">Support d'apprentissage</p>
                            </div>
                            <div className="text-xs text-green-400 flex items-center gap-1">
                              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                              En ligne
                            </div>
                          </div>
                        </div>

                        {/* Chat messages */}
                        <div
                          ref={chatContainerRef}
                          className="h-96 overflow-y-scroll scrollbar-hide p-4 space-y-3 bg-slate-50"
                          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                        >
                          {displayedMessages.map((message, index) => (
                            <div
                              key={index}
                              className={`flex ${message.sender === "student" ? "justify-end" : "justify-start"}`}
                            >
                              {message.sender === "instructor" && (
                                <img
                                  src="/images/mb-instructor.jpg"
                                  alt="Formateur MBSkills"
                                  className="w-6 h-6 rounded-full object-cover mr-2 mt-1 flex-shrink-0"
                                />
                              )}
                              <div
                                className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed ${
                                  message.sender === "student"
                                    ? "bg-[#04a3fe] text-white rounded-br-md"
                                    : "bg-white text-slate-800 shadow-sm border border-slate-200 rounded-bl-md"
                                }`}
                              >
                                {message.text.split("\n").map((line, i) => (
                                  <div key={i}>{line}</div>
                                ))}
                              </div>
                              {message.sender === "student" && (
                                <div className="w-6 h-6 rounded-full bg-slate-400 ml-2 mt-1 flex-shrink-0 flex items-center justify-center text-xs text-white font-medium">
                                  E
                                </div>
                              )}
                            </div>
                          ))}

                          {/* Typing indicator */}
                          {isTyping && (
                            <div className="flex justify-start items-start">
                              <img
                                src="/images/mb-instructor.jpg"
                                alt="Formateur MBSkills"
                                className="w-6 h-6 rounded-full object-cover mr-2 mt-1 flex-shrink-0"
                              />
                              <div className="bg-white p-3 rounded-2xl rounded-bl-md shadow-sm border border-slate-200">
                                <div className="flex space-x-1">
                                  {[1, 2, 3].map((dot) => (
                                    <div
                                      key={dot}
                                      className={`w-2 h-2 bg-slate-400 rounded-full animate-bounce`}
                                      style={{ animationDelay: `${dot * 0.1}s` }}
                                    />
                                  ))}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="p-4 bg-white border-t border-slate-200">
                          <div className="flex items-center gap-3 bg-slate-100 rounded-full px-4 py-2">
                            <span className="text-slate-500 text-sm lg:text-base flex-1">Le formateur vous répond...</span>
                            <div className="w-6 h-6 bg-[#04a3fe] rounded-full flex items-center justify-center">
                              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
