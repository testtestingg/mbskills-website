"use client"

import { MessageSquare, Globe, Mail, Phone, Share2 } from "lucide-react"
import { useEffect, useRef } from "react"

export function OmnichannelSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  const channels = [
    {
      icon: MessageSquare,
      name: "WhatsApp",
      color: "from-green-500 to-green-600",
      description: "Messagerie directe",
    },
    {
      icon: Globe,
      name: "Chat Site Web",
      color: "from-[#04a3fe] to-[#04a3fe]",
      description: "Widget personnalisé",
    },
    {
      icon: MessageSquare,
      name: "Messenger",
      color: "from-[#04a3fe] to-[#122138]",
      description: "Intégration Facebook",
    },
    {
      icon: Share2,
      name: "Instagram",
      color: "from-purple-500 via-pink-500 to-orange-500",
      description: "Automatisation DM",
    },
    {
      icon: Mail,
      name: "Email",
      color: "from-slate-500 to-slate-600",
      description: "Réponses automatisées",
    },
    {
      icon: Phone,
      name: "Téléphone",
      color: "from-orange-500 to-red-500",
      description: "Assistant vocal",
    },
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elements = entry.target.querySelectorAll(".fade-in-element")
            elements.forEach((element, index) => {
              setTimeout(() => {
                element.classList.add("animate-fade-in-up")
              }, index * 100)
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

  return (
    <section ref={sectionRef} className="py-20 px-4 relative">
      
    </section>
  )
}
