"use client"

import { Hero } from "@/components/hero"
import { Features } from "@/components/features"
import { Workflow } from "@/components/workflow"
import { Stats } from "@/components/stats"
import { CTA } from "@/components/cta"
import { Footer } from "@/components/footer"
import { Leva } from "leva"

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <Workflow />
      <Stats />
      <CTA />
      <Footer />
      <Leva hidden />
    </>
  )
}
