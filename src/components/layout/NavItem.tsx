import { NavLink } from 'react-router-dom'
import { type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

interface NavItemProps {
  to: string
  icon: LucideIcon
  label: string
  collapsed: boolean
}

export default function NavItem({ to, icon: Icon, label, collapsed }: NavItemProps) {
  const link = (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-150',
          'text-slate-600 hover:bg-slate-100 hover:text-slate-900',
          isActive && 'bg-primary/10 text-primary hover:bg-primary/15 hover:text-primary',
          collapsed && 'justify-center px-2'
        )
      }
    >
      <Icon className="h-[18px] w-[18px] shrink-0" />
      {!collapsed && <span>{label}</span>}
    </NavLink>
  )

  if (collapsed) {
    return (
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>{link}</TooltipTrigger>
        <TooltipContent side="right">{label}</TooltipContent>
      </Tooltip>
    )
  }

  return link
}
