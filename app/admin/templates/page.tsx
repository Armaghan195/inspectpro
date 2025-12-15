"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Plus,
  Filter,
  FileCheck,
  Clock,
  Eye,
  Edit,
  MoreVertical,
  Copy,
  History,
  Trash,
  Lock,
  CheckSquare,
  Type,
  Hash,
  AlertTriangle,
  Search,
} from "lucide-react"

interface Template {
  id: string
  name: string
  description: string
  version: string
  items: number
  estimatedTime: string
  usedIn: number
  status: "draft" | "published" | "frozen"
  category: string
  lastModified: string
}

interface ChecklistItem {
  id: string
  question: string
  type: "yes-no" | "text" | "numeric" | "severity"
}

const mockTemplates: Template[] = [
  {
    id: "TMPL-001",
    name: "Monthly Safety Inspection",
    description: "Comprehensive monthly safety checklist for hostel facilities",
    version: "2.0",
    items: 24,
    estimatedTime: "15 min",
    usedIn: 12,
    status: "published",
    category: "Safety",
    lastModified: "2024-12-10",
  },
  {
    id: "TMPL-002",
    name: "Electrical Systems Check",
    description: "Detailed electrical infrastructure inspection protocol",
    version: "1.5",
    items: 18,
    estimatedTime: "20 min",
    usedIn: 8,
    status: "published",
    category: "Maintenance",
    lastModified: "2024-12-08",
  },
  {
    id: "TMPL-003",
    name: "Fire Safety Audit",
    description: "Complete fire safety equipment and protocol verification",
    version: "3.1",
    items: 32,
    estimatedTime: "30 min",
    usedIn: 24,
    status: "frozen",
    category: "Safety",
    lastModified: "2024-11-15",
  },
  {
    id: "TMPL-004",
    name: "Plumbing & Water Systems",
    description: "Water supply, drainage, and sanitation inspection",
    version: "1.0",
    items: 16,
    estimatedTime: "12 min",
    usedIn: 5,
    status: "published",
    category: "Maintenance",
    lastModified: "2024-12-05",
  },
  {
    id: "TMPL-005",
    name: "Room Condition Assessment",
    description: "Individual room inspection for cleanliness and damage",
    version: "1.0",
    items: 12,
    estimatedTime: "8 min",
    usedIn: 0,
    status: "draft",
    category: "General",
    lastModified: "2024-12-14",
  },
  {
    id: "TMPL-006",
    name: "HVAC Systems Inspection",
    description: "Heating, ventilation, and air conditioning maintenance check",
    version: "2.2",
    items: 20,
    estimatedTime: "25 min",
    usedIn: 15,
    status: "published",
    category: "Maintenance",
    lastModified: "2024-12-01",
  },
]

export default function TemplatesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [builderOpen, setBuilderOpen] = useState(false)
  const [checklistItems, setChecklistItems] = useState<ChecklistItem[]>([])

  const filteredTemplates = mockTemplates.filter((template) => {
    const matchesSearch =
      template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.category.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || template.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: Template["status"]) => {
    switch (status) {
      case "draft":
        return (
          <span className="rounded-md bg-[#6b7280]/10 px-2.5 py-1 font-mono text-xs uppercase text-[#6b7280]">
            Draft
          </span>
        )
      case "published":
        return (
          <span className="rounded-md bg-[#10b981]/10 px-2.5 py-1 font-mono text-xs uppercase text-[#10b981]">
            Published
          </span>
        )
      case "frozen":
        return (
          <span className="flex items-center gap-1 rounded-md bg-[#3b82f6]/10 px-2.5 py-1 font-mono text-xs uppercase text-[#3b82f6]">
            <Lock className="h-3 w-3" />
            Frozen
          </span>
        )
    }
  }

  const addChecklistItem = (type: ChecklistItem["type"]) => {
    const newItem: ChecklistItem = {
      id: `item-${Date.now()}`,
      question: "New inspection item",
      type,
    }
    setChecklistItems([...checklistItems, newItem])
  }

  const removeChecklistItem = (id: string) => {
    setChecklistItems(checklistItems.filter((item) => item.id !== id))
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="mb-2 font-[family-name:var(--font-sentient)] text-3xl">Inspection Templates</h1>
        <p className="font-mono text-sm text-foreground/60">Create and manage reusable inspection checklists</p>
      </div>

      {/* Action Bar */}
      <Card className="flex flex-col gap-3 border-white/10 bg-white/5 p-4 backdrop-blur-md sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground/40" />
          <Input
            placeholder="Search templates by name or category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-10 border-white/30 bg-white/[0.03] pl-9 font-mono text-xs placeholder:text-foreground/40 focus-visible:border-[#eab308] focus-visible:ring-[#eab308]/20"
          />
        </div>

        <div className="flex gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="h-10 w-[180px] border-white/30 bg-white/[0.03]">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Templates</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="frozen">Frozen</SelectItem>
            </SelectContent>
          </Select>

          <Button
            onClick={() => setBuilderOpen(true)}
            className="bg-[#eab308] font-mono text-sm uppercase text-black hover:bg-[#eab308]/90"
          >
            <Plus className="mr-2 h-4 w-4" />
            Create Template
          </Button>
        </div>
      </Card>

      {/* Templates Grid */}
      {filteredTemplates.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredTemplates.map((template) => (
            <Card
              key={template.id}
              className="group relative min-h-[240px] border-white/10 bg-white/5 p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.07]"
            >
              {/* Header */}
              <div className="mb-4 flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="mb-1 line-clamp-1 text-lg font-semibold">{template.name}</h3>
                  <p className="font-mono text-xs text-foreground/50">
                    v{template.version} • {template.id}
                  </p>
                </div>
                {getStatusBadge(template.status)}
              </div>

              {/* Description */}
              <p className="mb-4 line-clamp-2 text-sm text-foreground/60">{template.description}</p>

              {/* Stats */}
              <div className="mb-4 flex items-center gap-4 border-b border-white/10 pb-4">
                <div className="flex items-center gap-2 text-sm">
                  <FileCheck className="h-4 w-4 text-foreground/50" />
                  <span className="font-mono text-foreground/60">{template.items} items</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-foreground/50" />
                  <span className="font-mono text-foreground/60">~{template.estimatedTime}</span>
                </div>
              </div>

              {/* Usage Stats */}
              <div className="mb-4 font-mono text-xs text-foreground/50">Used in {template.usedIn} inspections</div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="h-9 flex-1 border-white/20 font-mono text-xs uppercase hover:border-white/40 hover:bg-white/5 bg-transparent"
                >
                  <Eye className="mr-1.5 h-3.5 w-3.5" />
                  Preview
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="h-9 flex-1 border-white/20 font-mono text-xs uppercase hover:border-white/40 hover:bg-white/5 bg-transparent"
                  onClick={() => setBuilderOpen(true)}
                >
                  <Edit className="mr-1.5 h-3.5 w-3.5" />
                  Edit
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-9 w-9 border-white/20 p-0 hover:border-white/40 hover:bg-white/5 bg-transparent"
                    >
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="border-white/10 bg-[#121212]/95 backdrop-blur-md">
                    <DropdownMenuItem className="font-mono text-xs hover:bg-white/5 focus:bg-white/5">
                      <Copy className="mr-2 h-4 w-4" />
                      Duplicate
                    </DropdownMenuItem>
                    <DropdownMenuItem className="font-mono text-xs hover:bg-white/5 focus:bg-white/5">
                      <History className="mr-2 h-4 w-4" />
                      Version History
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-white/10" />
                    <DropdownMenuItem className="font-mono text-xs text-red-400 hover:bg-red-500/10 focus:bg-red-500/10">
                      <Trash className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        // Empty State
        <Card className="border-white/10 bg-white/5 p-20 text-center backdrop-blur-md">
          <FileCheck className="mx-auto mb-4 h-16 w-16 text-foreground/20" />
          <h3 className="mb-2 font-[family-name:var(--font-sentient)] text-xl">No templates found</h3>
          <p className="mb-6 font-mono text-sm text-foreground/60">
            {searchQuery || statusFilter !== "all"
              ? "Try adjusting your search or filter criteria"
              : "Create your first inspection checklist template to get started"}
          </p>
          <Button
            onClick={() => setBuilderOpen(true)}
            className="bg-[#eab308] font-mono text-sm uppercase text-black hover:bg-[#eab308]/90"
          >
            <Plus className="mr-2 h-4 w-4" />
            Create Template
          </Button>
        </Card>
      )}

      {/* Template Builder Dialog */}
      <Dialog open={builderOpen} onOpenChange={setBuilderOpen}>
        <DialogContent className="max-w-7xl border-white/10 bg-[#0a0a0a] p-0">
          <DialogHeader className="border-b border-white/10 p-6">
            <DialogTitle className="font-[family-name:var(--font-sentient)] text-2xl">Create Template</DialogTitle>
            <DialogDescription className="font-mono text-sm text-foreground/60">
              Build a new inspection checklist template
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-6 p-6 lg:grid-cols-5">
            {/* LEFT PANEL - Template Settings */}
            <div className="space-y-6 lg:col-span-2">
              {/* Template Info */}
              <div className="space-y-4 rounded-lg border border-white/10 bg-white/[0.03] p-4">
                <div>
                  <Label className="mb-2 font-mono text-xs uppercase text-foreground/60">Template Name*</Label>
                  <Input
                    placeholder="e.g., Monthly Safety Inspection"
                    className="h-12 border-white/30 bg-white/[0.03] font-mono focus-visible:border-[#eab308]"
                  />
                </div>

                <div>
                  <Label className="mb-2 font-mono text-xs uppercase text-foreground/60">Description</Label>
                  <Textarea
                    placeholder="Brief description of this inspection checklist"
                    rows={3}
                    className="border-white/30 bg-white/[0.03] font-mono focus-visible:border-[#eab308]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="mb-2 font-mono text-xs uppercase text-foreground/60">Category</Label>
                    <Select>
                      <SelectTrigger className="h-12 border-white/30 bg-white/[0.03]">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="safety">Safety</SelectItem>
                        <SelectItem value="maintenance">Maintenance</SelectItem>
                        <SelectItem value="general">General</SelectItem>
                        <SelectItem value="quality">Quality</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="mb-2 font-mono text-xs uppercase text-foreground/60">Est. Time</Label>
                    <Input
                      placeholder="15 min"
                      className="h-12 border-white/30 bg-white/[0.03] font-mono focus-visible:border-[#eab308]"
                    />
                  </div>
                </div>
              </div>

              {/* Add Item Section */}
              <div>
                <h3 className="mb-3 font-mono text-xs uppercase text-foreground/60">Add Checklist Item</h3>

                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant="outline"
                    onClick={() => addChecklistItem("yes-no")}
                    className="h-24 flex-col gap-2 border-white/20 hover:border-[#eab308] hover:bg-[#eab308]/5"
                  >
                    <CheckSquare className="h-5 w-5" />
                    <span className="font-mono text-xs">Yes/No</span>
                  </Button>

                  <Button
                    variant="outline"
                    onClick={() => addChecklistItem("text")}
                    className="h-24 flex-col gap-2 border-white/20 hover:border-[#eab308] hover:bg-[#eab308]/5"
                  >
                    <Type className="h-5 w-5" />
                    <span className="font-mono text-xs">Text Input</span>
                  </Button>

                  <Button
                    variant="outline"
                    onClick={() => addChecklistItem("numeric")}
                    className="h-24 flex-col gap-2 border-white/20 hover:border-[#eab308] hover:bg-[#eab308]/5"
                  >
                    <Hash className="h-5 w-5" />
                    <span className="font-mono text-xs">Numeric</span>
                  </Button>

                  <Button
                    variant="outline"
                    onClick={() => addChecklistItem("severity")}
                    className="h-24 flex-col gap-2 border-white/20 hover:border-[#eab308] hover:bg-[#eab308]/5"
                  >
                    <AlertTriangle className="h-5 w-5" />
                    <span className="font-mono text-xs">Severity</span>
                  </Button>
                </div>
              </div>
            </div>

            {/* RIGHT PANEL - Live Preview */}
            <div className="lg:col-span-3">
              <div className="h-[600px] overflow-y-auto rounded-lg border border-white/10 bg-white/[0.02] p-6">
                <div className="mb-6 flex items-center justify-between">
                  <h3 className="font-[family-name:var(--font-sentient)] text-xl">Checklist Preview</h3>
                  <span className="font-mono text-xs text-foreground/50">{checklistItems.length} items</span>
                </div>

                {checklistItems.length === 0 ? (
                  // Empty Preview State
                  <div className="flex h-64 flex-col items-center justify-center text-center">
                    <FileCheck className="mb-4 h-12 w-12 text-foreground/20" />
                    <p className="font-mono text-sm text-foreground/50">Add items to see preview</p>
                  </div>
                ) : (
                  // Preview Items
                  <div className="space-y-3">
                    {checklistItems.map((item, index) => (
                      <div key={item.id} className="group rounded-lg border border-white/10 bg-white/[0.03] p-4">
                        <div className="mb-2 flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div className="font-mono text-xs text-foreground/50">{index + 1}.</div>
                            <div>
                              <p className="text-sm font-medium">{item.question}</p>
                              <p className="mt-1 font-mono text-xs text-foreground/50">
                                {item.type === "yes-no" && "Yes/No Question"}
                                {item.type === "text" && "Text Input"}
                                {item.type === "numeric" && "Numeric Input"}
                                {item.type === "severity" && "Severity Rating"}
                              </p>
                            </div>
                          </div>
                          <div className="flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                            <Button size="sm" variant="ghost" className="h-7 w-7 p-0">
                              <Edit className="h-3.5 w-3.5" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-7 w-7 p-0 text-red-500"
                              onClick={() => removeChecklistItem(item.id)}
                            >
                              <Trash className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        </div>

                        {/* Item Controls Preview */}
                        <div className="mt-3">
                          {item.type === "yes-no" && (
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline" className="h-8 px-4 text-xs bg-transparent">
                                Yes
                              </Button>
                              <Button size="sm" variant="outline" className="h-8 px-4 text-xs bg-transparent">
                                No
                              </Button>
                            </div>
                          )}
                          {item.type === "text" && (
                            <Input
                              placeholder="Enter notes..."
                              className="h-10 border-white/30 bg-white/[0.03]"
                              disabled
                            />
                          )}
                          {item.type === "numeric" && (
                            <Input
                              type="number"
                              placeholder="Enter value"
                              className="h-10 w-32 border-white/30 bg-white/[0.03]"
                              disabled
                            />
                          )}
                          {item.type === "severity" && (
                            <div className="flex gap-2">
                              <Button size="sm" className="bg-[#10b981]/10 text-[#10b981] hover:bg-[#10b981]/20">
                                Low
                              </Button>
                              <Button size="sm" className="bg-[#f59e0b]/10 text-[#f59e0b] hover:bg-[#f59e0b]/20">
                                Medium
                              </Button>
                              <Button size="sm" className="bg-[#ef4444]/10 text-[#ef4444] hover:bg-[#ef4444]/20">
                                High
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <DialogFooter className="border-t border-white/10 p-6">
            <div className="flex w-full items-center justify-between">
              <Button variant="outline" className="border-white/20 font-mono text-xs uppercase bg-transparent">
                <Eye className="mr-2 h-4 w-4" />
                Preview Template
              </Button>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="border-white/20 font-mono text-xs uppercase bg-transparent"
                  onClick={() => setBuilderOpen(false)}
                >
                  Save as Draft
                </Button>
                <Button className="bg-[#eab308] font-mono text-xs uppercase text-black hover:bg-[#eab308]/90">
                  Publish Template
                </Button>
              </div>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
