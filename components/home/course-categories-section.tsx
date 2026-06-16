"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { COURSE_CATEGORIES, COURSE_SECTION, type Course } from "./site-data"

/**
 * CourseCategoriesSection
 * - Horizontal scrollable pill tab bar (active = brand color).
 * - Card grid: 1 col mobile → 2 col tablet → 3 col desktop.
 * - Switching tabs fades the grid out → in (AnimatePresence on the active key).
 * - Cards lift on hover (translateY + deeper shadow).
 */

// Pill styling per course level badge.
const levelStyles: Record<string, string> = {
  Intro: "bg-[#F0FDF4] text-[#166534] ring-[#bbf7d0]",
  Advanced: "bg-[#EFF6FF] text-[#1D4ED8] ring-[#bfdbfe]",
  Bootcamp: "bg-[#FEF3C7] text-[#92400E] ring-[#fde68a]",
}

function CourseCard({ course }: { course: Course }) {
  return (
    <a
      href={course.href}
      className="group flex h-full flex-col rounded-xl border border-[#E5E7EB] bg-white p-6 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:border-[#ddd6fe] hover:shadow-[0_16px_40px_rgba(17,24,39,0.10)]"
    >
      {/* Badges */}
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <span
          className={`rounded-full px-2.5 py-1 text-[12px] font-semibold ring-1 ring-inset ${
            levelStyles[course.level] ?? "bg-[#F9FAFB] text-[#374151] ring-[#E5E7EB]"
          }`}
        >
          {course.level}
        </span>
        {course.aiSkills && (
          <span className="rounded-full bg-[#F5F3FF] px-2.5 py-1 text-[12px] font-semibold text-[#7C3AED] ring-1 ring-inset ring-[#ddd6fe]">
            AI Skills
          </span>
        )}
      </div>

      {/* Title + description */}
      <h3 className="text-[19px] font-semibold leading-snug text-[#111827]">{course.title}</h3>
      <p className="mt-2 flex-1 text-[15px] leading-relaxed text-[#6B7280]">{course.description}</p>

      {/* Learn more */}
      <span className="mt-5 inline-flex items-center gap-1.5 text-[14px] font-semibold text-[#7C3AED]">
        [Learn More]
        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
      </span>
    </a>
  )
}

export function CourseCategoriesSection() {
  const categories = Object.keys(COURSE_CATEGORIES)
  const [active, setActive] = useState(categories[0])

  return (
    <section id="courses" className="bg-white">
      <div className="mx-auto max-w-[1200px] px-6 py-20">
        {/* Header */}
        <div className="max-w-2xl">
          <h2 className="text-[32px] font-bold tracking-tight text-[#111827] sm:text-[36px] lg:text-[40px]">
            {COURSE_SECTION.title}
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed text-[#6B7280]">{COURSE_SECTION.subtitle}</p>
        </div>

        {/* Tab bar */}
        <div className="ds-no-scrollbar mt-8 flex gap-2 overflow-x-auto pb-2">
          {categories.map((cat) => {
            const isActive = cat === active
            return (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`whitespace-nowrap rounded-full px-4 py-2 text-[14px] font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-[#7C3AED] text-white shadow-[0_6px_16px_rgba(124,58,237,0.3)]"
                    : "bg-[#F9FAFB] text-[#374151] ring-1 ring-inset ring-[#E5E7EB] hover:bg-white hover:text-[#7C3AED]"
                }`}
              >
                {cat}
              </button>
            )
          })}
        </div>

        {/* Card grid — fades out/in on tab change */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {COURSE_CATEGORIES[active].map((course) => (
              <CourseCard key={course.title} course={course} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
