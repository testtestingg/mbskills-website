"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { TESTIMONIALS, TESTIMONIALS_SECTION, type Testimonial } from "./site-data"

/**
 * TestimonialsSection
 * Horizontal card carousel. Auto-advances every 5s, with manual prev/next
 * arrows and dot pagination. The track slides horizontally via translateX.
 * Cards-per-view is responsive (1 on mobile, 2 on tablet, 3 on desktop) using
 * CSS basis classes; the index advances one card at a time.
 */

function Card({ t }: { t: Testimonial }) {
  return (
    <div className="h-full rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-[0_8px_30px_rgba(17,24,39,0.06)]">
      <Quote className="h-7 w-7 text-[#ddd6fe]" />
      <p className="mt-3 text-[15px] leading-relaxed text-[#374151]">{t.quote}</p>
      <div className="mt-6 flex items-center gap-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={t.photo}
          alt={t.name}
          className="h-12 w-12 rounded-full object-cover ring-2 ring-[#ede9fe]"
        />
        <div>
          <p className="text-[15px] font-semibold text-[#111827]">{t.name}</p>
          <p className="text-[13px] text-[#6B7280]">{t.role}</p>
        </div>
      </div>
    </div>
  )
}

export function TestimonialsSection() {
  const [index, setIndex] = useState(0)
  const timer = useRef<ReturnType<typeof setInterval> | null>(null)
  const count = TESTIMONIALS.length

  const next = useCallback(() => setIndex((i) => (i + 1) % count), [count])
  const prev = useCallback(() => setIndex((i) => (i - 1 + count) % count), [count])

  // Auto-advance every 5s; reset whenever the index changes (e.g. manual nav).
  useEffect(() => {
    timer.current = setInterval(next, 5000)
    return () => {
      if (timer.current) clearInterval(timer.current)
    }
  }, [next])

  return (
    <section id="testimonials" className="bg-white">
      <div className="mx-auto max-w-[1200px] px-6 py-20">
        {/* Header + arrows */}
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <h2 className="text-[32px] font-bold tracking-tight text-[#111827] sm:text-[36px] lg:text-[40px]">
              {TESTIMONIALS_SECTION.title}
            </h2>
            <p className="mt-4 text-[16px] leading-relaxed text-[#6B7280]">
              {TESTIMONIALS_SECTION.subtitle}
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={prev}
              aria-label="Previous testimonial"
              className="grid h-11 w-11 place-items-center rounded-full border border-[#E5E7EB] text-[#374151] transition-all duration-300 hover:border-[#7C3AED] hover:text-[#7C3AED]"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={next}
              aria-label="Next testimonial"
              className="grid h-11 w-11 place-items-center rounded-full border border-[#E5E7EB] text-[#374151] transition-all duration-300 hover:border-[#7C3AED] hover:text-[#7C3AED]"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Carousel viewport */}
        <div className="mt-10 overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {TESTIMONIALS.map((t) => (
              <div
                key={t.name}
                className="w-full shrink-0 px-2 sm:w-1/2 lg:w-1/3"
              >
                <Card t={t} />
              </div>
            ))}
          </div>
        </div>

        {/* Dot pagination */}
        <div className="mt-8 flex justify-center gap-2">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Go to testimonial ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === index ? "w-6 bg-[#7C3AED]" : "w-2 bg-[#E5E7EB] hover:bg-[#c4b5fd]"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
