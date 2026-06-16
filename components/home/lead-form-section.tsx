"use client"

import { useState, type FormEvent } from "react"
import { motion } from "framer-motion"
import { CheckCircle2 } from "lucide-react"
import { LEAD_FORM } from "./site-data"

/**
 * LeadFormSection
 * Full-width dark section with a lead-capture form.
 * Fields sit side-by-side on desktop, stacked on mobile. Placeholders double as
 * labels (modern style). On submit we just show a success state (wire this up to
 * your own API / CRM endpoint).
 */

const inputClass =
  "w-full rounded-lg border border-white/15 bg-white/[0.06] px-4 py-3 text-[15px] text-white placeholder:text-white/50 outline-none transition-all duration-200 focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/40"

export function LeadFormSection() {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    // TODO: POST form data to your backend / CRM here.
    setSubmitted(true)
  }

  return (
    <section id="contact" className="bg-[#111111]">
      <div className="mx-auto max-w-[1200px] px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mx-auto max-w-3xl"
        >
          <div className="text-center">
            <h2 className="text-[32px] font-bold tracking-tight text-white sm:text-[36px] lg:text-[40px]">
              {LEAD_FORM.title}
            </h2>
            <p className="mt-4 text-[16px] leading-relaxed text-white/60">{LEAD_FORM.subtitle}</p>
          </div>

          {submitted ? (
            <div className="mt-10 flex flex-col items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-10 text-center">
              <CheckCircle2 className="h-12 w-12 text-[#7C3AED]" />
              <p className="text-[18px] font-semibold text-white">[Thanks! We&apos;ll be in touch soon.]</p>
              <p className="text-[14px] text-white/60">[Placeholder confirmation message.]</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <input className={inputClass} type="text" name="firstName" placeholder="[First name]" required />
              <input className={inputClass} type="text" name="lastName" placeholder="[Last name]" required />
              <input className={inputClass} type="tel" name="phone" placeholder="[Phone number]" required />
              <input className={inputClass} type="email" name="email" placeholder="[Email address]" required />

              {/* Course interest */}
              <select className={`${inputClass} appearance-none`} name="course" defaultValue="" required>
                {LEAD_FORM.courseOptions.map((opt, i) => (
                  <option key={opt} value={i === 0 ? "" : opt} disabled={i === 0} className="bg-[#111111]">
                    {opt}
                  </option>
                ))}
              </select>

              {/* Location / campus */}
              <select className={`${inputClass} appearance-none`} name="location" defaultValue="" required>
                {LEAD_FORM.locationOptions.map((opt, i) => (
                  <option key={opt} value={i === 0 ? "" : opt} disabled={i === 0} className="bg-[#111111]">
                    {opt}
                  </option>
                ))}
              </select>

              <button
                type="submit"
                className="sm:col-span-2 mt-2 w-full rounded-lg bg-[#7C3AED] px-6 py-3.5 text-[16px] font-bold text-white transition-all duration-300 hover:bg-[#6D28D9] hover:shadow-[0_10px_24px_rgba(124,58,237,0.4)]"
              >
                {LEAD_FORM.submitLabel}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  )
}
