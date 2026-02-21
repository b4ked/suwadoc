import { useNavigate } from 'react-router-dom'
import { Users, FileText, AlertTriangle, CheckCircle, ChevronRight, User } from 'lucide-react'
import { useAppContext } from '@/context/useAppContext'
import { CURRENT_USER, ALL_DOCUMENTS } from '@/data/mockData'
import type { Patient } from '@/data/mockData'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

function vitalStatusColor(status: string) {
  if (status === 'critical') return 'text-red-600'
  if (status === 'elevated') return 'text-amber-600'
  return 'text-emerald-600'
}

function PatientCriticalAlertCard({ patient, onSelect }: { patient: Patient; onSelect: () => void }) {
  const criticals = patient.vitals.filter((v) => v.status === 'critical')
  return (
    <Card
      className="cursor-pointer border-red-300 bg-red-50 shadow-sm hover:shadow-md transition-all duration-200"
      onClick={onSelect}
    >
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-100">
              <AlertTriangle className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">{patient.name}</p>
              <p className="text-xs text-slate-500">Age {patient.age} · {patient.mrn}</p>
            </div>
          </div>
          <ChevronRight className="h-4 w-4 text-red-400 shrink-0 mt-1" />
        </div>
        <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
          {criticals.map((v) => (
            <div key={v.id} className="rounded-md bg-white border border-red-200 px-3 py-2">
              <p className="text-xs text-slate-500">{v.label}</p>
              <p className="text-base font-bold text-red-600">
                {v.value} <span className="text-xs font-normal">{v.unit}</span>
              </p>
              <p className="text-xs text-red-500 mt-0.5">{v.trendValue}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function PatientSummaryCard({
  patient,
  isCurrent,
  onSelect,
  onViewDocuments,
}: {
  patient: Patient
  isCurrent: boolean
  onSelect: () => void
  onViewDocuments: () => void
}) {
  const topVitals = patient.vitals.slice(0, 2)
  const docCount = patient.documents.length

  return (
    <Card
      className={`cursor-pointer shadow-sm hover:shadow-md transition-all duration-200 ${
        isCurrent ? 'ring-2 ring-primary border-primary/30' : 'border-border/60 hover:border-primary/30'
      }`}
      onClick={onSelect}
    >
      <CardContent className="p-5 space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
              <User className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">{patient.name}</p>
              <p className="text-xs text-slate-500">Age {patient.age} · {patient.mrn}</p>
            </div>
          </div>
          {isCurrent && (
            <Badge variant="secondary" className="text-xs">Active</Badge>
          )}
        </div>

        {/* Diagnoses */}
        <div className="flex flex-wrap gap-1.5">
          {patient.diagnoses.map((dx) => (
            <Badge key={dx} variant="secondary" className="text-xs font-normal">
              {dx.split(' (')[0]}
            </Badge>
          ))}
        </div>

        {/* Top 2 vitals */}
        <div className="grid grid-cols-2 gap-2">
          {topVitals.map((v) => (
            <div key={v.id} className="rounded-md bg-slate-50 border border-border px-3 py-2">
              <p className="text-xs text-slate-500 truncate">{v.label}</p>
              <p className={`text-sm font-bold ${vitalStatusColor(v.status)}`}>
                {v.value} <span className="text-xs font-normal text-slate-500">{v.unit}</span>
              </p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-1">
          <span className="text-xs text-slate-500">{docCount} document{docCount !== 1 ? 's' : ''}</span>
          <Button
            size="sm"
            variant="outline"
            className="h-7 text-xs"
            onClick={(e) => { e.stopPropagation(); onViewDocuments() }}
          >
            View Documents
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default function DashboardPage() {
  const { state, setCurrentPatient } = useAppContext()
  const { patients, currentPatientId } = state
  const navigate = useNavigate()

  const totalPatients = patients.length
  const totalDocuments = ALL_DOCUMENTS.length
  const criticalPatients = patients.filter((p) => p.vitals.some((v) => v.status === 'critical'))
  const stablePatients = patients.filter((p) => p.vitals.every((v) => v.status !== 'critical'))

  const statCards = [
    {
      label: 'Total Patients',
      value: totalPatients,
      icon: Users,
      color: 'text-primary',
      bg: 'bg-primary/10',
    },
    {
      label: 'Total Documents',
      value: totalDocuments,
      icon: FileText,
      color: 'text-teal-600',
      bg: 'bg-teal-50',
    },
    {
      label: 'Critical Alerts',
      value: criticalPatients.length,
      icon: AlertTriangle,
      color: 'text-red-600',
      bg: 'bg-red-50',
    },
    {
      label: 'Patients Stable',
      value: stablePatients.length,
      icon: CheckCircle,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
    },
  ]

  function handleSelectPatient(id: string, path: string) {
    setCurrentPatient(id)
    navigate(path)
  }

  return (
    <div className="p-6 space-y-8 max-w-[1400px]">
      {/* Page header */}
      <div>
        <h1 className="text-xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-sm text-slate-500 mt-0.5">{CURRENT_USER.name} · {CURRENT_USER.clinic}</p>
      </div>

      {/* Stat row */}
      <section className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {statCards.map((card) => (
          <Card key={card.label} className="border-border/60 shadow-sm">
            <CardContent className="p-5">
              <div className="flex items-center gap-3">
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${card.bg}`}>
                  <card.icon className={`h-5 w-5 ${card.color}`} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900">{card.value}</p>
                  <p className="text-xs text-slate-500">{card.label}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </section>

      {/* Critical Alerts */}
      {criticalPatients.length > 0 && (
        <section>
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="h-4 w-4 text-red-500" />
            <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500">
              Critical Alerts
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {criticalPatients.map((patient) => (
              <PatientCriticalAlertCard
                key={patient.id}
                patient={patient}
                onSelect={() => handleSelectPatient(patient.id, '/overview')}
              />
            ))}
          </div>
        </section>
      )}

      {/* All Patients */}
      <section>
        <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500 mb-3">
          All Patients
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {patients.map((patient) => (
            <PatientSummaryCard
              key={patient.id}
              patient={patient}
              isCurrent={patient.id === currentPatientId}
              onSelect={() => handleSelectPatient(patient.id, '/overview')}
              onViewDocuments={() => handleSelectPatient(patient.id, '/documents')}
            />
          ))}
        </div>
      </section>
    </div>
  )
}
