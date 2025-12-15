"use client"

import Link from "next/link"
import { GL } from "./gl"
import { Pill } from "./pill"
import { Button } from "./ui/button"
import { useState } from "react"

export function Hero() {
  const [hovering, setHovering] = useState(false)
  return (
    <div className="flex flex-col h-svh justify-between">
      <GL hovering={hovering} />

      <div className="pb-16 mt-auto text-center relative">
        <Pill className="mb-6">OFFLINE-FIRST PWA</Pill>
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-sentient">
          Smart Field Inspections <br />
          <i className="font-light">Anywhere, Anytime</i>
        </h1>
        <p className="font-mono text-sm sm:text-base text-foreground/60 text-balance mt-8 max-w-[520px] mx-auto">
          Digitize inspections with offline-first PWA technology. Capture, sync, and generate professional reports
          seamlessly.
        </p>

        <div className="flex items-center justify-center gap-4 mt-14">
          <Link className="contents max-sm:hidden" href="/#get-started">
            <Button onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)}>
              [Get Started]
            </Button>
          </Link>
          <Link className="contents sm:hidden" href="/#get-started">
            <Button size="sm" onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)}>
              [Get Started]
            </Button>
          </Link>
          <Link
            className="uppercase font-mono text-foreground/60 hover:text-foreground/100 duration-150 transition-colors ease-out hidden sm:inline-block"
            href="/#demo"
          >
            [Watch Demo]
          </Link>
        </div>
      </div>
    </div>
  )
}
