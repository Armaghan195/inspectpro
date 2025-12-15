export function Workflow() {
  const steps = [
    { label: "Create", description: "Build inspection templates" },
    { label: "Schedule", description: "Assign to team members" },
    { label: "Capture", description: "Complete offline in field" },
    { label: "Sync", description: "Auto-sync when online" },
    { label: "Review", description: "Generate PDF reports" },
  ]

  return (
    <section id="how-it-works" className="py-24 md:py-32 relative">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-sentient mb-4">
            Simple <i className="font-light">workflow</i>
          </h2>
          <p className="font-mono text-foreground/60 text-sm md:text-base">From creation to completion in five steps</p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="hidden md:flex items-start justify-between relative">
            <div className="absolute top-8 left-0 right-0 h-[2px] bg-border/30" />
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col items-center relative z-10">
                <div className="size-16 rounded-full bg-background border-2 border-primary flex items-center justify-center font-mono text-primary mb-4 shadow-glow shadow-primary/30">
                  {index + 1}
                </div>
                <h3 className="font-sentient text-lg mb-2">{step.label}</h3>
                <p className="font-mono text-sm text-foreground/60 text-center max-w-[140px]">{step.description}</p>
              </div>
            ))}
          </div>

          <div className="md:hidden space-y-6">
            {steps.map((step, index) => (
              <div key={index} className="flex gap-4 items-start">
                <div className="size-12 shrink-0 rounded-full bg-background border-2 border-primary flex items-center justify-center font-mono text-primary shadow-glow shadow-primary/30">
                  {index + 1}
                </div>
                <div>
                  <h3 className="font-sentient text-lg mb-1">{step.label}</h3>
                  <p className="font-mono text-sm text-foreground/60">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
