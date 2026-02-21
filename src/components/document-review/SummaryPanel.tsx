import { motion } from 'framer-motion'
import { Sparkles, ChevronRight } from 'lucide-react'
import { ScrollArea } from '@/components/ui/scroll-area'
import CitationBadge from './CitationBadge'
import VerificationCheckbox from './VerificationCheckbox'
import type { MedicalDocument } from '@/data/mockData'

interface SummaryPanelProps {
  document: MedicalDocument
  onCitationClick: (paragraphId: string) => void
}

export default function SummaryPanel({ document: doc, onCitationClick }: SummaryPanelProps) {
  return (
    <div className="flex flex-col h-full border-l border-border">
      {/* Panel header */}
      <div className="flex items-center gap-2 border-b border-border px-6 py-4 bg-white">
        <Sparkles className="h-4 w-4 text-primary" />
        <h2 className="text-sm font-semibold text-slate-900">AI Summary</h2>
        <span className="ml-auto text-xs text-slate-400">
          Click citations to jump to source
        </span>
      </div>

      {/* Summary content */}
      <ScrollArea className="flex-1">
        <div className="p-6 space-y-6">
          {doc.aiSummary.map((section, sectionIdx) => (
            <motion.div
              key={section.heading}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: sectionIdx * 0.1 }}
            >
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
                <ChevronRight className="h-3.5 w-3.5 text-primary" />
                {section.heading}
              </h3>

              <div className="space-y-3">
                {section.bullets.map((bullet, bulletIdx) => (
                  <div
                    key={bulletIdx}
                    className="rounded-lg bg-white border border-border/60 p-4 shadow-sm"
                  >
                    <p className="text-sm text-slate-800 leading-relaxed mb-2.5">
                      {bullet.text}
                    </p>
                    <CitationBadge
                      citationId={bullet.citationId}
                      citationLabel={bullet.citationLabel}
                      onCite={onCitationClick}
                    />
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </ScrollArea>

      {/* Verification footer */}
      <div className="border-t border-border p-4 bg-white">
        <VerificationCheckbox documentId={doc.id} />
      </div>
    </div>
  )
}
