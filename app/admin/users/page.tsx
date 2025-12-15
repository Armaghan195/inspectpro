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
  Users,
  UserPlus,
  Shield,
  UserCheck,
  ClipboardCheck,
  Search,
  Edit,
  MoreVertical,
  Eye,
  Key,
  Power,
  Trash,
  Info,
  AlertCircle,
  Check,
  X,
} from "lucide-react"

interface User {
  id: string
  name: string
  initials: string
  email: string
  role: "admin" | "manager" | "inspector"
  status: "active" | "inactive"
  lastActive: string
  inspections: number | null
  createdAt: string
}

const users: User[] = [
  {
    id: "USR-001",
    name: "John Doe",
    initials: "JD",
    email: "john.doe@inspectpro.app",
    role: "admin",
    status: "active",
    lastActive: "2024-12-14T14:30:00",
    inspections: null,
    createdAt: "2024-01-15",
  },
  {
    id: "USR-002",
    name: "Sarah Khan",
    initials: "SK",
    email: "sarah.khan@inspectpro.app",
    role: "inspector",
    status: "active",
    lastActive: "2024-12-14T11:20:00",
    inspections: 64,
    createdAt: "2024-02-20",
  },
  {
    id: "USR-003",
    name: "Ahmed Ali",
    initials: "AA",
    email: "ahmed.ali@inspectpro.app",
    role: "inspector",
    status: "active",
    lastActive: "2024-12-14T09:15:00",
    inspections: 52,
    createdAt: "2024-03-10",
  },
  {
    id: "USR-004",
    name: "Maria Garcia",
    initials: "MG",
    email: "maria.garcia@inspectpro.app",
    role: "manager",
    status: "active",
    lastActive: "2024-12-13T16:45:00",
    inspections: null,
    createdAt: "2024-02-05",
  },
  {
    id: "USR-005",
    name: "David Chen",
    initials: "DC",
    email: "david.chen@inspectpro.app",
    role: "inspector",
    status: "active",
    lastActive: "2024-12-14T10:00:00",
    inspections: 47,
    createdAt: "2024-04-12",
  },
  {
    id: "USR-006",
    name: "Lisa Anderson",
    initials: "LA",
    email: "lisa.anderson@inspectpro.app",
    role: "manager",
    status: "active",
    lastActive: "2024-12-12T14:20:00",
    inspections: null,
    createdAt: "2024-01-20",
  },
  {
    id: "USR-007",
    name: "Michael Brown",
    initials: "MB",
    email: "michael.brown@inspectpro.app",
    role: "inspector",
    status: "inactive",
    lastActive: "2024-11-28T09:30:00",
    inspections: 38,
    createdAt: "2024-05-08",
  },
  {
    id: "USR-008",
    name: "Emily Taylor",
    initials: "ET",
    email: "emily.taylor@inspectpro.app",
    role: "admin",
    status: "active",
    lastActive: "2024-12-14T15:10:00",
    inspections: null,
    createdAt: "2024-01-10",
  },
]

const permissions = [
  { permission: "Manage Users", admin: true, manager: false, inspector: false },
  { permission: "Manage Sites", admin: true, manager: false, inspector: false },
  { permission: "Create Templates", admin: true, manager: false, inspector: false },
  { permission: "Schedule Inspections", admin: true, manager: true, inspector: false },
  { permission: "Perform Inspections", admin: true, manager: false, inspector: true },
  { permission: "Review Findings", admin: true, manager: true, inspector: false },
  { permission: "Generate Reports", admin: true, manager: true, inspector: false },
  { permission: "View Analytics", admin: true, manager: true, inspector: false },
  { permission: "Export Data", admin: true, manager: true, inspector: false },
  { permission: "View Audit Logs", admin: true, manager: false, inspector: false },
]

export default function UsersPage() {
  const [addUserOpen, setAddUserOpen] = useState(false)
  const [editUserOpen, setEditUserOpen] = useState(false)
  const [deactivateUserOpen, setDeactivateUserOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [roleFilter, setRoleFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("active")

  const handleEditUser = (user: User) => {
    setSelectedUser(user)
    setEditUserOpen(true)
  }

  const handleDeactivateUser = (user: User) => {
    setSelectedUser(user)
    setDeactivateUserOpen(true)
  }

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString)
    return {
      date: date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      time: date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }),
    }
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin":
        return { bg: "bg-[#ef4444]/10", text: "text-[#ef4444]" }
      case "manager":
        return { bg: "bg-[#8b5cf6]/10", text: "text-[#8b5cf6]" }
      case "inspector":
        return { bg: "bg-[#3b82f6]/10", text: "text-[#3b82f6]" }
      default:
        return { bg: "bg-white/10", text: "text-foreground" }
    }
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "admin":
        return <Shield className="w-3 h-3" />
      case "manager":
        return <UserCheck className="w-3 h-3" />
      case "inspector":
        return <ClipboardCheck className="w-3 h-3" />
      default:
        return null
    }
  }

  const totalUsers = users.length
  const activeUsers = users.filter((u) => u.status === "active").length
  const inactiveUsers = users.filter((u) => u.status === "inactive").length
  const adminCount = users.filter((u) => u.role === "admin").length
  const managerCount = users.filter((u) => u.role === "manager").length
  const inspectorCount = users.filter((u) => u.role === "inspector").length

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-sentient mb-2">Users & Roles</h1>
            <p className="text-foreground/60 font-mono text-sm">Manage user accounts and access permissions</p>
          </div>

          <Button
            onClick={() => setAddUserOpen(true)}
            className="bg-[#eab308] hover:bg-[#eab308]/90 text-black font-mono uppercase text-sm"
          >
            <UserPlus className="w-4 h-4 mr-2" />
            Add User
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Total Users */}
        <div className="glass-card p-6 rounded-xl">
          <div className="flex items-start justify-between mb-2">
            <div>
              <p className="text-xs font-mono uppercase text-foreground/50 mb-1">Total Users</p>
              <p className="text-3xl font-semibold">{totalUsers}</p>
            </div>
            <div className="p-3 rounded-lg bg-[#eab308]/10">
              <Users className="w-6 h-6 text-[#eab308]" />
            </div>
          </div>
          <p className="text-xs font-mono text-foreground/50 mt-2">
            {activeUsers} active, {inactiveUsers} inactive
          </p>
        </div>

        {/* Admins */}
        <div className="glass-card p-6 rounded-xl">
          <div className="flex items-start justify-between mb-2">
            <div>
              <p className="text-xs font-mono uppercase text-foreground/50 mb-1">Admins</p>
              <p className="text-3xl font-semibold">{adminCount}</p>
            </div>
            <div className="p-3 rounded-lg bg-[#ef4444]/10">
              <Shield className="w-6 h-6 text-[#ef4444]" />
            </div>
          </div>
          <p className="text-xs font-mono text-foreground/50 mt-2">Full system access</p>
        </div>

        {/* Managers */}
        <div className="glass-card p-6 rounded-xl">
          <div className="flex items-start justify-between mb-2">
            <div>
              <p className="text-xs font-mono uppercase text-foreground/50 mb-1">Managers</p>
              <p className="text-3xl font-semibold">{managerCount}</p>
            </div>
            <div className="p-3 rounded-lg bg-[#8b5cf6]/10">
              <UserCheck className="w-6 h-6 text-[#8b5cf6]" />
            </div>
          </div>
          <p className="text-xs font-mono text-foreground/50 mt-2">Review & reports</p>
        </div>

        {/* Inspectors */}
        <div className="glass-card p-6 rounded-xl">
          <div className="flex items-start justify-between mb-2">
            <div>
              <p className="text-xs font-mono uppercase text-foreground/50 mb-1">Inspectors</p>
              <p className="text-3xl font-semibold">{inspectorCount}</p>
            </div>
            <div className="p-3 rounded-lg bg-[#3b82f6]/10">
              <ClipboardCheck className="w-6 h-6 text-[#3b82f6]" />
            </div>
          </div>
          <p className="text-xs font-mono text-foreground/50 mt-2">Field operations</p>
        </div>
      </div>

      {/* Action Bar & Filters */}
      <div className="glass-card p-4 rounded-xl">
        <div className="flex items-center justify-between gap-4">
          {/* Search */}
          <div className="flex-1 max-w-md relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/50" />
            <Input
              placeholder="Search users by name or email..."
              className="pl-10 bg-white/[0.03] border-white/[0.3] h-10 font-mono"
            />
          </div>

          {/* Filters */}
          <div className="flex items-center gap-2">
            {/* Role Filter */}
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-[140px] h-10 bg-white/[0.03] border-white/[0.3]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="manager">Manager</SelectItem>
                <SelectItem value="inspector">Inspector</SelectItem>
              </SelectContent>
            </Select>

            {/* Status Filter */}
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[140px] h-10 bg-white/[0.03] border-white/[0.3]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active Only</SelectItem>
                <SelectItem value="inactive">Inactive Only</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="glass-card rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-white/[0.03] border-b border-white/10">
              <th className="px-6 py-4 text-left">
                <span className="font-mono uppercase text-xs text-foreground/60">User</span>
              </th>
              <th className="px-6 py-4 text-left">
                <span className="font-mono uppercase text-xs text-foreground/60">Email</span>
              </th>
              <th className="px-6 py-4 text-left">
                <span className="font-mono uppercase text-xs text-foreground/60">Role</span>
              </th>
              <th className="px-6 py-4 text-left">
                <span className="font-mono uppercase text-xs text-foreground/60">Status</span>
              </th>
              <th className="px-6 py-4 text-left">
                <span className="font-mono uppercase text-xs text-foreground/60">Last Active</span>
              </th>
              <th className="px-6 py-4 text-left">
                <span className="font-mono uppercase text-xs text-foreground/60">Inspections</span>
              </th>
              <th className="px-6 py-4 text-right">
                <span className="font-mono uppercase text-xs text-foreground/60">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {users.map((user) => {
              const { date, time } = formatDateTime(user.lastActive)
              const roleColors = getRoleColor(user.role)

              return (
                <tr key={user.id} className="hover:bg-white/[0.03] transition-colors">
                  {/* User */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-full ${roleColors.bg} flex items-center justify-center flex-shrink-0`}
                      >
                        <span className={`text-sm font-mono ${roleColors.text}`}>{user.initials}</span>
                      </div>
                      <div>
                        <div className="font-medium text-sm">{user.name}</div>
                        <div className="text-xs text-foreground/50 font-mono">ID: {user.id}</div>
                      </div>
                    </div>
                  </td>

                  {/* Email */}
                  <td className="px-6 py-4">
                    <span className="text-sm font-mono text-foreground/70">{user.email}</span>
                  </td>

                  {/* Role */}
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-2 px-3 py-1 rounded-md ${roleColors.bg} ${roleColors.text} font-mono text-xs uppercase`}
                    >
                      {getRoleIcon(user.role)}
                      {user.role}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4">
                    {user.status === "active" ? (
                      <span className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#10b981]/10 text-[#10b981] font-mono text-xs uppercase">
                        <div className="w-2 h-2 rounded-full bg-[#10b981]" />
                        Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#6b7280]/10 text-[#6b7280] font-mono text-xs uppercase">
                        <div className="w-2 h-2 rounded-full bg-[#6b7280]" />
                        Inactive
                      </span>
                    )}
                  </td>

                  {/* Last Active */}
                  <td className="px-6 py-4">
                    <div className="text-sm font-mono">{date}</div>
                    <div className="text-xs text-foreground/50 font-mono">{time}</div>
                  </td>

                  {/* Inspections */}
                  <td className="px-6 py-4">
                    {user.inspections !== null ? (
                      <span className="text-sm font-mono text-foreground/70">{user.inspections} completed</span>
                    ) : (
                      <span className="text-sm font-mono text-foreground/70">—</span>
                    )}
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8 font-mono uppercase text-xs bg-transparent"
                        onClick={() => handleEditUser(user)}
                      >
                        <Edit className="w-3.5 h-3.5 mr-1.5" />
                        Edit
                      </Button>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Key className="w-4 h-4 mr-2" />
                            Reset Password
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleDeactivateUser(user)}>
                            <Power className="w-4 h-4 mr-2" />
                            Deactivate User
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-500">
                            <Trash className="w-4 h-4 mr-2" />
                            Delete User
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Role Permissions Reference Card */}
      <div className="glass-card p-6 rounded-xl">
        <div className="mb-6">
          <h3 className="text-xl font-sentient mb-1">Role Permissions</h3>
          <p className="text-xs text-foreground/60 font-mono">Overview of access levels for each role</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-3 px-4 font-mono uppercase text-xs text-foreground/60">Permission</th>
                <th className="text-center py-3 px-4">
                  <div className="flex items-center justify-center gap-2">
                    <Shield className="w-4 h-4 text-[#ef4444]" />
                    <span className="font-mono uppercase text-xs text-foreground/60">Admin</span>
                  </div>
                </th>
                <th className="text-center py-3 px-4">
                  <div className="flex items-center justify-center gap-2">
                    <UserCheck className="w-4 h-4 text-[#8b5cf6]" />
                    <span className="font-mono uppercase text-xs text-foreground/60">Manager</span>
                  </div>
                </th>
                <th className="text-center py-3 px-4">
                  <div className="flex items-center justify-center gap-2">
                    <ClipboardCheck className="w-4 h-4 text-[#3b82f6]" />
                    <span className="font-mono uppercase text-xs text-foreground/60">Inspector</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {permissions.map((row, index) => (
                <tr key={index} className="hover:bg-white/[0.02]">
                  <td className="py-3 px-4 text-sm">{row.permission}</td>
                  <td className="py-3 px-4 text-center">
                    {row.admin ? (
                      <Check className="w-5 h-5 text-[#10b981] mx-auto" />
                    ) : (
                      <X className="w-5 h-5 text-[#6b7280] mx-auto" />
                    )}
                  </td>
                  <td className="py-3 px-4 text-center">
                    {row.manager ? (
                      <Check className="w-5 h-5 text-[#10b981] mx-auto" />
                    ) : (
                      <X className="w-5 h-5 text-[#6b7280] mx-auto" />
                    )}
                  </td>
                  <td className="py-3 px-4 text-center">
                    {row.inspector ? (
                      <Check className="w-5 h-5 text-[#10b981] mx-auto" />
                    ) : (
                      <X className="w-5 h-5 text-[#6b7280] mx-auto" />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between p-4 rounded-lg bg-white/[0.03] border border-white/10">
        <div className="text-sm font-mono text-foreground/60">Showing 1-8 of {totalUsers} users</div>
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

      {/* Add User Dialog */}
      <Dialog open={addUserOpen} onOpenChange={setAddUserOpen}>
        <DialogContent className="max-w-xl bg-[#121212]/95 backdrop-blur-md border-white/10">
          <DialogHeader>
            <DialogTitle className="text-xl font-sentient">Add New User</DialogTitle>
            <DialogDescription className="font-mono text-sm text-foreground/60">
              Create a new user account with role and permissions
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Personal Information */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="font-mono uppercase text-xs text-foreground/60">First Name*</Label>
                <Input placeholder="John" className="bg-white/[0.03] border-white/[0.3] h-12 font-mono mt-2" />
              </div>
              <div>
                <Label className="font-mono uppercase text-xs text-foreground/60">Last Name*</Label>
                <Input placeholder="Doe" className="bg-white/[0.03] border-white/[0.3] h-12 font-mono mt-2" />
              </div>
            </div>

            <div>
              <Label className="font-mono uppercase text-xs text-foreground/60">Email Address*</Label>
              <Input
                type="email"
                placeholder="john.doe@inspectpro.app"
                className="bg-white/[0.03] border-white/[0.3] h-12 font-mono mt-2"
              />
            </div>

            <div>
              <Label className="font-mono uppercase text-xs text-foreground/60">Phone Number</Label>
              <Input
                type="tel"
                placeholder="+92 XXX XXXXXXX"
                className="bg-white/[0.03] border-white/[0.3] h-12 font-mono mt-2"
              />
            </div>

            {/* Role Selection */}
            <div>
              <Label className="font-mono uppercase text-xs text-foreground/60 mb-3">Assign Role*</Label>
              <div className="space-y-2 mt-2">
                <div className="flex items-start gap-3 p-4 rounded-lg bg-white/[0.03] border border-white/10 cursor-pointer hover:border-[#ef4444]/30">
                  <input type="radio" name="role" value="admin" id="role-admin" />
                  <label htmlFor="role-admin" className="flex-1 cursor-pointer">
                    <div className="flex items-center gap-2 mb-1">
                      <Shield className="w-4 h-4 text-[#ef4444]" />
                      <span className="font-medium text-sm">Admin</span>
                    </div>
                    <p className="text-xs text-foreground/60">
                      Full system access. Can manage users, sites, templates, and all settings.
                    </p>
                  </label>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-lg bg-white/[0.03] border border-white/10 cursor-pointer hover:border-[#8b5cf6]/30">
                  <input type="radio" name="role" value="manager" id="role-manager" />
                  <label htmlFor="role-manager" className="flex-1 cursor-pointer">
                    <div className="flex items-center gap-2 mb-1">
                      <UserCheck className="w-4 h-4 text-[#8b5cf6]" />
                      <span className="font-medium text-sm">Manager</span>
                    </div>
                    <p className="text-xs text-foreground/60">
                      Review findings, generate reports, view analytics. Cannot manage users.
                    </p>
                  </label>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-lg bg-white/[0.03] border border-white/10 cursor-pointer hover:border-[#3b82f6]/30">
                  <input type="radio" name="role" value="inspector" defaultChecked id="role-inspector" />
                  <label htmlFor="role-inspector" className="flex-1 cursor-pointer">
                    <div className="flex items-center gap-2 mb-1">
                      <ClipboardCheck className="w-4 h-4 text-[#3b82f6]" />
                      <span className="font-medium text-sm">Inspector</span>
                    </div>
                    <p className="text-xs text-foreground/60">
                      Perform field inspections. Access only to assigned inspections via PWA.
                    </p>
                  </label>
                </div>
              </div>
            </div>

            {/* Account Status */}
            <div>
              <Label className="font-mono uppercase text-xs text-foreground/60">Initial Status</Label>
              <Select defaultValue="active">
                <SelectTrigger className="bg-white/[0.03] border-white/[0.3] h-12 mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active (can login immediately)</SelectItem>
                  <SelectItem value="inactive">Inactive (requires activation)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Send Invitation Email */}
            <div className="flex items-center gap-2 p-3 rounded-lg bg-white/[0.02]">
              <input type="checkbox" defaultChecked id="send-invite" />
              <label htmlFor="send-invite" className="text-sm cursor-pointer">
                Send invitation email with login credentials
              </label>
            </div>

            {/* Info */}
            <div className="p-3 rounded-lg bg-[#3b82f6]/5 border border-[#3b82f6]/20">
              <div className="flex items-start gap-2">
                <Info className="w-4 h-4 text-[#3b82f6] mt-0.5" />
                <p className="text-xs text-foreground/70">
                  A temporary password will be generated and sent to the user's email address.
                </p>
              </div>
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              className="font-mono uppercase text-xs bg-transparent"
              onClick={() => setAddUserOpen(false)}
            >
              Cancel
            </Button>
            <Button className="bg-[#eab308] hover:bg-[#eab308]/90 text-black font-mono uppercase text-xs">
              <UserPlus className="w-4 h-4 mr-2" />
              Create User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit User Dialog */}
      <Dialog open={editUserOpen} onOpenChange={setEditUserOpen}>
        <DialogContent className="max-w-xl bg-[#121212]/95 backdrop-blur-md border-white/10">
          <DialogHeader>
            <DialogTitle className="text-xl font-sentient">Edit User</DialogTitle>
            <DialogDescription className="font-mono text-sm text-foreground/60">
              Update user information and role
            </DialogDescription>
          </DialogHeader>

          {selectedUser && (
            <div className="space-y-6 py-4">
              {/* User Info Display */}
              <div className="flex items-center gap-4 p-4 rounded-lg bg-white/[0.03] border border-white/10">
                <div
                  className={`w-12 h-12 rounded-full ${getRoleColor(selectedUser.role).bg} flex items-center justify-center flex-shrink-0`}
                >
                  <span className={`text-base font-mono ${getRoleColor(selectedUser.role).text}`}>
                    {selectedUser.initials}
                  </span>
                </div>
                <div className="flex-1">
                  <p className="font-medium">{selectedUser.name}</p>
                  <p className="text-xs text-foreground/50 font-mono">
                    {selectedUser.email} • {selectedUser.id}
                  </p>
                </div>
              </div>

              {/* Editable Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="font-mono uppercase text-xs text-foreground/60">First Name</Label>
                  <Input
                    defaultValue={selectedUser.name.split(" ")[0]}
                    className="bg-white/[0.03] border-white/[0.3] h-12 font-mono mt-2"
                  />
                </div>
                <div>
                  <Label className="font-mono uppercase text-xs text-foreground/60">Last Name</Label>
                  <Input
                    defaultValue={selectedUser.name.split(" ")[1]}
                    className="bg-white/[0.03] border-white/[0.3] h-12 font-mono mt-2"
                  />
                </div>
              </div>

              <div>
                <Label className="font-mono uppercase text-xs text-foreground/60">Email Address</Label>
                <Input
                  type="email"
                  defaultValue={selectedUser.email}
                  className="bg-white/[0.03] border-white/[0.3] h-12 font-mono mt-2"
                />
              </div>

              <div>
                <Label className="font-mono uppercase text-xs text-foreground/60">Phone Number</Label>
                <Input
                  type="tel"
                  defaultValue="+92 300 1234567"
                  className="bg-white/[0.03] border-white/[0.3] h-12 font-mono mt-2"
                />
              </div>

              {/* Role Change */}
              <div>
                <Label className="font-mono uppercase text-xs text-foreground/60">Role</Label>
                <Select defaultValue={selectedUser.role}>
                  <SelectTrigger className="bg-white/[0.03] border-white/[0.3] h-12 mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">
                      <div className="flex items-center gap-2">
                        <Shield className="w-4 h-4 text-[#ef4444]" />
                        <span>Admin</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="manager">
                      <div className="flex items-center gap-2">
                        <UserCheck className="w-4 h-4 text-[#8b5cf6]" />
                        <span>Manager</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="inspector">
                      <div className="flex items-center gap-2">
                        <ClipboardCheck className="w-4 h-4 text-[#3b82f6]" />
                        <span>Inspector</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Status */}
              <div>
                <Label className="font-mono uppercase text-xs text-foreground/60">Account Status</Label>
                <Select defaultValue={selectedUser.status}>
                  <SelectTrigger className="bg-white/[0.03] border-white/[0.3] h-12 mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Stats (for inspectors) */}
              {selectedUser.role === "inspector" && selectedUser.inspections !== null && (
                <div className="p-4 rounded-lg bg-white/[0.02] border border-white/5">
                  <p className="text-xs font-mono uppercase text-foreground/50 mb-3">Activity Stats</p>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-xl font-semibold">{selectedUser.inspections}</p>
                      <p className="text-xs text-foreground/50 font-mono">Inspections</p>
                    </div>
                    <div>
                      <p className="text-xl font-semibold">98%</p>
                      <p className="text-xs text-foreground/50 font-mono">Completion</p>
                    </div>
                    <div>
                      <p className="text-xl font-semibold">4.8</p>
                      <p className="text-xs text-foreground/50 font-mono">Avg Rating</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              className="font-mono uppercase text-xs bg-transparent"
              onClick={() => setEditUserOpen(false)}
            >
              Cancel
            </Button>
            <Button className="bg-[#eab308] hover:bg-[#eab308]/90 text-black font-mono uppercase text-xs">
              <Check className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Deactivate User Confirmation Dialog */}
      <Dialog open={deactivateUserOpen} onOpenChange={setDeactivateUserOpen}>
        <DialogContent className="max-w-md bg-[#121212]/95 backdrop-blur-md border-white/10">
          <DialogHeader>
            <DialogTitle className="text-xl font-sentient">Deactivate User?</DialogTitle>
            <DialogDescription className="font-mono text-sm text-foreground/60">
              This action will prevent the user from accessing the system
            </DialogDescription>
          </DialogHeader>

          {selectedUser && (
            <div className="py-4">
              <div className="flex items-center gap-4 p-4 rounded-lg bg-white/[0.03] border border-white/10">
                <div
                  className={`w-12 h-12 rounded-full ${getRoleColor(selectedUser.role).bg} flex items-center justify-center`}
                >
                  <span className={`text-base font-mono ${getRoleColor(selectedUser.role).text}`}>
                    {selectedUser.initials}
                  </span>
                </div>
                <div>
                  <p className="font-medium">{selectedUser.name}</p>
                  <p className="text-xs text-foreground/50 font-mono">
                    {selectedUser.role.charAt(0).toUpperCase() + selectedUser.role.slice(1)}
                    {selectedUser.inspections !== null && ` • ${selectedUser.inspections} inspections`}
                  </p>
                </div>
              </div>

              <div className="mt-4 p-3 rounded-lg bg-[#f59e0b]/5 border border-[#f59e0b]/20">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-[#f59e0b] mt-0.5" />
                  <div>
                    <p className="text-xs text-foreground/70 mb-2">Deactivating this user will:</p>
                    <ul className="text-xs text-foreground/60 space-y-1 ml-4 list-disc">
                      <li>Revoke all system access immediately</li>
                      <li>Cancel pending assignments</li>
                      <li>Preserve historical data</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <Label className="font-mono uppercase text-xs text-foreground/60">Reason (Optional)</Label>
                <Textarea
                  placeholder="Enter reason for deactivation..."
                  rows={3}
                  className="bg-white/[0.03] border-white/[0.3] font-mono mt-2"
                />
              </div>
            </div>
          )}

          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              className="font-mono uppercase text-xs bg-transparent"
              onClick={() => setDeactivateUserOpen(false)}
            >
              Cancel
            </Button>
            <Button className="bg-[#ef4444] hover:bg-[#ef4444]/90 text-white font-mono uppercase text-xs">
              <Power className="w-4 h-4 mr-2" />
              Deactivate User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
