import { Wifi, FileEdit, FileText } from "lucide-react"
import { Card, CardHeader, CardTitle, CardDescription } from "./ui/card"

export function Features() {
  const features = [
    {
      icon: Wifi,
      title: "Offline-First PWA",
      description: "Work without internet. Data syncs automatically when connected.",
    },
    {
      icon: FileEdit,
      title: "Template Builder",
      description: "Create reusable inspection checklists with versioning support.",
    },
    {
      icon: FileText,
      title: "PDF Reports",
      description: "Generate professional, branded inspection reports instantly.",
    },
  ]

  return (
    <section id="features" className="py-24 md:py-32 relative">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-sentient mb-4">
            Built for the <i className="font-light">field</i>
          </h2>
          <p className="font-mono text-foreground/60 text-sm md:text-base">
            Everything you need for modern inspections
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card
                key={index}
                className="bg-[#0a0a0a]/50 backdrop-blur-sm border-border/30 hover:border-primary/50 transition-colors duration-300"
              >
                <CardHeader>
                  <div className="mb-4 inline-flex p-3 rounded-lg bg-primary/10 border border-primary/20 w-fit">
                    <Icon className="size-6 text-primary" />
                  </div>
                  <CardTitle className="font-sentient text-xl">{feature.title}</CardTitle>
                  <CardDescription className="font-mono text-foreground/60">{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
