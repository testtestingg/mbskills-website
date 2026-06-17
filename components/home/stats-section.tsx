"use client"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { STATS, STATS_SECTION, type Stat } from "./site-data"
import { useCountUp, formatNumber } from "./use-count-up"

/**
 * StatsSection
 * 4-column grid of bold stats. Numbers count up from 0 the first time the
 * section enters the viewport (requestAnimationFrame-based counter hook).
 * 2 cols on mobile → 4 cols on desktop.
 */

function StatItem({ stat, start, index }: { stat: Stat; start: boolean; index: number }) {
  const value = useCountUp(stat.value, start)
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.1 }}
      className="text-center sm:text-left"
    >
      <p className="text-[36px] font-extrabold tracking-tight text-[#7C3AED] sm:text-[44px]">
        {stat.prefix}
        {formatNumber(value)}
        {stat.suffix}
      </p>
      <p className="mt-1 text-[16px] font-semibold text-[#111827]">{stat.label}</p>
      <p className="mt-1 text-[14px] leading-relaxed text-[#6B7280]">{stat.description}</p>
    </motion.div>
  )
}

export function StatsSection() {
  const ref = useRef<HTMLDivElement>(null)
  // Trigger the count-up once the grid is ~30% visible.
  const inView = useInView(ref, { once: true, amount: 0.3 })
  // Keep a stable "started" flag so counts don't restart on re-render.
  const [started, setStarted] = useState(false)
  if (inView && !started) setStarted(true)

  return (
    <section className="bg-[#F9FAFB]">
      <div className="mx-auto max-w-[1200px] px-6 py-20">
        <div className="max-w-2xl">
          <h2 className="text-[32px] font-bold tracking-tight text-[#111827] sm:text-[36px] lg:text-[40px]">
            {STATS_SECTION.title}
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed text-[#6B7280]">{STATS_SECTION.subtitle}</p>
        </div>

        <div ref={ref} className="mt-12 grid grid-cols-2 gap-8 lg:grid-cols-4">
          {STATS.map((stat, i) => (
            <StatItem key={stat.label} stat={stat} start={started} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
