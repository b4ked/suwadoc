import { useAppContext } from '@/context/useAppContext'
import VitalsGrid from '@/components/dashboard/VitalsGrid'
import HealthTimeline from '@/components/dashboard/HealthTimeline'
import AIInsightsCard from '@/components/dashboard/AIInsightsCard'

export default function DashboardPage() {
  const { state } = useAppContext()
  const { currentPatient, documents } = state

  return (
    <div className="p-6 space-y-6 max-w-[1400px]">
      {/* Page header */}
      <div>
        <h1 className="text-xl font-bold text-slate-900">Patient Overview</h1>
        <p className="text-sm text-slate-500 mt-0.5">
          {currentPatient.name} · DOB {new Date(currentPatient.dob).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} · {currentPatient.mrn}
        </p>
      </div>

      {/* Vitals */}
      <section>
        <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500 mb-3">
          Current Vitals
        </h2>
        <VitalsGrid vitals={currentPatient.vitals} />
      </section>

      {/* Patient info chips */}
      <section className="flex flex-wrap gap-4">
        <div className="rounded-lg border border-border/60 bg-white px-4 py-3 shadow-sm">
          <p className="text-xs font-medium text-slate-500 mb-1.5">Diagnoses</p>
          <div className="flex flex-col gap-1">
            {currentPatient.diagnoses.map((d) => (
              <span key={d} className="text-sm font-medium text-slate-800">{d}</span>
            ))}
          </div>
        </div>
        <div className="rounded-lg border border-border/60 bg-white px-4 py-3 shadow-sm">
          <p className="text-xs font-medium text-slate-500 mb-1.5">Active Medications</p>
          <div className="flex flex-col gap-1">
            {currentPatient.medications.map((m) => (
              <span key={m} className="text-sm font-medium text-slate-800">{m}</span>
            ))}
          </div>
        </div>
        <div className="rounded-lg border border-border/60 bg-white px-4 py-3 shadow-sm">
          <p className="text-xs font-medium text-slate-500 mb-1.5">Allergies</p>
          <div className="flex flex-col gap-1">
            {currentPatient.allergies.map((a) => (
              <span key={a} className="text-sm font-medium text-red-600">⚠ {a}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline + AI Insights */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_380px]">
        <HealthTimeline events={currentPatient.timeline} />
        <AIInsightsCard documents={documents} />
      </div>
    </div>
  )
}
