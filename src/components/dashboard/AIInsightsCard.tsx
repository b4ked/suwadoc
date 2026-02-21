import { motion } from 'framer-motion'
import { Sparkles, ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import type { MedicalDocument } from '@/data/mockData'

interface AIInsightsCardProps {
  documents: MedicalDocument[]
}

const docTypeIcon: Record<string, string> = {
  lab_result: '🧪',
  clinical_note: '📋',
  imaging: '🫀',
  procedure: '⚕️',
}

export default function AIInsightsCard({ documents }: AIInsightsCardProps) {
  const navigate = useNavigate()

  return (
    <Card className="border-border/60 shadow-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-primary" />
          <CardTitle className="text-base font-semibold">AI Insights</CardTitle>
        </div>
        <p className="text-sm text-slate-500 mt-1">
          Clinical observations from processed documents
        </p>
      </CardHeader>
      <CardContent className="pt-0 space-y-3">
        {documents.map((doc, i) => (
          <motion.div
            key={doc.id}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: i * 0.08 }}
            className="group flex items-start gap-3 rounded-lg border border-border/60 p-3.5 transition-all hover:border-primary/30 hover:bg-primary/5 cursor-pointer"
            onClick={() => navigate(`/documents/${doc.id}/review`)}
          >
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-sm">
              {docTypeIcon[doc.type] ?? '📄'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-slate-500 mb-0.5">{doc.title}</p>
              <p className="text-sm text-slate-800 leading-snug">{doc.aiInsight}</p>
            </div>
            <ArrowRight className="h-4 w-4 text-slate-400 shrink-0 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.div>
        ))}

        <Button
          variant="ghost"
          size="sm"
          className="w-full text-primary hover:text-primary hover:bg-primary/10 mt-1"
          onClick={() => navigate('/ai-assistant')}
        >
          <Sparkles className="h-3.5 w-3.5 mr-2" />
          Ask AI about this patient
        </Button>
      </CardContent>
    </Card>
  )
}
