"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Download,
  LineChart,
  BarChart3,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  AlertTriangle,
  Clock,
  ClipboardCheck,
  Sparkles,
  Eye,
  Flag,
  Info,
} from "lucide-react"
import {
  ResponsiveContainer,
  AreaChart,
  BarChart as RechartsBarChart,
  PieChart as RechartsPieChart,
  Area,
  Bar,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts"

export default function AnalyticsPage() {
  const [chartType, setChartType] = useState<"line" | "bar">("line")
  const [exportDialogOpen, setExportDialogOpen] = useState(false)

  // Sample data for inspection trends
  const inspectionTrendsData = [
    { date: "Dec 1", completed: 12, inProgress: 5, scheduled: 8 },
    { date: "Dec 3", completed: 15, inProgress: 7, scheduled: 6 },
    { date: "Dec 5", completed: 18, inProgress: 4, scheduled: 9 },
    { date: "Dec 7", completed: 14, inProgress: 6, scheduled: 7 },
    { date: "Dec 9", completed: 20, inProgress: 8, scheduled: 5 },
    { date: "Dec 11", completed: 22, inProgress: 5, scheduled: 8 },
    { date: "Dec 13", completed: 19, inProgress: 6, scheduled: 10 },
  ]

  // Sample data for category distribution
  const categoryData = [
    { name: "Safety", value: 34, color: "#ef4444" },
    { name: "Maintenance", value: 28, color: "#eab308" },
    { name: "Electrical", value: 18, color: "#3b82f6" },
    { name: "Cleanliness", value: 12, color: "#10b981" },
    { name: "Other", value: 8, color: "#8b5cf6" },
  ]

  // Sample data for severity distribution
  const severityData = [
    { severity: "Low", count: 324, color: "#10b981" },
    { severity: "Medium", count: 612, color: "#f59e0b" },
    { severity: "High", count: 306, color: "#ef4444" },
    { severity: "Critical", count: 42, color: "#dc2626" },
  ]

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-sentient mb-2">Analytics</h1>
            <p className="text-foreground/60 font-mono text-sm">Inspection trends, insights, and data export</p>
          </div>

          {/* Export Button */}
          <Dialog open={exportDialogOpen} onOpenChange={setExportDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-[#eab308] hover:bg-[#eab308]/90 text-black font-mono uppercase text-sm">
                <Download className="w-4 h-4 mr-2" />
                Export Data
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-xl bg-[#121212]/95 backdrop-blur-md border-white/10">
              <DialogHeader>
                <DialogTitle className="text-xl font-sentient">Export Analytics Data</DialogTitle>
                <DialogDescription className="font-mono text-sm text-foreground/60">
                  Export inspection data in CSV format
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6 py-4">
                {/* Export Type */}
                <div>
                  <Label className="font-mono uppercase text-xs text-foreground/60 mb-3">Export Type</Label>
                  <div className="space-y-2 mt-2">
                    <div className="flex items-center gap-2 p-3 rounded-lg bg-white/[0.03] border border-white/10 cursor-pointer hover:border-white/20">
                      <input type="radio" name="export" defaultChecked id="inspections" />
                      <label htmlFor="inspections" className="flex-1 cursor-pointer">
                        <p className="text-sm font-medium">All Inspections</p>
                        <p className="text-xs text-foreground/50 font-mono mt-0.5">
                          Complete inspection records with metadata
                        </p>
                      </label>
                    </div>

                    <div className="flex items-center gap-2 p-3 rounded-lg bg-white/[0.03] border border-white/10 cursor-pointer hover:border-white/20">
                      <input type="radio" name="export" id="findings" />
                      <label htmlFor="findings" className="flex-1 cursor-pointer">
                        <p className="text-sm font-medium">Findings Only</p>
                        <p className="text-xs text-foreground/50 font-mono mt-0.5">
                          Individual findings with categories and severity
                        </p>
                      </label>
                    </div>

                    <div className="flex items-center gap-2 p-3 rounded-lg bg-white/[0.03] border border-white/10 cursor-pointer hover:border-white/20">
                      <input type="radio" name="export" id="summary" />
                      <label htmlFor="summary" className="flex-1 cursor-pointer">
                        <p className="text-sm font-medium">Summary Report</p>
                        <p className="text-xs text-foreground/50 font-mono mt-0.5">Aggregated statistics and trends</p>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Date Range */}
                <div>
                  <Label className="font-mono uppercase text-xs text-foreground/60">Date Range</Label>
                  <Select defaultValue="30days">
                    <SelectTrigger className="bg-white/[0.03] border-white/[0.3] h-12 mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7days">Last 7 Days</SelectItem>
                      <SelectItem value="30days">Last 30 Days</SelectItem>
                      <SelectItem value="90days">Last 90 Days</SelectItem>
                      <SelectItem value="all">All Time</SelectItem>
                      <SelectItem value="custom">Custom Range</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Include Options */}
                <div>
                  <Label className="font-mono uppercase text-xs text-foreground/60 mb-3">Include in Export</Label>
                  <div className="space-y-2 mt-2">
                    <div className="flex items-center gap-2 p-2">
                      <input type="checkbox" defaultChecked id="photos-meta" />
                      <label htmlFor="photos-meta" className="text-sm cursor-pointer">
                        Photo metadata (URLs and annotations)
                      </label>
                    </div>
                    <div className="flex items-center gap-2 p-2">
                      <input type="checkbox" defaultChecked id="timestamps" />
                      <label htmlFor="timestamps" className="text-sm cursor-pointer">
                        Timestamps and status history
                      </label>
                    </div>
                    <div className="flex items-center gap-2 p-2">
                      <input type="checkbox" id="notes" />
                      <label htmlFor="notes" className="text-sm cursor-pointer">
                        Inspector and reviewer notes
                      </label>
                    </div>
                  </div>
                </div>

                {/* Estimated Records */}
                <div className="p-3 rounded-lg bg-[#3b82f6]/5 border border-[#3b82f6]/20">
                  <div className="flex items-center gap-2">
                    <Info className="w-4 h-4 text-[#3b82f6]" />
                    <p className="text-xs text-foreground/70 font-mono">
                      Estimated records: <strong>247 inspections</strong> • File size: ~2.1 MB
                    </p>
                  </div>
                </div>
              </div>

              <DialogFooter className="gap-2">
                <Button
                  variant="outline"
                  className="font-mono uppercase text-xs bg-transparent"
                  onClick={() => setExportDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button className="bg-[#eab308] hover:bg-[#eab308]/90 text-black font-mono uppercase text-xs">
                  <Download className="w-4 h-4 mr-2" />
                  Export CSV
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Filters & Date Range Selector */}
      <div className="glass-card p-4 rounded-xl">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          {/* Date Range Selector */}
          <div className="flex items-center gap-2">
            <Label className="font-mono uppercase text-xs text-foreground/60">Date Range</Label>
            <Select defaultValue="30days">
              <SelectTrigger className="w-[160px] h-10 bg-white/[0.03] border-white/[0.3]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7days">Last 7 Days</SelectItem>
                <SelectItem value="30days">Last 30 Days</SelectItem>
                <SelectItem value="90days">Last 90 Days</SelectItem>
                <SelectItem value="6months">Last 6 Months</SelectItem>
                <SelectItem value="1year">Last Year</SelectItem>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="custom">Custom Range</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Site Filter */}
          <div className="flex items-center gap-2">
            <Label className="font-mono uppercase text-xs text-foreground/60">Site</Label>
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px] h-10 bg-white/[0.03] border-white/[0.3]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sites</SelectItem>
                <SelectItem value="site-1">Boys Hostel A</SelectItem>
                <SelectItem value="site-2">Girls Hostel B</SelectItem>
                <SelectItem value="site-3">Engineering Block</SelectItem>
                <SelectItem value="site-4">Library Building</SelectItem>
                <SelectItem value="site-5">Sports Complex</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-2">
            <Label className="font-mono uppercase text-xs text-foreground/60">Category</Label>
            <Select defaultValue="all">
              <SelectTrigger className="w-[160px] h-10 bg-white/[0.03] border-white/[0.3]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="safety">Safety</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
                <SelectItem value="cleanliness">Cleanliness</SelectItem>
                <SelectItem value="electrical">Electrical</SelectItem>
                <SelectItem value="plumbing">Plumbing</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Inspector Filter */}
          <div className="flex items-center gap-2">
            <Label className="font-mono uppercase text-xs text-foreground/60">Inspector</Label>
            <Select defaultValue="all">
              <SelectTrigger className="w-[160px] h-10 bg-white/[0.03] border-white/[0.3]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Inspectors</SelectItem>
                <SelectItem value="user-1">John Doe</SelectItem>
                <SelectItem value="user-2">Sarah Khan</SelectItem>
                <SelectItem value="user-3">Ahmed Ali</SelectItem>
                <SelectItem value="user-4">Maria Garcia</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Key Metrics Overview (KPI Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Inspections */}
        <div className="glass-card p-6 rounded-xl">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-xs font-mono uppercase text-foreground/50 mb-2">Total Inspections</p>
              <p className="text-3xl font-semibold">247</p>
            </div>
            <div className="p-3 rounded-lg bg-[#eab308]/10">
              <ClipboardCheck className="w-6 h-6 text-[#eab308]" />
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="inline-flex items-center gap-1 text-[#10b981]">
              <TrendingUp className="w-3 h-3" />
              <span className="font-mono">+12%</span>
            </span>
            <span className="text-foreground/50 font-mono">vs last month</span>
          </div>
        </div>

        {/* Total Findings */}
        <div className="glass-card p-6 rounded-xl">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-xs font-mono uppercase text-foreground/50 mb-2">Total Findings</p>
              <p className="text-3xl font-semibold">1,284</p>
            </div>
            <div className="p-3 rounded-lg bg-[#3b82f6]/10">
              <AlertCircle className="w-6 h-6 text-[#3b82f6]" />
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="inline-flex items-center gap-1 text-[#ef4444]">
              <TrendingDown className="w-3 h-3" />
              <span className="font-mono">-8%</span>
            </span>
            <span className="text-foreground/50 font-mono">vs last month</span>
          </div>
        </div>

        {/* Critical Issues */}
        <div className="glass-card p-6 rounded-xl">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-xs font-mono uppercase text-foreground/50 mb-2">Critical Issues</p>
              <p className="text-3xl font-semibold text-[#ef4444]">42</p>
            </div>
            <div className="p-3 rounded-lg bg-[#ef4444]/10">
              <AlertTriangle className="w-6 h-6 text-[#ef4444]" />
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="inline-flex items-center gap-1 text-[#10b981]">
              <TrendingDown className="w-3 h-3" />
              <span className="font-mono">-15%</span>
            </span>
            <span className="text-foreground/50 font-mono">vs last month</span>
          </div>
        </div>

        {/* Avg Resolution Time */}
        <div className="glass-card p-6 rounded-xl">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-xs font-mono uppercase text-foreground/50 mb-2">Avg Resolution Time</p>
              <p className="text-3xl font-semibold">4.2 days</p>
            </div>
            <div className="p-3 rounded-lg bg-[#10b981]/10">
              <Clock className="w-6 h-6 text-[#10b981]" />
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="inline-flex items-center gap-1 text-[#10b981]">
              <TrendingDown className="w-3 h-3" />
              <span className="font-mono">-1.3 days</span>
            </span>
            <span className="text-foreground/50 font-mono">vs last month</span>
          </div>
        </div>
      </div>

      {/* Inspection Trends Chart */}
      <div className="glass-card p-6 rounded-xl">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h3 className="text-xl font-sentient mb-1">Inspection Trends</h3>
            <p className="text-xs text-foreground/60 font-mono">Inspections completed over time</p>
          </div>

          {/* Chart Type Toggle */}
          <div className="flex bg-white/[0.03] rounded-lg p-1">
            <Button
              size="sm"
              variant="ghost"
              className="h-8 px-3 data-[active=true]:bg-[#eab308]/10 data-[active=true]:text-[#eab308]"
              data-active={chartType === "line"}
              onClick={() => setChartType("line")}
            >
              <LineChart className="w-4 h-4 mr-1.5" />
              Line
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="h-8 px-3 data-[active=true]:bg-[#eab308]/10 data-[active=true]:text-[#eab308]"
              data-active={chartType === "bar"}
              onClick={() => setChartType("bar")}
            >
              <BarChart3 className="w-4 h-4 mr-1.5" />
              Bar
            </Button>
          </div>
        </div>

        {/* Chart Container */}
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            {chartType === "line" ? (
              <AreaChart data={inspectionTrendsData}>
                <defs>
                  <linearGradient id="colorCompleted" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#eab308" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#eab308" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorInProgress" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorScheduled" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6b7280" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#6b7280" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis
                  dataKey="date"
                  stroke="rgba(255,255,255,0.5)"
                  style={{ fontSize: "12px", fontFamily: "monospace" }}
                />
                <YAxis stroke="rgba(255,255,255,0.5)" style={{ fontSize: "12px", fontFamily: "monospace" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(18, 18, 18, 0.95)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "8px",
                    fontFamily: "monospace",
                    fontSize: "12px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="completed"
                  stroke="#eab308"
                  fill="url(#colorCompleted)"
                  strokeWidth={2}
                />
                <Area
                  type="monotone"
                  dataKey="inProgress"
                  stroke="#3b82f6"
                  fill="url(#colorInProgress)"
                  strokeWidth={2}
                />
                <Area
                  type="monotone"
                  dataKey="scheduled"
                  stroke="#6b7280"
                  fill="url(#colorScheduled)"
                  strokeWidth={2}
                />
              </AreaChart>
            ) : (
              <RechartsBarChart data={inspectionTrendsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis
                  dataKey="date"
                  stroke="rgba(255,255,255,0.5)"
                  style={{ fontSize: "12px", fontFamily: "monospace" }}
                />
                <YAxis stroke="rgba(255,255,255,0.5)" style={{ fontSize: "12px", fontFamily: "monospace" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(18, 18, 18, 0.95)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "8px",
                    fontFamily: "monospace",
                    fontSize: "12px",
                  }}
                />
                <Bar dataKey="completed" fill="#eab308" />
                <Bar dataKey="inProgress" fill="#3b82f6" />
                <Bar dataKey="scheduled" fill="#6b7280" />
              </RechartsBarChart>
            )}
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-6 mt-4 pt-4 border-t border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#eab308]" />
            <span className="text-xs font-mono text-foreground/60">Completed</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#3b82f6]" />
            <span className="text-xs font-mono text-foreground/60">In Progress</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#6b7280]" />
            <span className="text-xs font-mono text-foreground/60">Scheduled</span>
          </div>
        </div>
      </div>

      {/* Two-Column Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Findings by Category (Pie/Doughnut Chart) */}
        <div className="glass-card p-6 rounded-xl">
          <div className="mb-6">
            <h3 className="text-xl font-sentient mb-1">Findings by Category</h3>
            <p className="text-xs text-foreground/60 font-mono">Distribution of issue categories</p>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(18, 18, 18, 0.95)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "8px",
                    fontFamily: "monospace",
                    fontSize: "12px",
                  }}
                />
              </RechartsPieChart>
            </ResponsiveContainer>
          </div>

          {/* Category Legend */}
          <div className="space-y-2 mt-4 pt-4 border-t border-white/10">
            {categoryData.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-sm font-mono">{item.name}</span>
                </div>
                <span className="text-sm font-mono text-foreground/60">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Severity Distribution (Bar Chart) */}
        <div className="glass-card p-6 rounded-xl">
          <div className="mb-6">
            <h3 className="text-xl font-sentient mb-1">Severity Distribution</h3>
            <p className="text-xs text-foreground/60 font-mono">Findings by severity level</p>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsBarChart data={severityData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis
                  type="number"
                  stroke="rgba(255,255,255,0.5)"
                  style={{ fontSize: "12px", fontFamily: "monospace" }}
                />
                <YAxis
                  type="category"
                  dataKey="severity"
                  stroke="rgba(255,255,255,0.5)"
                  style={{ fontSize: "12px", fontFamily: "monospace" }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(18, 18, 18, 0.95)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "8px",
                    fontFamily: "monospace",
                    fontSize: "12px",
                  }}
                />
                <Bar dataKey="count" radius={[0, 8, 8, 0]}>
                  {severityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </RechartsBarChart>
            </ResponsiveContainer>
          </div>

          {/* Severity Stats */}
          <div className="grid grid-cols-4 gap-3 mt-4 pt-4 border-t border-white/10">
            {severityData.map((item) => (
              <div key={item.severity} className="text-center">
                <p className="text-2xl font-semibold" style={{ color: item.color }}>
                  {item.count}
                </p>
                <p className="text-xs font-mono uppercase text-foreground/50 mt-1">{item.severity}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Anomaly Detection / Issue Spikes Card */}
      <div className="glass-card p-6 rounded-xl">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h3 className="text-xl font-sentient mb-1">Issue Spikes Detection</h3>
            <p className="text-xs text-foreground/60 font-mono">
              Unusual increases in findings by category (weekly basis)
            </p>
          </div>

          {/* AI Badge */}
          <div className="px-3 py-1 rounded-md bg-[#8b5cf6]/10 border border-[#8b5cf6]/20">
            <div className="flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#8b5cf6]" />
              <span className="text-xs font-mono uppercase text-[#8b5cf6]">AI Detected</span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {/* Spike Alert 1 */}
          <div className="p-4 rounded-lg bg-[#ef4444]/5 border border-[#ef4444]/20">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 p-2 rounded-lg bg-[#ef4444]/10">
                <TrendingUp className="w-5 h-5 text-[#ef4444]" />
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-medium text-sm mb-1">Safety Issues Spike</h4>
                    <p className="text-xs text-foreground/60 font-mono">Engineering Block • Week of Dec 9-15</p>
                  </div>
                  <span className="px-2 py-1 rounded-md bg-[#ef4444]/10 text-[#ef4444] font-mono text-xs font-semibold">
                    +45%
                  </span>
                </div>
                <p className="text-sm text-foreground/70 mb-3">
                  Safety findings increased by 45% compared to previous week average. 12 new issues reported, primarily
                  related to fire safety equipment.
                </p>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline" className="h-7 text-xs font-mono uppercase bg-transparent">
                    <Eye className="w-3 h-3 mr-1.5" />
                    View Details
                  </Button>
                  <Button size="sm" variant="outline" className="h-7 text-xs font-mono uppercase bg-transparent">
                    <Flag className="w-3 h-3 mr-1.5" />
                    Create Alert
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Spike Alert 2 */}
          <div className="p-4 rounded-lg bg-[#f59e0b]/5 border border-[#f59e0b]/20">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 p-2 rounded-lg bg-[#f59e0b]/10">
                <TrendingUp className="w-5 h-5 text-[#f59e0b]" />
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-medium text-sm mb-1">Maintenance Issues Increase</h4>
                    <p className="text-xs text-foreground/60 font-mono">Boys Hostel A • Week of Dec 9-15</p>
                  </div>
                  <span className="px-2 py-1 rounded-md bg-[#f59e0b]/10 text-[#f59e0b] font-mono text-xs font-semibold">
                    +28%
                  </span>
                </div>
                <p className="text-sm text-foreground/70 mb-3">
                  Maintenance-related findings increased by 28%. Primarily plumbing and HVAC issues.
                </p>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline" className="h-7 text-xs font-mono uppercase bg-transparent">
                    <Eye className="w-3 h-3 mr-1.5" />
                    View Details
                  </Button>
                  <Button size="sm" variant="outline" className="h-7 text-xs font-mono uppercase bg-transparent">
                    <Flag className="w-3 h-3 mr-1.5" />
                    Create Alert
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Top Sites & Inspector Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Sites by Findings */}
        <div className="glass-card p-6 rounded-xl">
          <div className="mb-6">
            <h3 className="text-xl font-sentient mb-1">Top Sites by Findings</h3>
            <p className="text-xs text-foreground/60 font-mono">Sites with most issues reported</p>
          </div>

          <div className="space-y-3">
            {[
              { site: "Boys Hostel A", findings: 156, change: "+12" },
              { site: "Engineering Block", findings: 142, change: "-8" },
              { site: "Girls Hostel B", findings: 128, change: "+5" },
              { site: "Library Building", findings: 94, change: "+2" },
              { site: "Sports Complex", findings: 87, change: "-3" },
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white/5 flex items-center justify-center font-mono text-sm text-foreground/60">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">{item.site}</span>
                    <span className="text-sm font-mono text-foreground/80">{item.findings}</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#eab308] rounded-full"
                      style={{ width: `${(item.findings / 156) * 100}%` }}
                    />
                  </div>
                </div>
                <span
                  className={`text-xs font-mono px-2 py-1 rounded ${
                    item.change.startsWith("+") ? "bg-[#ef4444]/10 text-[#ef4444]" : "bg-[#10b981]/10 text-[#10b981]"
                  }`}
                >
                  {item.change}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Inspector Performance */}
        <div className="glass-card p-6 rounded-xl">
          <div className="mb-6">
            <h3 className="text-xl font-sentient mb-1">Inspector Performance</h3>
            <p className="text-xs text-foreground/60 font-mono">Inspections completed per inspector</p>
          </div>

          <div className="space-y-4">
            {[
              { name: "John Doe", initials: "JD", inspections: 64, completion: 98 },
              { name: "Sarah Khan", initials: "SK", inspections: 58, completion: 95 },
              { name: "Ahmed Ali", initials: "AA", inspections: 52, completion: 100 },
              { name: "Maria Garcia", initials: "MG", inspections: 47, completion: 92 },
            ].map((inspector, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#eab308]/20 flex items-center justify-center">
                  <span className="text-sm font-mono text-[#eab308]">{inspector.initials}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">{inspector.name}</span>
                    <span className="text-sm font-mono text-foreground/80">{inspector.inspections} inspections</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-[#10b981] rounded-full" style={{ width: `${inspector.completion}%` }} />
                    </div>
                    <span className="text-xs font-mono text-foreground/60">{inspector.completion}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
