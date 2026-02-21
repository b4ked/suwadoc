import { Outlet, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Home, Wallet, Share2, MessageCircle } from 'lucide-react'
import { Toaster } from 'sonner'

const NAV_ITEMS = [
  { to: '/patient/home', label: 'Home', icon: Home },
  { to: '/patient/wallet', label: 'My Wallet', icon: Wallet },
  { to: '/patient/share', label: 'Share', icon: Share2 },
  { to: '/patient/chat', label: 'AI Chat', icon: MessageCircle },
]

export default function PatientPortalLayout() {
  const location = useLocation()

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      {/* Sticky disclaimer banner */}
      <div className="sticky top-0 z-50 bg-amber-50 border-b border-amber-200 text-amber-800 text-sm text-center py-2 px-4">
        ⚠️ Suwadoc AI is an educational assistant. It does not provide medical diagnoses. Always consult your doctor.
      </div>

      {/* Desktop top nav */}
      <header className="hidden sm:flex sticky top-[41px] z-40 items-center justify-between bg-white border-b border-slate-200 px-6 py-3">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
            <span className="text-xs font-bold text-white">S</span>
          </div>
          <div>
            <span className="font-semibold text-slate-900 text-sm">Suwadoc</span>
            <span className="ml-1.5 text-xs text-slate-500">Patient Portal</span>
          </div>
        </div>

        {/* Center nav */}
        <nav className="flex items-center gap-1">
          {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  isActive
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`
              }
            >
              <Icon className="h-4 w-4" />
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Avatar */}
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
            <span className="text-xs font-semibold text-blue-700">MC</span>
          </div>
          <span className="text-sm font-medium text-slate-700">Michael Chen</span>
        </div>
      </header>

      {/* Page content */}
      <main className="flex-1 pb-20 sm:pb-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Mobile bottom nav */}
      <nav className="flex sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 pb-safe">
        {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex flex-1 flex-col items-center justify-center gap-0.5 py-3 text-xs font-medium transition-colors ${
                isActive ? 'text-blue-600' : 'text-slate-400'
              }`
            }
          >
            <Icon className="h-5 w-5" />
            {label}
          </NavLink>
        ))}
      </nav>

      <Toaster position="bottom-center" richColors />
    </div>
  )
}
