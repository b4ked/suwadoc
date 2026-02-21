import { Bell, Search } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { CURRENT_USER } from '@/data/mockData'
import { useAppContext } from '@/context/useAppContext'
import { Badge } from '@/components/ui/badge'

export default function TopHeader() {
  const { state } = useAppContext()
  const { currentPatient } = state

  return (
    <header className="flex h-16 items-center justify-between border-b border-border bg-white px-6">
      {/* Patient context */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-emerald-500" />
          <span className="text-sm font-medium text-slate-900">{currentPatient.name}</span>
          <span className="text-sm text-slate-500">·</span>
          <span className="text-sm text-slate-500">Age {currentPatient.age}</span>
          <span className="text-sm text-slate-500">·</span>
          <span className="text-sm text-slate-500">{currentPatient.mrn}</span>
        </div>
        <div className="flex gap-1.5">
          {currentPatient.diagnoses.map((dx) => (
            <Badge key={dx} variant="secondary" className="text-xs font-normal">
              {dx.split(' (')[0]}
            </Badge>
          ))}
        </div>
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
