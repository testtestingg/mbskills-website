"use client"

import { useState, useEffect } from "react"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card } from "@/components/ui/card"
import { TrendingUp, Users, DollarSign, Clock, Award, Target, Briefcase } from "lucide-react"

interface CalculatorInputs {
  currentSalary: number
  trainingCost: number
  trainingDuration: number
  careerField: string
  experience: string
}

export function ROICalculatorSection() {
  const [inputs, setInputs] = useState<CalculatorInputs>({
    currentSalary: 36000, // ~3000 TND/month average
    trainingCost: 4500, // ~4500 TND average training cost
    trainingDuration: 6,
    careerField: "webdev",
    experience: "intermediate",
  })

  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
          }
        })
      },
      { threshold: 0.1 },
    )

    const section = document.getElementById("roi-calculator")
    if (section) {
      observer.observe(section)
    }

    return () => observer.disconnect()
  }, [])

  const getCareerDefaults = () => {
    const careerDefaults = {
      webdev: { 
        avgIncrease: 80, 
        avgTimeToJob: 4, 
        jobMarketDemand: 90, 
        avgStartingSalary: 48000, // ~4000 TND/month
        maxSalary: 96000, // ~8000 TND/month
        skillGrowth: 85
      },
      datascience: { 
        avgIncrease: 120, 
        avgTimeToJob: 3, 
        jobMarketDemand: 95, 
        avgStartingSalary: 72000, // ~6000 TND/month
        maxSalary: 144000, // ~12000 TND/month
        skillGrowth: 90
      },
      mobiledev: { 
        avgIncrease: 90, 
        avgTimeToJob: 3, 
        jobMarketDemand: 88, 
        avgStartingSalary: 54000, // ~4500 TND/month
        maxSalary: 108000, // ~9000 TND/month
        skillGrowth: 80
      },
      cybersecurity: { 
        avgIncrease: 150, 
        avgTimeToJob: 2, 
        jobMarketDemand: 98, 
        avgStartingSalary: 84000, // ~7000 TND/month
        maxSalary: 168000, // ~14000 TND/month
        skillGrowth: 95
      },
      cloudcomputing: { 
        avgIncrease: 100, 
        avgTimeToJob: 3, 
        jobMarketDemand: 92, 
        avgStartingSalary: 60000, // ~5000 TND/month
        maxSalary: 120000, // ~10000 TND/month
        skillGrowth: 85
      },
      ai: { 
        avgIncrease: 180, 
        avgTimeToJob: 2, 
        jobMarketDemand: 96, 
        avgStartingSalary: 96000, // ~8000 TND/month
        maxSalary: 192000, // ~16000 TND/month
        skillGrowth: 95
      },
      erp: { 
        avgIncrease: 110, 
        avgTimeToJob: 3, 
        jobMarketDemand: 85, 
        avgStartingSalary: 66000, // ~5500 TND/month
        maxSalary: 132000, // ~11000 TND/month
        skillGrowth: 80
      },
      default: { 
        avgIncrease: 80, 
        avgTimeToJob: 4, 
        jobMarketDemand: 85, 
        avgStartingSalary: 48000, // ~4000 TND/month
        maxSalary: 96000, // ~8000 TND/month
        skillGrowth: 80
      },
    }

    return careerDefaults[inputs.careerField as keyof typeof careerDefaults] || careerDefaults.default
  }

  const getExperienceMultiplier = () => {
    const experienceMultipliers = {
      beginner: 1.3, // Beginners get higher relative increase
      intermediate: 1.0,
      advanced: 0.7, // Advanced professionals get lower relative increase
    }
    return experienceMultipliers[inputs.experience as keyof typeof experienceMultipliers] || 1.0
  }

  const careerConfig = getCareerDefaults()
  const experienceMultiplier = getExperienceMultiplier()

  // Calculate ROI metrics
  const expectedSalaryIncrease = careerConfig.avgIncrease * experienceMultiplier
  const newSalary = inputs.currentSalary * (1 + expectedSalaryIncrease / 100)
  const salaryIncrease = newSalary - inputs.currentSalary
  const timeToRecoupCost = inputs.trainingCost / (salaryIncrease / 12) // months to recoup training cost
  const fiveYearGain = (salaryIncrease * 5) - inputs.trainingCost
  const roiPercentage = ((salaryIncrease * 5) / inputs.trainingCost - 1) * 100

  return (
    <section id="roi-calculator" className="py-16 md:py-20 px-4 relative">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div
          className={`text-center mb-12 md:mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-6">
            <Target className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-white/80">Calculateur de Retour sur Investissement</span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6 text-balance">
            Calculez votre{" "}
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              retour sur investissement
            </span>
          </h2>

          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto text-balance">
            Découvrez combien une formation technologique peut augmenter votre salaire et accélérer votre carrière en Tunisie
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 items-stretch">
          {/* Calculator Inputs */}
          <div
            className={`transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <Card className="p-6 md:p-8 bg-[radial-gradient(35%_128px_at_50%_0%,theme(backgroundColor.white/15%),theme(backgroundColor.white/5%))] border-white/20 backdrop-blur-sm shadow-2xl h-full flex flex-col">
              <h3 className="text-xl md:text-2xl font-semibold text-white mb-6 md:mb-8">Votre Situation Actuelle</h3>

              <div className="space-y-8 flex-1">
                {/* Current Salary */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">
                    Salaire Annuel Actuel:{" "}
                    <span className="text-white font-semibold">{inputs.currentSalary.toLocaleString()} TND</span>
                  </label>
                  <Slider
                    value={[inputs.currentSalary]}
                    onValueChange={([value]) => setInputs((prev) => ({ ...prev, currentSalary: value }))}
                    max={120000}
                    min={12000} // ~1000 TND/month minimum
                    step={1000}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>12K TND</span>
                    <span>120K TND</span>
                  </div>
                </div>

                {/* Training Cost */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">
                    Coût de la Formation:{" "}
                    <span className="text-white font-semibold">{inputs.trainingCost.toLocaleString()} TND</span>
                  </label>
                  <Slider
                    value={[inputs.trainingCost]}
                    onValueChange={([value]) => setInputs((prev) => ({ ...prev, trainingCost: value }))}
                    max={12000}
                    min={1500}
                    step={100}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>1.5K TND</span>
                    <span>12K TND</span>
                  </div>
                </div>

                {/* Career Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">Domaine de Carrière</label>
                  <Select
                    value={inputs.careerField}
                    onValueChange={(value) => setInputs((prev) => ({ ...prev, careerField: value }))}
                  >
                    <SelectTrigger className="bg-gray-700/50 border-gray-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="webdev">Développement Web</SelectItem>
                      <SelectItem value="datascience">Science des Données</SelectItem>
                      <SelectItem value="mobiledev">Développement Mobile</SelectItem>
                      <SelectItem value="cybersecurity">Cybersécurité</SelectItem>
                      <SelectItem value="cloudcomputing">Cloud Computing</SelectItem>
                      <SelectItem value="ai">Intelligence Artificielle</SelectItem>
                      <SelectItem value="erp">ERP & SAP</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Experience Level */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">Niveau d'Expérience</label>
                  <Select
                    value={inputs.experience}
                    onValueChange={(value) => setInputs((prev) => ({ ...prev, experience: value }))}
                  >
                    <SelectTrigger className="bg-gray-700/50 border-gray-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="beginner">Débutant</SelectItem>
                      <SelectItem value="intermediate">Intermédiaire</SelectItem>
                      <SelectItem value="advanced">Avancé</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex-1"></div>
              </div>

              <div className="mt-6 lg:hidden">
                <div className="flex items-center justify-center gap-2 p-3 rounded-lg bg-primary/10 border border-primary/20">
                  <div className="animate-bounce">
                    <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 14l-7 7m0 0l-7-7m7 7V3"
                      />
                    </svg>
                  </div>
                  <span className="text-sm text-primary font-medium">Faites défiler pour voir vos résultats</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Results */}
          <div
            className={`transition-all duration-700 delay-400 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <Card className="p-6 md:p-8 bg-[radial-gradient(35%_128px_at_50%_0%,theme(backgroundColor.white/15%),theme(backgroundColor.white/5%))] border-white/20 backdrop-blur-sm shadow-2xl h-full flex flex-col">
              <h3 className="text-xl md:text-2xl font-semibold text-white mb-6 md:mb-8">
                Résultats Potentiels
              </h3>

              <div className="space-y-6 flex-1">
                {/* Current vs New Salary */}
                <div className="grid grid-cols-2 gap-3 md:gap-4">
                  <div className="text-center p-3 md:p-4 rounded-lg bg-gray-700/30">
                    <div className="text-xs md:text-sm text-gray-400 mb-1">Actuel</div>
                    <div className="text-xl md:text-2xl font-bold text-white">{inputs.currentSalary.toLocaleString()} TND</div>
                    <div className="text-xs text-gray-400">par an</div>
                  </div>
                  <div className="text-center p-3 md:p-4 rounded-lg bg-white/10 border border-white/20">
                    <div className="text-xs md:text-sm text-gray-300 mb-1">Après Formation</div>
                    <div className="text-xl md:text-2xl font-bold text-white">{newSalary.toLocaleString()} TND</div>
                    <div className="text-xs text-gray-300">par an</div>
                  </div>
                </div>

                <div className="space-y-3 md:space-y-4">
                  <div className="flex items-center justify-between p-3 md:p-4 rounded-lg bg-white/5 border border-white/10">
                    <div className="flex items-center gap-3">
                      <TrendingUp className="w-4 h-4 md:w-5 md:h-5 text-gray-300" />
                      <span className="text-sm md:text-base text-white">Augmentation de Salaire</span>
                    </div>
                    <span className="text-lg md:text-xl font-bold text-white">+{expectedSalaryIncrease.toFixed(0)}%</span>
                  </div>

                  <div className="flex items-center justify-between p-3 md:p-4 rounded-lg bg-white/5 border border-white/10">
                    <div className="flex items-center gap-3">
                      <DollarSign className="w-4 h-4 md:w-5 md:h-5 text-gray-300" />
                      <span className="text-sm md:text-base text-white">Gain Annuel</span>
                    </div>
                    <span className="text-lg md:text-xl font-bold text-white">
                      {salaryIncrease.toLocaleString()} TND
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-3 md:p-4 rounded-lg bg-white/5 border border-white/10">
                    <div className="flex items-center gap-3">
                      <Clock className="w-4 h-4 md:w-5 md:h-5 text-gray-300" />
                      <span className="text-sm md:text-base text-white">Temps de Recouvrement</span>
                    </div>
                    <span className="text-lg md:text-xl font-bold text-white">{timeToRecoupCost.toFixed(1)} mois</span>
                  </div>

                  <div className="flex items-center justify-between p-3 md:p-4 rounded-lg bg-white/5 border border-white/10">
                    <div className="flex items-center gap-3">
                      <Award className="w-4 h-4 md:w-5 md:h-5 text-gray-300" />
                      <span className="text-sm md:text-base text-white">ROI sur 5 ans</span>
                    </div>
                    <span className="text-lg md:text-xl font-bold text-white">{roiPercentage.toFixed(0)}%</span>
                  </div>
                </div>

                {/* 5-Year Projection */}
                <div className="mt-6 md:mt-8 p-4 md:p-6 rounded-lg bg-white/5 border border-white/10">
                  <div className="text-center">
                    <div className="text-xs md:text-sm text-gray-300 mb-2">Gain Total sur 5 Ans</div>
                    <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2">
                      {fiveYearGain.toLocaleString()} TND
                    </div>
                    <div className="text-xs md:text-sm text-gray-400">
                      Après déduction du coût de formation
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Career Insights */}
        <div
          className={`mt-12 md:mt-16 transition-all duration-700 delay-600 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-8">
            <h3 className="text-xl md:text-2xl font-semibold text-white mb-6 text-center">
              Informations sur le Marché Tunisien
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">{careerConfig.avgTimeToJob}</div>
                <p className="text-sm text-gray-300">Mois pour trouver un emploi</p>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">{careerConfig.jobMarketDemand}%</div>
                <p className="text-sm text-gray-300">Demande sur le marché</p>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">{careerConfig.avgStartingSalary.toLocaleString()} TND</div>
                <p className="text-sm text-gray-300">Salaire de départ moyen</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div
          className={`text-center mt-12 md:mt-16 transition-all duration-700 delay-900 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <p className="text-sm text-gray-400 mt-4">* Les résultats sont basés sur les moyennes du marché tunisien et peuvent varier selon votre profil et les conditions économiques</p>
        </div>
      </div>
    </section>
  )
}