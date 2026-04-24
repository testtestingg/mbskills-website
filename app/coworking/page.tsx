"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { GlassmorphismNav } from "@/components/glassmorphism-nav"
import Aurora from "@/components/Aurora"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  ArrowRight,
  Building2,
  Users,
  CalendarRange,
  Wifi,
  Clock,
  MapPin,
  Phone,
  Mail,
  CheckCircle2,
  Sparkles,
  Briefcase,
  UserRound,
  Laptop,
  DoorOpen,
  Presentation,
} from "lucide-react"
import {
  SPACE_TYPE_LABELS,
  STATUS_LABELS,
  type SpaceType,
  type SpaceWithAvailability,
} from "@/lib/coworking/types"

const typeIcons: Record<SpaceType, React.ComponentType<{ className?: string }>> = {
  desk: Laptop,
  private_desk: Laptop,
  office: DoorOpen,
  meeting_room: Presentation,
  event_space: Sparkles,
}

const statusMeta: Record<string, { dot: string; text: string }> = {
  available: { dot: "bg-emerald-400", text: "text-emerald-300" },
  limited: { dot: "bg-amber-400", text: "text-amber-300" },
  full: { dot: "bg-rose-400", text: "text-rose-300" },
  closed: { dot: "bg-slate-400", text: "text-slate-300" },
}

function formatPrice(amount: number | null, currency: string, unit: string) {
  if (amount == null) return null
  return `${amount.toLocaleString("fr-FR")} ${currency} / ${unit}`
}

export default function CoworkingPage() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [spaces, setSpaces] = useState<SpaceWithAvailability[]>([])
  const [activeSpaceSlug, setActiveSpaceSlug] = useState<string | null>(null)

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    company_name: "",
    client_type: "individual" as "individual" | "company",
    space_slug: "",
    start_date: "",
    end_date: "",
    start_time: "",
    end_time: "",
    attendees: 1,
    message: "",
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.05, rootMargin: "0px 0px -60px 0px" },
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

  const totalAvailable = useMemo(
    () => spaces.reduce((sum, s) => sum + (s.availability?.available_units ?? 0), 0),
    [spaces],
  )

  const handlePick = (slug: string) => {
    setActiveSpaceSlug(slug)
    setForm((f) => ({ ...f, space_slug: slug }))
    const target = document.getElementById("reservation")
    if (target) {
      const rect = target.getBoundingClientRect()
      window.scrollTo({ top: window.scrollY + rect.top - 100, behavior: "smooth" })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError(null)
    try {
      const payload = {
        ...form,
        attendees: Number(form.attendees) || 1,
        space_slug: form.space_slug || null,
        start_date: form.start_date || null,
        end_date: form.end_date || null,
        start_time: form.start_time || null,
        end_time: form.end_time || null,
        company_name: form.company_name || null,
        phone: form.phone || null,
      }
      const res = await fetch("/api/coworking/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      const json = await res.json()
      if (!res.ok || !json.ok) throw new Error(json.error || "Erreur lors de l'envoi")
      setSubmitted(true)
      setForm({
        full_name: "",
        email: "",
        phone: "",
        company_name: "",
        client_type: "individual",
        space_slug: "",
        start_date: "",
        end_date: "",
        start_time: "",
        end_time: "",
        attendees: 1,
        message: "",
      })
      setActiveSpaceSlug(null)
      setTimeout(() => setSubmitted(false), 6000)
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setSubmitting(false)
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

          {/* Hero */}
          <section
            ref={sectionRef}
            className="pt-28 sm:pt-36 pb-10 sm:pb-16 px-4 relative"
          >
            <div className="max-w-5xl mx-auto text-center">
              <div
                className={`inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium mb-6 transition-all duration-700 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
              >
                <Building2 className="w-4 h-4 mr-2 text-[#04a3fe]" />
                MBSkills Coworking
              </div>
              <h1
                className={`text-3xl sm:text-5xl md:text-6xl font-bold text-white text-balance mb-5 transition-all duration-1000 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
              >
                Un Coworking{" "}
                <span className="bg-gradient-to-r from-[#04a3fe] to-[#3ab5fe] bg-clip-text text-transparent">
                  pensé pour les pros
                </span>
              </h1>
              <p
                className={`text-base sm:text-xl text-white/75 max-w-2xl mx-auto leading-relaxed font-light transition-all duration-1000 delay-150 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
              >
                Bureaux, salles de réunion et espaces événementiels, disponibles à l'heure,
                à la journée ou au mois.
              </p>

              <div
                className={`mt-8 inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/5 backdrop-blur-md px-5 py-2 text-sm text-white/85 transition-all duration-1000 delay-300 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                </span>
                <span>
                  <span className="font-semibold text-white">{totalAvailable}</span> places disponibles aujourd'hui
                </span>
              </div>

              <div
                className={`mt-10 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto transition-all duration-1000 delay-500 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              >
                <QuickFact icon={<UserRound className="w-4 h-4" />} label="Freelances & pros" />
                <QuickFact icon={<Briefcase className="w-4 h-4" />} label="Startups & entreprises" />
                <QuickFact icon={<CalendarRange className="w-4 h-4" />} label="Heure · jour · mois" />
                <QuickFact icon={<Clock className="w-4 h-4" />} label="Lun — Sam, 8h – 20h" />
              </div>
            </div>
          </section>

          {/* Spaces grid */}
          <section className="py-10 sm:py-16 px-4">
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
                <div>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">
                    Nos espaces de travail
                  </h2>
                  <p className="text-white/65 max-w-xl">
                    Chaque espace est pensé pour un usage précis. Choisissez celui qui vous correspond, puis réservez en quelques clics.
                  </p>
                </div>
                <div className="text-xs text-white/50 hidden sm:flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#04a3fe]" />
                  Disponibilité mise à jour en direct
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                {spaces.map((space, i) => {
                  const Icon = typeIcons[space.type] ?? Building2
                  const status = space.availability?.status ?? "available"
                  const stMeta = statusMeta[status] ?? statusMeta.available
                  const unitsAvail = space.availability?.available_units ?? space.total_units
                  const ratio = space.total_units ? unitsAvail / space.total_units : 1
                  return (
                    <div
                      key={space.id}
                      className={`group rounded-2xl border bg-white/5 backdrop-blur-md p-5 sm:p-6 hover:bg-white/10 transition-all duration-500 flex flex-col ${
                        activeSpaceSlug === space.slug
                          ? "border-[#04a3fe] shadow-[0_0_0_1px_rgba(4,163,254,0.35)]"
                          : "border-white/10 hover:border-white/25"
                      }`}
                      style={{ animation: `fade-in 0.6s ease-out ${i * 80}ms both` }}
                    >
                      <div className="flex items-start justify-between gap-3 mb-4">
                        <div className="inline-flex items-center gap-2.5">
                          <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-[#04a3fe]/15 text-[#3ab5fe]">
                            <Icon className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="text-[11px] uppercase tracking-wider text-white/50">
                              {SPACE_TYPE_LABELS[space.type]}
                            </div>
                            <div className="text-white font-semibold leading-tight">{space.name}</div>
                          </div>
                        </div>
                        <span
                          className={`inline-flex items-center gap-1.5 text-[11px] font-medium px-2 py-1 rounded-full bg-white/5 border border-white/10 ${stMeta.text}`}
                        >
                          <span className={`h-1.5 w-1.5 rounded-full ${stMeta.dot}`} />
                          {STATUS_LABELS[status]}
                        </span>
                      </div>

                      <p className="text-white/70 text-sm mb-4 flex-1">
                        {space.description}
                      </p>

                      {/* Availability bar */}
                      <div className="mb-4">
                        <div className="flex items-center justify-between text-xs text-white/60 mb-1.5">
                          <span>Places disponibles</span>
                          <span className="text-white/85 font-medium">
                            {unitsAvail} / {space.total_units}
                          </span>
                        </div>
                        <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-700 ${
                              ratio > 0.5
                                ? "bg-emerald-400"
                                : ratio > 0.2
                                  ? "bg-amber-400"
                                  : "bg-rose-400"
                            }`}
                            style={{ width: `${Math.max(4, Math.round(ratio * 100))}%` }}
                          />
                        </div>
                      </div>

                      {/* Pricing */}
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {formatPrice(space.price_hour, space.currency, "h") && (
                          <Chip>{formatPrice(space.price_hour, space.currency, "h")}</Chip>
                        )}
                        {formatPrice(space.price_day, space.currency, "jour") && (
                          <Chip>{formatPrice(space.price_day, space.currency, "jour")}</Chip>
                        )}
                        {formatPrice(space.price_month, space.currency, "mois") && (
                          <Chip highlight>{formatPrice(space.price_month, space.currency, "mois")}</Chip>
                        )}
                      </div>

                      {space.amenities?.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-5">
                          {space.amenities.slice(0, 4).map((a) => (
                            <span
                              key={a}
                              className="text-[11px] text-white/70 bg-white/5 border border-white/10 rounded-full px-2 py-0.5"
                            >
                              {a}
                            </span>
                          ))}
                        </div>
                      )}

                      <Button
                        onClick={() => handlePick(space.slug)}
                        className="rounded-full bg-white text-black hover:bg-gray-100 font-medium w-full group-hover:scale-[1.02] transition-transform"
                        disabled={status === "full" || status === "closed"}
                      >
                        {status === "full" || status === "closed"
                          ? "Indisponible"
                          : "Réserver cet espace"}
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </div>
                  )
                })}
              </div>

              {!spaces.length && (
                <div className="text-center py-16 text-white/60">
                  Chargement des espaces…
                </div>
              )}
            </div>
          </section>

          {/* Individuals & Companies */}
          <section className="py-10 sm:py-16 px-4">
            <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-6">
              <AudienceCard
                tag="Pour les individus"
                icon={<UserRound className="w-5 h-5" />}
                title="Freelances, étudiants, indépendants"
                body="Un bureau flexible à l'heure ou à la journée, avec Wi-Fi fibre, café illimité et une communauté stimulante."
                bullets={[
                  "Hot desks dès 8 TND / h",
                  "Accès aux lounges et phone booths",
                  "Pas d'engagement — payez au besoin",
                  "Événements et meetups inclus",
                ]}
              />
              <AudienceCard
                tag="Pour les entreprises"
                icon={<Briefcase className="w-5 h-5" />}
                title="Startups, PME & équipes"
                body="Bureaux privés, salles de réunion et espaces événementiels, réservables pour vos équipes et vos clients."
                bullets={[
                  "Bureaux privés 2 à 8+ personnes",
                  "Salles de réunion équipées visio",
                  "Espace événement jusqu'à 40 places",
                  "Facturation entreprise (TVA)",
                ]}
              />
            </div>
          </section>

          {/* Reservation */}
          <section id="reservation" className="py-10 sm:py-16 px-4">
            <div className="max-w-5xl mx-auto">
              <div className="rounded-3xl border border-white/15 bg-[radial-gradient(35%_128px_at_50%_0%,theme(backgroundColor.white/10%),theme(backgroundColor.white/5%))] p-6 sm:p-10">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-white/80 text-xs mb-4">
                    <CalendarRange className="w-3.5 h-3.5 mr-2 text-[#04a3fe]" />
                    Réservation
                  </div>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">
                    Réservez votre espace
                  </h2>
                  <p className="text-white/70 max-w-xl mx-auto">
                    Remplissez le formulaire — notre équipe revient vers vous sous 24h pour confirmer votre réservation.
                  </p>
                </div>

                {submitted ? (
                  <div className="max-w-xl mx-auto text-center py-10">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-emerald-400/15 text-emerald-300 mb-4">
                      <CheckCircle2 className="w-7 h-7" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-1">
                      Demande envoyée avec succès
                    </h3>
                    <p className="text-white/70">
                      Merci ! Nous vous contacterons très bientôt pour confirmer votre réservation.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
                    <FormField label="Je suis">
                      <div className="grid grid-cols-2 gap-2">
                        {([
                          { key: "individual", label: "Particulier" },
                          { key: "company", label: "Entreprise" },
                        ] as const).map((opt) => (
                          <button
                            type="button"
                            key={opt.key}
                            onClick={() => setForm((f) => ({ ...f, client_type: opt.key }))}
                            className={`rounded-full border px-3 py-2 text-sm transition-all ${
                              form.client_type === opt.key
                                ? "bg-white text-black border-white"
                                : "bg-white/5 text-white/80 border-white/15 hover:bg-white/10"
                            }`}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    </FormField>

                    <FormField label="Espace souhaité">
                      <select
                        value={form.space_slug}
                        onChange={(e) => setForm((f) => ({ ...f, space_slug: e.target.value }))}
                        className="w-full h-10 rounded-md bg-[#0f1e36] border border-white/15 px-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#04a3fe]"
                      >
                        <option value="">— Choisir un espace —</option>
                        {spaces.map((s) => (
                          <option key={s.id} value={s.slug}>
                            {s.name}
                          </option>
                        ))}
                      </select>
                    </FormField>

                    <FormField label="Nom complet *">
                      <Input
                        required
                        value={form.full_name}
                        onChange={(e) => setForm((f) => ({ ...f, full_name: e.target.value }))}
                        placeholder="Votre nom"
                        className="bg-[#0f1e36] border-white/15 text-white placeholder:text-white/40"
                      />
                    </FormField>

                    <FormField label="Email *">
                      <Input
                        required
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                        placeholder="vous@email.com"
                        className="bg-[#0f1e36] border-white/15 text-white placeholder:text-white/40"
                      />
                    </FormField>

                    <FormField label="Téléphone">
                      <Input
                        value={form.phone}
                        onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                        placeholder="+216 ..."
                        className="bg-[#0f1e36] border-white/15 text-white placeholder:text-white/40"
                      />
                    </FormField>

                    {form.client_type === "company" && (
                      <FormField label="Entreprise">
                        <Input
                          value={form.company_name}
                          onChange={(e) => setForm((f) => ({ ...f, company_name: e.target.value }))}
                          placeholder="Nom de votre société"
                          className="bg-[#0f1e36] border-white/15 text-white placeholder:text-white/40"
                        />
                      </FormField>
                    )}

                    <FormField label="Date de début">
                      <Input
                        type="date"
                        value={form.start_date}
                        onChange={(e) => setForm((f) => ({ ...f, start_date: e.target.value }))}
                        className="bg-[#0f1e36] border-white/15 text-white [color-scheme:dark]"
                      />
                    </FormField>

                    <FormField label="Date de fin">
                      <Input
                        type="date"
                        value={form.end_date}
                        onChange={(e) => setForm((f) => ({ ...f, end_date: e.target.value }))}
                        className="bg-[#0f1e36] border-white/15 text-white [color-scheme:dark]"
                      />
                    </FormField>

                    <FormField label="Heure de début">
                      <Input
                        type="time"
                        value={form.start_time}
                        onChange={(e) => setForm((f) => ({ ...f, start_time: e.target.value }))}
                        className="bg-[#0f1e36] border-white/15 text-white [color-scheme:dark]"
                      />
                    </FormField>

                    <FormField label="Heure de fin">
                      <Input
                        type="time"
                        value={form.end_time}
                        onChange={(e) => setForm((f) => ({ ...f, end_time: e.target.value }))}
                        className="bg-[#0f1e36] border-white/15 text-white [color-scheme:dark]"
                      />
                    </FormField>

                    <FormField label="Nombre de personnes">
                      <Input
                        type="number"
                        min={1}
                        max={500}
                        value={form.attendees}
                        onChange={(e) => setForm((f) => ({ ...f, attendees: Number(e.target.value) }))}
                        className="bg-[#0f1e36] border-white/15 text-white"
                      />
                    </FormField>

                    <div className="sm:col-span-2">
                      <FormField label="Message (optionnel)">
                        <Textarea
                          value={form.message}
                          onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                          rows={3}
                          placeholder="Précisez votre besoin (horaires, équipements, etc.)"
                          className="bg-[#0f1e36] border-white/15 text-white placeholder:text-white/40"
                        />
                      </FormField>
                    </div>

                    {error && (
                      <div className="sm:col-span-2 text-sm text-rose-300 bg-rose-500/10 border border-rose-500/20 rounded-lg px-3 py-2">
                        {error}
                      </div>
                    )}

                    <div className="sm:col-span-2 flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                      <p className="text-xs text-white/50">
                        En soumettant ce formulaire, vous acceptez d'être contacté par MBSkills Coworking.
                      </p>
                      <Button
                        type="submit"
                        disabled={submitting}
                        className="rounded-full bg-white text-black hover:bg-gray-100 font-medium px-6"
                      >
                        {submitting ? "Envoi..." : "Envoyer ma demande"}
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </section>

          {/* Infos pratiques */}
          <section className="py-10 sm:py-16 px-4">
            <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-4">
              <InfoCard
                icon={<Clock className="w-4 h-4" />}
                title="Horaires"
                value="Lun — Sam : 8h00 à 20h00"
              />
              <InfoCard
                icon={<MapPin className="w-4 h-4" />}
                title="Adresse"
                value="MBSkills Coworking · Tunis, Tunisie"
              />
              <InfoCard
                icon={<Phone className="w-4 h-4" />}
                title="Contact"
                value={
                  <>
                    <a className="block hover:text-white" href="tel:+21623198118">
                      +216 23 198 118
                    </a>
                    <a className="block hover:text-white" href="mailto:coworking@mbskills.com">
                      coworking@mbskills.com
                    </a>
                  </>
                }
              />
            </div>
          </section>

          <Footer />
        </div>
      </main>
    </div>
  )
}

function QuickFact({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-md px-3 py-2.5 flex items-center gap-2 text-white/80 text-sm">
      <span className="text-[#3ab5fe]">{icon}</span>
      <span className="truncate">{label}</span>
    </div>
  )
}

function Chip({ children, highlight }: { children: React.ReactNode; highlight?: boolean }) {
  return (
    <span
      className={`text-xs font-medium rounded-full px-2.5 py-1 border ${
        highlight
          ? "bg-[#04a3fe]/15 text-[#3ab5fe] border-[#04a3fe]/30"
          : "bg-white/5 text-white/80 border-white/15"
      }`}
    >
      {children}
    </span>
  )
}

function FormField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs uppercase tracking-wider text-white/60 mb-1.5">{label}</label>
      {children}
    </div>
  )
}

function AudienceCard({
  tag,
  icon,
  title,
  body,
  bullets,
}: {
  tag: string
  icon: React.ReactNode
  title: string
  body: string
  bullets: string[]
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 sm:p-8 hover:bg-white/10 transition-colors">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#04a3fe]/15 text-[#3ab5fe] text-xs mb-4">
        {icon}
        {tag}
      </div>
      <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">{title}</h3>
      <p className="text-white/70 mb-5">{body}</p>
      <ul className="space-y-2">
        {bullets.map((b) => (
          <li key={b} className="flex items-start gap-2 text-sm text-white/80">
            <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-[#04a3fe]" />
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function InfoCard({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode
  title: string
  value: React.ReactNode
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-5">
      <div className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-white/60 mb-2">
        <span className="text-[#3ab5fe]">{icon}</span>
        {title}
      </div>
      <div className="text-white/85 text-sm leading-relaxed">{value}</div>
    </div>
  )
}
