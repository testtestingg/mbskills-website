"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Building2,
  LogOut,
  RefreshCw,
  Save,
  Users,
  Lock,
  Inbox,
  CheckCircle2,
  XCircle,
  Loader2,
} from "lucide-react"
import {
  SPACE_TYPE_LABELS,
  STATUS_LABELS,
  type AvailabilityStatus,
  type SpaceType,
  type SpaceWithAvailability,
} from "@/lib/coworking/types"

type Tab = "spaces" | "bookings"

type BookingRow = {
  id: string
  status: string
  created_at: string
  client_type: "individual" | "company"
  full_name: string
  company_name: string | null
  email: string
  phone: string | null
  space_slug: string | null
  start_date: string | null
  end_date: string | null
  start_time: string | null
  end_time: string | null
  attendees: number | null
  message: string | null
}

export default function AdminMbsPage() {
  const [authed, setAuthed] = useState<boolean | null>(null)
  const [loggingIn, setLoggingIn] = useState(false)
  const [loginError, setLoginError] = useState<string | null>(null)
  const [password, setPassword] = useState("")

  // Check session by pinging an admin-only endpoint
  useEffect(() => {
    fetch("/api/coworking/admin/spaces", { cache: "no-store" })
      .then((r) => setAuthed(r.ok))
      .catch(() => setAuthed(false))
  }, [])

  const submitLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoggingIn(true)
    setLoginError(null)
    try {
      const res = await fetch("/api/coworking/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      })
      if (!res.ok) {
        const json = await res.json().catch(() => ({}))
        throw new Error(json.error === "invalid_credentials" ? "Mot de passe invalide." : "Échec de connexion")
      }
      setAuthed(true)
      setPassword("")
    } catch (err) {
      setLoginError((err as Error).message)
    } finally {
      setLoggingIn(false)
    }
  }

  const logout = async () => {
    await fetch("/api/coworking/admin/login", { method: "DELETE" })
    setAuthed(false)
  }

  if (authed === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a1327] text-white">
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
    )
  }

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-[radial-gradient(ellipse_at_top,#122138_0%,#0a1327_60%,#060d1b_100%)]">
        <form
          onSubmit={submitLogin}
          className="w-full max-w-sm rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 sm:p-8 shadow-2xl"
        >
          <div className="flex items-center gap-2 mb-5">
            <div className="w-10 h-10 rounded-xl bg-[#04a3fe]/15 text-[#3ab5fe] flex items-center justify-center">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider text-white/50">MBSkills</div>
              <div className="text-white font-semibold">Admin Coworking</div>
            </div>
          </div>
          <div className="space-y-3">
            <div>
              <label className="block text-xs uppercase tracking-wider text-white/60 mb-1.5">
                Mot de passe administrateur
              </label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoFocus
                className="bg-[#0f1e36] border-white/15 text-white"
                autoComplete="current-password"
              />
            </div>
            {loginError && (
              <div className="text-sm text-rose-300 bg-rose-500/10 border border-rose-500/20 rounded-lg px-3 py-2">
                {loginError}
              </div>
            )}
            <Button
              type="submit"
              disabled={loggingIn}
              className="w-full rounded-full bg-white text-black hover:bg-gray-100 font-medium"
            >
              {loggingIn ? "Connexion..." : "Se connecter"}
            </Button>
          </div>
          <p className="text-[11px] text-white/40 mt-5 text-center">
            Accès restreint — réservé aux administrateurs MBSkills.
          </p>
        </form>
      </div>
    )
  }

  return <AdminDashboard onLogout={logout} />
}

// =============================================================================
// Dashboard
// =============================================================================

function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  const [tab, setTab] = useState<Tab>("spaces")
  const [spaces, setSpaces] = useState<SpaceWithAvailability[]>([])
  const [bookings, setBookings] = useState<BookingRow[]>([])
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState<{ type: "ok" | "err"; msg: string } | null>(null)

  const loadAll = async () => {
    setLoading(true)
    try {
      const [sp, bk] = await Promise.all([
        fetch("/api/coworking/admin/spaces", { cache: "no-store" }).then((r) => r.json()),
        fetch("/api/coworking/admin/bookings", { cache: "no-store" }).then((r) => r.json()),
      ])
      if (Array.isArray(sp?.spaces)) setSpaces(sp.spaces)
      if (Array.isArray(bk?.bookings)) setBookings(bk.bookings as BookingRow[])
    } catch {
      setToast({ type: "err", msg: "Erreur de chargement" })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadAll()
  }, [])

  const notify = (type: "ok" | "err", msg: string) => {
    setToast({ type, msg })
    setTimeout(() => setToast(null), 3200)
  }

  return (
    <div className="min-h-screen bg-[#0a1327] text-white">
      {/* Header */}
      <header className="sticky top-0 z-20 border-b border-white/10 bg-[#0a1327]/85 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-[#04a3fe]/15 text-[#3ab5fe] flex items-center justify-center">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-wider text-white/50 leading-none">
                MBSkills · Admin
              </div>
              <div className="text-sm font-semibold">Coworking Dashboard</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={loadAll}
              disabled={loading}
              className="rounded-full bg-transparent text-white border-white/20 hover:bg-white/10"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
              Actualiser
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={onLogout}
              className="rounded-full bg-transparent text-white border-white/20 hover:bg-white/10"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Déconnexion
            </Button>
          </div>
        </div>
        <div className="max-w-6xl mx-auto px-4 pb-3 flex gap-1">
          {[
            { key: "spaces" as const, label: "Espaces & disponibilité", icon: Building2 },
            { key: "bookings" as const, label: `Réservations (${bookings.length})`, icon: Inbox },
          ].map((t) => {
            const Icon = t.icon
            const active = tab === t.key
            return (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`inline-flex items-center gap-2 text-sm rounded-full px-4 py-1.5 border transition-all ${
                  active
                    ? "bg-white text-black border-white"
                    : "bg-white/5 text-white/75 border-white/10 hover:bg-white/10"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {t.label}
              </button>
            )
          })}
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6 sm:py-10">
        {tab === "spaces" && <SpacesTab spaces={spaces} onChanged={loadAll} notify={notify} />}
        {tab === "bookings" && <BookingsTab bookings={bookings} spaces={spaces} />}
      </main>

      {toast && (
        <div
          className={`fixed bottom-4 right-4 z-50 flex items-center gap-2 rounded-lg border px-4 py-2 text-sm shadow-lg ${
            toast.type === "ok"
              ? "bg-emerald-500/10 border-emerald-400/30 text-emerald-200"
              : "bg-rose-500/10 border-rose-400/30 text-rose-200"
          }`}
        >
          {toast.type === "ok" ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
          {toast.msg}
        </div>
      )}
    </div>
  )
}

// -----------------------------------------------------------------------------
// Spaces & availability tab
// -----------------------------------------------------------------------------

const SPACE_TYPES: { value: SpaceType; label: string }[] = [
  { value: "desk", label: "Poste flexible" },
  { value: "private_desk", label: "Poste dédié" },
  { value: "office", label: "Bureau privé" },
  { value: "meeting_room", label: "Salle de réunion" },
  { value: "event_space", label: "Espace événementiel" },
]

const STATUSES: { value: AvailabilityStatus; label: string }[] = [
  { value: "available", label: "Disponible" },
  { value: "limited", label: "Limité" },
  { value: "full", label: "Complet" },
  { value: "closed", label: "Fermé" },
]

function SpacesTab({
  spaces,
  onChanged,
  notify,
}: {
  spaces: SpaceWithAvailability[]
  onChanged: () => void
  notify: (type: "ok" | "err", msg: string) => void
}) {
  return (
    <div>
      <div className="mb-4">
        <h2 className="text-xl font-bold">Espaces & disponibilité</h2>
        <p className="text-white/60 text-sm">
          Mettez à jour les informations d'un espace et sa disponibilité en direct.
          Les changements sont appliqués immédiatement sur le site public.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        {spaces.map((s) => (
          <SpaceCard key={s.id} space={s} onChanged={onChanged} notify={notify} />
        ))}
        {!spaces.length && (
          <div className="col-span-full text-center py-12 text-white/50">
            Aucun espace configuré.
          </div>
        )}
      </div>
    </div>
  )
}

function SpaceCard({
  space,
  onChanged,
  notify,
}: {
  space: SpaceWithAvailability
  onChanged: () => void
  notify: (type: "ok" | "err", msg: string) => void
}) {
  const [form, setForm] = useState({
    name: space.name,
    slug: space.slug,
    type: space.type,
    description: space.description ?? "",
    capacity: space.capacity,
    price_hour: space.price_hour ?? ("" as number | ""),
    price_day: space.price_day ?? ("" as number | ""),
    price_month: space.price_month ?? ("" as number | ""),
    total_units: space.total_units,
    is_active: space.is_active,
    amenities: space.amenities.join(", "),
  })
  const [availForm, setAvailForm] = useState({
    available_units: space.availability?.available_units ?? space.total_units,
    status: (space.availability?.status ?? "available") as AvailabilityStatus,
    opens_at: space.availability?.opens_at ?? "08:00",
    closes_at: space.availability?.closes_at ?? "20:00",
    note: space.availability?.note ?? "",
  })
  const [saving, setSaving] = useState(false)
  const [savingAvail, setSavingAvail] = useState(false)

  const save = async (which: "space" | "availability") => {
    const setter = which === "space" ? setSaving : setSavingAvail
    setter(true)
    try {
      const payload: any = { id: space.id }
      if (which === "space") {
        payload.space = {
          ...form,
          price_hour: form.price_hour === "" ? null : Number(form.price_hour),
          price_day: form.price_day === "" ? null : Number(form.price_day),
          price_month: form.price_month === "" ? null : Number(form.price_month),
          capacity: Number(form.capacity),
          total_units: Number(form.total_units),
          amenities: form.amenities
            .split(",")
            .map((a) => a.trim())
            .filter(Boolean),
        }
      } else {
        payload.availability = {
          ...availForm,
          available_units: Number(availForm.available_units),
          note: availForm.note || null,
          opens_at: availForm.opens_at || null,
          closes_at: availForm.closes_at || null,
        }
      }
      const res = await fetch("/api/coworking/admin/spaces", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      const json = await res.json()
      if (!res.ok || !json.ok) throw new Error(json.error || "Erreur")
      notify("ok", which === "space" ? "Espace enregistré" : "Disponibilité mise à jour")
      onChanged()
    } catch (err) {
      notify("err", (err as Error).message)
    } finally {
      setter(false)
    }
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="text-sm text-white/60">
          {SPACE_TYPE_LABELS[form.type]} · {form.is_active ? "Actif" : "Masqué"}
        </div>
        <div className="text-xs text-white/40">ID: {space.id.slice(0, 8)}…</div>
      </div>

      <div className="grid sm:grid-cols-2 gap-3 mb-4">
        <Field label="Nom">
          <Input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="bg-[#0f1e36] border-white/15 text-white"
          />
        </Field>
        <Field label="Slug">
          <Input
            value={form.slug}
            onChange={(e) => setForm({ ...form, slug: e.target.value })}
            className="bg-[#0f1e36] border-white/15 text-white"
          />
        </Field>
        <Field label="Type">
          <select
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value as SpaceType })}
            className="w-full h-10 rounded-md bg-[#0f1e36] border border-white/15 px-3 text-sm text-white"
          >
            {SPACE_TYPES.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Capacité">
          <Input
            type="number"
            min={1}
            value={form.capacity}
            onChange={(e) => setForm({ ...form, capacity: Number(e.target.value) })}
            className="bg-[#0f1e36] border-white/15 text-white"
          />
        </Field>
        <Field label="Total d'unités">
          <Input
            type="number"
            min={0}
            value={form.total_units}
            onChange={(e) => setForm({ ...form, total_units: Number(e.target.value) })}
            className="bg-[#0f1e36] border-white/15 text-white"
          />
        </Field>
        <Field label="Visible sur le site ?">
          <select
            value={form.is_active ? "1" : "0"}
            onChange={(e) => setForm({ ...form, is_active: e.target.value === "1" })}
            className="w-full h-10 rounded-md bg-[#0f1e36] border border-white/15 px-3 text-sm text-white"
          >
            <option value="1">Oui — visible</option>
            <option value="0">Non — masqué</option>
          </select>
        </Field>
        <Field label="Prix / heure (TND)">
          <Input
            type="number"
            min={0}
            value={form.price_hour}
            onChange={(e) =>
              setForm({ ...form, price_hour: e.target.value === "" ? "" : Number(e.target.value) })
            }
            className="bg-[#0f1e36] border-white/15 text-white"
          />
        </Field>
        <Field label="Prix / jour (TND)">
          <Input
            type="number"
            min={0}
            value={form.price_day}
            onChange={(e) =>
              setForm({ ...form, price_day: e.target.value === "" ? "" : Number(e.target.value) })
            }
            className="bg-[#0f1e36] border-white/15 text-white"
          />
        </Field>
        <Field label="Prix / mois (TND)">
          <Input
            type="number"
            min={0}
            value={form.price_month}
            onChange={(e) =>
              setForm({ ...form, price_month: e.target.value === "" ? "" : Number(e.target.value) })
            }
            className="bg-[#0f1e36] border-white/15 text-white"
          />
        </Field>
      </div>
      <Field label="Description">
        <Textarea
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          rows={2}
          className="bg-[#0f1e36] border-white/15 text-white"
        />
      </Field>
      <div className="mt-3">
        <Field label="Équipements (séparés par des virgules)">
          <Input
            value={form.amenities}
            onChange={(e) => setForm({ ...form, amenities: e.target.value })}
            className="bg-[#0f1e36] border-white/15 text-white"
          />
        </Field>
      </div>

      <div className="flex justify-end mt-4">
        <Button
          onClick={() => save("space")}
          disabled={saving}
          className="rounded-full bg-white text-black hover:bg-gray-100"
          size="sm"
        >
          <Save className="w-4 h-4 mr-2" />
          {saving ? "Enregistrement..." : "Enregistrer l'espace"}
        </Button>
      </div>

      {/* Availability */}
      <div className="mt-5 rounded-xl border border-[#04a3fe]/25 bg-[#04a3fe]/5 p-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-6 h-6 rounded-md bg-[#04a3fe]/15 text-[#3ab5fe] flex items-center justify-center text-xs">
            <Users className="w-3.5 h-3.5" />
          </div>
          <div className="text-sm font-semibold">Disponibilité en direct</div>
        </div>
        <div className="grid sm:grid-cols-3 gap-3">
          <Field label="Unités disponibles">
            <Input
              type="number"
              min={0}
              max={form.total_units}
              value={availForm.available_units}
              onChange={(e) =>
                setAvailForm({ ...availForm, available_units: Number(e.target.value) })
              }
              className="bg-[#0f1e36] border-white/15 text-white"
            />
          </Field>
          <Field label="Statut">
            <select
              value={availForm.status}
              onChange={(e) =>
                setAvailForm({ ...availForm, status: e.target.value as AvailabilityStatus })
              }
              className="w-full h-10 rounded-md bg-[#0f1e36] border border-white/15 px-3 text-sm text-white"
            >
              {STATUSES.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Heures (ouvre / ferme)">
            <div className="flex gap-1.5">
              <Input
                type="time"
                value={availForm.opens_at ?? ""}
                onChange={(e) => setAvailForm({ ...availForm, opens_at: e.target.value })}
                className="bg-[#0f1e36] border-white/15 text-white [color-scheme:dark]"
              />
              <Input
                type="time"
                value={availForm.closes_at ?? ""}
                onChange={(e) => setAvailForm({ ...availForm, closes_at: e.target.value })}
                className="bg-[#0f1e36] border-white/15 text-white [color-scheme:dark]"
              />
            </div>
          </Field>
        </div>
        <div className="mt-3">
          <Field label="Note (affichée aux visiteurs)">
            <Input
              value={availForm.note ?? ""}
              onChange={(e) => setAvailForm({ ...availForm, note: e.target.value })}
              className="bg-[#0f1e36] border-white/15 text-white"
            />
          </Field>
        </div>
        <div className="flex justify-end mt-3">
          <Button
            onClick={() => save("availability")}
            disabled={savingAvail}
            size="sm"
            className="rounded-full bg-[#04a3fe] hover:bg-[#3ab5fe] text-white"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${savingAvail ? "animate-spin" : ""}`} />
            Mettre à jour la disponibilité
          </Button>
        </div>
      </div>
    </div>
  )
}

// -----------------------------------------------------------------------------
// Bookings tab
// -----------------------------------------------------------------------------

function BookingsTab({
  bookings,
  spaces,
}: {
  bookings: BookingRow[]
  spaces: SpaceWithAvailability[]
}) {
  const spaceName = (slug: string | null) =>
    slug ? spaces.find((s) => s.slug === slug)?.name ?? slug : "—"

  return (
    <div>
      <div className="mb-4">
        <h2 className="text-xl font-bold">Réservations reçues</h2>
        <p className="text-white/60 text-sm">Demandes soumises via le site public.</p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-white/5 text-white/60 text-xs uppercase tracking-wider">
              <tr>
                <th className="text-left px-4 py-3">Client</th>
                <th className="text-left px-4 py-3">Type</th>
                <th className="text-left px-4 py-3">Espace</th>
                <th className="text-left px-4 py-3">Période</th>
                <th className="text-left px-4 py-3">Message</th>
                <th className="text-left px-4 py-3">Statut</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {bookings.map((b) => (
                <tr key={b.id} className="hover:bg-white/5">
                  <td className="px-4 py-3">
                    <div className="text-white font-medium">{b.full_name}</div>
                    <div className="text-white/55 text-xs">{b.email}</div>
                    {b.phone && <div className="text-white/55 text-xs">{b.phone}</div>}
                    {b.company_name && (
                      <div className="text-white/55 text-xs italic">{b.company_name}</div>
                    )}
                  </td>
                  <td className="px-4 py-3 text-white/80 capitalize">
                    {b.client_type === "company" ? "Entreprise" : "Particulier"}
                  </td>
                  <td className="px-4 py-3 text-white/80">{spaceName(b.space_slug)}</td>
                  <td className="px-4 py-3 text-white/80">
                    {b.start_date ?? "—"}
                    {b.end_date ? ` → ${b.end_date}` : ""}
                    {(b.start_time || b.end_time) && (
                      <div className="text-white/50 text-xs">
                        {b.start_time ?? "—"} → {b.end_time ?? "—"}
                      </div>
                    )}
                    {b.attendees && (
                      <div className="text-white/50 text-xs">{b.attendees} pers.</div>
                    )}
                  </td>
                  <td className="px-4 py-3 text-white/70 text-xs max-w-xs">
                    {b.message ? (
                      <span className="line-clamp-3">{b.message}</span>
                    ) : (
                      <span className="text-white/30">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={b.status} />
                  </td>
                </tr>
              ))}
              {!bookings.length && (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center text-white/50">
                    Aucune demande pour le moment.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { text: string; cls: string }> = {
    pending: { text: "En attente", cls: "bg-amber-400/10 text-amber-300 border-amber-400/30" },
    confirmed: { text: "Confirmée", cls: "bg-emerald-400/10 text-emerald-300 border-emerald-400/30" },
    cancelled: { text: "Annulée", cls: "bg-rose-400/10 text-rose-300 border-rose-400/30" },
    completed: { text: "Terminée", cls: "bg-white/5 text-white/70 border-white/15" },
  }
  const m = map[status] ?? map.pending
  return (
    <span className={`inline-block text-[11px] rounded-full border px-2 py-0.5 ${m.cls}`}>
      {m.text}
    </span>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs uppercase tracking-wider text-white/60 mb-1.5">
        {label}
      </label>
      {children}
    </div>
  )
}
