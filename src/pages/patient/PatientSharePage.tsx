import { useState } from 'react'
import QRCode from 'react-qr-code'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const SHARE_URL = 'https://suwadoc.com/share/mc-a7x2-2024'

export default function PatientSharePage() {
  const [email, setEmail] = useState('')

  function handleSend() {
    if (!email.trim()) return
    toast.success(`Secure link and OTP sent to ${email}`)
    setEmail('')
  }

  return (
    <div className="max-w-sm mx-auto px-4 py-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Share My Records</h1>
        <p className="text-sm text-slate-500 mt-1">
          Grant secure, time-limited access to your medical history.
        </p>
      </div>

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
