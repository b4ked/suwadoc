import { useNavigate } from 'react-router-dom'
import { Eye, CheckCircle, Upload, MessageCircle } from 'lucide-react'
import { toast } from 'sonner'
import { CARE_TEAM, RECENT_ACTIVITY } from '@/data/patientPortalData'
import { MOCK_VITALS } from '@/data/mockData'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

function ActivityIcon({ icon }: { icon: string }) {
  if (icon === 'eye') return <Eye className="h-4 w-4 text-blue-500" />
  if (icon === 'check-circle') return <CheckCircle className="h-4 w-4 text-emerald-500" />
  return <Upload className="h-4 w-4 text-slate-400" />
}

export default function PatientHomePage() {
  const navigate = useNavigate()
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  })

  const bp = MOCK_VITALS.find((v) => v.id === 'v1')
  const chol = MOCK_VITALS.find((v) => v.id === 'v3')

  return (
    <div className="max-w-lg mx-auto px-4 py-6 space-y-5">
      {/* Greeting */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Good morning, Michael.</h1>
        <p className="text-sm text-slate-500 mt-0.5">{today}</p>
        <p className="text-base text-slate-600 mt-1">Here's your health snapshot.</p>
      </div>

      {/* Health Overview Card */}
      <div className="rounded-2xl bg-white shadow-sm border border-slate-200 p-5">
        <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">
          Recent Vitals
        </h2>
        <div className="space-y-3">
          {bp && (
            <div className="flex items-center justify-between py-2.5 px-3 rounded-xl bg-amber-50 border border-amber-100">
              <div>
                <p className="text-sm font-medium text-slate-800">Blood Pressure</p>
                <p className="text-lg font-bold text-slate-900">
                  {bp.value} <span className="text-sm font-normal text-slate-500">{bp.unit}</span>
                </p>
              </div>
              <Badge className="bg-amber-100 text-amber-700 border-amber-200 hover:bg-amber-100">
                🟡 Slightly elevated
              </Badge>
            </div>
          )}
          {chol && (
            <div className="flex items-center justify-between py-2.5 px-3 rounded-xl bg-amber-50 border border-amber-100">
              <div>
                <p className="text-sm font-medium text-slate-800">Cholesterol</p>
                <p className="text-lg font-bold text-slate-900">
                  {chol.value}{' '}
                  <span className="text-sm font-normal text-slate-500">{chol.unit}</span>
                </p>
              </div>
              <Badge className="bg-amber-100 text-amber-700 border-amber-200 hover:bg-amber-100">
                🟡 Watch
              </Badge>
            </div>
          )}
        </div>
        <p className="text-xs text-slate-400 mt-3">Last updated Oct 14, 2024</p>
      </div>

      {/* Connected Care Team */}
      <div className="rounded-2xl bg-white shadow-sm border border-slate-200 p-5">
        <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">
          Connected Care Team
        </h2>
        {CARE_TEAM.map((member) => (
          <div key={member.name} className="flex items-center justify-between">
            <div>
              <p className="text-base font-semibold text-slate-900">{member.name}</p>
              <p className="text-sm text-slate-500">{member.clinic}</p>
              <div className="flex items-center gap-1.5 mt-1">
                <span className="inline-block h-2 w-2 rounded-full bg-emerald-500"></span>
                <span className="text-xs text-emerald-600 font-medium">Connected</span>
              </div>
            </div>
            <Button
              size="sm"
              variant="outline"
              className="rounded-xl"
              onClick={() =>
                toast.info('Messaging feature coming soon. Please call your clinic directly.')
              }
            >
              <MessageCircle className="h-4 w-4 mr-1" />
              Message
            </Button>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="rounded-2xl bg-white shadow-sm border border-slate-200 p-5">
        <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">
          Recent Activity
        </h2>
        <div className="space-y-3">
          {RECENT_ACTIVITY.map((item, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="mt-0.5 flex-shrink-0">
                <ActivityIcon icon={item.icon} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-slate-800">{item.text}</p>
                <p className="text-xs text-slate-400 mt-0.5">{item.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3">
        <Button
          className="rounded-2xl h-14 text-base bg-blue-600 hover:bg-blue-700 text-white"
          onClick={() => navigate('/patient/wallet')}
        >
          View My Records
        </Button>
        <Button
          className="rounded-2xl h-14 text-base"
          variant="outline"
          onClick={() => navigate('/patient/share')}
        >
          Share with Doctor
        </Button>
      </div>
    </div>
  )
}
