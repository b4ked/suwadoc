import { motion } from 'framer-motion'
import { FlaskConical, Stethoscope, Scan, Pill } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { cn } from '@/lib/utils'
import type { TimelineEvent as TEvent } from '@/data/mockData'

const typeConfig = {
  lab: { icon: FlaskConical, bg: 'bg-blue-100', icon_color: 'text-blue-600', dot: 'bg-blue-500' },
  visit: { icon: Stethoscope, bg: 'bg-violet-100', icon_color: 'text-violet-600', dot: 'bg-violet-500' },
  imaging: { icon: Scan, bg: 'bg-teal-100', icon_color: 'text-teal-600', dot: 'bg-teal-500' },
  medication: { icon: Pill, bg: 'bg-orange-100', icon_color: 'text-orange-600', dot: 'bg-orange-500' },
}

interface TimelineEventProps {
  event: TEvent
  index: number
  isLast?: boolean
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export default function TimelineEvent({ event, index, isLast }: TimelineEventProps) {
  const navigate = useNavigate()
  const config = typeConfig[event.type]
  const Icon = config.icon
  const isClickable = !!event.documentId

  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.35, delay: index * 0.07, ease: 'easeOut' }}
      className="relative flex gap-4"
    >
      {/* Connector line */}
      {!isLast && (
        <div className="absolute left-[19px] top-10 bottom-0 w-px bg-border" />
      )}

      {/* Icon */}
      <div className={cn('relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full', config.bg)}>
        <Icon className={cn('h-4.5 w-4.5', config.icon_color)} />
      </div>

      {/* Content */}
      <div
        className={cn(
          'flex-1 pb-6',
          isClickable && 'cursor-pointer'
        )}
        onClick={() => isClickable && navigate(`/documents/${event.documentId}/review`)}
      >
        <div className="flex items-center gap-2 mb-0.5">
          <span className="text-sm font-semibold text-slate-900 hover:text-primary transition-colors">
            {event.title}
          </span>
          {isClickable && (
            <span className="text-xs text-primary font-medium">View →</span>
          )}
        </div>
        <p className="text-sm text-slate-500 mb-1">{event.description}</p>
        <time className="text-xs text-slate-400">{formatDate(event.date)}</time>
      </div>
    </motion.div>
  )
}
