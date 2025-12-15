"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
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
  Eye,
  Check,
  MoreVertical,
  ImageIcon,
  Sparkles,
  Download,
  Pencil,
  ChevronLeft,
  ChevronRight,
  Flag,
  Trash,
  Merge,
} from "lucide-react"

// Sample data
const submissions = [
  {
    id: "ASN-003",
    site: "Boys Hostel A",
    template: "Monthly Safety Inspection",
    inspector: { name: "John Doe", initials: "JD" },
    submittedDate: "2024-12-14",
    findingsCount: 8,
    criticalCount: 2,
    status: "pending",
  },
  {
    id: "ASN-008",
    site: "Engineering Block",
    template: "Electrical Systems Check",
    inspector: { name: "Sarah Khan", initials: "SK" },
    submittedDate: "2024-12-13",
    findingsCount: 5,
    criticalCount: 0,
    status: "pending",
  },
  {
    id: "ASN-011",
    site: "Girls Hostel B",
    template: "Fire Safety Audit",
    inspector: { name: "Ahmed Ali", initials: "AA" },
    submittedDate: "2024-12-12",
    findingsCount: 12,
    criticalCount: 3,
    status: "pending",
  },
  {
    id: "ASN-015",
    site: "Library Building",
    template: "HVAC Systems Inspection",
    inspector: { name: "Maria Garcia", initials: "MG" },
    submittedDate: "2024-12-11",
    findingsCount: 3,
    criticalCount: 0,
    status: "reviewed",
  },
]

const findings = [
  {
    id: "FIND-001",
    title: "Fire extinguisher pressure low",
    checklistItem: 12,
    notes: "Pressure gauge showing below acceptable range. Needs immediate refill.",
    photos: 2,
    category: "safety",
    severity: "high",
    mlSuggestion: { category: "safety", severity: "high" },
    timestamp: "2024-12-14T14:45:00",
  },
  {
    id: "FIND-002",
    title: "Broken window latch in Room 204",
    checklistItem: 8,
    notes: "Window cannot be properly secured. Security concern.",
    photos: 3,
    category: "maintenance",
    severity: "medium",
    mlSuggestion: null,
    timestamp: "2024-12-14T14:50:00",
  },
  {
    id: "FIND-003",
    title: "Emergency exit sign not illuminated",
    checklistItem: 15,
    notes: "Exit sign on 2nd floor stairwell completely dark. Bulb replacement needed urgently.",
    photos: 1,
    category: "safety",
    severity: "critical",
    mlSuggestion: { category: "safety", severity: "critical" },
    timestamp: "2024-12-14T15:00:00",
  },
  {
    id: "FIND-004",
    title: "Water leak under sink - Room 312",
    checklistItem: 22,
    notes: "Small but consistent drip. Causing cabinet damage.",
    photos: 2,
    category: "plumbing",
    severity: "medium",
    mlSuggestion: { category: "plumbing", severity: "medium" },
    timestamp: "2024-12-14T15:15:00",
  },
  {
    id: "FIND-005",
    title: "Graffiti on exterior wall",
    checklistItem: 5,
    notes: "Recent graffiti near main entrance. Needs cleaning.",
    photos: 1,
    category: "cleanliness",
    severity: "low",
    mlSuggestion: null,
    timestamp: "2024-12-14T15:20:00",
  },
]

export default function ReviewPage() {
  const [selectedSubmission, setSelectedSubmission] = useState(submissions[0])
  const [statusFilter, setStatusFilter] = useState("pending")
  const [photoViewerOpen, setPhotoViewerOpen] = useState(false)
  const [followUpOpen, setFollowUpOpen] = useState(false)
  const [mergeOpen, setMergeOpen] = useState(false)
  const [selectedFinding, setSelectedFinding] = useState<string | null>(null)

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-sentient mb-2">Review Findings</h1>
        <p className="text-foreground/60 font-mono text-sm">Review and finalize submitted inspection findings</p>
      </div>

      {/* Two-Panel Layout */}
      <div className="grid grid-cols-[35%_65%] gap-6">
        {/* LEFT PANEL - Submissions List */}
        <div className="space-y-4">
          {/* Filter Bar */}
          <div className="glass-card p-4 rounded-xl">
            <div className="flex items-center gap-3">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/50" />
                <Input
                  placeholder="Search submissions..."
                  className="pl-10 bg-white/[0.03] border-white/[0.3] h-10 font-mono"
                />
              </div>

              {/* Status Filter */}
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[140px] h-10 bg-white/[0.03] border-white/[0.3]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="pending">Pending Review</SelectItem>
                  <SelectItem value="reviewed">Reviewed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Submissions List */}
          <div className="glass-card rounded-xl overflow-hidden">
            <div className="divide-y divide-white/10">
              {submissions
                .filter((s) => statusFilter === "all" || s.status === statusFilter)
                .map((submission) => (
                  <div
                    key={submission.id}
                    data-selected={selectedSubmission.id === submission.id}
                    onClick={() => setSelectedSubmission(submission)}
                    className="p-4 hover:bg-white/[0.03] cursor-pointer transition-colors data-[selected=true]:bg-[#eab308]/5 data-[selected=true]:border-l-2 data-[selected=true]:border-[#eab308]"
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h4 className="font-medium text-sm mb-1">{submission.site}</h4>
                        <p className="text-xs font-mono text-foreground/50">{submission.template}</p>
                      </div>

                      {/* Findings Count Badge */}
                      <span className="px-2 py-1 rounded-md bg-[#ef4444]/10 text-[#ef4444] font-mono text-xs font-semibold">
                        {submission.findingsCount} issues
                      </span>
                    </div>

                    {/* Inspector & Date */}
                    <div className="flex items-center justify-between text-xs mt-3">
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full bg-[#eab308]/20 flex items-center justify-center">
                          <span className="text-[10px] font-mono text-[#eab308]">{submission.inspector.initials}</span>
                        </div>
                        <span className="text-foreground/60 font-mono">{submission.inspector.name}</span>
                      </div>

                      <span className="text-foreground/50 font-mono">
                        {new Date(submission.submittedDate).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </div>

                    {/* Status Indicator */}
                    <div className="mt-3 pt-3 border-t border-white/5">
                      <span className="inline-flex items-center gap-2 text-xs">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            submission.status === "pending" ? "bg-[#f59e0b]" : "bg-[#10b981]"
                          }`}
                        />
                        <span className="font-mono text-foreground/60">
                          {submission.status === "pending" ? "Pending Review" : "Reviewed"}
                        </span>
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* RIGHT PANEL - Findings Review Interface */}
        <div className="space-y-6">
          {/* Inspection Header */}
          <div className="glass-card p-6 rounded-xl">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-2xl font-sentient mb-2">{selectedSubmission.site}</h2>
                <p className="text-sm text-foreground/60 font-mono">
                  {selectedSubmission.template} • {selectedSubmission.id}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Button variant="outline" className="font-mono uppercase text-xs h-9 bg-transparent">
                  <Eye className="w-4 h-4 mr-2" />
                  View Full Report
                </Button>
                <Button className="bg-[#eab308] hover:bg-[#eab308]/90 text-black font-mono uppercase text-xs h-9">
                  <Check className="w-4 h-4 mr-2" />
                  Mark as Reviewed
                </Button>
              </div>
            </div>

            {/* Summary Stats */}
            <div className="grid grid-cols-4 gap-4 pt-4 border-t border-white/10">
              <div>
                <p className="text-xs font-mono uppercase text-foreground/50 mb-1">Total Findings</p>
                <p className="text-2xl font-semibold">{selectedSubmission.findingsCount}</p>
              </div>
              <div>
                <p className="text-xs font-mono uppercase text-foreground/50 mb-1">Critical</p>
                <p className="text-2xl font-semibold text-[#ef4444]">{selectedSubmission.criticalCount}</p>
              </div>
              <div>
                <p className="text-xs font-mono uppercase text-foreground/50 mb-1">High</p>
                <p className="text-2xl font-semibold text-[#f59e0b]">3</p>
              </div>
              <div>
                <p className="text-xs font-mono uppercase text-foreground/50 mb-1">Medium/Low</p>
                <p className="text-2xl font-semibold text-[#10b981]">3</p>
              </div>
            </div>
          </div>

          {/* Findings List */}
          <div className="space-y-4">
            {findings.map((finding, index) => (
              <div key={finding.id} className="glass-card p-6 rounded-xl hover:border-white/20 transition-colors">
                {/* Finding Header */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white/5 flex items-center justify-center font-mono text-sm text-foreground/60">
                    {index + 1}
                  </div>

                  <div className="flex-1">
                    <h3 className="font-medium text-base mb-2">{finding.title}</h3>

                    {/* Metadata */}
                    <div className="flex items-center gap-4 text-xs text-foreground/60 font-mono">
                      <span>Checklist Item #{finding.checklistItem}</span>
                      <span>•</span>
                      <span>Reported by {selectedSubmission.inspector.name}</span>
                      <span>•</span>
                      <span>
                        {new Date(finding.timestamp).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}{" "}
                        at{" "}
                        {new Date(finding.timestamp).toLocaleTimeString("en-US", {
                          hour: "numeric",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </div>

                  {/* More Actions */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => {
                          setSelectedFinding(finding.id)
                          setMergeOpen(true)
                        }}
                      >
                        <Merge className="w-4 h-4 mr-2" />
                        Merge with Another Finding
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          setSelectedFinding(finding.id)
                          setFollowUpOpen(true)
                        }}
                      >
                        <Flag className="w-4 h-4 mr-2" />
                        Create Follow-up Action
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-500">
                        <Trash className="w-4 h-4 mr-2" />
                        Remove Finding
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {/* Inspector Notes */}
                {finding.notes && (
                  <div className="mb-4 p-3 rounded-lg bg-white/[0.02] border border-white/5">
                    <p className="text-xs font-mono uppercase text-foreground/50 mb-2">Inspector Notes</p>
                    <p className="text-sm text-foreground/80">{finding.notes}</p>
                  </div>
                )}

                {/* Photos */}
                {finding.photos > 0 && (
                  <div className="mb-4">
                    <p className="text-xs font-mono uppercase text-foreground/50 mb-3">Attached Photos</p>
                    <div className="grid grid-cols-4 gap-2">
                      {Array.from({ length: finding.photos }).map((_, idx) => (
                        <div
                          key={idx}
                          onClick={() => setPhotoViewerOpen(true)}
                          className="aspect-square rounded-lg bg-white/5 border border-white/10 overflow-hidden cursor-pointer hover:border-[#eab308] transition-colors group"
                        >
                          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-white/5 to-white/0">
                            <ImageIcon className="w-8 h-8 text-foreground/30 group-hover:text-[#eab308] transition-colors" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Editable Fields */}
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
                  {/* Category */}
                  <div>
                    <Label className="font-mono uppercase text-xs text-foreground/60 mb-2">Category</Label>
                    <Select defaultValue={finding.category}>
                      <SelectTrigger className="bg-white/[0.03] border-white/[0.3] h-10 mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="safety">Safety</SelectItem>
                        <SelectItem value="maintenance">Maintenance</SelectItem>
                        <SelectItem value="cleanliness">Cleanliness</SelectItem>
                        <SelectItem value="electrical">Electrical</SelectItem>
                        <SelectItem value="plumbing">Plumbing</SelectItem>
                        <SelectItem value="structural">Structural</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Severity */}
                  <div>
                    <Label className="font-mono uppercase text-xs text-foreground/60 mb-2">Severity</Label>
                    <div className="flex gap-2 mt-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className={
                          finding.severity === "low" ? "bg-[#10b981]/10 text-[#10b981] border-[#10b981]/30" : ""
                        }
                      >
                        Low
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className={
                          finding.severity === "medium" ? "bg-[#f59e0b]/10 text-[#f59e0b] border-[#f59e0b]/30" : ""
                        }
                      >
                        Medium
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className={
                          finding.severity === "high" ? "bg-[#ef4444]/10 text-[#ef4444] border-[#ef4444]/30" : ""
                        }
                      >
                        High
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className={
                          finding.severity === "critical" ? "bg-[#dc2626]/10 text-[#dc2626] border-[#dc2626]/30" : ""
                        }
                      >
                        Critical
                      </Button>
                    </div>
                  </div>
                </div>

                {/* ML Suggestion */}
                {finding.mlSuggestion && (
                  <div className="mt-4 p-3 rounded-lg bg-[#3b82f6]/5 border border-[#3b82f6]/20">
                    <div className="flex items-start gap-2">
                      <Sparkles className="w-4 h-4 text-[#3b82f6] mt-0.5" />
                      <div className="flex-1">
                        <p className="text-xs font-mono uppercase text-[#3b82f6] mb-1">AI Suggestion</p>
                        <p className="text-sm text-foreground/80">
                          Suggested category: <strong className="capitalize">{finding.mlSuggestion.category}</strong> •
                          Severity: <strong className="capitalize">{finding.mlSuggestion.severity}</strong>
                        </p>
                      </div>
                      <Button size="sm" variant="outline" className="h-7 text-xs bg-transparent">
                        Apply
                      </Button>
                    </div>
                  </div>
                )}

                {/* Admin Notes */}
                <div className="mt-4">
                  <Label className="font-mono uppercase text-xs text-foreground/60 mb-2">Review Notes</Label>
                  <Textarea
                    placeholder="Add your review notes or action items..."
                    rows={2}
                    className="bg-white/[0.03] border-white/[0.3] font-mono text-sm mt-2"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Photo Viewer Dialog */}
      <Dialog open={photoViewerOpen} onOpenChange={setPhotoViewerOpen}>
        <DialogContent className="max-w-4xl bg-[#0a0a0a] border-white/10">
          <DialogHeader>
            <DialogTitle className="font-sentient">Finding Photo</DialogTitle>
          </DialogHeader>

          <div className="relative aspect-video bg-white/5 rounded-lg overflow-hidden">
            {/* Photo placeholder */}
            <div className="w-full h-full flex items-center justify-center">
              <ImageIcon className="w-16 h-16 text-foreground/30" />
            </div>

            {/* Annotation overlays */}
            <div className="absolute top-4 left-4 px-3 py-1 bg-[#ef4444] rounded text-xs font-mono">Issue Location</div>
          </div>

          <div className="flex items-center justify-between pt-4">
            <div className="flex gap-2">
              <Button size="sm" variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
              <Button size="sm" variant="outline">
                <Pencil className="w-4 h-4 mr-2" />
                Add Annotation
              </Button>
            </div>

            <div className="flex gap-2">
              <Button size="sm" variant="outline">
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <span className="text-sm font-mono text-foreground/60 px-3 py-1">1 / 3</span>
              <Button size="sm" variant="outline">
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Create Follow-up Action Dialog */}
      <Dialog open={followUpOpen} onOpenChange={setFollowUpOpen}>
        <DialogContent className="max-w-xl bg-[#121212]/95 backdrop-blur-md border-white/10">
          <DialogHeader>
            <DialogTitle className="text-xl font-sentient">Create Follow-up Action</DialogTitle>
            <DialogDescription className="font-mono text-sm text-foreground/60">
              Create an action item for this finding
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div>
              <Label className="font-mono uppercase text-xs text-foreground/60">Finding</Label>
              <p className="text-sm mt-2 p-3 rounded-lg bg-white/[0.03]">Fire extinguisher pressure low</p>
            </div>

            <div>
              <Label className="font-mono uppercase text-xs text-foreground/60">Action Title*</Label>
              <Input
                placeholder="e.g., Refill fire extinguisher"
                className="bg-white/[0.03] border-white/[0.3] h-12 font-mono mt-2"
              />
            </div>

            <div>
              <Label className="font-mono uppercase text-xs text-foreground/60">Assign To</Label>
              <Select>
                <SelectTrigger className="bg-white/[0.03] border-white/[0.3] h-12 mt-2">
                  <SelectValue placeholder="Select assignee" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="user-1">Maintenance Team</SelectItem>
                  <SelectItem value="user-2">Safety Officer</SelectItem>
                  <SelectItem value="user-3">Building Manager</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="font-mono uppercase text-xs text-foreground/60">Priority</Label>
              <Select defaultValue="high">
                <SelectTrigger className="bg-white/[0.03] border-white/[0.3] h-12 mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="font-mono uppercase text-xs text-foreground/60">Due Date</Label>
              <Input type="date" className="bg-white/[0.03] border-white/[0.3] h-12 font-mono mt-2" />
            </div>

            <div>
              <Label className="font-mono uppercase text-xs text-foreground/60">Notes</Label>
              <Textarea
                placeholder="Additional details or instructions..."
                rows={3}
                className="bg-white/[0.03] border-white/[0.3] font-mono mt-2"
              />
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              className="font-mono uppercase text-xs bg-transparent"
              onClick={() => setFollowUpOpen(false)}
            >
              Cancel
            </Button>
            <Button className="bg-[#eab308] hover:bg-[#eab308]/90 text-black font-mono uppercase text-xs">
              Create Action
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Merge Findings Dialog */}
      <Dialog open={mergeOpen} onOpenChange={setMergeOpen}>
        <DialogContent className="max-w-2xl bg-[#121212]/95 backdrop-blur-md border-white/10">
          <DialogHeader>
            <DialogTitle className="text-xl font-sentient">Merge Findings</DialogTitle>
            <DialogDescription className="font-mono text-sm text-foreground/60">
              Combine duplicate or related findings
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div>
              <Label className="font-mono uppercase text-xs text-foreground/60 mb-3">Source Finding</Label>
              <div className="p-4 rounded-lg bg-white/[0.03] border border-white/10 mt-2">
                <h4 className="font-medium text-sm mb-1">Fire extinguisher pressure low</h4>
                <p className="text-xs text-foreground/60 font-mono">Checklist Item #12 • High Severity</p>
              </div>
            </div>

            <div>
              <Label className="font-mono uppercase text-xs text-foreground/60">Merge With</Label>
              <Select>
                <SelectTrigger className="bg-white/[0.03] border-white/[0.3] h-12 mt-2">
                  <SelectValue placeholder="Select finding to merge" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="find-2">Broken window latch in Room 204</SelectItem>
                  <SelectItem value="find-3">Emergency exit sign not illuminated</SelectItem>
                  <SelectItem value="find-4">Water leak under sink - Room 312</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="font-mono uppercase text-xs text-foreground/60">Merge Notes</Label>
              <Textarea
                placeholder="Explain why these findings should be merged..."
                rows={3}
                className="bg-white/[0.03] border-white/[0.3] font-mono mt-2"
              />
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              className="font-mono uppercase text-xs bg-transparent"
              onClick={() => setMergeOpen(false)}
            >
              Cancel
            </Button>
            <Button className="bg-[#eab308] hover:bg-[#eab308]/90 text-black font-mono uppercase text-xs">
              Merge Findings
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
