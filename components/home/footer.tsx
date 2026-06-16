"use client"

import {
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  Twitter,
  MapPin,
  Phone,
  Mail,
  type LucideIcon,
} from "lucide-react"
import { BRAND, FOOTER } from "./site-data"

/**
 * Footer
 * Black footer, white text, 4-column grid (stacked on mobile).
 * Social icons: circular gray bg, turn brand color on hover.
 */

// Map social labels → lucide icons.
const socialIcons: Record<string, LucideIcon> = {
  Facebook,
  LinkedIn: Linkedin,
  YouTube: Youtube,
  Instagram,
  X: Twitter,
}

export function Footer() {
  return (
    <footer className="bg-[#0F0F0F] text-white">
      <div className="mx-auto max-w-[1200px] px-6 py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Col 1: brand + contact */}
          <div>
            <div className="flex items-center gap-2">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-[#7C3AED] text-sm font-extrabold text-white">
                B
              </span>
              <span className="text-lg font-extrabold tracking-tight">{BRAND.name}</span>
            </div>
            <p className="mt-4 text-[14px] leading-relaxed text-white/60">{FOOTER.tagline}</p>
            <ul className="mt-5 space-y-2.5 text-[14px] text-white/70">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#7C3AED]" />
                {BRAND.address}
              </li>
              <li>
                <a href={BRAND.phoneHref} className="flex items-center gap-2.5 transition-colors hover:text-white">
                  <Phone className="h-4 w-4 shrink-0 text-[#7C3AED]" />
                  {BRAND.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={`mailto:${BRAND.email}`} className="flex items-center gap-2.5 transition-colors hover:text-white">
                  <Mail className="h-4 w-4 shrink-0 text-[#7C3AED]" />
                  {BRAND.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Col 2: courses */}
          <div>
            <h3 className="text-[15px] font-semibold">[Courses]</h3>
            <ul className="mt-4 space-y-2.5">
              {FOOTER.courseLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-[14px] text-white/60 transition-colors hover:text-white">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: company */}
          <div>
            <h3 className="text-[15px] font-semibold">[Company]</h3>
            <ul className="mt-4 space-y-2.5">
              {FOOTER.companyLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-[14px] text-white/60 transition-colors hover:text-white">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: socials */}
          <div>
            <h3 className="text-[15px] font-semibold">[Follow us]</h3>
            <div className="mt-4 flex flex-wrap gap-3">
              {FOOTER.socials.map((social) => {
                const Icon = socialIcons[social.label] ?? Facebook
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white/80 transition-all duration-300 hover:bg-[#7C3AED] hover:text-white"
                  >
                    <Icon className="h-4.5 w-4.5" />
                  </a>
                )
              })}
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="mt-12 border-t border-white/10 pt-6 text-center">
          <p className="text-[13px] text-[#9CA3AF]">
            © {new Date().getFullYear()} {FOOTER.copyright}
          </p>
        </div>
      </div>
    </footer>
  )
}
