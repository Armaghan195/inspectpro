export default function AnalyticsLoading() {
  return (
    <div className="space-y-6">
      {/* Header Skeleton */}
      <div className="mb-8">
        <div className="flex items-start justify-between">
          <div>
            <div className="h-8 w-40 bg-white/5 rounded animate-pulse mb-2" />
            <div className="h-4 w-64 bg-white/5 rounded animate-pulse" />
          </div>
          <div className="h-10 w-40 bg-white/5 rounded animate-pulse" />
        </div>
      </div>

      {/* Filters Skeleton */}
      <div className="glass-card p-4 rounded-xl">
        <div className="flex items-center gap-4 flex-wrap">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-10 w-40 bg-white/5 rounded animate-pulse" />
          ))}
        </div>
      </div>

      {/* KPI Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="glass-card p-6 rounded-xl">
            <div className="h-20 bg-white/5 rounded animate-pulse" />
          </div>
        ))}
      </div>

      {/* Chart Skeleton */}
      <div className="glass-card p-6 rounded-xl">
        <div className="h-80 bg-white/5 rounded animate-pulse" />
      </div>
    </div>
  )
}
