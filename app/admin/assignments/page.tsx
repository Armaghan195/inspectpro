"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Edit,
  Eye,
  Filter,
  List,
  MoreVertical,
  Plus,
  Trash,
  UserCheck,
} from "lucide-react"

type Assignment = {
  id: string
  site: { name: string; address: string }
  template: string
  inspector: { name: string; initials: string }
  scheduledDate: string
  scheduledTime: string
  status: "scheduled" | "in-progress" | "submitted" | "reviewed" | "closed"
  dueDate: string
}

const assignments: Assignment[] = [
  {
    id: "ASN-001",
    site: { name: "Boys Hostel A", address: "Sector E-8" },
    template: "Monthly Safety Inspection",
    inspector: { name: "John Doe", initials: "JD" },
    scheduledDate: "2024-12-15",
    scheduledTime: "10:00 AM",
    status: "in-progress",
    dueDate: "2024-12-15",
  },
  {
    id: "ASN-002",
    site: { name: "Engineering Block", address: "Main Campus" },
    template: "Electrical Systems Check",
    inspector: { name: "Sarah Khan", initials: "SK" },
    scheduledDate: "2024-12-16",
    scheduledTime: "09:00 AM",
    status: "scheduled",
    dueDate: "2024-12-16",
  },
  {
    id: "ASN-003",
    site: { name: "Girls Hostel B", address: "Sector E-9" },
    template: "Fire Safety Audit",
    inspector: { name: "Ahmed Ali", initials: "AA" },
    scheduledDate: "2024-12-14",
    scheduledTime: "02:00 PM",
    status: "submitted",
    dueDate: "2024-12-14",
  },
  {
    id: "ASN-004",
    site: { name: "Library Building", address: "Main Campus" },
    template: "HVAC Systems Inspection",
    inspector: { name: "Maria Garcia", initials: "MG" },
    scheduledDate: "2024-12-17",
    scheduledTime: "11:00 AM",
    status: "scheduled",
    dueDate: "2024-12-17",
  },
  {
    id: "ASN-005",
    site: { name: "Sports Complex", address: "Shangrila Road" },
    template: "Plumbing & Water Systems",
    inspector: { name: "John Doe", initials: "JD" },
    scheduledDate: "2024-12-13",
    scheduledTime: "03:00 PM",
    status: "reviewed",
    dueDate: "2024-12-13",
  },
  {
    id: "ASN-006",
    site: { name: "Cafeteria Wing A", address: "Sector E-8" },
    template: "Room Condition Assessment",
    inspector: { name: "Sarah Khan", initials: "SK" },
    scheduledDate: "2024-12-18",
    scheduledTime: "10:30 AM",
    status: "scheduled",
    dueDate: "2024-12-18",
  },
  {
    id: "ASN-007",
    site: { name: "Administration Block", address: "Main Campus" },
    template: "Monthly Safety Inspection",
    inspector: { name: "Ahmed Ali", initials: "AA" },
    scheduledDate: "2024-12-12",
    scheduledTime: "01:00 PM",
    status: "closed",
    dueDate: "2024-12-12",
  },
  {
    id: "ASN-008",
    site: { name: "Boys Hostel A", address: "Sector E-8" },
    template: "Electrical Systems Check",
    inspector: { name: "Maria Garcia", initials: "MG" },
    scheduledDate: "2024-12-19",
    scheduledTime: "09:30 AM",
    status: "scheduled",
    dueDate: "2024-12-19",
  },
]

const statusColors = {
  scheduled: { bg: "bg-[#6b7280]/10", text: "text-[#6b7280]", dot: "bg-[#6b7280]" },
  "in-progress": { bg: "bg-[#3b82f6]/10", text: "text-[#3b82f6]", dot: "bg-[#3b82f6]" },
  submitted: { bg: "bg-[#f59e0b]/10", text: "text-[#f59e0b]", dot: "bg-[#f59e0b]" },
  reviewed: { bg: "bg-[#8b5cf6]/10", text: "text-[#8b5cf6]", dot: "bg-[#8b5cf6]" },
  closed: { bg: "bg-[#10b981]/10", text: "text-[#10b981]", dot: "bg-[#10b981]" },
}

const statusLabels = {
  scheduled: "Scheduled",
  "in-progress": "In Progress",
  submitted: "Submitted",
  reviewed: "Reviewed",
  closed: "Closed",
}

export default function AssignmentsPage() {
  const [viewMode, setViewMode] = useState<"calendar" | "list">("calendar")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [createDialogOpen, setCreateDialogOpen] = useState(false)

  const filteredAssignments =
    statusFilter === "all" ? assignments : assignments.filter((a) => a.status === statusFilter)

  // Group assignments by date for calendar view
  const assignmentsByDate = filteredAssignments.reduce(
    (acc, assignment) => {
      const date = assignment.scheduledDate
      if (!acc[date]) {
        acc[date] = []
      }
      acc[date].push(assignment)
      return acc
    },
    {} as Record<string, Assignment[]>,
  )

  // Generate week days (Dec 12-18, 2024)
  const weekDays = [
    { day: "Mon", date: 12, fullDate: "2024-12-12" },
    { day: "Tue", date: 13, fullDate: "2024-12-13" },
    { day: "Wed", date: 14, fullDate: "2024-12-14" },
    { day: "Thu", date: 15, fullDate: "2024-12-15" },
    { day: "Fri", date: 16, fullDate: "2024-12-16" },
    { day: "Sat", date: 17, fullDate: "2024-12-17" },
    { day: "Sun", date: 18, fullDate: "2024-12-18" },
  ]

  return (
    <div className="min-h-screen bg-[#0a0a0a] p-6">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="mb-2 font-sentient text-3xl">Assignments</h1>
        <p className="font-mono text-sm text-foreground/60">Schedule and manage inspection assignments</p>
      </div>

      {/* Action Bar */}
      <Card className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-xl border-white/10 bg-white/5 p-4 backdrop-blur-md">
        {/* Left - Date Navigation */}
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-9 font-mono bg-transparent">
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <Button variant="outline" size="sm" className="h-9 font-mono px-4 bg-transparent">
            Today
          </Button>

          <Button variant="outline" size="sm" className="h-9 font-mono bg-transparent">
            <ChevronRight className="h-4 w-4" />
          </Button>

          <span className="ml-4 font-mono text-sm text-foreground/80">December 2024</span>
        </div>

        {/* Middle - Status Filter */}
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-foreground/50" />
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="h-9 w-[160px] border-white/[0.3] bg-white/[0.03]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="scheduled">Scheduled</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="submitted">Submitted</SelectItem>
              <SelectItem value="reviewed">Reviewed</SelectItem>
              <SelectItem value="closed">Closed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Right - View Toggle + Create Button */}
        <div className="flex items-center gap-2">
          {/* View Toggle */}
          <div className="flex rounded-lg bg-white/[0.03] p-1">
            <Button
              size="sm"
              variant="ghost"
              className="h-8 px-3 data-[active=true]:bg-[#eab308]/10 data-[active=true]:text-[#eab308]"
              data-active={viewMode === "calendar"}
              onClick={() => setViewMode("calendar")}
            >
              <CalendarDays className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="h-8 px-3 data-[active=true]:bg-[#eab308]/10 data-[active=true]:text-[#eab308]"
              data-active={viewMode === "list"}
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>

          {/* Create Assignment Button */}
          <Button
            className="h-9 bg-[#eab308] font-mono text-sm uppercase text-black hover:bg-[#eab308]/90"
            onClick={() => setCreateDialogOpen(true)}
          >
            <Plus className="mr-2 h-4 w-4" />
            New Assignment
          </Button>
        </div>
      </Card>

      {/* Calendar View */}
      {viewMode === "calendar" && (
        <Card className="rounded-xl border-white/10 bg-white/5 p-6 backdrop-blur-md">
          {/* Calendar Header - Days of Week */}
          <div className="mb-4 grid grid-cols-7 gap-4">
            {weekDays.map((day) => (
              <div key={day.day} className="text-center">
                <div className="mb-2 font-mono text-xs uppercase text-foreground/60">{day.day}</div>
                <div className="text-lg font-semibold">{day.date}</div>
              </div>
            ))}
          </div>

          {/* Calendar Grid - Assignment Cards */}
          <div className="grid grid-cols-7 gap-4">
            {weekDays.map((day) => (
              <div
                key={day.fullDate}
                className="min-h-[400px] space-y-2 rounded-lg border border-white/5 bg-white/[0.02] p-3"
              >
                {assignmentsByDate[day.fullDate]?.map((assignment) => (
                  <div
                    key={assignment.id}
                    className="group cursor-pointer rounded-lg border border-white/10 bg-white/[0.05] p-3 transition-all hover:border-[#eab308]/30"
                  >
                    {/* Status Indicator Dot */}
                    <div className="mb-2 flex items-start gap-2">
                      <div className={`mt-1.5 h-2 w-2 rounded-full ${statusColors[assignment.status].dot}`} />
                      <div className="flex-1">
                        <p className="line-clamp-1 text-sm font-medium transition-colors group-hover:text-[#eab308]">
                          {assignment.site.name}
                        </p>
                        <p className="mt-0.5 font-mono text-xs text-foreground/50">{assignment.template}</p>
                      </div>
                    </div>

                    {/* Inspector */}
                    <div className="mt-2 flex items-center gap-2">
                      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#eab308]/20">
                        <span className="font-mono text-[10px] text-[#eab308]">{assignment.inspector.initials}</span>
                      </div>
                      <span className="font-mono text-xs text-foreground/60">{assignment.inspector.name}</span>
                    </div>

                    {/* Status Badge */}
                    <div className="mt-2 border-t border-white/5 pt-2">
                      <span
                        className={`inline-flex items-center rounded px-2 py-0.5 font-mono text-[10px] uppercase ${statusColors[assignment.status].bg} ${statusColors[assignment.status].text}`}
                      >
                        {statusLabels[assignment.status]}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* List View */}
      {viewMode === "list" && (
        <Card className="overflow-hidden rounded-xl border-white/10 bg-white/5 backdrop-blur-md">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-white/10 bg-white/[0.02]">
                <tr>
                  <th className="px-6 py-4 text-left font-mono text-xs uppercase tracking-wider text-foreground/60">
                    Assignment ID
                  </th>
                  <th className="px-6 py-4 text-left font-mono text-xs uppercase tracking-wider text-foreground/60">
                    Site
                  </th>
                  <th className="px-6 py-4 text-left font-mono text-xs uppercase tracking-wider text-foreground/60">
                    Template
                  </th>
                  <th className="px-6 py-4 text-left font-mono text-xs uppercase tracking-wider text-foreground/60">
                    Inspector
                  </th>
                  <th className="px-6 py-4 text-left font-mono text-xs uppercase tracking-wider text-foreground/60">
                    Scheduled Date
                  </th>
                  <th className="px-6 py-4 text-left font-mono text-xs uppercase tracking-wider text-foreground/60">
                    Status
                  </th>
                  <th className="px-6 py-4 text-right font-mono text-xs uppercase tracking-wider text-foreground/60">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredAssignments.map((assignment) => (
                  <tr key={assignment.id} className="border-b border-white/10 transition-colors hover:bg-white/[0.03]">
                    <td className="px-6 py-4">
                      <span className="font-mono text-sm text-foreground/80">{assignment.id}</span>
                    </td>

                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium">{assignment.site.name}</div>
                        <div className="font-mono text-xs text-foreground/50">{assignment.site.address}</div>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="font-mono text-sm text-foreground/70">{assignment.template}</div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#eab308]/20">
                          <span className="font-mono text-xs text-[#eab308]">{assignment.inspector.initials}</span>
                        </div>
                        <span className="text-sm">{assignment.inspector.name}</span>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="font-mono text-sm">
                        {new Date(assignment.scheduledDate).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </div>
                      <div className="font-mono text-xs text-foreground/50">{assignment.scheduledTime}</div>
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center rounded-md px-3 py-1 font-mono text-xs uppercase ${statusColors[assignment.status].bg} ${statusColors[assignment.status].text}`}
                      >
                        {statusLabels[assignment.status]}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Assignment
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <UserCheck className="mr-2 h-4 w-4" />
                            Reassign Inspector
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-500">
                            <Trash className="mr-2 h-4 w-4" />
                            Cancel Assignment
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Create Assignment Dialog */}
      <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
        <DialogContent className="max-w-2xl border-white/10 bg-[#121212]/95 backdrop-blur-md">
          <DialogHeader>
            <DialogTitle className="font-sentient text-2xl">Create Assignment</DialogTitle>
            <DialogDescription className="font-mono text-sm text-foreground/60">
              Schedule a new inspection and assign to an inspector
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Site Selection */}
            <div className="space-y-2">
              <Label className="font-mono text-xs uppercase text-foreground/60">Inspection Site*</Label>
              <Select>
                <SelectTrigger className="h-12 border-white/[0.3] bg-white/[0.03]">
                  <SelectValue placeholder="Select a site" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="site-1">Boys Hostel A - Sector E-8</SelectItem>
                  <SelectItem value="site-2">Girls Hostel B - Sector E-9</SelectItem>
                  <SelectItem value="site-3">Engineering Block - Main Campus</SelectItem>
                  <SelectItem value="site-4">Library Building - Main Campus</SelectItem>
                  <SelectItem value="site-5">Sports Complex - Shangrila Road</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Template Selection */}
            <div className="space-y-2">
              <Label className="font-mono text-xs uppercase text-foreground/60">Inspection Template*</Label>
              <Select>
                <SelectTrigger className="h-12 border-white/[0.3] bg-white/[0.03]">
                  <SelectValue placeholder="Select a template" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tmpl-1">Monthly Safety Inspection</SelectItem>
                  <SelectItem value="tmpl-2">Electrical Systems Check</SelectItem>
                  <SelectItem value="tmpl-3">Fire Safety Audit</SelectItem>
                  <SelectItem value="tmpl-4">HVAC Systems Inspection</SelectItem>
                  <SelectItem value="tmpl-5">Plumbing & Water Systems</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Inspector Selection */}
            <div className="space-y-2">
              <Label className="font-mono text-xs uppercase text-foreground/60">Assign Inspector*</Label>
              <Select>
                <SelectTrigger className="h-12 border-white/[0.3] bg-white/[0.03]">
                  <SelectValue placeholder="Select an inspector" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="user-1">John Doe</SelectItem>
                  <SelectItem value="user-2">Sarah Khan</SelectItem>
                  <SelectItem value="user-3">Ahmed Ali</SelectItem>
                  <SelectItem value="user-4">Maria Garcia</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Date and Time */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="font-mono text-xs uppercase text-foreground/60">Scheduled Date*</Label>
                <Input type="date" className="h-12 border-white/[0.3] bg-white/[0.03] font-mono" />
              </div>

              <div className="space-y-2">
                <Label className="font-mono text-xs uppercase text-foreground/60">Scheduled Time*</Label>
                <Input type="time" className="h-12 border-white/[0.3] bg-white/[0.03] font-mono" />
              </div>
            </div>

            {/* Priority */}
            <div className="space-y-2">
              <Label className="font-mono text-xs uppercase text-foreground/60">Priority</Label>
              <Select defaultValue="normal">
                <SelectTrigger className="h-12 border-white/[0.3] bg-white/[0.03]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low Priority</SelectItem>
                  <SelectItem value="normal">Normal Priority</SelectItem>
                  <SelectItem value="high">High Priority</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Notes */}
            <div className="space-y-2">
              <Label className="font-mono text-xs uppercase text-foreground/60">Notes (Optional)</Label>
              <Textarea
                placeholder="Additional instructions or notes for the inspector..."
                rows={3}
                className="border-white/[0.3] bg-white/[0.03] font-mono"
              />
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              className="font-mono text-xs uppercase bg-transparent"
              onClick={() => setCreateDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              className="bg-[#eab308] font-mono text-xs uppercase text-black hover:bg-[#eab308]/90"
              onClick={() => setCreateDialogOpen(false)}
            >
              Create Assignment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
