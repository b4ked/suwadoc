import { useNavigate } from 'react-router-dom'
import { ExternalLink } from 'lucide-react'
import type { ChatMessageSource } from '@/data/mockData'

interface SourceLinkProps {
  source: ChatMessageSource
}

export default function SourceLink({ source }: SourceLinkProps) {
  const navigate = useNavigate()

  function handleClick() {
    navigate(`/documents/${source.documentId}/review`)
  }

  return (
    <button
      onClick={handleClick}
      className="inline-flex items-center gap-1 rounded-full border border-primary/30 bg-primary/8 px-2.5 py-1 text-xs font-medium text-primary hover:bg-primary/15 hover:border-primary/50 transition-colors"
    >
      <ExternalLink className="h-3 w-3" />
      {source.label}
    </button>
  )
}
