"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Loader2, Upload } from "lucide-react"
import { getUserProfile, updateProfile, type UpdateProfileData } from "@/lib/api/settings"
import { useToast } from "@/hooks/use-toast"

export function ProfileSection() {
    const { toast } = useToast()
    const [loading, setLoading] = React.useState(true)
    const [saving, setSaving] = React.useState(false)
    const [profile, setProfile] = React.useState<any>(null)
    const [formData, setFormData] = React.useState<UpdateProfileData>({
        name: '',
        displayName: '',
        bio: '',
    })

    React.useEffect(() => {
        loadProfile()
    }, [])

    const loadProfile = async () => {
        try {
            const data = await getUserProfile()
            setProfile(data)
            setFormData({
                name: data.name || '',
                displayName: data.displayName || '',
                bio: data.bio || '',
            })
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to load profile",
                variant: "destructive",
            })
        } finally {
            setLoading(false)
        }
    }

    const handleSave = async () => {
        setSaving(true)
        try {
            const updated = await updateProfile(formData)
            setProfile(updated)
            toast({
                title: "Success",
                description: "Profile updated successfully",
            })
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to update profile",
                variant: "destructive",
            })
        } finally {
            setSaving(false)
        }
    }

    const bioLength = formData.bio?.length || 0
    const bioMaxLength = 120

    if (loading) {
        return (
            <Card>
                <CardContent className="flex items-center justify-center py-12">
                    <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                </CardContent>
            </Card>
        )
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                    Update your profile details and how you appear in IntelliMock
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Profile Photo */}
                <div className="space-y-2">
                    <Label>Profile Photo</Label>
                    <div className="flex items-center gap-4">
                        <Avatar className="h-20 w-20">
                            <AvatarImage src={profile?.avatarOverride || profile?.avatar} />
                            <AvatarFallback>
                                {profile?.name?.charAt(0)?.toUpperCase() || 'U'}
                            </AvatarFallback>
                        </Avatar>
                        <div className="space-y-2">
                            <Button variant="outline" size="sm" disabled>
                                <Upload className="h-4 w-4 mr-2" />
                                Upload New Photo
                            </Button>
                            <p className="text-xs text-muted-foreground">
                                Using OAuth avatar from {profile?.provider}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Full Name */}
                <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Enter your full name"
                        maxLength={100}
                    />
                </div>

                {/* Display Name */}
                <div className="space-y-2">
                    <Label htmlFor="displayName">Display Name / Username</Label>
                    <Input
                        id="displayName"
                        value={formData.displayName}
                        onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                        placeholder="How you want to be called"
                        maxLength={50}
                    />
                </div>

                {/* Bio */}
                <div className="space-y-2">
                    <Label htmlFor="bio">Short Bio</Label>
                    <Textarea
                        id="bio"
                        value={formData.bio}
                        onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                        placeholder="Tell us a bit about yourself"
                        maxLength={bioMaxLength}
                        rows={3}
                    />
                    <p className="text-xs text-muted-foreground text-right">
                        {bioLength}/{bioMaxLength} characters
                    </p>
                </div>

                {/* Email (Read-only) */}
                <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                        id="email"
                        value={profile?.email || ''}
                        disabled
                        className="bg-muted"
                    />
                    <p className="text-xs text-muted-foreground">
                        Email cannot be changed (managed by OAuth provider)
                    </p>
                </div>

                {/* OAuth Provider */}
                <div className="space-y-2">
                    <Label>Authentication Provider</Label>
                    <div>
                        <Badge variant="outline" className="capitalize">
                            {profile?.provider || 'Unknown'}
                        </Badge>
                    </div>
                </div>

                {/* Save Button */}
                <div className="flex justify-end pt-4">
                    <Button onClick={handleSave} disabled={saving}>
                        {saving && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                        Save Changes
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}
