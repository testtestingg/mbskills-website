"use client"

import { useEffect, useState } from "react"
import { ChevronDown, Menu, Phone, X, Globe } from "lucide-react"
import { BRAND, NAV_COURSE_GROUPS, NAV_LINKS } from "./site-data"

/**
 * Navbar
 * - Sticky, white, subtle bottom border, backdrop-blur.
 * - Shrinks slightly + deepens shadow on scroll (scroll listener + useEffect).
 * - Center: nav links incl. a "Courses" mega-dropdown grouped by category.
 * - Right: phone (tel:), language switcher, primary CTA pill.
 * - Mobile (< lg): hamburger opens a full-screen slide-in drawer.
 */
export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [coursesOpen, setCoursesOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [lang, setLang] = useState<"EN" | "FR">("EN")

  // Shrink/elevate the navbar after a small scroll threshold.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Lock body scroll while the mobile drawer is open.
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [mobileOpen])

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b border-[#E5E7EB] bg-white/90 backdrop-blur-md transition-all duration-300 ${
        scrolled ? "shadow-[0_4px_20px_rgba(17,24,39,0.06)]" : "shadow-none"
      }`}
    >
      <nav
        className={`mx-auto flex max-w-[1200px] items-center justify-between px-6 transition-all duration-300 ${
          scrolled ? "h-14" : "h-[72px]"
        }`}
      >
        {/* ---- Logo ---- */}
        <a href="#" className="flex items-center gap-2 shrink-0" aria-label="Home">
          {/* Replace this inline SVG logo with your own brand mark / image. */}
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-[#7C3AED] text-sm font-extrabold text-white">
            B
          </span>
          <span className="text-lg font-extrabold tracking-tight text-[#111827]">
            {BRAND.name}
          </span>
        </a>

        {/* ---- Center: desktop nav links ---- */}
        <div className="hidden items-center gap-1 lg:flex">
          {/* Courses dropdown (mega menu grouped by category) */}
          <div
            className="relative"
            onMouseEnter={() => setCoursesOpen(true)}
            onMouseLeave={() => setCoursesOpen(false)}
          >
            <button
              className="flex items-center gap-1 rounded-md px-3 py-2 text-[15px] font-medium text-[#111827] transition-colors hover:text-[#7C3AED]"
              aria-expanded={coursesOpen}
            >
              [Courses]
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-200 ${coursesOpen ? "rotate-180" : ""}`}
              />
            </button>

            {/* Dropdown panel */}
            <div
              className={`absolute left-1/2 top-full w-[640px] -translate-x-1/2 pt-3 transition-all duration-200 ${
                coursesOpen
                  ? "visible translate-y-0 opacity-100"
                  : "invisible -translate-y-1 opacity-0"
              }`}
            >
              <div className="grid grid-cols-2 gap-x-8 gap-y-6 rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-[0_12px_40px_rgba(17,24,39,0.12)]">
                {NAV_COURSE_GROUPS.map((group) => (
                  <div key={group.category}>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#7C3AED]">
                      {group.category}
                    </p>
                    <ul className="space-y-1">
                      {group.links.map((link) => (
                        <li key={link.label}>
                          <a
                            href={link.href}
                            className="block rounded-md px-2 py-1.5 text-[15px] text-[#374151] transition-colors hover:bg-[#F9FAFB] hover:text-[#7C3AED]"
                          >
                            {link.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="rounded-md px-3 py-2 text-[15px] font-medium text-[#111827] transition-colors hover:text-[#7C3AED]"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* ---- Right: phone, language, CTA (desktop) ---- */}
        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={BRAND.phoneHref}
            className="flex items-center gap-1.5 text-[14px] font-medium text-[#374151] transition-colors hover:text-[#7C3AED]"
          >
            <Phone className="h-4 w-4" />
            {BRAND.phoneDisplay}
          </a>

          {/* Language switcher (simple toggle placeholder) */}
          <button
            onClick={() => setLang((l) => (l === "EN" ? "FR" : "EN"))}
            className="flex items-center gap-1 rounded-md border border-[#E5E7EB] px-2.5 py-1.5 text-[13px] font-medium text-[#374151] transition-colors hover:border-[#7C3AED] hover:text-[#7C3AED]"
            aria-label="Switch language"
          >
            <Globe className="h-4 w-4" />
            {lang}
          </button>

          <a
            href="#contact"
            className="rounded-full bg-[#7C3AED] px-5 py-2 text-[14px] font-semibold text-white transition-all duration-300 hover:bg-[#6D28D9] hover:shadow-[0_8px_20px_rgba(124,58,237,0.35)]"
          >
            [Get Started]
          </a>
        </div>

        {/* ---- Mobile: hamburger ---- */}
        <button
          className="grid h-10 w-10 place-items-center rounded-md text-[#111827] lg:hidden"
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
        >
          <Menu className="h-6 w-6" />
        </button>
      </nav>

      {/* ---- Mobile full-screen slide-in drawer ---- */}
      <div
        className={`fixed inset-0 z-[60] lg:hidden ${mobileOpen ? "pointer-events-auto" : "pointer-events-none"}`}
        aria-hidden={!mobileOpen}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-[#111827]/40 transition-opacity duration-300 ${
            mobileOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setMobileOpen(false)}
        />
        {/* Panel */}
        <div
          className={`absolute right-0 top-0 flex h-full w-[85%] max-w-sm flex-col bg-white shadow-2xl transition-transform duration-300 ease-in-out ${
            mobileOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between border-b border-[#E5E7EB] px-6 py-4">
            <span className="text-lg font-extrabold tracking-tight text-[#111827]">{BRAND.name}</span>
            <button
              className="grid h-10 w-10 place-items-center rounded-md text-[#111827]"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-6">
            {/* Courses (flat list of all groups on mobile) */}
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#7C3AED]">[Courses]</p>
            <div className="mb-6 space-y-4">
              {NAV_COURSE_GROUPS.map((group) => (
                <div key={group.category}>
                  <p className="mb-1 text-[13px] font-semibold text-[#6B7280]">{group.category}</p>
                  <ul className="space-y-0.5 pl-2">
                    {group.links.map((link) => (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          onClick={() => setMobileOpen(false)}
                          className="block py-1 text-[15px] text-[#374151]"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="space-y-1 border-t border-[#E5E7EB] pt-4">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block py-2 text-[16px] font-medium text-[#111827]"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Drawer footer: phone + CTA */}
          <div className="space-y-3 border-t border-[#E5E7EB] px-6 py-5">
            <a
              href={BRAND.phoneHref}
              className="flex items-center gap-2 text-[15px] font-medium text-[#374151]"
            >
              <Phone className="h-4 w-4" />
              {BRAND.phoneDisplay}
            </a>
            <a
              href="#contact"
              onClick={() => setMobileOpen(false)}
              className="block rounded-full bg-[#7C3AED] px-5 py-3 text-center text-[15px] font-semibold text-white"
            >
              [Get Started]
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}
