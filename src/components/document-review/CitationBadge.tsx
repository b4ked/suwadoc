import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface CitationBadgeProps {
  citationId: string
  citationLabel: string
  onCite: (id: string) => void
}

export default function CitationBadge({ citationId, citationLabel, onCite }: CitationBadgeProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      onClick={() => onCite(citationId)}
      className={cn(
        'inline-flex items-center gap-1 rounded-full border border-primary/30 bg-primary/8',
        'px-2 py-0.5 text-xs font-medium text-primary transition-colors',
        'hover:bg-primary/15 hover:border-primary/50 cursor-pointer'
      )}
      title={`Jump to: ${citationLabel}`}
    >
      <span className="opacity-60">[</span>
      <span>Source: {citationLabel}</span>
      <span className="opacity-60">]</span>
    </motion.button>
  )
}
