import { motion } from 'framer-motion'
import { Activity, Droplets, HeartPulse, Scale, TrendingDown, TrendingUp, Minus } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import type { Vital } from '@/data/mockData'

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  'heart-pulse': HeartPulse,
  'activity': Activity,
  'droplets': Droplets,
  'scale': Scale,
}

interface VitalCardProps {
  vital: Vital
  index: number
}

const statusConfig = {
  normal: {
    bg: 'bg-emerald-50',
    icon: 'text-emerald-600',
    value: 'text-slate-900',
    badge: 'bg-emerald-100 text-emerald-700',
    label: 'Normal',
  },
  elevated: {
    bg: 'bg-amber-50',
    icon: 'text-amber-600',
    value: 'text-slate-900',
    badge: 'bg-amber-100 text-amber-700',
    label: 'Elevated',
  },
  critical: {
    bg: 'bg-red-50',
    icon: 'text-red-600',
    value: 'text-red-700',
    badge: 'bg-red-100 text-red-700',
    label: 'Critical',
  },
}

const trendIcons = {
  up: TrendingUp,
  down: TrendingDown,
  stable: Minus,
}

const trendColors = {
  up: 'text-amber-600',
  down: 'text-emerald-600',
  stable: 'text-slate-500',
}

export default function VitalCard({ vital, index }: VitalCardProps) {
  const Icon = ICON_MAP[vital.iconName] ?? Activity
  const config = statusConfig[vital.status]
  const TrendIcon = trendIcons[vital.trend]

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: index * 0.08, ease: 'easeOut' }}
    >
      <Card className="overflow-hidden border-border/60 shadow-sm hover:shadow-md transition-shadow duration-200">
        <CardContent className="p-5">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-xs font-medium uppercase tracking-wider text-slate-500 mb-3">
                {vital.label}
              </p>
              <div className="flex items-baseline gap-1.5">
                <span className={cn('text-2xl font-bold tabular-nums', config.value)}>
                  {vital.value}
                </span>
                <span className="text-sm text-slate-500">{vital.unit}</span>
              </div>
            </div>
            <div className={cn('rounded-xl p-2.5', config.bg)}>
              <Icon className={cn('h-5 w-5', config.icon)} />
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <TrendIcon className={cn('h-3.5 w-3.5', trendColors[vital.trend])} />
              <span className={cn('text-xs font-medium', trendColors[vital.trend])}>
                {vital.trendValue}
              </span>
            </div>
            <span className={cn('rounded-full px-2 py-0.5 text-xs font-medium', config.badge)}>
              {config.label}
            </span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
