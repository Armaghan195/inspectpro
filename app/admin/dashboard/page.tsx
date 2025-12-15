import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BarChart3, CheckCircle2, Clock, MapPin } from "lucide-react"

export default function DashboardPage() {
  const stats = [
    {
      label: "Total Inspections",
      value: "247",
      icon: BarChart3,
      color: "#eab308",
    },
    {
      label: "Pending Reviews",
      value: "12",
      icon: Clock,
      color: "#f59e0b",
    },
    {
      label: "Active Sites",
      value: "8",
      icon: MapPin,
      color: "#10b981",
    },
  ]

  return (
    <div className="space-y-8">
      {/* Welcome Card */}
      <Card className="border-white/10 bg-white/5 p-8 backdrop-blur-md transition-all duration-300 hover:border-white/20 hover:bg-white/[0.07]">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#eab308]/10">
            <CheckCircle2 className="h-6 w-6 text-[#eab308]" />
          </div>
          <div className="flex-1">
            <h2 className="mb-2 font-[family-name:var(--font-sentient)] text-3xl text-foreground">
              Welcome to InspectPro
            </h2>
            <p className="font-mono text-sm text-foreground/60">
              Select a section from the sidebar to get started with field inspection management
            </p>
          </div>
          <Badge className="bg-[#eab308]/20 font-mono text-xs text-[#eab308]">ADMIN</Badge>
        </div>
      </Card>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card
              key={stat.label}
              className="group border-white/10 bg-white/5 p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.07] hover:shadow-lg hover:shadow-[#eab308]/10"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="mb-1 font-mono text-xs uppercase tracking-wider text-foreground/40">{stat.label}</p>
                  <p className="font-[family-name:var(--font-sentient)] text-4xl font-light text-foreground">
                    {stat.value}
                  </p>
                </div>
                <div
                  className="rounded-lg p-3 transition-all duration-300 group-hover:scale-110"
                  style={{ backgroundColor: `${stat.color}20` }}
                >
                  <Icon className="h-6 w-6" style={{ color: stat.color }} />
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      {/* Quick Actions */}
      <Card className="border-white/10 bg-white/5 p-6 backdrop-blur-md">
        <h3 className="mb-4 font-mono text-sm uppercase tracking-wider text-foreground/60">Quick Actions</h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {["New Inspection", "Add Site", "Create Template", "View Reports"].map((action) => (
            <button
              key={action}
              className="rounded-lg border border-white/10 bg-white/5 p-4 text-left font-mono text-sm transition-all duration-200 hover:border-[#eab308]/50 hover:bg-[#eab308]/5 hover:shadow-lg hover:shadow-[#eab308]/10"
            >
              {action}
            </button>
          ))}
        </div>
      </Card>
    </div>
  )
}
