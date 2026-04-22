"use client"

import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { formations, type Formation } from "@/lib/data/formations"
import { Loader2 } from "lucide-react"

interface InscriptionDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  preselectedFormation?: Formation | null
}

export function InscriptionDialog({
  open,
  onOpenChange,
  preselectedFormation = null,
}: InscriptionDialogProps) {
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    prenom: "",
    nom: "",
    email: "",
    telephone: "",
    formationId: preselectedFormation?.id ?? "",
    message: "",
  })

  useEffect(() => {
    if (open && preselectedFormation) {
      setForm((prev) => ({ ...prev, formationId: preselectedFormation.id }))
    }
  }, [open, preselectedFormation])

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    // Simulate submit - replace with your API call
    await new Promise((r) => setTimeout(r, 800))
    setSubmitting(false)
    setSubmitted(true)
    setForm({ prenom: "", nom: "", email: "", telephone: "", formationId: "", message: "" })
  }

  const handleClose = (open: boolean) => {
    if (!open) setSubmitted(false)
    onOpenChange(open)
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md bg-slate-900 border-white/10 text-white">
        <DialogHeader>
          <DialogTitle className="text-xl text-white">Inscription à une formation</DialogTitle>
          <DialogDescription className="text-white/70">
            Remplissez vos informations pour être recontacté par notre équipe.
          </DialogDescription>
        </DialogHeader>

        {submitted ? (
          <div className="py-6 text-center">
            <p className="text-white font-medium mb-2">Demande envoyée avec succès.</p>
            <p className="text-sm text-white/70">Nous vous recontacterons rapidement.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="prenom" className="text-white/90">Prénom</Label>
                <Input
                  id="prenom"
                  required
                  value={form.prenom}
                  onChange={(e) => handleChange("prenom", e.target.value)}
                  className="bg-white/5 border-white/20 text-white placeholder:text-white/40"
                  placeholder="Prénom"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="nom" className="text-white/90">Nom</Label>
                <Input
                  id="nom"
                  required
                  value={form.nom}
                  onChange={(e) => handleChange("nom", e.target.value)}
                  className="bg-white/5 border-white/20 text-white placeholder:text-white/40"
                  placeholder="Nom"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white/90">Email</Label>
              <Input
                id="email"
                type="email"
                required
                value={form.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className="bg-white/5 border-white/20 text-white placeholder:text-white/40"
                placeholder="email@exemple.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="telephone" className="text-white/90">Téléphone</Label>
              <Input
                id="telephone"
                type="tel"
                required
                value={form.telephone}
                onChange={(e) => handleChange("telephone", e.target.value)}
                className="bg-white/5 border-white/20 text-white placeholder:text-white/40"
                placeholder="+216 23 198 118"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-white/90">Formation choisie</Label>
              <Select
                required
                value={form.formationId}
                onValueChange={(v) => handleChange("formationId", v)}
              >
                <SelectTrigger className="w-full bg-white/5 border-white/20 text-white [&>span]:text-white/90">
                  <SelectValue placeholder="Sélectionnez une formation" />
                </SelectTrigger>
                <SelectContent className="bg-slate-900 border-white/10">
                  {formations.map((f) => (
                    <SelectItem key={f.id} value={f.id} className="text-white focus:bg-white/10">
                      {f.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="message" className="text-white/90">Message (optionnel)</Label>
              <textarea
                id="message"
                value={form.message}
                onChange={(e) => handleChange("message", e.target.value)}
                rows={3}
                className="flex w-full rounded-md border border-white/20 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
                placeholder="Une question ou un commentaire..."
              />
            </div>
            <DialogFooter className="gap-2 sm:gap-0 pt-2">
              <Button
                type="button"
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10"
                onClick={() => handleClose(false)}
              >
                Annuler
              </Button>
              <Button
                type="submit"
                disabled={submitting}
                className="bg-white text-black hover:bg-gray-200"
              >
                {submitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Envoi...
                  </>
                ) : (
                  "Envoyer ma demande"
                )}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
