import { useRef, useState, useEffect } from 'react'
import { Bell, Search, ChevronDown, Check } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { CURRENT_USER } from '@/data/mockData'
import { useAppContext } from '@/context/useAppContext'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

export default function TopHeader() {
  const { state, setCurrentPatient } = useAppContext()
  const { currentPatient, patients, currentPatientId } = state
  const [open, setOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    if (open) document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [open])

  return (
    <header className="flex h-16 items-center justify-between border-b border-border bg-white px-6">
      {/* Patient switcher */}
      <div className="relative flex items-center gap-3" ref={dropdownRef}>
        <button
          onClick={() => setOpen((o) => !o)}
          className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm hover:bg-slate-100 transition-colors"
        >
          <div className="h-2 w-2 rounded-full bg-emerald-500 shrink-0" />
          <span className="font-medium text-slate-900">{currentPatient.name}</span>
          <span className="text-slate-400">·</span>
          <span className="text-slate-500">Age {currentPatient.age}</span>
          <span className="text-slate-400">·</span>
          <span className="text-slate-500">{currentPatient.mrn}</span>
          <ChevronDown className={cn('h-3.5 w-3.5 text-slate-400 ml-0.5 transition-transform', open && 'rotate-180')} />
        </button>

        <div className="flex gap-1.5">
          {currentPatient.diagnoses.map((dx) => (
            <Badge key={dx} variant="secondary" className="text-xs font-normal">
              {dx.split(' (')[0]}
            </Badge>
          ))}
        </div>

        {/* Dropdown */}
        {open && (
          <div className="absolute left-0 top-full mt-1.5 z-50 w-72 rounded-lg border border-border bg-white shadow-lg py-1">
            <p className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-slate-400">
              Switch Patient
            </p>
            {patients.map((patient) => {
              const isActive = patient.id === currentPatientId
              const hasCritical = patient.vitals.some((v) => v.status === 'critical')
              return (
                <button
                  key={patient.id}
                  onClick={() => { setCurrentPatient(patient.id); setOpen(false) }}
                  className={cn(
                    'flex w-full items-center gap-3 px-3 py-2.5 text-left transition-colors',
                    isActive ? 'bg-primary/5' : 'hover:bg-slate-50'
                  )}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm font-medium text-slate-900 truncate">{patient.name}</span>
                      {hasCritical && (
                        <span className="h-1.5 w-1.5 rounded-full bg-red-500 shrink-0" title="Critical alert" />
                      )}
                    </div>
                    <p className="text-xs text-slate-500 truncate">Age {patient.age} · {patient.mrn}</p>
                  </div>
                  {isActive && <Check className="h-4 w-4 text-primary shrink-0" />}
                </button>
              )
            })}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="text-slate-500 hover:text-slate-900">
          <Search className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="relative text-slate-500 hover:text-slate-900">
          <Bell className="h-4 w-4" />
          <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-primary" />
        </Button>
        <div className="ml-2 flex items-center gap-2.5">
          <div className="text-right">
            <p className="text-sm font-medium text-slate-900">{CURRENT_USER.name}</p>
            <p className="text-xs text-slate-500">{CURRENT_USER.title}</p>
          </div>
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-primary text-primary-foreground text-xs font-semibold">
              {CURRENT_USER.avatarInitials}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  )
}
