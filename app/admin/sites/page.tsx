"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Plus,
  Search,
  MoreVertical,
  MapPin,
  Calendar,
  CheckCircle2,
  AlertCircle,
  Clock,
  Edit,
  Trash2,
  ExternalLink,
} from "lucide-react"

interface Site {
  id: string
  name: string
  address: string
  city: string
  state: string
  zip: string
  status: "active" | "inactive" | "pending"
  inspections: number
  lastInspection: string
  nextInspection: string
  assignedTo: string
}

const mockSites: Site[] = [
  {
    id: "1",
    name: "Downtown Office Complex",
    address: "123 Main Street",
    city: "San Francisco",
    state: "CA",
    zip: "94102",
    status: "active",
    inspections: 24,
    lastInspection: "2024-03-15",
    nextInspection: "2024-04-15",
    assignedTo: "John Doe",
  },
  {
    id: "2",
    name: "Riverside Manufacturing Plant",
    address: "456 Industrial Blvd",
    city: "Oakland",
    state: "CA",
    zip: "94601",
    status: "active",
    inspections: 18,
    lastInspection: "2024-03-20",
    nextInspection: "2024-04-20",
    assignedTo: "Jane Smith",
  },
  {
    id: "3",
    name: "Westside Warehouse",
    address: "789 Commerce Dr",
    city: "San Jose",
    state: "CA",
    zip: "95110",
    status: "pending",
    inspections: 5,
    lastInspection: "2024-02-10",
    nextInspection: "2024-04-10",
    assignedTo: "Mike Johnson",
  },
  {
    id: "4",
    name: "North Bay Distribution Center",
    address: "321 Logistics Way",
    city: "Berkeley",
    state: "CA",
    zip: "94704",
    status: "inactive",
    inspections: 12,
    lastInspection: "2024-01-05",
    nextInspection: "TBD",
    assignedTo: "Unassigned",
  },
]

export default function SitesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")

  const filteredSites = mockSites.filter((site) => {
    const matchesSearch =
      site.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      site.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      site.city.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || site.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: Site["status"]) => {
    switch (status) {
      case "active":
        return (
          <Badge className="border-emerald-500/30 bg-emerald-500/10 font-mono text-[10px] text-emerald-400">
            <CheckCircle2 className="mr-1 h-3 w-3" />
            Active
          </Badge>
        )
      case "inactive":
        return (
          <Badge className="border-red-500/30 bg-red-500/10 font-mono text-[10px] text-red-400">
            <AlertCircle className="mr-1 h-3 w-3" />
            Inactive
          </Badge>
        )
      case "pending":
        return (
          <Badge className="border-[#eab308]/30 bg-[#eab308]/10 font-mono text-[10px] text-[#eab308]">
            <Clock className="mr-1 h-3 w-3" />
            Pending
          </Badge>
        )
    }
  }

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-[family-name:var(--font-sentient)] text-3xl text-foreground">Sites</h2>
          <p className="mt-1 font-mono text-sm text-foreground/60">Manage inspection sites and locations</p>
        </div>
        <Button className="bg-[#eab308] font-mono text-xs font-semibold text-black hover:bg-[#eab308]/90">
          <Plus className="mr-2 h-4 w-4" />
          Add New Site
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border-white/10 bg-white/5 p-4 backdrop-blur-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-mono text-xs text-foreground/60">Total Sites</p>
              <p className="mt-1 font-[family-name:var(--font-sentient)] text-2xl font-light text-foreground">
                {mockSites.length}
              </p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-[#eab308]/10">
              <MapPin className="h-5 w-5 text-[#eab308]" />
            </div>
          </div>
        </Card>

        <Card className="border-white/10 bg-white/5 p-4 backdrop-blur-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-mono text-xs text-foreground/60">Active Sites</p>
              <p className="mt-1 font-[family-name:var(--font-sentient)] text-2xl font-light text-emerald-400">
                {mockSites.filter((s) => s.status === "active").length}
              </p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-emerald-500/10">
              <CheckCircle2 className="h-5 w-5 text-emerald-400" />
            </div>
          </div>
        </Card>

        <Card className="border-white/10 bg-white/5 p-4 backdrop-blur-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-mono text-xs text-foreground/60">Pending Sites</p>
              <p className="mt-1 font-[family-name:var(--font-sentient)] text-2xl font-light text-[#eab308]">
                {mockSites.filter((s) => s.status === "pending").length}
              </p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-[#eab308]/10">
              <Clock className="h-5 w-5 text-[#eab308]" />
            </div>
          </div>
        </Card>

        <Card className="border-white/10 bg-white/5 p-4 backdrop-blur-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-mono text-xs text-foreground/60">Total Inspections</p>
              <p className="mt-1 font-[family-name:var(--font-sentient)] text-2xl font-light text-foreground">
                {mockSites.reduce((acc, site) => acc + site.inspections, 0)}
              </p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-white/10">
              <Calendar className="h-5 w-5 text-foreground/60" />
            </div>
          </div>
        </Card>
      </div>

      {/* Filters & Search */}
      <Card className="border-white/10 bg-white/5 p-4 backdrop-blur-md">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground/40" />
            <Input
              placeholder="Search sites by name, address, or city..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border-white/10 bg-white/5 pl-9 font-mono text-xs placeholder:text-foreground/40 focus-visible:border-[#eab308]/50 focus-visible:ring-[#eab308]/20"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={statusFilter === "all" ? "default" : "ghost"}
              size="sm"
              onClick={() => setStatusFilter("all")}
              className={
                statusFilter === "all"
                  ? "bg-[#eab308] font-mono text-xs text-black hover:bg-[#eab308]/90"
                  : "font-mono text-xs text-foreground/60 hover:text-foreground"
              }
            >
              All
            </Button>
            <Button
              variant={statusFilter === "active" ? "default" : "ghost"}
              size="sm"
              onClick={() => setStatusFilter("active")}
              className={
                statusFilter === "active"
                  ? "bg-emerald-500 font-mono text-xs text-black hover:bg-emerald-500/90"
                  : "font-mono text-xs text-foreground/60 hover:text-foreground"
              }
            >
              Active
            </Button>
            <Button
              variant={statusFilter === "pending" ? "default" : "ghost"}
              size="sm"
              onClick={() => setStatusFilter("pending")}
              className={
                statusFilter === "pending"
                  ? "bg-[#eab308] font-mono text-xs text-black hover:bg-[#eab308]/90"
                  : "font-mono text-xs text-foreground/60 hover:text-foreground"
              }
            >
              Pending
            </Button>
            <Button
              variant={statusFilter === "inactive" ? "default" : "ghost"}
              size="sm"
              onClick={() => setStatusFilter("inactive")}
              className={
                statusFilter === "inactive"
                  ? "bg-red-500 font-mono text-xs text-black hover:bg-red-500/90"
                  : "font-mono text-xs text-foreground/60 hover:text-foreground"
              }
            >
              Inactive
            </Button>
          </div>
        </div>
      </Card>

      {/* Sites List */}
      <div className="space-y-3">
        {filteredSites.map((site) => (
          <Card
            key={site.id}
            className="border-white/10 bg-white/5 p-5 backdrop-blur-md transition-all hover:bg-white/[0.07]"
          >
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              {/* Site Info */}
              <div className="flex-1 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-[family-name:var(--font-sentient)] text-lg text-foreground">{site.name}</h3>
                      {getStatusBadge(site.status)}
                    </div>
                    <div className="mt-1 flex items-center gap-1 font-mono text-xs text-foreground/60">
                      <MapPin className="h-3 w-3" />
                      <span>
                        {site.address}, {site.city}, {site.state} {site.zip}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Stats Row */}
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-foreground/40" />
                    <div>
                      <p className="font-mono text-[10px] uppercase text-foreground/40">Last Inspection</p>
                      <p className="font-mono text-xs text-foreground">{site.lastInspection}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-[#eab308]" />
                    <div>
                      <p className="font-mono text-[10px] uppercase text-foreground/40">Next Inspection</p>
                      <p className="font-mono text-xs text-[#eab308]">{site.nextInspection}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-foreground/40" />
                    <div>
                      <p className="font-mono text-[10px] uppercase text-foreground/40">Total Inspections</p>
                      <p className="font-mono text-xs text-foreground">{site.inspections}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#eab308]/10">
                      <span className="font-mono text-[10px] font-semibold text-[#eab308]">
                        {site.assignedTo
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                    <div>
                      <p className="font-mono text-[10px] uppercase text-foreground/40">Assigned To</p>
                      <p className="font-mono text-xs text-foreground">{site.assignedTo}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="font-mono text-xs text-foreground/60 hover:text-foreground"
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  View Details
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-9 w-9 p-0 text-foreground/60 hover:text-foreground">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-40 border-white/10 bg-[#121212]/95 backdrop-blur-md">
                    <DropdownMenuItem className="font-mono text-xs hover:bg-white/5 focus:bg-white/5">
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Site
                    </DropdownMenuItem>
                    <DropdownMenuItem className="font-mono text-xs hover:bg-white/5 focus:bg-white/5">
                      <Calendar className="mr-2 h-4 w-4" />
                      Schedule Inspection
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-white/10" />
                    <DropdownMenuItem className="font-mono text-xs text-red-400 hover:bg-red-500/10 focus:bg-red-500/10">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete Site
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredSites.length === 0 && (
        <Card className="border-white/10 bg-white/5 p-12 text-center backdrop-blur-md">
          <MapPin className="mx-auto h-12 w-12 text-foreground/20" />
          <h3 className="mt-4 font-[family-name:var(--font-sentient)] text-lg text-foreground">No sites found</h3>
          <p className="mt-2 font-mono text-sm text-foreground/60">Try adjusting your search or filter criteria</p>
        </Card>
      )}
    </div>
  )
}
