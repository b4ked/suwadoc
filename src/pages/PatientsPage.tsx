import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { User, FileText, ChevronRight, Calendar, Hash, AlertTriangle } from 'lucide-react'
import { useAppContext } from '@/context/useAppContext'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription,
} from '@/components/ui/sheet'
import { Separator } from '@/components/ui/separator'
import type { Patient } from '@/data/mockData'
import { ALL_DOCUMENTS } from '@/data/mockData'
import { cn } from '@/lib/utils'

export default function PatientsPage() {
  const { state, setCurrentPatient } = useAppContext()
  const { patients, currentPatientId } = state
  const navigate = useNavigate()
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null)

  function openDrawer(patient: Patient) {
    setCurrentPatient(patient.id)
    setSelectedPatient(patient)
  }

  function closeDrawer() {
    setSelectedPatient(null)
  }

  const drawerPatient = selectedPatient
  const drawerDocCount = drawerPatient
    ? ALL_DOCUMENTS.filter((d) => drawerPatient.documents.includes(d.id)).length
    : 0

  return (
    <div className="p-6 space-y-6 max-w-[1400px]">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-slate-900">Patients</h1>
        <p className="text-sm text-slate-500 mt-0.5">{patients.length} active patients in current session</p>
      </div>

      {/* Patient cards */}
      <div className="space-y-3">
        {patients.map((patient, i) => {
          const isActive = patient.id === currentPatientId
          const hasCritical = patient.vitals.some((v) => v.status === 'critical')
          const docCount = ALL_DOCUMENTS.filter((d) => patient.documents.includes(d.id)).length

          return (
            <motion.div
              key={patient.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
            >
              <Card
                className={cn(
                  'cursor-pointer shadow-sm hover:shadow-md transition-all duration-200',
                  isActive
                    ? 'ring-2 ring-primary border-primary/30'
                    : 'border-border/60 hover:border-primary/30'
                )}
                onClick={() => openDrawer(patient)}
              >
                <CardContent className="p-5">
                  <div className="flex items-center gap-4">
                    {/* Avatar */}
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <User className="h-6 w-6 text-primary" />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h2 className="text-base font-semibold text-slate-900">
                          {patient.name}
                        </h2>
                        {isActive && (
                          <>
                            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                            <span className="text-xs text-emerald-600 font-medium">Active</span>
                          </>
                        )}
                        {hasCritical && (
                          <span className="flex items-center gap-1 text-xs text-red-600 font-medium">
                            <AlertTriangle className="h-3 w-3" />
                            Critical
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-slate-500">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5" />
                          Age {patient.age}
                        </span>
                        <span className="flex items-center gap-1">
                          <Hash className="h-3.5 w-3.5" />
                          {patient.mrn}
                        </span>
                      </div>
                    </div>

                    {/* Diagnoses */}
                    <div className="hidden md:flex flex-wrap gap-1.5">
                      {patient.diagnoses.map((dx) => (
                        <Badge key={dx} variant="secondary" className="text-xs font-normal">
                          {dx.split(' (')[0]}
                        </Badge>
                      ))}
                    </div>

                    {/* Documents count */}
                    <div className="text-right mr-2">
                      <p className="text-xl font-bold text-slate-900">{docCount}</p>
                      <p className="text-xs text-slate-500">documents</p>
                    </div>

                    <ChevronRight className="h-5 w-5 text-slate-400 shrink-0" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>

      {/* Patient detail drawer */}
      <Sheet open={!!drawerPatient} onOpenChange={(open) => { if (!open) closeDrawer() }}>
        <SheetContent side="right" className="w-[420px] overflow-y-auto">
          {drawerPatient && (
            <>
              <SheetHeader className="mb-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <User className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <SheetTitle className="text-lg">{drawerPatient.name}</SheetTitle>
                    <SheetDescription>
                      DOB: {new Date(drawerPatient.dob).toLocaleDateString('en-US', {
                        month: 'long', day: 'numeric', year: 'numeric'
                      })}
                    </SheetDescription>
                  </div>
                </div>
              </SheetHeader>

              <div className="space-y-5">
                {/* ID info */}
                <div className="rounded-lg bg-slate-50 border border-border px-4 py-3 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">MRN</span>
                    <span className="font-medium text-slate-900">{drawerPatient.mrn}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Age</span>
                    <span className="font-medium text-slate-900">{drawerPatient.age} years</span>
                  </div>
                </div>

                <Separator />

                {/* Diagnoses */}
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                    Diagnoses
                  </h3>
                  <div className="space-y-1.5">
                    {drawerPatient.diagnoses.map((dx) => (
                      <div key={dx} className="flex items-center gap-2 text-sm text-slate-800">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                        {dx}
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Medications */}
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                    Active Medications
                  </h3>
                  <div className="space-y-1.5">
                    {drawerPatient.medications.map((med) => (
                      <div key={med} className="flex items-center gap-2 text-sm text-slate-800">
                        <div className="h-1.5 w-1.5 rounded-full bg-teal-500 shrink-0" />
                        {med}
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Allergies */}
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                    Allergies
                  </h3>
                  <div className="space-y-1.5">
                    {drawerPatient.allergies.map((a) => (
                      <div key={a} className="flex items-center gap-2 text-sm text-red-600">
                        <span>⚠</span>
                        {a}
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Actions */}
                <div className="space-y-2 pt-2">
                  <Button
                    className="w-full bg-primary hover:bg-primary/90"
                    onClick={() => { closeDrawer(); navigate('/documents') }}
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    View Documents ({drawerDocCount})
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => { closeDrawer(); navigate('/overview') }}
                  >
                    Open Patient Overview
                  </Button>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  )
}
