import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { User, FileText, ChevronRight, Calendar, Hash } from 'lucide-react'
import { useAppContext } from '@/context/useAppContext'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription,
} from '@/components/ui/sheet'
import { Separator } from '@/components/ui/separator'

export default function PatientsPage() {
  const { state } = useAppContext()
  const { currentPatient } = state
  const navigate = useNavigate()
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <div className="p-6 space-y-6 max-w-[1400px]">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-slate-900">Patients</h1>
        <p className="text-sm text-slate-500 mt-0.5">1 active patient in current session</p>
      </div>

      {/* Patient card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card
          className="cursor-pointer border-border/60 shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-200"
          onClick={() => setDrawerOpen(true)}
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
                    {currentPatient.name}
                  </h2>
                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  <span className="text-xs text-emerald-600 font-medium">Active</span>
                </div>
                <div className="flex items-center gap-4 text-sm text-slate-500">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    Age {currentPatient.age}
                  </span>
                  <span className="flex items-center gap-1">
                    <Hash className="h-3.5 w-3.5" />
                    {currentPatient.mrn}
                  </span>
                </div>
              </div>

              {/* Diagnoses */}
              <div className="hidden md:flex flex-wrap gap-1.5">
                {currentPatient.diagnoses.map((dx) => (
                  <Badge key={dx} variant="secondary" className="text-xs font-normal">
                    {dx.split(' (')[0]}
                  </Badge>
                ))}
              </div>

              {/* Documents count */}
              <div className="text-right mr-2">
                <p className="text-xl font-bold text-slate-900">{state.documents.length}</p>
                <p className="text-xs text-slate-500">documents</p>
              </div>

              <ChevronRight className="h-5 w-5 text-slate-400 shrink-0" />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Patient detail drawer */}
      <Sheet open={drawerOpen} onOpenChange={setDrawerOpen}>
        <SheetContent side="right" className="w-[420px] overflow-y-auto">
          <SheetHeader className="mb-6">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <User className="h-6 w-6 text-primary" />
              </div>
              <div>
                <SheetTitle className="text-lg">{currentPatient.name}</SheetTitle>
                <SheetDescription>
                  DOB: {new Date(currentPatient.dob).toLocaleDateString('en-US', {
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
                <span className="font-medium text-slate-900">{currentPatient.mrn}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Age</span>
                <span className="font-medium text-slate-900">{currentPatient.age} years</span>
              </div>
            </div>

            <Separator />

            {/* Diagnoses */}
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                Diagnoses
              </h3>
              <div className="space-y-1.5">
                {currentPatient.diagnoses.map((dx) => (
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
                {currentPatient.medications.map((med) => (
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
                {currentPatient.allergies.map((a) => (
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
                onClick={() => { setDrawerOpen(false); navigate('/documents') }}
              >
                <FileText className="h-4 w-4 mr-2" />
                View Documents ({state.documents.length})
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => { setDrawerOpen(false); navigate('/dashboard') }}
              >
                Open Dashboard
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
