export function Stats() {
  const stats = [
    { value: "100%", label: "Offline Capable" },
    { value: "Zero-Cost", label: "Stack" },
    { value: "Real-Time", label: "Sync" },
  ]

  return (
    <section className="py-24 md:py-32 relative">
      <div className="container">
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-5xl font-sentient mb-2 text-primary">{stat.value}</div>
              <p className="font-mono text-foreground/60 text-sm uppercase">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
