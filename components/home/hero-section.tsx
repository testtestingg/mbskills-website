"use client"

import { motion } from "framer-motion"
import { Check, ArrowRight } from "lucide-react"
import { HERO } from "./site-data"

/**
 * HeroSection
 * Two columns on desktop (text left, image right); stacked on mobile.
 * Text elements fade in + slide up on load, staggered by 100ms via framer-motion.
 */

// Container/child variants for the staggered entrance animation.
const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
}
const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
}

export function HeroSection() {
  return (
    <section className="bg-white">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-12 px-6 py-20 lg:grid-cols-2 lg:py-28">
        {/* ---- Left: text content ---- */}
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.h1
            variants={item}
            className="text-[40px] font-extrabold leading-[1.1] tracking-tight text-[#111827] sm:text-[48px] lg:text-[56px]"
          >
            {HERO.titleLead}{" "}
            <span className="text-[#7C3AED]">{HERO.titleHighlight}</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-5 max-w-xl text-[16px] leading-relaxed text-[#6B7280]"
          >
            {HERO.subtitle}
          </motion.p>

          {/* CTAs */}
          <motion.div variants={item} className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href={HERO.primaryCta.href}
              className="inline-flex items-center gap-2 rounded-full bg-[#7C3AED] px-6 py-3 text-[15px] font-semibold text-white transition-all duration-300 hover:bg-[#6D28D9] hover:shadow-[0_10px_24px_rgba(124,58,237,0.35)]"
            >
              {HERO.primaryCta.label}
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href={HERO.secondaryCta.href}
              className="inline-flex items-center gap-2 rounded-full border border-[#E5E7EB] px-6 py-3 text-[15px] font-semibold text-[#111827] transition-all duration-300 hover:border-[#7C3AED] hover:text-[#7C3AED]"
            >
              {HERO.secondaryCta.label}
            </a>
          </motion.div>

          {/* Feature pills */}
          <motion.div variants={item} className="mt-8 flex flex-wrap gap-3">
            {HERO.pills.map((pill) => (
              <span
                key={pill}
                className="inline-flex items-center gap-1.5 rounded-full bg-[#F9FAFB] px-3.5 py-1.5 text-[13px] font-medium text-[#374151] ring-1 ring-inset ring-[#E5E7EB]"
              >
                <Check className="h-3.5 w-3.5 text-[#7C3AED]" />
                {pill}
              </span>
            ))}
          </motion.div>
        </motion.div>

        {/* ---- Right: hero image ---- */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          className="relative"
        >
          {/* Soft decorative glow behind the image */}
          <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-tr from-[#ede9fe] to-transparent blur-2xl" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={HERO.image}
            alt="[Hero image placeholder]"
            className="w-full rounded-2xl border border-[#E5E7EB] shadow-[0_20px_60px_rgba(17,24,39,0.10)]"
          />
        </motion.div>
      </div>
    </section>
  )
}
