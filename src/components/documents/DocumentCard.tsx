import { FileText, FlaskConical, Scan, FileCheck2, ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import type { MedicalDocument } from '@/data/mockData'

const typeConfig = {
  lab_result: {
    icon: FlaskConical,
    bg: 'bg-blue-50',
    icon_color: 'text-blue-600',
    label: 'Lab Result',
    badge: 'bg-blue-100 text-blue-700',
  },
  clinical_note: {
    icon: FileText,
    bg: 'bg-violet-50',
    icon_color: 'text-violet-600',
    label: 'Clinical Note',
    badge: 'bg-violet-100 text-violet-700',
  },
  imaging: {
    icon: Scan,
    bg: 'bg-teal-50',
    icon_color: 'text-teal-600',
    label: 'Imaging',
    badge: 'bg-teal-100 text-teal-700',
  },
  procedure: {
    icon: FileCheck2,
    bg: 'bg-orange-50',
    icon_color: 'text-orange-600',
    label: 'Procedure',
    badge: 'bg-orange-100 text-orange-700',
  },
}

interface DocumentCardProps {
  document: MedicalDocument
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export default function DocumentCard({ document: doc }: DocumentCardProps) {
  const navigate = useNavigate()
  const config = typeConfig[doc.type]
  const Icon = config.icon

  return (
    <Card
      className="group cursor-pointer border-border/60 shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-200"
      onClick={() => navigate(`/documents/${doc.id}/review`)}
    >
      <CardContent className="p-5">
        <div className="flex items-start gap-4">
          <div className={cn('flex h-10 w-10 shrink-0 items-center justify-center rounded-xl', config.bg)}>
            <Icon className={cn('h-5 w-5', config.icon_color)} />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-2">
              <h3 className="text-sm font-semibold text-slate-900 group-hover:text-primary transition-colors leading-tight">
                {doc.title}
              </h3>
              <ArrowRight className="h-4 w-4 text-slate-400 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity mt-0.5" />
            </div>

            <div className="flex items-center gap-2 mb-3">
              <span className={cn('rounded-full px-2 py-0.5 text-xs font-medium', config.badge)}>
                {config.label}
              </span>
              {doc.status === 'processed' && (
                <Badge variant="secondary" className="text-xs bg-emerald-100 text-emerald-700 border-0">
                  ✓ Processed
                </Badge>
              )}
            </div>

            <p className="text-xs text-slate-500 mb-1">
              <span className="font-medium text-slate-700">{doc.provider}</span>
            </p>
            <p className="text-xs text-slate-400">
              Service: {formatDate(doc.dateOfService)} · Uploaded: {formatDate(doc.uploadedAt)}
            </p>
          </div>
        </div>

        {/* AI insight preview */}
        <div className="mt-3 rounded-lg bg-primary/5 border border-primary/10 px-3 py-2">
          <p className="text-xs text-primary font-medium flex items-center gap-1.5">
            <span>✨</span>
            {doc.aiInsight}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
