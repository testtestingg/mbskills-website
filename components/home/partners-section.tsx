"use client"

import { PARTNERS } from "./site-data"

/**
 * PartnersSection
 * Infinite auto-scrolling logo marquee. The track renders the logo list twice
 * and translates -50% (see .animate-marquee in globals.css) for a seamless loop.
 * Logos are grayscale by default, full color on hover. Hovering the strip
 * pauses the scroll (.marquee-pause).
 */
function LogoTrack({ reverse = false }: { reverse?: boolean }) {
  // Duplicate the logos so the -50% translate loops without a visible jump.
  const logos = [...PARTNERS.logos, ...PARTNERS.logos]
  return (
    <div className="marquee-pause flex w-full overflow-hidden">
      <div
        className={`flex shrink-0 items-center gap-12 pr-12 ${
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        }`}
      >
        {logos.map((src, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={`${src}-${i}`}
            src={src}
            alt="[Partner logo placeholder]"
            className="h-10 w-auto shrink-0 opacity-70 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
          />
        ))}
      </div>
    </div>
  )
}

export function PartnersSection() {
  return (
    <section id="partners" className="bg-white">
      <div className="mx-auto max-w-[1200px] px-6 py-20">
        <h2 className="text-center text-[28px] font-bold tracking-tight text-[#111827] sm:text-[32px]">
          {PARTNERS.title}
        </h2>

        {/* Two rows, scrolling in opposite directions, faded at the edges. */}
        <div className="relative mt-10 space-y-8">
          {/* Edge fade masks */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent sm:w-24" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent sm:w-24" />
          <LogoTrack />
          <LogoTrack reverse />
        </div>
      </div>
    </section>
  )
}
