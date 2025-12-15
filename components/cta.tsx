import Link from "next/link"
import { Button } from "./ui/button"

export function CTA() {
  return (
    <section id="get-started" className="py-24 md:py-32 relative">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-sentient mb-6">
            Ready to modernize <br />
            <i className="font-light">your inspections?</i>
          </h2>
          <p className="font-mono text-foreground/60 text-sm md:text-base mb-10">
            Start digitizing your field inspections today
          </p>
          <Link href="/#trial">
            <Button>[Start Free Trial]</Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
