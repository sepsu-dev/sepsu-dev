"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Save, Globe, User, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { saveSettingsAction } from "../actions";

interface SettingsFormProps {
  initialSettings: Record<string, string>;
}

export function SettingsForm({ initialSettings }: SettingsFormProps) {
  const [settings, setSettings] = useState<Record<string, string>>(initialSettings);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      const data = await saveSettingsAction(settings);
      setSettings(data.settings);
      toast.success("Settings saved successfully");
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setSaving(false);
    }
  };

  const updateKey = (key: string, value: string) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="w-full space-y-6 py-2 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
          <p className="text-sm text-muted-foreground">
            Edit hero content, bio, and social media text on the landing page.
          </p>
        </div>
        <Button onClick={handleSave} disabled={saving} size="sm" className="w-full sm:w-auto shrink-0 shadow-xs">
          <Save className="mr-2 h-4 w-4" />
          {saving ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      <div className="grid gap-6">
        {/* Section 1: Profile & Identity */}
        <Card className="border-border/60 shadow-none">
          <CardHeader className="pb-4 flex flex-row items-center gap-3">
            <div className="p-2 bg-blue-500/10 text-blue-500 rounded-lg">
              <User className="h-4 w-4" />
            </div>
            <div>
              <CardTitle className="text-base font-semibold">Profile & Identity</CardTitle>
              <CardDescription>General information about you on the landing page.</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 pt-2">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field>
                <FieldLabel htmlFor="site_name">Site Name / Full Name</FieldLabel>
                <Input
                  id="site_name"
                  placeholder="e.g. Sepsu Dev"
                  value={settings.site_name ?? ""}
                  onChange={(e) => updateKey("site_name", e.target.value)}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="role">Role / Job Title</FieldLabel>
                <Input
                  id="role"
                  placeholder="e.g. Full-stack Engineer"
                  value={settings.role ?? ""}
                  onChange={(e) => updateKey("role", e.target.value)}
                />
              </Field>
            </div>
            <Field>
              <FieldLabel htmlFor="bio">Short Bio</FieldLabel>
              <textarea
                id="bio"
                placeholder="Write a short bio that will be displayed on the landing page..."
                className="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                value={settings.bio ?? ""}
                onChange={(e) => updateKey("bio", e.target.value)}
              />
            </Field>
          </CardContent>
        </Card>

        {/* Section 2: Contact & External Links */}
        <Card className="border-border/60 shadow-none">
          <CardHeader className="pb-4 flex flex-row items-center gap-3">
            <div className="p-2 bg-purple-500/10 text-purple-500 rounded-lg">
              <Globe className="h-4 w-4" />
            </div>
            <div>
              <CardTitle className="text-base font-semibold">Contact & External Links</CardTitle>
              <CardDescription>Social media URLs and contact methods for visitors.</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 pt-2">
            <div className="grid gap-4 sm:grid-cols-3">
              <Field>
                <FieldLabel htmlFor="location">Location</FieldLabel>
                <Input
                  id="location"
                  placeholder="e.g. Jakarta, Indonesia"
                  value={settings.location ?? ""}
                  onChange={(e) => updateKey("location", e.target.value)}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="email">Contact Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="e.g. hello@sepsu.dev"
                  value={settings.email ?? ""}
                  onChange={(e) => updateKey("email", e.target.value)}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="github_url">GitHub URL</FieldLabel>
                <Input
                  id="github_url"
                  placeholder="e.g. https://github.com/sepsu"
                  value={settings.github_url ?? ""}
                  onChange={(e) => updateKey("github_url", e.target.value)}
                />
              </Field>
            </div>
          </CardContent>
        </Card>

        {/* Section 3: Hero Highlight & Focus Cards */}
        <Card className="border-border/60 shadow-none">
          <CardHeader className="pb-4 flex flex-row items-center gap-3">
            <div className="p-2 bg-emerald-500/10 text-emerald-500 rounded-lg">
              <Star className="h-4 w-4" />
            </div>
            <div>
              <CardTitle className="text-base font-semibold">Hero Highlight & Focus Cards</CardTitle>
              <CardDescription>Badge highlight messages and key focus areas on the landing page.</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 pt-2">
            <Field>
              <FieldLabel htmlFor="hero_badge">Hero Badge (At the top)</FieldLabel>
              <Input
                id="hero_badge"
                placeholder="e.g. portfolio.sh"
                value={settings.hero_badge ?? ""}
                onChange={(e) => updateKey("hero_badge", e.target.value)}
              />
            </Field>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field>
                <FieldLabel htmlFor="focus_1">Focus Card 1</FieldLabel>
                <Input
                  id="focus_1"
                  placeholder="e.g. Clean Architecture"
                  value={settings.focus_1 ?? ""}
                  onChange={(e) => updateKey("focus_1", e.target.value)}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="focus_2">Focus Card 2</FieldLabel>
                <Input
                  id="focus_2"
                  placeholder="e.g. High Availability Backend"
                  value={settings.focus_2 ?? ""}
                  onChange={(e) => updateKey("focus_2", e.target.value)}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="focus_3">Focus Card 3</FieldLabel>
                <Input
                  id="focus_3"
                  placeholder="e.g. UI/UX Precision"
                  value={settings.focus_3 ?? ""}
                  onChange={(e) => updateKey("focus_3", e.target.value)}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="focus_4">Focus Card 4</FieldLabel>
                <Input
                  id="focus_4"
                  placeholder="e.g. Automated CI/CD Pipelines"
                  value={settings.focus_4 ?? ""}
                  onChange={(e) => updateKey("focus_4", e.target.value)}
                />
              </Field>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
