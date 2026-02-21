import { useState } from 'react'
import { toast } from 'sonner'
import { motion } from 'framer-motion'
import { User, Bell, Shield, Building2 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { CURRENT_USER } from '@/data/mockData'

const sections = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'organization', label: 'Organization', icon: Building2 },
]

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState('profile')
  const [name, setName] = useState(CURRENT_USER.name)
  const [title, setTitle] = useState(CURRENT_USER.title)
  const [clinic, setClinic] = useState(CURRENT_USER.clinic)

  function handleSave() {
    toast.success('Settings saved', {
      description: 'Your profile has been updated successfully.',
    })
  }

  return (
    <div className="p-6 max-w-[900px]">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-slate-900">Settings</h1>
        <p className="text-sm text-slate-500 mt-0.5">
          Manage your account and clinic preferences
        </p>
      </div>

      <div className="flex gap-6">
        {/* Side nav */}
        <nav className="w-48 shrink-0 space-y-0.5">
          {sections.map((s) => {
            const Icon = s.icon
            return (
              <button
                key={s.id}
                onClick={() => setActiveSection(s.id)}
                className={`w-full flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors text-left
                  ${activeSection === s.id
                    ? 'bg-primary/10 text-primary'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
              >
                <Icon className="h-4 w-4 shrink-0" />
                {s.label}
              </button>
            )
          })}
        </nav>

        {/* Content */}
        <div className="flex-1">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            {activeSection === 'profile' && (
              <Card className="border-border/60 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-base">Profile Information</CardTitle>
                  <CardDescription>
                    Update your name, title, and clinic affiliation
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-5">
                  {/* Avatar */}
                  <div className="flex items-center gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground text-xl font-bold">
                      {CURRENT_USER.avatarInitials}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900">{CURRENT_USER.name}</p>
                      <p className="text-xs text-slate-500">{CURRENT_USER.clinic}</p>
                    </div>
                  </div>

                  <Separator />

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="title">Title / Specialty</Label>
                      <Input
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </div>
                    <div className="space-y-1.5 col-span-2">
                      <Label htmlFor="clinic">Clinic / Institution</Label>
                      <Input
                        id="clinic"
                        value={clinic}
                        onChange={(e) => setClinic(e.target.value)}
                      />
                    </div>
                    <div className="space-y-1.5 col-span-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        defaultValue="sarah.jenkins@harborview.org"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end pt-2">
                    <Button
                      onClick={handleSave}
                      className="bg-primary hover:bg-primary/90"
                    >
                      Save Changes
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeSection === 'notifications' && (
              <Card className="border-border/60 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-base">Notification Preferences</CardTitle>
                  <CardDescription>
                    Configure how and when you receive alerts
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { label: 'Critical lab results', desc: 'Immediate alerts for out-of-range critical values', enabled: true },
                    { label: 'Document processing complete', desc: 'Notify when AI finishes processing a document', enabled: true },
                    { label: 'Weekly patient summary', desc: 'Weekly digest of patient activity and changes', enabled: false },
                    { label: 'System maintenance', desc: 'Planned downtime and system updates', enabled: false },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between rounded-lg border border-border/60 px-4 py-3">
                      <div>
                        <p className="text-sm font-medium text-slate-900">{item.label}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
                      </div>
                      <div className={`h-5 w-9 rounded-full transition-colors ${item.enabled ? 'bg-primary' : 'bg-slate-200'} relative cursor-pointer`}>
                        <div className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform ${item.enabled ? 'translate-x-4' : 'translate-x-0.5'}`} />
                      </div>
                    </div>
                  ))}
                  <div className="flex justify-end pt-2">
                    <Button onClick={handleSave} className="bg-primary hover:bg-primary/90">
                      Save Preferences
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {(activeSection === 'security' || activeSection === 'organization') && (
              <Card className="border-border/60 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-base">
                    {activeSection === 'security' ? 'Security Settings' : 'Organization Settings'}
                  </CardTitle>
                  <CardDescription>
                    {activeSection === 'security'
                      ? 'Manage your password, 2FA, and session settings'
                      : 'Manage your organization, team members, and integrations'}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="rounded-lg bg-slate-50 border border-border px-4 py-8 text-center">
                    <p className="text-sm text-slate-500">
                      {activeSection === 'security' ? 'Security' : 'Organization'} settings are managed by your system administrator.
                    </p>
                    <p className="text-xs text-slate-400 mt-1">Contact: admin@harborview.org</p>
                  </div>
                  <div className="flex justify-end">
                    <Button onClick={handleSave} className="bg-primary hover:bg-primary/90">
                      Save Changes
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
