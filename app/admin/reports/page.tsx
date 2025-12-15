"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Search,
  Download,
  Eye,
  MoreVertical,
  Share2,
  RefreshCw,
  Trash,
  FileText,
  Link,
  Copy,
  Info,
  AlertCircle,
  Layers,
  ArrowUpDown,
  FileWarning,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

type ReportStatus = "completed" | "generating" | "failed" | "pending"

interface Report {
  id: string
  assignmentId: string
  site: string
  template: string
  generatedDate: string
  generatedTime: string
  status: ReportStatus
  fileSize: string | null
  pdfPath: string | null
  progress?: number
  error?: string
}

const sampleReports: Report[] = [
  {
    id: "RPT-001",
    assignmentId: "ASN-003",
    site: "Boys Hostel A",
    template: "Monthly Safety Inspection",
    generatedDate: "2024-12-14",
    generatedTime: "3:45 PM",
    status: "completed",
    fileSize: "2.4 MB",
    pdfPath: "/reports/rpt-001.pdf",
  },
  {
    id: "RPT-002",
    assignmentId: "ASN-008",
    site: "Engineering Block",
    template: "Electrical Systems Check",
    generatedDate: "2024-12-13",
    generatedTime: "11:20 AM",
    status: "completed",
    fileSize: "1.8 MB",
    pdfPath: "/reports/rpt-002.pdf",
  },
  {
    id: "RPT-003",
    assignmentId: "ASN-011",
    site: "Girls Hostel B",
    template: "Fire Safety Audit",
    generatedDate: "2024-12-13",
    generatedTime: "2:10 PM",
    status: "generating",
    progress: 65,
    fileSize: null,
    pdfPath: null,
  },
  {
    id: "RPT-004",
    assignmentId: "ASN-015",
    site: "Library Building",
    template: "HVAC Systems Inspection",
    generatedDate: "2024-12-12",
    generatedTime: "9:30 AM",
    status: "completed",
    fileSize: "1.2 MB",
    pdfPath: "/reports/rpt-004.pdf",
  },
  {
    id: "RPT-005",
    assignmentId: "ASN-007",
    site: "Administration Block",
    template: "Monthly Safety Inspection",
    generatedDate: "2024-12-12",
    generatedTime: "4:15 PM",
    status: "failed",
    error: "Template rendering error",
    fileSize: null,
    pdfPath: null,
  },
  {
    id: "RPT-006",
    assignmentId: "ASN-021",
    site: "Sports Complex",
    template: "Plumbing & Water Systems",
    generatedDate: "2024-12-11",
    generatedTime: "1:55 PM",
    status: "completed",
    fileSize: "3.1 MB",
    pdfPath: "/reports/rpt-006.pdf",
  },
]

export default function ReportsPage() {
  const [reports, setReports] = useState<Report[]>(sampleReports)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [dateFilter, setDateFilter] = useState("7days")

  const [generateDialogOpen, setGenerateDialogOpen] = useState(false)
  const [shareDialogOpen, setShareDialogOpen] = useState(false)
  const [batchDialogOpen, setBatchDialogOpen] = useState(false)
  const [previewDialogOpen, setPreviewDialogOpen] = useState(false)
  const [selectedReport, setSelectedReport] = useState<Report | null>(null)

  const [shareLink, setShareLink] = useState("")
  const [linkGenerated, setLinkGenerated] = useState(false)

  const getStatusColor = (status: ReportStatus) => {
    switch (status) {
      case "completed":
        return "bg-[#10b981]/10 text-[#10b981]"
      case "generating":
        return "bg-[#3b82f6]/10 text-[#3b82f6]"
      case "failed":
        return "bg-[#ef4444]/10 text-[#ef4444]"
      case "pending":
        return "bg-[#6b7280]/10 text-[#6b7280]"
    }
  }

  const getStatusDotColor = (status: ReportStatus) => {
    switch (status) {
      case "completed":
        return "bg-[#10b981]"
      case "generating":
        return "bg-[#3b82f6] animate-pulse"
      case "failed":
        return "bg-[#ef4444]"
      case "pending":
        return "bg-[#6b7280]"
    }
  }

  const handleGenerateShareLink = () => {
    setShareLink(`https://inspectpro.app/share/${selectedReport?.id.toLowerCase()}-a7f3e2d9`)
    setLinkGenerated(true)
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareLink)
  }

  const handleOpenShareDialog = (report: Report) => {
    setSelectedReport(report)
    setLinkGenerated(false)
    setShareLink("")
    setShareDialogOpen(true)
  }

  const handleOpenPreview = (report: Report) => {
    setSelectedReport(report)
    setPreviewDialogOpen(true)
  }

  const filteredReports = reports.filter((report) => {
    const matchesSearch =
      report.site.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.assignmentId.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || report.status === statusFilter

    return matchesSearch && matchesStatus
  })

  return (
    <div>
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-sentient mb-2">Reports</h1>
            <p className="text-foreground/60 font-mono text-sm">Generate and manage inspection PDF reports</p>
          </div>

          <Button
            onClick={() => setBatchDialogOpen(true)}
            className="bg-[#eab308] hover:bg-[#eab308]/90 text-black font-mono uppercase text-sm"
          >
            <Layers className="w-4 h-4 mr-2" />
            Batch Generate
          </Button>
        </div>
      </div>

      {/* Action Bar & Filters */}
      <div className="glass-card p-4 rounded-xl mb-6">
        <div className="flex items-center justify-between gap-4">
          {/* Search */}
          <div className="flex-1 max-w-md relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/50" />
            <Input
              placeholder="Search reports by site, assignment, or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white/[0.03] border-white/[0.3] h-10 font-mono"
            />
          </div>

          {/* Filters */}
          <div className="flex items-center gap-2">
            {/* Status Filter */}
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[140px] h-10 bg-white/[0.03] border-white/[0.3]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="generating">Generating</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>

            {/* Date Range Filter */}
            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger className="w-[140px] h-10 bg-white/[0.03] border-white/[0.3]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="7days">Last 7 Days</SelectItem>
                <SelectItem value="30days">Last 30 Days</SelectItem>
                <SelectItem value="all">All Time</SelectItem>
              </SelectContent>
            </Select>

            {/* Sort */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-10 font-mono bg-transparent">
                  <ArrowUpDown className="w-4 h-4 mr-2" />
                  Sort
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Newest First</DropdownMenuItem>
                <DropdownMenuItem>Oldest First</DropdownMenuItem>
                <DropdownMenuItem>Site Name A-Z</DropdownMenuItem>
                <DropdownMenuItem>Site Name Z-A</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Reports Table */}
      {filteredReports.length > 0 ? (
        <>
          <div className="glass-card rounded-xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-white/[0.03] border-b border-white/10">
                  <th className="px-6 py-4 text-left">
                    <span className="font-mono uppercase text-xs text-foreground/60">Report ID</span>
                  </th>
                  <th className="px-6 py-4 text-left">
                    <span className="font-mono uppercase text-xs text-foreground/60">Inspection</span>
                  </th>
                  <th className="px-6 py-4 text-left">
                    <span className="font-mono uppercase text-xs text-foreground/60">Generated</span>
                  </th>
                  <th className="px-6 py-4 text-left">
                    <span className="font-mono uppercase text-xs text-foreground/60">Status</span>
                  </th>
                  <th className="px-6 py-4 text-left">
                    <span className="font-mono uppercase text-xs text-foreground/60">Size</span>
                  </th>
                  <th className="px-6 py-4 text-right">
                    <span className="font-mono uppercase text-xs text-foreground/60">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {filteredReports.map((report) => (
                  <tr key={report.id} className="hover:bg-white/[0.03] transition-colors">
                    {/* Report ID */}
                    <td className="px-6 py-4">
                      <span className="font-mono text-sm text-foreground/80">{report.id}</span>
                    </td>

                    {/* Inspection Details */}
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-medium text-sm mb-1">{report.site}</div>
                        <div className="text-xs text-foreground/50 font-mono">
                          {report.template} • {report.assignmentId}
                        </div>
                      </div>
                    </td>

                    {/* Generated Date */}
                    <td className="px-6 py-4">
                      <div className="text-sm font-mono">
                        {new Date(report.generatedDate).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </div>
                      <div className="text-xs text-foreground/50 font-mono">{report.generatedTime}</div>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      {report.status === "generating" && report.progress ? (
                        <div className="space-y-2">
                          <span
                            className={`inline-flex items-center gap-2 px-3 py-1 rounded-md ${getStatusColor(report.status)} font-mono text-xs uppercase`}
                          >
                            <div className={`w-2 h-2 rounded-full ${getStatusDotColor(report.status)}`} />
                            Generating
                          </span>
                          <div className="w-32">
                            <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-[#3b82f6] rounded-full transition-all"
                                style={{ width: `${report.progress}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      ) : report.status === "failed" ? (
                        <span
                          className={`inline-flex items-center gap-2 px-3 py-1 rounded-md ${getStatusColor(report.status)} font-mono text-xs uppercase`}
                        >
                          <AlertCircle className="w-3 h-3" />
                          Failed
                        </span>
                      ) : (
                        <span
                          className={`inline-flex items-center gap-2 px-3 py-1 rounded-md ${getStatusColor(report.status)} font-mono text-xs uppercase`}
                        >
                          <div className={`w-2 h-2 rounded-full ${getStatusDotColor(report.status)}`} />
                          {report.status}
                        </span>
                      )}
                    </td>

                    {/* File Size */}
                    <td className="px-6 py-4">
                      {report.fileSize ? (
                        <span className="text-sm font-mono text-foreground/70">{report.fileSize}</span>
                      ) : (
                        <span className="text-sm font-mono text-foreground/30">—</span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        {report.status === "completed" && (
                          <>
                            {/* Preview Button */}
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleOpenPreview(report)}
                              className="h-8 font-mono uppercase text-xs"
                            >
                              <Eye className="w-3.5 h-3.5 mr-1.5" />
                              Preview
                            </Button>

                            {/* Download Button */}
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-8 font-mono uppercase text-xs bg-transparent"
                            >
                              <Download className="w-3.5 h-3.5 mr-1.5" />
                              Download
                            </Button>
                          </>
                        )}

                        {/* More Actions Dropdown */}
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            {report.status === "completed" && (
                              <DropdownMenuItem onClick={() => handleOpenShareDialog(report)}>
                                <Share2 className="w-4 h-4 mr-2" />
                                Generate Share Link
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem>
                              <RefreshCw className="w-4 h-4 mr-2" />
                              Regenerate Report
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-500">
                              <Trash className="w-4 h-4 mr-2" />
                              Delete Report
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="mt-6 flex items-center justify-between">
            <p className="text-sm text-foreground/60 font-mono">
              Showing {filteredReports.length} of {reports.length} reports
            </p>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="h-9 font-mono bg-transparent" disabled>
                <ChevronLeft className="w-4 h-4 mr-1" />
                Previous
              </Button>
              <Button variant="outline" size="sm" className="h-9 w-9 p-0 bg-[#eab308] text-black border-[#eab308]">
                1
              </Button>
              <Button variant="outline" size="sm" className="h-9 w-9 p-0 bg-transparent">
                2
              </Button>
              <Button variant="outline" size="sm" className="h-9 w-9 p-0 bg-transparent">
                3
              </Button>
              <Button variant="outline" size="sm" className="h-9 font-mono bg-transparent">
                Next
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        </>
      ) : (
        // Empty State
        <div className="glass-card rounded-xl p-12 text-center">
          <FileWarning className="w-16 h-16 text-foreground/30 mx-auto mb-4" />
          <h3 className="text-lg font-sentient mb-2">No Reports Found</h3>
          <p className="text-sm text-foreground/60 font-mono mb-6">
            {searchQuery || statusFilter !== "all"
              ? "Try adjusting your filters or search query"
              : "Generate your first inspection report to get started"}
          </p>
          <Button
            onClick={() => setGenerateDialogOpen(true)}
            className="bg-[#eab308] hover:bg-[#eab308]/90 text-black font-mono uppercase text-sm"
          >
            <FileText className="w-4 h-4 mr-2" />
            Generate Report
          </Button>
        </div>
      )}

      {/* Generate Report Dialog */}
      <Dialog open={generateDialogOpen} onOpenChange={setGenerateDialogOpen}>
        <DialogContent className="max-w-xl bg-[#121212]/95 backdrop-blur-md border-white/10">
          <DialogHeader>
            <DialogTitle className="text-xl font-sentient">Generate Inspection Report</DialogTitle>
            <DialogDescription className="font-mono text-sm text-foreground/60">
              Create a professional PDF report for this inspection
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Inspection Summary */}
            <div className="p-4 rounded-lg bg-white/[0.03] border border-white/10">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-mono uppercase text-foreground/50 mb-1">Site</p>
                  <p className="text-sm font-medium">Boys Hostel A</p>
                </div>
                <div>
                  <p className="text-xs font-mono uppercase text-foreground/50 mb-1">Template</p>
                  <p className="text-sm font-medium">Monthly Safety Inspection</p>
                </div>
                <div>
                  <p className="text-xs font-mono uppercase text-foreground/50 mb-1">Inspector</p>
                  <p className="text-sm">John Doe</p>
                </div>
                <div>
                  <p className="text-xs font-mono uppercase text-foreground/50 mb-1">Date</p>
                  <p className="text-sm font-mono">Dec 14, 2024</p>
                </div>
              </div>
            </div>

            {/* Report Options */}
            <div className="space-y-4">
              <div>
                <Label className="font-mono uppercase text-xs text-foreground/60">Report Title</Label>
                <Input
                  defaultValue="Boys Hostel A - Monthly Safety Inspection Report"
                  className="bg-white/[0.03] border-white/[0.3] h-12 font-mono mt-2"
                />
              </div>

              <div>
                <Label className="font-mono uppercase text-xs text-foreground/60 mb-2 block">Include Sections</Label>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 p-2">
                    <input type="checkbox" defaultChecked id="summary" className="rounded" />
                    <label htmlFor="summary" className="text-sm cursor-pointer">
                      Executive Summary
                    </label>
                  </div>
                  <div className="flex items-center gap-2 p-2">
                    <input type="checkbox" defaultChecked id="findings" className="rounded" />
                    <label htmlFor="findings" className="text-sm cursor-pointer">
                      Detailed Findings
                    </label>
                  </div>
                  <div className="flex items-center gap-2 p-2">
                    <input type="checkbox" defaultChecked id="photos" className="rounded" />
                    <label htmlFor="photos" className="text-sm cursor-pointer">
                      Annotated Photos
                    </label>
                  </div>
                  <div className="flex items-center gap-2 p-2">
                    <input type="checkbox" defaultChecked id="recommendations" className="rounded" />
                    <label htmlFor="recommendations" className="text-sm cursor-pointer">
                      Recommendations
                    </label>
                  </div>
                  <div className="flex items-center gap-2 p-2">
                    <input type="checkbox" id="appendix" className="rounded" />
                    <label htmlFor="appendix" className="text-sm cursor-pointer">
                      Technical Appendix
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <Label className="font-mono uppercase text-xs text-foreground/60">Branding</Label>
                <Select defaultValue="default">
                  <SelectTrigger className="bg-white/[0.03] border-white/[0.3] h-12 mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Default Template</SelectItem>
                    <SelectItem value="university">University Branded</SelectItem>
                    <SelectItem value="minimal">Minimal Design</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Generation Info */}
            <div className="p-3 rounded-lg bg-[#3b82f6]/5 border border-[#3b82f6]/20">
              <div className="flex items-start gap-2">
                <Info className="w-4 h-4 text-[#3b82f6] mt-0.5" />
                <p className="text-xs text-foreground/70">
                  Report generation may take 30-60 seconds. You'll be notified when it's ready.
                </p>
              </div>
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => setGenerateDialogOpen(false)}
              className="font-mono uppercase text-xs"
            >
              Cancel
            </Button>
            <Button className="bg-[#eab308] hover:bg-[#eab308]/90 text-black font-mono uppercase text-xs">
              <FileText className="w-4 h-4 mr-2" />
              Generate Report
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Share Link Dialog */}
      <Dialog open={shareDialogOpen} onOpenChange={setShareDialogOpen}>
        <DialogContent className="max-w-xl bg-[#121212]/95 backdrop-blur-md border-white/10">
          <DialogHeader>
            <DialogTitle className="text-xl font-sentient">Generate Share Link</DialogTitle>
            <DialogDescription className="font-mono text-sm text-foreground/60">
              Create a secure, time-limited link to share this report
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Report Info */}
            {selectedReport && (
              <div className="p-4 rounded-lg bg-white/[0.03] border border-white/10">
                <p className="text-sm font-medium mb-1">{selectedReport.site} - Safety Report</p>
                <p className="text-xs font-mono text-foreground/50">
                  {selectedReport.id} • {selectedReport.fileSize}
                </p>
              </div>
            )}

            {/* Link Expiration */}
            <div>
              <Label className="font-mono uppercase text-xs text-foreground/60">Link Expires In</Label>
              <Select defaultValue="7days">
                <SelectTrigger className="bg-white/[0.03] border-white/[0.3] h-12 mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1hour">1 Hour</SelectItem>
                  <SelectItem value="24hours">24 Hours</SelectItem>
                  <SelectItem value="7days">7 Days</SelectItem>
                  <SelectItem value="30days">30 Days</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Password Protection (Optional) */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <input type="checkbox" id="password" className="rounded" />
                <Label htmlFor="password" className="font-mono uppercase text-xs text-foreground/60 cursor-pointer">
                  Password Protect
                </Label>
              </div>
              <Input
                type="password"
                placeholder="Enter password (optional)"
                className="bg-white/[0.03] border-white/[0.3] h-12 font-mono"
                disabled
              />
            </div>

            {/* Generated Link (after creation) */}
            {linkGenerated && (
              <div className="p-4 rounded-lg bg-white/[0.03] border border-white/10">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex-1 overflow-hidden">
                    <p className="text-xs font-mono uppercase text-foreground/50 mb-2">Share Link</p>
                    <p className="text-sm font-mono text-foreground/80 truncate">{shareLink}</p>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleCopyLink}
                    className="flex-shrink-0 font-mono uppercase text-xs h-9 bg-transparent"
                  >
                    <Copy className="w-3.5 h-3.5 mr-1.5" />
                    Copy
                  </Button>
                </div>

                <div className="mt-3 pt-3 border-t border-white/5">
                  <p className="text-xs text-foreground/50 font-mono">Expires: Dec 21, 2024 at 3:45 PM</p>
                </div>
              </div>
            )}
          </div>

          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setShareDialogOpen(false)} className="font-mono uppercase text-xs">
              Close
            </Button>
            {!linkGenerated ? (
              <Button
                onClick={handleGenerateShareLink}
                className="bg-[#eab308] hover:bg-[#eab308]/90 text-black font-mono uppercase text-xs"
              >
                <Link className="w-4 h-4 mr-2" />
                Generate Link
              </Button>
            ) : (
              <Button
                onClick={handleCopyLink}
                className="bg-[#eab308] hover:bg-[#eab308]/90 text-black font-mono uppercase text-xs"
              >
                <Copy className="w-4 h-4 mr-2" />
                Copy Link
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Batch Generation Dialog */}
      <Dialog open={batchDialogOpen} onOpenChange={setBatchDialogOpen}>
        <DialogContent className="max-w-2xl bg-[#121212]/95 backdrop-blur-md border-white/10">
          <DialogHeader>
            <DialogTitle className="text-xl font-sentient">Batch Report Generation</DialogTitle>
            <DialogDescription className="font-mono text-sm text-foreground/60">
              Generate multiple inspection reports at once
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Selection Criteria */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="font-mono uppercase text-xs text-foreground/60">Date Range</Label>
                <Select defaultValue="last7days">
                  <SelectTrigger className="bg-white/[0.03] border-white/[0.3] h-12 mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="last7days">Last 7 Days</SelectItem>
                    <SelectItem value="last30days">Last 30 Days</SelectItem>
                    <SelectItem value="custom">Custom Range</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="font-mono uppercase text-xs text-foreground/60">Site Filter</Label>
                <Select defaultValue="all">
                  <SelectTrigger className="bg-white/[0.03] border-white/[0.3] h-12 mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Sites</SelectItem>
                    <SelectItem value="site-1">Boys Hostel A</SelectItem>
                    <SelectItem value="site-2">Girls Hostel B</SelectItem>
                    <SelectItem value="site-3">Engineering Block</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Selected Inspections Preview */}
            <div>
              <p className="text-xs font-mono uppercase text-foreground/50 mb-3">
                Inspections to Generate (12 selected)
              </p>
              <div className="max-h-48 overflow-y-auto space-y-2 p-3 rounded-lg bg-white/[0.02] border border-white/10">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex items-center justify-between p-2 rounded bg-white/[0.03]">
                    <div>
                      <p className="text-sm font-medium">Boys Hostel A</p>
                      <p className="text-xs text-foreground/50 font-mono">
                        ASN-00{i} • Dec 1{i}, 2024
                      </p>
                    </div>
                    <input type="checkbox" defaultChecked className="rounded" />
                  </div>
                ))}
              </div>
            </div>

            {/* Batch Options */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 p-2">
                <input type="checkbox" defaultChecked id="compress" className="rounded" />
                <label htmlFor="compress" className="text-sm cursor-pointer">
                  Compress as ZIP file
                </label>
              </div>
              <div className="flex items-center gap-2 p-2">
                <input type="checkbox" id="email" className="rounded" />
                <label htmlFor="email" className="text-sm cursor-pointer">
                  Email when complete
                </label>
              </div>
            </div>

            {/* Warning */}
            <div className="p-3 rounded-lg bg-[#f59e0b]/5 border border-[#f59e0b]/20">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-[#f59e0b] mt-0.5" />
                <p className="text-xs text-foreground/70">
                  Batch generation of 12 reports may take several minutes. The process will run in the background.
                </p>
              </div>
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setBatchDialogOpen(false)} className="font-mono uppercase text-xs">
              Cancel
            </Button>
            <Button className="bg-[#eab308] hover:bg-[#eab308]/90 text-black font-mono uppercase text-xs">
              <Layers className="w-4 h-4 mr-2" />
              Generate 12 Reports
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* PDF Preview Dialog */}
      <Dialog open={previewDialogOpen} onOpenChange={setPreviewDialogOpen}>
        <DialogContent className="max-w-5xl h-[90vh] bg-[#121212]/95 backdrop-blur-md border-white/10 p-0">
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <div>
                {selectedReport && (
                  <>
                    <h2 className="text-lg font-sentient mb-1">{selectedReport.site} - Report Preview</h2>
                    <p className="text-xs font-mono text-foreground/60">
                      {selectedReport.id} • Generated {selectedReport.generatedDate}
                    </p>
                  </>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Button size="sm" variant="outline" className="font-mono uppercase text-xs bg-transparent">
                  <Download className="w-3.5 h-3.5 mr-1.5" />
                  Download
                </Button>
                <Button size="sm" variant="ghost" onClick={() => setPreviewDialogOpen(false)} className="h-9 w-9 p-0">
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* PDF Preview */}
            <div className="flex-1 p-6 overflow-auto">
              <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-2xl p-12">
                <div className="space-y-6 text-black">
                  <div className="border-b-2 border-gray-300 pb-4">
                    <h1 className="text-3xl font-bold mb-2">Inspection Report</h1>
                    <p className="text-gray-600">Monthly Safety Inspection</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Site</p>
                      <p className="font-semibold">{selectedReport?.site}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Report ID</p>
                      <p className="font-semibold">{selectedReport?.id}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Inspector</p>
                      <p className="font-semibold">John Doe</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Date</p>
                      <p className="font-semibold">{selectedReport?.generatedDate}</p>
                    </div>
                  </div>

                  <div className="mt-8">
                    <h2 className="text-xl font-bold mb-3">Executive Summary</h2>
                    <p className="text-gray-700 leading-relaxed">
                      This comprehensive safety inspection was conducted at {selectedReport?.site} on{" "}
                      {selectedReport?.generatedDate}. The inspection covered all critical safety systems, structural
                      elements, and compliance requirements.
                    </p>
                  </div>

                  <div className="mt-6">
                    <h2 className="text-xl font-bold mb-3">Key Findings</h2>
                    <div className="space-y-2">
                      <div className="p-3 bg-green-50 border-l-4 border-green-500">
                        <p className="font-semibold text-green-900">Pass: Fire Safety Systems</p>
                        <p className="text-sm text-green-700">All fire extinguishers and alarms operational</p>
                      </div>
                      <div className="p-3 bg-yellow-50 border-l-4 border-yellow-500">
                        <p className="font-semibold text-yellow-900">Warning: Electrical Panel</p>
                        <p className="text-sm text-yellow-700">Minor labeling issues identified</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
