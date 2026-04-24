import { GlassmorphismNav } from "@/components/glassmorphism-nav"
import { HeroSection } from "@/components/hero-section"
import { ProblemSolutionSection } from "@/components/problem-solution-section"
import { BootcampsHighlightSection } from "@/components/bootcamps-highlight-section"
import { CoworkingHighlightSection } from "@/components/coworking-highlight-section"
import Aurora from "@/components/Aurora"
import { FeaturesSection } from "@/components/features-section"
import { JourneesSection } from "@/components/journees-section"
import { AITeamSection } from "@/components/ai-team-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { ROICalculatorSection } from "@/components/roi-calculator-section"
import { CTASection } from "@/components/cta-section"
import { Footer } from "@/components/footer"
import { IhetPartnerSection } from "@/components/ihet-partner-section"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-brand-navy overflow-hidden">
      <main className="min-h-screen relative overflow-hidden">
        <div className="fixed inset-0 w-full h-full bg-brand-radial">
          <Aurora colorStops={["#04a3fe", "#1a2f4f", "#04a3fe"]} amplitude={1.1} blend={0.5} speed={0.7} />
        </div>
        <div className="relative z-10">
          <GlassmorphismNav />
          <HeroSection />
          <ProblemSolutionSection />
          <BootcampsHighlightSection />
          <CoworkingHighlightSection />
          <FeaturesSection />
          <JourneesSection />
          <AITeamSection />
          <IhetPartnerSection />
          <TestimonialsSection />
          <ROICalculatorSection />
          <CTASection />
          <Footer />
        </div>
      </main>
    </div>
  )
}
