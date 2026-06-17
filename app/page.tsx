/**
 * Homepage — GoMyCode-style design system.
 *
 * Renders all homepage sections in order. Each section is a self-contained
 * component under /components/home/. All placeholder content lives in
 * /components/home/site-data.ts — edit that one file to customize the site.
 *
 * (The previous homepage composition is preserved at
 *  /components/home/_legacy-homepage.tsx.bak for reference.)
 */
import { Navbar } from "@/components/home/navbar"
import { HeroSection } from "@/components/home/hero-section"
import { CourseCategoriesSection } from "@/components/home/course-categories-section"
import { AiBannerSection } from "@/components/home/ai-banner-section"
import { PartnersSection } from "@/components/home/partners-section"
import { StatsSection } from "@/components/home/stats-section"
import { TestimonialsSection } from "@/components/home/testimonials-section"
import { InstructorsSection } from "@/components/home/instructors-section"
import { LeadFormSection } from "@/components/home/lead-form-section"
import { Footer } from "@/components/home/footer"
import ComingSoon from "@/components/coming-soon"

export default function HomePage() {
  const isComingSoon = process?.env?.NEXT_PUBLIC_COMING_SOON === "1"

  if (isComingSoon) {
    return <ComingSoon />
  }

  return (
    <div className="min-h-screen bg-white text-[#111827]">
      <Navbar />
      <main>
        <HeroSection />
        <CourseCategoriesSection />
        <AiBannerSection />
        <PartnersSection />
        <StatsSection />
        <TestimonialsSection />
        <InstructorsSection />
        <LeadFormSection />
      </main>
      <Footer />
    </div>
  )
}
