"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Settings,
  FileText,
  Save,
  Upload,
  Search,
  Download,
  Eye,
  Users,
  Activity,
  AlertTriangle,
  Plus,
  Edit,
  Trash,
  LogIn,
} from "lucide-react"

interface AuditLog {
  id: string
  timestamp: string
  user: { name: string; initials: string; role: string }
  action: "create" | "update" | "delete" | "login" | "export"
  entity: string
  entityId: string
  details: string
  payload: Record<string, any>
}

const auditLogs: AuditLog[] = [
  {
    id: "AUD-001",
    timestamp: "2024-12-14T15:45:23",
    user: { name: "John Doe", initials: "JD", role: "Admin" },
    action: "create",
    entity: "Site",
    entityId: "SITE-009",
    details: 'Created new site: "Cafeteria Wing B" in Sector E-8, Islamabad',
    payload: { name: "Cafeteria Wing B", address: "Sector E-8, Islamabad" },
  },
  {
    id: "AUD-002",
    timestamp: "2024-12-14T15:20:15",
    user: { name: "Sarah Khan", initials: "SK", role: "Inspector" },
    action: "update",
    entity: "Assignment",
    entityId: "ASN-003",
    details: "Submitted inspection ASN-003 for review",
    payload: { status: "submitted", findings_count: 8 },
  },
  {
    id: "AUD-003",
    timestamp: "2024-12-14T14:55:42",
    user: { name: "Emily Taylor", initials: "ET", role: "Admin" },
    action: "delete",
    entity: "Template",
    entityId: "TMPL-012",
    details: 'Deleted template: "Old Safety Checklist v1.0"',
    payload: { name: "Old Safety Checklist", version: "1.0" },
  },
  {
    id: "AUD-004",
    timestamp: "2024-12-14T14:30:08",
    user: { name: "Maria Garcia", initials: "MG", role: "Manager" },
    action: "export",
    entity: "Report",
    entityId: "RPT-001",
    details: "Exported inspection data for December 2024",
    payload: { date_range: "2024-12-01 to 2024-12-14", format: "CSV" },
  },
  {
    id: "AUD-005",
    timestamp: "2024-12-14T14:05:33",
    user: { name: "Ahmed Ali", initials: "AA", role: "Inspector" },
    action: "login",
    entity: "User",
    entityId: "USR-003",
    details: "User logged in from mobile app",
    payload: { device: "Mobile", ip: "192.168.1.45" },
  },
  {
    id: "AUD-006",
    timestamp: "2024-12-14T13:40:19",
    user: { name: "John Doe", initials: "JD", role: "Admin" },
    action: "update",
    entity: "User",
    entityId: "USR-007",
    details: "Deactivated user: Michael Brown",
    payload: { status: "inactive", reason: "Left organization" },
  },
  {
    id: "AUD-007",
    timestamp: "2024-12-14T13:15:55",
    user: { name: "Lisa Anderson", initials: "LA", role: "Manager" },
    action: "create",
    entity: "Assignment",
    entityId: "ASN-024",
    details: 'Scheduled new inspection for "Boys Hostel A" on Dec 18, 2024',
    payload: { site: "SITE-001", template: "TMPL-001", inspector: "USR-002" },
  },
  {
    id: "AUD-008",
    timestamp: "2024-12-14T12:50:27",
    user: { name: "David Chen", initials: "DC", role: "Inspector" },
    action: "update",
    entity: "Assignment",
    entityId: "ASN-015",
    details: "Added 3 photos to finding #5",
    payload: { finding_id: "FIND-015", photos_added: 3 },
  },
]

export default function SettingsPage() {
  const [detailsOpen, setDetailsOpen] = useState(false)
  const [selectedLog, setSelectedLog] = useState<AuditLog | null>(null)

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString)
    return {
      date: date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      time: date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", second: "2-digit" }),
    }
  }

  const getActionColor = (action: string) => {
    switch (action) {
      case "create":
        return { bg: "bg-[#10b981]/10", text: "text-[#10b981]" }
      case "update":
        return { bg: "bg-[#3b82f6]/10", text: "text-[#3b82f6]" }
      case "delete":
        return { bg: "bg-[#ef4444]/10", text: "text-[#ef4444]" }
      case "login":
        return { bg: "bg-[#8b5cf6]/10", text: "text-[#8b5cf6]" }
      case "export":
        return { bg: "bg-[#f59e0b]/10", text: "text-[#f59e0b]" }
      default:
        return { bg: "bg-white/10", text: "text-foreground" }
    }
  }

  const getActionIcon = (action: string) => {
    switch (action) {
      case "create":
        return <Plus className="w-3 h-3" />
      case "update":
        return <Edit className="w-3 h-3" />
      case "delete":
        return <Trash className="w-3 h-3" />
      case "login":
        return <LogIn className="w-3 h-3" />
      case "export":
        return <Download className="w-3 h-3" />
      default:
        return null
    }
  }

  const handleViewDetails = (log: AuditLog) => {
    setSelectedLog(log)
    setDetailsOpen(true)
  }

  return (
    <div className="space-y-8">
      <Tabs defaultValue="settings" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2 mb-8 bg-white/[0.03] p-1 rounded-lg">
          <TabsTrigger
            value="settings"
            className="font-mono uppercase text-xs data-[state=active]:bg-[#eab308]/10 data-[state=active]:text-[#eab308]"
          >
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </TabsTrigger>
          <TabsTrigger
            value="audit-log"
            className="font-mono uppercase text-xs data-[state=active]:bg-[#eab308]/10 data-[state=active]:text-[#eab308]"
          >
            <FileText className="w-4 h-4 mr-2" />
            Audit Log
          </TabsTrigger>
        </TabsList>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-6">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-sentient mb-2">System Settings</h1>
            <p className="text-foreground/60 font-mono text-sm">Configure system-level preferences and options</p>
          </div>

          {/* General Settings */}
          <div className="glass-card p-6 rounded-xl">
            <div className="mb-6">
              <h3 className="text-xl font-sentient mb-1">General Settings</h3>
              <p className="text-xs text-foreground/60 font-mono">Basic system configuration</p>
            </div>

            <div className="space-y-6">
              {/* Organization Name */}
              <div>
                <Label className="font-mono uppercase text-xs text-foreground/60">Organization Name</Label>
                <Input
                  defaultValue="Bahria University"
                  className="bg-white/[0.03] border-white/[0.3] h-12 font-mono mt-2"
                />
                <p className="text-xs text-foreground/50 font-mono mt-2">Displayed in reports and notifications</p>
              </div>

              {/* Timezone */}
              <div>
                <Label className="font-mono uppercase text-xs text-foreground/60">System Timezone</Label>
                <Select defaultValue="pkt">
                  <SelectTrigger className="bg-white/[0.03] border-white/[0.3] h-12 mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pkt">Pakistan Standard Time (PKT) - UTC+5</SelectItem>
                    <SelectItem value="utc">Coordinated Universal Time (UTC)</SelectItem>
                    <SelectItem value="est">Eastern Standard Time (EST) - UTC-5</SelectItem>
                    <SelectItem value="gmt">Greenwich Mean Time (GMT) - UTC+0</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Date Format */}
              <div>
                <Label className="font-mono uppercase text-xs text-foreground/60">Date Format</Label>
                <Select defaultValue="mdy">
                  <SelectTrigger className="bg-white/[0.03] border-white/[0.3] h-12 mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mdy">MM/DD/YYYY (US Format)</SelectItem>
                    <SelectItem value="dmy">DD/MM/YYYY (UK Format)</SelectItem>
                    <SelectItem value="ymd">YYYY-MM-DD (ISO Format)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Language */}
              <div>
                <Label className="font-mono uppercase text-xs text-foreground/60">Default Language</Label>
                <Select defaultValue="en">
                  <SelectTrigger className="bg-white/[0.03] border-white/[0.3] h-12 mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="ur">Urdu</SelectItem>
                    <SelectItem value="ar">Arabic</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Inspection Settings */}
          <div className="glass-card p-6 rounded-xl">
            <div className="mb-6">
              <h3 className="text-xl font-sentient mb-1">Inspection Settings</h3>
              <p className="text-xs text-foreground/60 font-mono">Configure inspection behavior and defaults</p>
            </div>

            <div className="space-y-4">
              {/* Auto-assign Inspections */}
              <div className="flex items-start justify-between p-4 rounded-lg bg-white/[0.02] border border-white/5">
                <div className="flex-1">
                  <p className="font-medium text-sm mb-1">Auto-assign Inspections</p>
                  <p className="text-xs text-foreground/60">
                    Automatically assign inspections to available inspectors based on workload
                  </p>
                </div>
                <input type="checkbox" className="mt-1" />
              </div>

              {/* Require Photo Evidence */}
              <div className="flex items-start justify-between p-4 rounded-lg bg-white/[0.02] border border-white/5">
                <div className="flex-1">
                  <p className="font-medium text-sm mb-1">Require Photo Evidence</p>
                  <p className="text-xs text-foreground/60">
                    Mandate photo uploads for all findings marked as Medium severity or higher
                  </p>
                </div>
                <input type="checkbox" defaultChecked className="mt-1" />
              </div>

              {/* Enable ML Suggestions */}
              <div className="flex items-start justify-between p-4 rounded-lg bg-white/[0.02] border border-white/5">
                <div className="flex-1">
                  <p className="font-medium text-sm mb-1">Enable ML Suggestions</p>
                  <p className="text-xs text-foreground/60">
                    Use machine learning to suggest categories and severity for findings
                  </p>
                </div>
                <input type="checkbox" defaultChecked className="mt-1" />
              </div>

              {/* Offline Mode */}
              <div className="flex items-start justify-between p-4 rounded-lg bg-white/[0.02] border border-white/5">
                <div className="flex-1">
                  <p className="font-medium text-sm mb-1">Offline Mode</p>
                  <p className="text-xs text-foreground/60">Allow inspectors to work offline and sync when connected</p>
                </div>
                <input type="checkbox" defaultChecked className="mt-1" />
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="glass-card p-6 rounded-xl">
            <div className="mb-6">
              <h3 className="text-xl font-sentient mb-1">Notification Settings</h3>
              <p className="text-xs text-foreground/60 font-mono">Configure email and in-app notifications</p>
            </div>

            <div className="space-y-4">
              {/* New Assignments */}
              <div className="flex items-start justify-between p-4 rounded-lg bg-white/[0.02] border border-white/5">
                <div className="flex-1">
                  <p className="font-medium text-sm mb-1">New Assignments</p>
                  <p className="text-xs text-foreground/60">Notify inspectors when new assignments are created</p>
                </div>
                <input type="checkbox" defaultChecked className="mt-1" />
              </div>

              {/* Inspection Submissions */}
              <div className="flex items-start justify-between p-4 rounded-lg bg-white/[0.02] border border-white/5">
                <div className="flex-1">
                  <p className="font-medium text-sm mb-1">Inspection Submissions</p>
                  <p className="text-xs text-foreground/60">
                    Notify managers when inspections are submitted for review
                  </p>
                </div>
                <input type="checkbox" defaultChecked className="mt-1" />
              </div>

              {/* Critical Findings */}
              <div className="flex items-start justify-between p-4 rounded-lg bg-white/[0.02] border border-white/5">
                <div className="flex-1">
                  <p className="font-medium text-sm mb-1">Critical Findings</p>
                  <p className="text-xs text-foreground/60">
                    Send immediate alerts for findings marked as Critical severity
                  </p>
                </div>
                <input type="checkbox" defaultChecked className="mt-1" />
              </div>

              {/* Anomaly Detection Alerts */}
              <div className="flex items-start justify-between p-4 rounded-lg bg-white/[0.02] border border-white/5">
                <div className="flex-1">
                  <p className="font-medium text-sm mb-1">Anomaly Detection Alerts</p>
                  <p className="text-xs text-foreground/60">Weekly email when issue spikes are detected</p>
                </div>
                <input type="checkbox" className="mt-1" />
              </div>
            </div>
          </div>

          {/* Report Settings */}
          <div className="glass-card p-6 rounded-xl">
            <div className="mb-6">
              <h3 className="text-xl font-sentient mb-1">Report Settings</h3>
              <p className="text-xs text-foreground/60 font-mono">Configure PDF report generation</p>
            </div>

            <div className="space-y-6">
              {/* Report Template */}
              <div>
                <Label className="font-mono uppercase text-xs text-foreground/60">Default Report Template</Label>
                <Select defaultValue="university">
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

              {/* Logo Upload */}
              <div>
                <Label className="font-mono uppercase text-xs text-foreground/60">Organization Logo</Label>
                <div className="mt-2 p-4 rounded-lg bg-white/[0.02] border border-dashed border-white/20 text-center cursor-pointer hover:border-[#eab308]/30 transition-colors">
                  <Upload className="w-8 h-8 text-foreground/30 mx-auto mb-2" />
                  <p className="text-sm text-foreground/60">Click to upload logo</p>
                  <p className="text-xs text-foreground/40 font-mono mt-1">PNG or JPG, max 2MB</p>
                </div>
              </div>

              {/* Share Link Expiration */}
              <div>
                <Label className="font-mono uppercase text-xs text-foreground/60">Default Share Link Expiration</Label>
                <Select defaultValue="7days">
                  <SelectTrigger className="bg-white/[0.03] border-white/[0.3] h-12 mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="24hours">24 Hours</SelectItem>
                    <SelectItem value="7days">7 Days</SelectItem>
                    <SelectItem value="30days">30 Days</SelectItem>
                    <SelectItem value="never">Never Expire</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Include Photos */}
              <div className="flex items-start justify-between p-4 rounded-lg bg-white/[0.02] border border-white/5">
                <div className="flex-1">
                  <p className="font-medium text-sm mb-1">Include Photos by Default</p>
                  <p className="text-xs text-foreground/60">
                    Automatically include all photos in generated PDF reports
                  </p>
                </div>
                <input type="checkbox" defaultChecked className="mt-1" />
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end gap-2">
            <Button variant="outline" className="font-mono uppercase text-xs bg-transparent">
              Reset to Defaults
            </Button>
            <Button className="bg-[#eab308] hover:bg-[#eab308]/90 text-black font-mono uppercase text-sm">
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </TabsContent>

        {/* Audit Log Tab */}
        <TabsContent value="audit-log" className="space-y-6">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-sentient mb-2">Audit Log</h1>
            <p className="text-foreground/60 font-mono text-sm">Immutable record of all system actions and changes</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Total Events */}
            <div className="glass-card p-6 rounded-xl">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="text-xs font-mono uppercase text-foreground/50 mb-1">Total Events</p>
                  <p className="text-3xl font-semibold">2,847</p>
                </div>
                <div className="p-3 rounded-lg bg-[#eab308]/10">
                  <FileText className="w-6 h-6 text-[#eab308]" />
                </div>
              </div>
              <p className="text-xs font-mono text-foreground/50 mt-2">All-time logged</p>
            </div>

            {/* Today's Activity */}
            <div className="glass-card p-6 rounded-xl">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="text-xs font-mono uppercase text-foreground/50 mb-1">Today</p>
                  <p className="text-3xl font-semibold">124</p>
                </div>
                <div className="p-3 rounded-lg bg-[#3b82f6]/10">
                  <Activity className="w-6 h-6 text-[#3b82f6]" />
                </div>
              </div>
              <p className="text-xs font-mono text-foreground/50 mt-2">Actions logged</p>
            </div>

            {/* Active Users */}
            <div className="glass-card p-6 rounded-xl">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="text-xs font-mono uppercase text-foreground/50 mb-1">Active Users</p>
                  <p className="text-3xl font-semibold">18</p>
                </div>
                <div className="p-3 rounded-lg bg-[#10b981]/10">
                  <Users className="w-6 h-6 text-[#10b981]" />
                </div>
              </div>
              <p className="text-xs font-mono text-foreground/50 mt-2">Last 24 hours</p>
            </div>

            {/* Critical Events */}
            <div className="glass-card p-6 rounded-xl">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="text-xs font-mono uppercase text-foreground/50 mb-1">Critical Events</p>
                  <p className="text-3xl font-semibold">7</p>
                </div>
                <div className="p-3 rounded-lg bg-[#ef4444]/10">
                  <AlertTriangle className="w-6 h-6 text-[#ef4444]" />
                </div>
              </div>
              <p className="text-xs font-mono text-foreground/50 mt-2">Requires review</p>
            </div>
          </div>

          {/* Filters */}
          <div className="glass-card p-4 rounded-xl">
            <div className="flex items-center gap-4 flex-wrap">
              {/* Search */}
              <div className="flex-1 min-w-[300px] relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/50" />
                <Input
                  placeholder="Search by user, action, or entity..."
                  className="pl-10 bg-white/[0.03] border-white/[0.3] h-10 font-mono"
                />
              </div>

              {/* Action Type Filter */}
              <Select defaultValue="all">
                <SelectTrigger className="w-[140px] h-10 bg-white/[0.03] border-white/[0.3]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Actions</SelectItem>
                  <SelectItem value="create">Create</SelectItem>
                  <SelectItem value="update">Update</SelectItem>
                  <SelectItem value="delete">Delete</SelectItem>
                  <SelectItem value="login">Login</SelectItem>
                  <SelectItem value="export">Export</SelectItem>
                </SelectContent>
              </Select>

              {/* Entity Filter */}
              <Select defaultValue="all">
                <SelectTrigger className="w-[140px] h-10 bg-white/[0.03] border-white/[0.3]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Entities</SelectItem>
                  <SelectItem value="user">User</SelectItem>
                  <SelectItem value="site">Site</SelectItem>
                  <SelectItem value="template">Template</SelectItem>
                  <SelectItem value="assignment">Assignment</SelectItem>
                  <SelectItem value="report">Report</SelectItem>
                </SelectContent>
              </Select>

              {/* Date Range */}
              <Select defaultValue="7days">
                <SelectTrigger className="w-[140px] h-10 bg-white/[0.03] border-white/[0.3]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="7days">Last 7 Days</SelectItem>
                  <SelectItem value="30days">Last 30 Days</SelectItem>
                  <SelectItem value="90days">Last 90 Days</SelectItem>
                  <SelectItem value="all">All Time</SelectItem>
                </SelectContent>
              </Select>

              {/* Export Button */}
              <Button variant="outline" size="sm" className="font-mono uppercase text-xs bg-transparent">
                <Download className="w-4 h-4 mr-2" />
                Export CSV
              </Button>
            </div>
          </div>

          {/* Audit Log Table */}
          <div className="glass-card rounded-xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-white/[0.03] border-b border-white/10">
                  <th className="px-6 py-4 text-left">
                    <span className="font-mono uppercase text-xs text-foreground/60">Timestamp</span>
                  </th>
                  <th className="px-6 py-4 text-left">
                    <span className="font-mono uppercase text-xs text-foreground/60">User</span>
                  </th>
                  <th className="px-6 py-4 text-left">
                    <span className="font-mono uppercase text-xs text-foreground/60">Action</span>
                  </th>
                  <th className="px-6 py-4 text-left">
                    <span className="font-mono uppercase text-xs text-foreground/60">Entity</span>
                  </th>
                  <th className="px-6 py-4 text-left">
                    <span className="font-mono uppercase text-xs text-foreground/60">Details</span>
                  </th>
                  <th className="px-6 py-4 text-right">
                    <span className="font-mono uppercase text-xs text-foreground/60">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {auditLogs.map((log) => {
                  const { date, time } = formatDateTime(log.timestamp)
                  const actionColors = getActionColor(log.action)

                  return (
                    <tr key={log.id} className="hover:bg-white/[0.03] transition-colors">
                      {/* Timestamp */}
                      <td className="px-6 py-4">
                        <div className="text-sm font-mono">{date}</div>
                        <div className="text-xs text-foreground/50 font-mono">{time}</div>
                      </td>

                      {/* User */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-[#eab308]/20 flex items-center justify-center">
                            <span className="text-xs font-mono text-[#eab308]">{log.user.initials}</span>
                          </div>
                          <div>
                            <div className="text-sm font-medium">{log.user.name}</div>
                            <div className="text-xs text-foreground/50 font-mono">{log.user.role}</div>
                          </div>
                        </div>
                      </td>

                      {/* Action */}
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-2 px-3 py-1 rounded-md ${actionColors.bg} ${actionColors.text} font-mono text-xs uppercase`}
                        >
                          {getActionIcon(log.action)}
                          {log.action}
                        </span>
                      </td>

                      {/* Entity */}
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium">{log.entity}</div>
                        <div className="text-xs text-foreground/50 font-mono">{log.entityId}</div>
                      </td>

                      {/* Details */}
                      <td className="px-6 py-4">
                        <p className="text-sm text-foreground/70 max-w-md truncate">{log.details}</p>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end">
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 w-8 p-0"
                            onClick={() => handleViewDetails(log)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between p-4 rounded-lg bg-white/[0.03] border border-white/10">
            <div className="text-sm font-mono text-foreground/60">Showing 1-8 of 2,847 events</div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled className="font-mono bg-transparent">
                Previous
              </Button>
              <Button className="bg-[#eab308]/10 text-[#eab308] hover:bg-[#eab308]/20" size="sm">
                1
              </Button>
              <Button variant="outline" size="sm" className="font-mono bg-transparent">
                2
              </Button>
              <Button variant="outline" size="sm" className="font-mono bg-transparent">
                3
              </Button>
              <Button variant="outline" size="sm" className="font-mono bg-transparent">
                Next
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Audit Log Detail Dialog */}
      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent className="max-w-2xl bg-[#121212]/95 backdrop-blur-md border-white/10">
          <DialogHeader>
            <DialogTitle className="text-xl font-sentient">Audit Log Details</DialogTitle>
            <DialogDescription className="font-mono text-sm text-foreground/60">
              Complete event information and payload
            </DialogDescription>
          </DialogHeader>

          {selectedLog && (
            <div className="space-y-6 py-4">
              {/* Event Summary */}
              <div className="p-4 rounded-lg bg-white/[0.03] border border-white/10">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs font-mono uppercase text-foreground/50 mb-1">Event ID</p>
                    <p className="text-sm font-mono">{selectedLog.id}</p>
                  </div>
                  <div>
                    <p className="text-xs font-mono uppercase text-foreground/50 mb-1">Timestamp</p>
                    <p className="text-sm font-mono">
                      {formatDateTime(selectedLog.timestamp).date} at {formatDateTime(selectedLog.timestamp).time}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-mono uppercase text-foreground/50 mb-1">User</p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="w-6 h-6 rounded-full bg-[#eab308]/20 flex items-center justify-center">
                        <span className="text-xs font-mono text-[#eab308]">{selectedLog.user.initials}</span>
                      </div>
                      <span className="text-sm">
                        {selectedLog.user.name} ({selectedLog.user.role})
                      </span>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-mono uppercase text-foreground/50 mb-1">IP Address</p>
                    <p className="text-sm font-mono">192.168.1.34</p>
                  </div>
                </div>
              </div>

              {/* Action Details */}
              <div>
                <p className="text-xs font-mono uppercase text-foreground/50 mb-3">Action Details</p>
                <div className="p-4 rounded-lg bg-white/[0.02] border border-white/5">
                  <div className="flex items-center gap-3 mb-3">
                    <span
                      className={`inline-flex items-center gap-2 px-3 py-1 rounded-md ${getActionColor(selectedLog.action).bg} ${getActionColor(selectedLog.action).text} font-mono text-xs uppercase`}
                    >
                      {getActionIcon(selectedLog.action)}
                      {selectedLog.action}
                    </span>
                    <span className="text-sm font-mono">
                      {selectedLog.entity} • {selectedLog.entityId}
                    </span>
                  </div>
                  <p className="text-sm text-foreground/70">{selectedLog.details}</p>
                </div>
              </div>

              {/* Payload */}
              <div>
                <p className="text-xs font-mono uppercase text-foreground/50 mb-3">Event Payload (JSON)</p>
                <div className="p-4 rounded-lg bg-[#0a0a0a] border border-white/10 overflow-x-auto">
                  <pre className="text-xs font-mono text-foreground/80">
                    {JSON.stringify(selectedLog.payload, null, 2)}
                  </pre>
                </div>
              </div>

              {/* Metadata */}
              <div>
                <p className="text-xs font-mono uppercase text-foreground/50 mb-3">Additional Metadata</p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-foreground/60 font-mono">User Agent:</span>
                    <span className="text-foreground/80 font-mono text-xs">Mozilla/5.0 Chrome/120.0</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-foreground/60 font-mono">Session ID:</span>
                    <span className="text-foreground/80 font-mono text-xs">sess_a7f3e2d9b1c4</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-foreground/60 font-mono">Request Duration:</span>
                    <span className="text-foreground/80 font-mono text-xs">124ms</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              className="font-mono uppercase text-xs bg-transparent"
              onClick={() => setDetailsOpen(false)}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
