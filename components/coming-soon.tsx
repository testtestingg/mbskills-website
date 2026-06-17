"use client"

import React, { useEffect, useState } from "react"
import { Mail } from "lucide-react"

export default function ComingSoon(): JSX.Element {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a1327] relative overflow-hidden">
      {/* Subtle radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#04a3fe]/[0.06] blur-[120px] pointer-events-none" />

      <div
        className={`relative z-10 text-center px-6 max-w-lg transition-all duration-1000 ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        {/* Pill badge */}
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/[0.06] border border-white/[0.1] text-white/60 text-xs font-medium uppercase tracking-widest mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-[#04a3fe] mr-2 animate-pulse" />
          MBSkills
        </div>

        {/* Headings */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight mb-3">
          Coming Soon
        </h1>
        <p className="text-xl sm:text-2xl font-light text-white/40 mb-8">
          Bient&ocirc;t disponible
        </p>

        {/* Divider */}
        <div className="w-12 h-px bg-white/10 mx-auto mb-8" />

        {/* Subtitle */}
        <p className="text-white/50 text-sm sm:text-base leading-relaxed mb-10 max-w-sm mx-auto">
          Nous pr&eacute;parons quelque chose de nouveau.
          <br />
          Revenez bient&ocirc;t.
        </p>

        {/* CTA */}
        <a
          href="/contact"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-[#0a1327] text-sm font-semibold hover:bg-white/90 transition-colors duration-200"
        >
          <Mail className="w-4 h-4" />
          Contactez-nous
        </a>
      </div>
    </div>
  )
}
