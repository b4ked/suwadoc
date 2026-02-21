import { useState, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, FileText } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAppContext } from '@/context/useAppContext'
import SourcePanel from '@/components/document-review/SourcePanel'
import SummaryPanel from '@/components/document-review/SummaryPanel'

export default function DocumentReviewPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { state } = useAppContext()
  const [highlightedId, setHighlightedId] = useState<string | null>(null)
  const sourcePanelRef = useRef<HTMLDivElement>(null)

  const doc = state.documents.find((d) => d.id === id)

  if (!doc) {
    return (
      <div className="flex flex-col items-center justify-center h-full py-24 text-center">
        <FileText className="h-12 w-12 text-slate-300 mb-4" />
        <h2 className="text-lg font-semibold text-slate-900 mb-1">Document not found</h2>
        <p className="text-sm text-slate-500 mb-6">
          The document you're looking for doesn't exist or hasn't been loaded yet.
        </p>
        <Button variant="outline" onClick={() => navigate('/documents')}>
          Back to Documents
        </Button>
      </div>
    )
  }

  function handleCitationClick(paragraphId: string) {
    setHighlightedId(paragraphId)

    // Scroll to paragraph in source panel
    const el = sourcePanelRef.current?.querySelector(`#${paragraphId}`)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }

    // Clear highlight after 2s
    setTimeout(() => setHighlightedId(null), 2000)
  }

  return (
    <div className="flex flex-col h-full">
      {/* Breadcrumb header */}
      <div className="flex items-center gap-3 border-b border-border bg-white px-6 py-3">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/documents')}
          className="text-slate-500 hover:text-slate-900"
        >
          <ArrowLeft className="h-4 w-4 mr-1.5" />
          Documents
        </Button>
        <span className="text-slate-400">/</span>
        <span className="text-sm font-medium text-slate-900">{doc.title}</span>
        <span className="ml-2 rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-700">
          AI Processed
        </span>
      </div>

      {/* Split-screen layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left — Source document */}
        <div ref={sourcePanelRef} className="flex-1 overflow-hidden bg-slate-50">
          <div className="h-full overflow-y-auto">
            <SourcePanel document={doc} highlightedId={highlightedId} />
          </div>
        </div>

        {/* Right — AI Summary */}
        <div className="w-[420px] shrink-0 flex flex-col overflow-hidden bg-white">
          <SummaryPanel document={doc} onCitationClick={handleCitationClick} />
        </div>
      </div>
    </div>
  )
}
