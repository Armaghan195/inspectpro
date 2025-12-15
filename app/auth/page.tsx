"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

export default function AuthPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState<"signin" | "signup">("signin")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Auth logic will go here
    setTimeout(() => setIsLoading(false), 2000)
  }

  return (
    <div className="relative min-h-screen bg-[#0a0a0a]">
      {/* Navigation Bar */}
      <header className="fixed top-0 z-50 w-full border-b border-white/[0.3] bg-[#121212]/80 backdrop-blur-md">
        <div className="container flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="font-[family-name:var(--font-sentient)] text-2xl text-foreground">InspectPro</span>
            <div className="h-2 w-2 rounded-full bg-[#eab308]" />
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="font-mono text-xs uppercase tracking-wider text-foreground/60 transition-colors hover:text-foreground"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex min-h-screen items-center justify-center px-4 pt-20">
        <div className="absolute inset-0 bg-gradient-to-br from-[#eab308]/5 via-transparent to-transparent pointer-events-none" />

        <div className="relative z-10 w-full max-w-[480px]">
          <div className="rounded-xl border border-white/[0.3] bg-[#121212]/80 p-12 shadow-2xl backdrop-blur-md">
            <div className="mb-8 rounded-lg bg-white/[0.03] p-1">
              <div className="grid grid-cols-2 gap-1">
                <button
                  onClick={() => setActiveTab("signin")}
                  className={`rounded-md px-6 py-3 font-mono text-xs uppercase tracking-wider transition-all duration-150 ${
                    activeTab === "signin"
                      ? "bg-[#eab308]/10 font-semibold text-[#eab308] shadow-[0_0_20px_rgba(234,179,8,0.15)]"
                      : "text-foreground/50 hover:bg-white/5 hover:text-foreground/70"
                  }`}
                >
                  Sign In
                </button>
                <button
                  onClick={() => setActiveTab("signup")}
                  className={`rounded-md px-6 py-3 font-mono text-xs uppercase tracking-wider transition-all duration-150 ${
                    activeTab === "signup"
                      ? "bg-[#eab308]/10 font-semibold text-[#eab308] shadow-[0_0_20px_rgba(234,179,8,0.15)]"
                      : "text-foreground/50 hover:bg-white/5 hover:text-foreground/70"
                  }`}
                >
                  Sign Up
                </button>
              </div>
            </div>

            <p className="mb-8 text-center font-mono text-sm text-foreground/60">
              Welcome back to the future of inspections
            </p>

            {/* Sign In Form */}
            {activeTab === "signin" && (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="email" className="font-mono text-[11px] uppercase tracking-wide text-foreground/60">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    required
                    className="h-12 border-white/[0.3] bg-white/[0.03] font-mono text-sm focus:border-[#eab308] focus:ring-[#eab308]/20"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label
                      htmlFor="password"
                      className="font-mono text-[11px] uppercase tracking-wide text-foreground/60"
                    >
                      Password
                    </Label>
                    <Link
                      href="/auth/forgot-password"
                      className="font-mono text-xs text-[#eab308] transition-colors hover:text-[#eab308]/80"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      required
                      className="h-12 border-white/[0.3] bg-white/[0.03] pr-10 font-mono text-sm focus:border-[#eab308] focus:ring-[#eab308]/20"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/40 hover:text-foreground/60"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 bg-gradient-to-br from-[#eab308] to-[#ca8a04] font-mono text-xs uppercase tracking-wider font-semibold text-black hover:from-[#fbbf24] hover:to-[#eab308] hover:shadow-[0_4px_24px_rgba(234,179,8,0.4)] active:translate-y-0 hover:-translate-y-0.5 transition-all"
                  disabled={isLoading}
                >
                  {isLoading ? "Signing in..." : "Sign In"}
                </Button>
              </form>
            )}

            {/* Sign Up Form */}
            {activeTab === "signup" && (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="firstname"
                      className="font-mono text-[11px] uppercase tracking-wide text-foreground/60"
                    >
                      First Name
                    </Label>
                    <Input
                      id="firstname"
                      type="text"
                      placeholder="John"
                      required
                      className="h-12 border-white/[0.3] bg-white/[0.03] font-mono text-sm focus:border-[#eab308] focus:ring-[#eab308]/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="lastname"
                      className="font-mono text-[11px] uppercase tracking-wide text-foreground/60"
                    >
                      Last Name
                    </Label>
                    <Input
                      id="lastname"
                      type="text"
                      placeholder="Doe"
                      required
                      className="h-12 border-white/[0.3] bg-white/[0.03] font-mono text-sm focus:border-[#eab308] focus:ring-[#eab308]/20"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="signup-email"
                    className="font-mono text-[11px] uppercase tracking-wide text-foreground/60"
                  >
                    Email
                  </Label>
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder="name@example.com"
                    required
                    className="h-12 border-white/[0.3] bg-white/[0.03] font-mono text-sm focus:border-[#eab308] focus:ring-[#eab308]/20"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="signup-password"
                    className="font-mono text-[11px] uppercase tracking-wide text-foreground/60"
                  >
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="signup-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      required
                      className="h-12 border-white/[0.3] bg-white/[0.03] pr-10 font-mono text-sm focus:border-[#eab308] focus:ring-[#eab308]/20"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/40 hover:text-foreground/60"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="confirm-password"
                    className="font-mono text-[11px] uppercase tracking-wide text-foreground/60"
                  >
                    Confirm Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="confirm-password"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="••••••••"
                      required
                      className="h-12 border-white/[0.3] bg-white/[0.03] pr-10 font-mono text-sm focus:border-[#eab308] focus:ring-[#eab308]/20"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/40 hover:text-foreground/60"
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 bg-gradient-to-br from-[#eab308] to-[#ca8a04] font-mono text-xs uppercase tracking-wider font-semibold text-black hover:from-[#fbbf24] hover:to-[#eab308] hover:shadow-[0_4px_24px_rgba(234,179,8,0.4)] active:translate-y-0 hover:-translate-y-0.5 transition-all"
                  disabled={isLoading}
                >
                  {isLoading ? "Creating account..." : "Create Account"}
                </Button>

                <p className="text-center font-mono text-xs text-foreground/60">
                  By signing up, you agree to our{" "}
                  <Link href="/terms" className="text-[#eab308] transition-colors hover:text-[#eab308]/80">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="text-[#eab308] transition-colors hover:text-[#eab308]/80">
                    Privacy Policy
                  </Link>
                </p>
              </form>
            )}

            <div className="relative my-8">
              <Separator className="bg-white/[0.3]" />
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#121212] px-3 font-mono text-[11px] uppercase tracking-wider text-foreground/40">
                Or Continue With
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button
                variant="ghost"
                className="h-12 border border-white/[0.3] bg-white/[0.05] font-mono text-sm text-foreground/80 hover:border-white/50 hover:bg-white/[0.08]"
              >
                <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Google
              </Button>
              <Button
                variant="ghost"
                className="h-12 border border-white/[0.3] bg-white/[0.05] font-mono text-sm text-foreground/80 hover:border-white/50 hover:bg-white/[0.08]"
              >
                <svg className="mr-2 h-5 w-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                GitHub
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
