"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import { useState } from "react"
import Link from "next/link"
import { createAdminAccount } from "@/app/actions/admin-actions"

export default function AdminSignupPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [authPin, setAuthPin] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    // Validate passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match")
      setIsLoading(false)
      return
    }

    // Validate password strength
    if (password.length < 8) {
      setError("Password must be at least 8 characters long")
      setIsLoading(false)
      return
    }

    try {
      const result = await createAdminAccount(email, password, authPin)

      if (result.success) {
        router.push("/admin/login")
      } else {
        setError(result.error || "Failed to create account")
      }
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center p-6 md:p-10 bg-muted/30">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <div className="flex justify-center mb-4">
            <Link href="/">
              <img src="/goldrock-safaris-logo.png" alt="Goldrock Safaris" className="h-16 w-auto" />
            </Link>
          </div>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Admin Registration</CardTitle>
              <CardDescription>Create a new admin account with authorization</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSignup}>
                <div className="flex flex-col gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="admin@goldrocksafaris.com"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Minimum 8 characters"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="authPin">Authorization PIN</Label>
                    <Input
                      id="authPin"
                      type="password"
                      required
                      value={authPin}
                      onChange={(e) => setAuthPin(e.target.value)}
                      placeholder="Enter authorization PIN"
                    />
                  </div>
                  {error && (
                    <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-md">
                      <p className="text-sm text-destructive">{error}</p>
                    </div>
                  )}
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Creating Account..." : "Create Admin Account"}
                  </Button>
                </div>
              </form>
              <div className="mt-4 text-center space-y-2">
                <Link href="/admin/login" className="text-sm text-muted-foreground hover:text-primary block">
                  Already have an account? Login
                </Link>
                <Link href="/" className="text-sm text-muted-foreground hover:text-primary block">
                  Back to Home
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
