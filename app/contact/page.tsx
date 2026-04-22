"use client"

import { useEffect, useRef, useState } from "react"
import { GlassmorphismNav } from "@/components/glassmorphism-nav"
import Aurora from "@/components/Aurora"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Mail,
  Phone,
  MapPin,
  MessageSquare,
  Send,
  Clock,
  CheckCircle2,
} from "lucide-react"

export default function ContactPage() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 4000)
    setForm({ name: "", email: "", subject: "", message: "" })
  }

  const channels = [
    {
      icon: Mail,
      label: "Email",
      value: "contact@mbskills.com",
      href: "mailto:contact@mbschool.tn",
    },
    {
      icon: Phone,
      label: "Téléphone",
      value: "+216 23 198 118",
      href: "tel:+21623198118",
    },
    {
      icon: MapPin,
      label: "Adresse",
      value: "Tunis, Tunisie",
      href: "#",
    },
    {
      icon: Clock,
      label: "Horaires",
      value: "Lun – Sam · 9h – 18h",
      href: "#",
    },
  ]

  return (
    <div className="min-h-screen bg-brand-navy overflow-hidden">
      <main className="min-h-screen relative overflow-hidden">
        <div className="fixed inset-0 w-full h-full bg-brand-radial">
          <Aurora colorStops={["#04a3fe", "#1a2f4f", "#04a3fe"]} amplitude={1.1} blend={0.5} speed={0.7} />
        </div>
        <div className="relative z-10">
          <GlassmorphismNav />

          {/* Hero */}
          <section ref={sectionRef} className="pt-28 md:pt-36 pb-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto text-center">
              <div
                className={`transition-all duration-1000 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              >
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium mb-6">
                  <span className="w-2 h-2 bg-[#04a3fe] rounded-full mr-2 animate-pulse" />
                  Nous contacter
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white text-balance mb-6 leading-tight">
                  Parlons de votre{" "}
                  <span className="bg-gradient-to-r from-[#04a3fe] to-[#3ab5fe] bg-clip-text text-transparent">
                    projet de formation
                  </span>
                </h1>
                <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto font-light">
                  Une question, un besoin spécifique, une demande entreprise ? Notre équipe vous répond sous 24 heures.
                </p>
              </div>
            </div>
          </section>

          {/* Contact channels + form */}
          <section className="py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto grid lg:grid-cols-[1fr_1.2fr] gap-6 lg:gap-8">
              {/* Channels */}
              <div className="space-y-4">
                {channels.map((c, i) => {
                  const Icon = c.icon
                  return (
                    <a
                      key={c.label}
                      href={c.href}
                      className="group flex items-center gap-4 p-5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-[#04a3fe]/40 hover:bg-white/10 transition-all duration-500"
                      style={{ transitionDelay: `${i * 60}ms` }}
                    >
                      <div className="w-12 h-12 rounded-xl bg-[#04a3fe]/15 border border-[#04a3fe]/30 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                        <Icon className="w-5 h-5 text-[#04a3fe]" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs uppercase tracking-wider text-white/50 font-semibold mb-1">
                          {c.label}
                        </div>
                        <div className="text-white font-medium truncate">{c.value}</div>
                      </div>
                    </a>
                  )
                })}

                <div className="p-5 rounded-2xl bg-gradient-to-br from-[#04a3fe]/10 to-[#04a3fe]/5 border border-[#04a3fe]/30">
                  <div className="flex items-start gap-3">
                    <MessageSquare className="w-5 h-5 text-[#04a3fe] flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="text-white font-semibold mb-1">Support rapide</h3>
                      <p className="text-white/70 text-sm leading-relaxed">
                        Pour une réponse immédiate, contactez-nous via WhatsApp ou prenez rendez-vous directement en ligne.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Form */}
              <form
                onSubmit={handleSubmit}
                className="p-6 sm:p-8 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10"
              >
                <h2 className="text-2xl font-bold text-white mb-1">Envoyez-nous un message</h2>
                <p className="text-white/60 text-sm mb-6">
                  Remplissez le formulaire, nous revenons vers vous rapidement.
                </p>

                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-white/80 text-sm mb-2 font-medium">
                      Nom complet
                    </label>
                    <Input
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Votre nom"
                      className="bg-white/5 border-white/20 text-white placeholder:text-white/40"
                    />
                  </div>
                  <div>
                    <label className="block text-white/80 text-sm mb-2 font-medium">Email</label>
                    <Input
                      required
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="vous@email.com"
                      className="bg-white/5 border-white/20 text-white placeholder:text-white/40"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-white/80 text-sm mb-2 font-medium">Sujet</label>
                  <Input
                    required
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    placeholder="Objet de votre message"
                    className="bg-white/5 border-white/20 text-white placeholder:text-white/40"
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-white/80 text-sm mb-2 font-medium">Message</label>
                  <Textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Décrivez votre besoin..."
                    className="bg-white/5 border-white/20 text-white placeholder:text-white/40 resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full rounded-full bg-white text-[#0a1327] hover:bg-gray-100 font-semibold group"
                >
                  {submitted ? (
                    <>
                      <CheckCircle2 className="mr-2 w-5 h-5" />
                      Message envoyé !
                    </>
                  ) : (
                    <>
                      Envoyer le message
                      <Send className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </Button>
              </form>
            </div>
          </section>

          <div className="h-16" />
          <Footer />
        </div>
      </main>
    </div>
  )
}
