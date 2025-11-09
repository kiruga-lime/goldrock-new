"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Lock } from "lucide-react"
import { useEffect } from "react"

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isChangingPassword, setIsChangingPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    email: "",
  })

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    adminPin: "",
  })

  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (user) {
        setUser(user)
        setFormData({ email: user.email || "" })
      }
    }
    getUser()
  }, [])

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccessMessage(null)

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError("New passwords do not match")
      return
    }

    if (passwordData.newPassword.length < 6) {
      setError("Password must be at least 6 characters")
      return
    }

    if (passwordData.adminPin !== process.env.NEXT_PUBLIC_ADMIN_PIN) {
      setError("Incorrect admin PIN")
      return
    }

    setIsLoading(true)

    try {
      const { error } = await supabase.auth.updateUser({
        password: passwordData.newPassword,
      })

      if (error) {
        setError(error.message)
      } else {
        setSuccessMessage("Password updated successfully")
        setPasswordData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
          adminPin: "",
        })
        setIsChangingPassword(false)
      }
    } catch (err) {
      setError("An error occurred while updating password")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-foreground">My Profile</h1>
        <p className="text-muted-foreground mt-2">Manage your admin account settings</p>
      </div>

      {/* Profile Information */}
      <Card>
        <CardHeader>
          <CardTitle>Account Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {user && (
            <div className="space-y-4">
              <div>
                <Label className="text-muted-foreground">Email Address</Label>
                <p className="text-lg font-medium mt-1">{user.email}</p>
              </div>
              <div>
                <Label className="text-muted-foreground">Account Status</Label>
                <p className="text-lg font-medium mt-1 text-green-600">Active</p>
              </div>
              <div>
                <Label className="text-muted-foreground">Admin Since</Label>
                <p className="text-lg font-medium mt-1">{new Date(user.created_at).toLocaleDateString()}</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Change Password */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5" />
            Security
          </CardTitle>
        </CardHeader>
        <CardContent>
          {!isChangingPassword ? (
            <Button onClick={() => setIsChangingPassword(true)}>Change Password</Button>
          ) : (
            <form onSubmit={handlePasswordChange} className="space-y-4 max-w-md">
              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <Input
                  id="newPassword"
                  type="password"
                  placeholder="Enter new password"
                  value={passwordData.newPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm new password"
                  value={passwordData.confirmPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="adminPin">Admin PIN (required)</Label>
                <Input
                  id="adminPin"
                  type="password"
                  placeholder="Enter admin PIN"
                  value={passwordData.adminPin}
                  onChange={(e) => setPasswordData({ ...passwordData, adminPin: e.target.value })}
                  required
                />
              </div>

              {error && (
                <div className="p-3 bg-destructive/10 border border-destructive/30 rounded text-sm text-destructive">
                  {error}
                </div>
              )}

              {successMessage && (
                <div className="p-3 bg-green-100/50 border border-green-300 rounded text-sm text-green-700">
                  {successMessage}
                </div>
              )}

              <div className="flex gap-3">
                <Button type="submit" disabled={isLoading}>
                  {isLoading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                  Update Password
                </Button>
                <Button type="button" variant="outline" onClick={() => setIsChangingPassword(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
