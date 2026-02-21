import {
  LayoutDashboard,
  Users,
  FileText,
  MessageSquare,
  Settings,
  ChevronLeft,
  ChevronRight,
  Activity,
} from 'lucide-react'
import { useAppContext } from '@/context/useAppContext'
import NavItem from './NavItem'
import { TooltipProvider } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'

const NAV_ITEMS = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/patients', icon: Users, label: 'Patients' },
  { to: '/documents', icon: FileText, label: 'Documents' },
  { to: '/ai-assistant', icon: MessageSquare, label: 'AI Assistant' },
  { to: '/settings', icon: Settings, label: 'Settings' },
]

export default function Sidebar() {
  const { state, toggleSidebar } = useAppContext()
  const { isSidebarCollapsed } = state

  return (
    <TooltipProvider>
      <aside
        className={cn(
          'relative flex flex-col border-r border-border bg-white transition-[width] duration-300',
          isSidebarCollapsed ? 'w-[60px]' : 'w-[220px]'
        )}
      >
        {/* Logo */}
        <div
          className={cn(
            'flex h-16 items-center border-b border-border px-4',
            isSidebarCollapsed && 'justify-center px-0'
          )}
        >
          <Activity className="h-6 w-6 shrink-0 text-primary" />
          {!isSidebarCollapsed && (
            <span className="ml-2 text-lg font-bold tracking-tight text-slate-900">
              Suwadoc
            </span>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-2 space-y-0.5">
          {NAV_ITEMS.map((item) => (
            <NavItem
              key={item.to}
              to={item.to}
              icon={item.icon}
              label={item.label}
              collapsed={isSidebarCollapsed}
            />
          ))}
        </nav>

        {/* Collapse toggle */}
        <div className="border-t border-border p-2">
          <button
            onClick={toggleSidebar}
            className={cn(
              'flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900',
              isSidebarCollapsed && 'justify-center px-2'
            )}
          >
            {isSidebarCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <>
                <ChevronLeft className="h-4 w-4" />
                <span>Collapse</span>
              </>
            )}
          </button>
        </div>
      </aside>
    </TooltipProvider>
  )
}
