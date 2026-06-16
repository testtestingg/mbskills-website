"use client"

import { motion } from "framer-motion"
import { MessageCircle, Sparkles } from "lucide-react"
import { AI_BANNER, BRAND } from "./site-data"

/**
 * AiBannerSection
 * Light gray banner highlighting the key differentiator.
 * Text column slides in from the left, illustration from the right (whileInView).
 */
export function AiBannerSection() {
  return (
    <section className="bg-[#F9FAFB]">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-12 px-6 py-20 lg:grid-cols-2">
        {/* Text */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F5F3FF] px-3 py-1 text-[13px] font-semibold text-[#7C3AED] ring-1 ring-inset ring-[#ddd6fe]">
            <Sparkles className="h-3.5 w-3.5" />
            {AI_BANNER.eyebrow}
          </span>
          <h2 className="mt-4 text-[32px] font-bold leading-tight tracking-tight text-[#111827] sm:text-[36px] lg:text-[40px]">
            {AI_BANNER.title}
          </h2>
          <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-[#6B7280]">{AI_BANNER.body}</p>

          <a
            href={BRAND.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#7C3AED] px-6 py-3 text-[15px] font-semibold text-white transition-all duration-300 hover:bg-[#6D28D9] hover:shadow-[0_10px_24px_rgba(124,58,237,0.35)]"
          >
            <MessageCircle className="h-4 w-4" />
            {AI_BANNER.cta.label}
          </a>
        </motion.div>

        {/* Illustration */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={AI_BANNER.image}
            alt="[AI illustration placeholder]"
            className="w-full rounded-2xl border border-[#E5E7EB] bg-white shadow-[0_16px_50px_rgba(17,24,39,0.08)]"
          />
        </motion.div>
      </div>
    </section>
  )
}
