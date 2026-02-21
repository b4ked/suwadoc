import { useState } from 'react'
import QRCode from 'react-qr-code'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { CONNECTED_DOCTORS, type ConnectedDoctor } from '@/data/patientPortalData'

const SHARE_URL = 'https://suwadoc.com/share/mc-a7x2-2024'

function DaysLeftBadge({ days }: { days: number }) {
  if (days < 7) {
    return (
      <Badge className="bg-red-50 text-red-700 border-red-200 hover:bg-red-50 text-xs">
        {days}d left
      </Badge>
    )
  }
  if (days <= 14) {
    return (
      <Badge className="bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-50 text-xs">
        {days}d left
      </Badge>
    )
  }
  return (
    <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-50 text-xs">
      {days}d left
    </Badge>
  )
}

export default function PatientSharePage() {
  const [email, setEmail] = useState('')
  const [doctors, setDoctors] = useState<ConnectedDoctor[]>(CONNECTED_DOCTORS)

  function handleSend() {
    if (!email.trim()) return
    toast.success(`Secure link and OTP sent to ${email}`)
    setEmail('')
  }

  function handleExtend(id: string) {
    setDoctors((prev) =>
      prev.map((d) => (d.id === id ? { ...d, daysLeft: d.daysLeft + 30 } : d))
    )
  }

  function handleRevoke(id: string) {
    const doctor = doctors.find((d) => d.id === id)
    setDoctors((prev) => prev.filter((d) => d.id !== id))
    toast.success(`Access revoked for ${doctor?.name}`)
  }

  return (
    <div className="max-w-sm mx-auto px-4 py-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Share My Records</h1>
        <p className="text-sm text-slate-500 mt-1">
          Grant secure, time-limited access to your medical history.
        </p>
      </div>

      {/* Section 0 — Who Has Access */}
      {doctors.length > 0 && (
        <div className="rounded-2xl bg-white shadow-sm border border-slate-200 p-6 space-y-4">
          <h2 className="text-base font-semibold text-slate-800">Who Has Access</h2>
          <div className="space-y-3">
            {doctors.map((doctor) => (
              <div
                key={doctor.id}
                className="rounded-xl border border-slate-100 bg-slate-50 p-4 space-y-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-slate-900 truncate">{doctor.name}</p>
                    <p className="text-xs text-slate-500 truncate">{doctor.role}</p>
                    <p className="text-xs text-slate-400 truncate">{doctor.clinic}</p>
                  </div>
                  <DaysLeftBadge days={doctor.daysLeft} />
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 rounded-lg text-xs h-8"
                    onClick={() => handleExtend(doctor.id)}
                  >
                    Extend
                  </Button>
                  <Button
                    size="sm"
                    className="flex-1 rounded-lg text-xs h-8 bg-red-600 hover:bg-red-700 text-white"
                    onClick={() => handleRevoke(doctor.id)}
                  >
                    Revoke Access
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Section A — In-Person */}
      <div className="rounded-2xl bg-white shadow-sm border border-slate-200 p-6 space-y-4">
        <h2 className="text-base font-semibold text-slate-800">Share In-Person</h2>

        <div className="flex justify-center">
          <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-sm">
            <QRCode value={SHARE_URL} size={200} />
          </div>
        </div>

        <p className="text-sm text-slate-600 text-center leading-relaxed">
          Show this code to your doctor to grant them instant, secure access to your Suwadoc
          history.
        </p>

        <Button
          variant="outline"
          className="w-full rounded-xl"
          onClick={() => toast.info('Code refreshed (visual only in prototype)')}
        >
          Refresh Code
        </Button>
      </div>

      {/* Divider */}
      <div className="flex items-center gap-3">
        <div className="flex-1 border-t border-slate-200" />
        <span className="text-xs font-medium text-slate-400 whitespace-nowrap">
          OR SHARE REMOTELY
        </span>
        <div className="flex-1 border-t border-slate-200" />
      </div>

      {/* Section B — Remote Invite */}
      <div className="rounded-2xl bg-white shadow-sm border border-slate-200 p-6 space-y-4">
        <h2 className="text-base font-semibold text-slate-800">Invite a Doctor</h2>

        <Input
          type="email"
          placeholder="doctor@hospital.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="rounded-xl"
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />

        <Button
          className="w-full rounded-xl bg-blue-600 hover:bg-blue-700 text-white"
          onClick={handleSend}
        >
          Send Secure Link &amp; OTP
        </Button>

        <p className="text-xs text-slate-400 text-center leading-relaxed">
          The one-time passcode expires in 24 hours and can only be used once.
        </p>
      </div>
    </div>
  )
}
