"use client"

import { motion } from "framer-motion"
import { Check, MessageCircle } from "lucide-react"
import { BRAND, INSTRUCTORS } from "./site-data"

/**
 * InstructorsSection
 * Two columns: text + CTA on the left, a single strong image on the right.
 * Both columns animate in on scroll (whileInView, triggers once).
 */
export function InstructorsSection() {
  return (
    <section id="instructors" className="bg-white">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-12 px-6 py-20 lg:grid-cols-2">
        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <span className="text-[13px] font-semibold uppercase tracking-wide text-[#7C3AED]">
            {INSTRUCTORS.eyebrow}
          </span>
          <h2 className="mt-3 text-[32px] font-bold leading-tight tracking-tight text-[#111827] sm:text-[36px] lg:text-[40px]">
            {INSTRUCTORS.title}
          </h2>
          <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-[#6B7280]">{INSTRUCTORS.body}</p>

          <ul className="mt-6 space-y-3">
            {INSTRUCTORS.bullets.map((b) => (
              <li key={b} className="flex items-center gap-2.5 text-[15px] text-[#374151]">
                <span className="grid h-5 w-5 place-items-center rounded-full bg-[#F5F3FF]">
                  <Check className="h-3.5 w-3.5 text-[#7C3AED]" />
                </span>
                {b}
              </li>
            ))}
          </ul>

          <a
            href={BRAND.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#7C3AED] px-6 py-3 text-[15px] font-semibold text-white transition-all duration-300 hover:bg-[#6D28D9] hover:shadow-[0_10px_24px_rgba(124,58,237,0.35)]"
          >
            <MessageCircle className="h-4 w-4" />
            {INSTRUCTORS.cta.label}
          </a>
        </motion.div>

        {/* Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={INSTRUCTORS.image}
            alt="[Instructors image placeholder]"
            className="w-full rounded-2xl border border-[#E5E7EB] shadow-[0_20px_60px_rgba(17,24,39,0.10)]"
          />
        </motion.div>
      </div>
    </section>
  )
}
