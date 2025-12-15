"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  MapPin,
  FileCheck,
  Calendar,
  Search,
  FileText,
  BarChart3,
  Users,
  Settings,
  Menu,
  Bell,
  Sun,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"

const navigationItems = [
  {
    section: "Main",
    items: [
      { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
      { name: "Sites", href: "/admin/sites", icon: MapPin },
      { name: "Templates", href: "/admin/templates", icon: FileCheck },
      { name: "Assignments", href: "/admin/assignments", icon: Calendar },
    ],
  },
  {
    section: "Review",
    items: [
      { name: "Review Findings", href: "/admin/review", icon: Search },
      { name: "Reports", href: "/admin/reports", icon: FileText },
      { name: "Analytics", href: "/admin/analytics", icon: BarChart3 },
    ],
  },
  {
    section: "Admin",
    items: [
      { name: "Users", href: "/admin/users", icon: Users },
      { name: "Settings", href: "/admin/settings", icon: Settings },
    ],
  },
]

function SidebarContent({
  collapsed,
  onNavigate,
}: {
  collapsed: boolean
  onNavigate?: () => void
}) {
  const pathname = usePathname()

  return (
    <div className="flex h-full flex-col">
      {/* Logo Section */}
      <div className="flex items-center gap-2 border-b border-white/10 p-6">
        {!collapsed && (
          <>
            <span className="font-[family-name:var(--font-sentient)] text-xl text-foreground">InspectPro</span>
            <div className="h-2 w-2 rounded-full bg-[#eab308]" />
          </>
        )}
        {collapsed && <div className="h-2 w-2 rounded-full bg-[#eab308]" />}
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-6 overflow-y-auto p-4">
        {navigationItems.map((section) => (
          <div key={section.section}>
            {!collapsed && (
              <p className="mb-2 px-3 font-mono text-[10px] uppercase tracking-wider text-foreground/40">
                {section.section}
              </p>
            )}
            <div className="space-y-1">
              {section.items.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                const navItem = (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onNavigate}
                    className={cn(
                      "flex h-11 items-center gap-3 rounded-md px-3 font-mono text-[11px] uppercase tracking-wide transition-all duration-150",
                      isActive
                        ? "border-l-3 border-[#eab308] bg-[#eab308]/10 pl-[11px] font-semibold text-[#eab308]"
                        : "text-foreground/60 hover:bg-white/5 hover:text-foreground/80",
                      collapsed && "justify-center px-0",
                    )}
                  >
                    <Icon className={cn("h-[18px] w-[18px] shrink-0", collapsed && "h-5 w-5")} />
                    {!collapsed && <span>{item.name}</span>}
                  </Link>
                )

                if (collapsed) {
                  return (
                    <TooltipProvider key={item.href}>
                      <Tooltip>
                        <TooltipTrigger asChild>{navItem}</TooltipTrigger>
                        <TooltipContent side="right" className="border-white/10 bg-[#121212]/95 backdrop-blur-md">
                          {item.name}
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )
                }

                return navItem
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* User Section */}
      <div className="border-t border-white/10 p-4">
        {!collapsed ? (
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback className="bg-[#eab308]/20 text-[#eab308]">AU</AvatarFallback>
            </Avatar>
            <div className="flex-1 overflow-hidden">
              <p className="truncate font-mono text-xs font-medium text-foreground">Admin User</p>
              <Badge className="h-4 bg-[#eab308]/20 px-1.5 font-mono text-[9px] text-[#eab308]">ADMIN</Badge>
            </div>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-foreground/60 hover:text-foreground">
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div className="flex justify-center">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback className="bg-[#eab308]/20 text-[#eab308]">AU</AvatarFallback>
            </Avatar>
          </div>
        )}
      </div>
    </div>
  )
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  // Load sidebar preference from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("sidebar-collapsed")
    if (saved !== null) {
      setCollapsed(JSON.parse(saved))
    }
  }, [])

  // Save sidebar preference
  const toggleCollapsed = () => {
    const newState = !collapsed
    setCollapsed(newState)
    localStorage.setItem("sidebar-collapsed", JSON.stringify(newState))
  }

  // Get current page title
  const getCurrentPageTitle = () => {
    const allItems = navigationItems.flatMap((section) => section.items)
    const current = allItems.find((item) => item.href === pathname)
    return current?.name || "Dashboard"
  }

  return (
    <div className="relative min-h-screen bg-[#0a0a0a]">
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-40 hidden h-screen border-r border-white/[0.3] bg-[#121212]/80 backdrop-blur-md transition-all duration-300 lg:block",
          collapsed ? "w-20" : "w-[280px]",
        )}
      >
        <SidebarContent collapsed={collapsed} />

        {/* Collapse Toggle Button */}
        <button
          onClick={toggleCollapsed}
          className="absolute -right-3 top-20 flex h-6 w-6 items-center justify-center rounded-full border border-white/10 bg-[#121212] text-foreground/60 transition-colors hover:bg-[#eab308]/10 hover:text-[#eab308]"
        >
          {collapsed ? <ChevronRight className="h-3 w-3" /> : <ChevronLeft className="h-3 w-3" />}
        </button>
      </aside>

      {/* Mobile Sidebar */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="w-[280px] border-white/[0.3] bg-[#121212]/95 p-0 backdrop-blur-md">
          <SidebarContent collapsed={false} onNavigate={() => setMobileOpen(false)} />
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className={cn("transition-all duration-300", "lg:pl-20", !collapsed && "lg:pl-[280px]")}>
        {/* Header */}
        <header className="sticky top-0 z-30 h-[72px] border-b border-white/[0.3] bg-[#121212]/80 backdrop-blur-md">
          <div className="flex h-full items-center justify-between px-6 lg:px-8">
            {/* Left Section */}
            <div className="flex items-center gap-4">
              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="sm"
                className="h-9 w-9 p-0 text-foreground lg:hidden"
                onClick={() => setMobileOpen(true)}
              >
                <Menu className="h-5 w-5" />
              </Button>

              <div>
                <h1 className="font-[family-name:var(--font-sentient)] text-2xl text-foreground">
                  {getCurrentPageTitle()}
                </h1>
                <p className="font-mono text-xs text-foreground/40">Admin / {getCurrentPageTitle()}</p>
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-3">
              {/* Notifications */}
              <Button
                variant="ghost"
                size="sm"
                className="relative h-9 w-9 p-0 text-foreground/60 hover:text-foreground"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#eab308] font-mono text-[10px] font-semibold text-black">
                  3
                </span>
              </Button>

              {/* Theme Toggle */}
              <Button variant="ghost" size="sm" className="h-9 w-9 p-0 text-foreground/60 hover:text-foreground">
                <Sun className="h-5 w-5" />
              </Button>

              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2 rounded-md p-1 transition-colors hover:bg-white/5">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback className="bg-[#eab308]/20 text-[#eab308]">AU</AvatarFallback>
                    </Avatar>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 border-white/10 bg-[#121212]/95 backdrop-blur-md">
                  <DropdownMenuItem className="font-mono text-xs hover:bg-white/5 focus:bg-white/5">
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem className="font-mono text-xs hover:bg-white/5 focus:bg-white/5">
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-white/10" />
                  <DropdownMenuItem className="font-mono text-xs text-red-400 hover:bg-red-500/10 focus:bg-red-500/10">
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="min-h-[calc(100vh-72px)] p-8">
          <div className="mx-auto max-w-[1400px]">{children}</div>
        </main>
      </div>
    </div>
  )
}
