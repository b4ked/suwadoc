import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import SourceLink from './SourceLink'
import type { ChatMessage } from '@/data/mockData'
import { CURRENT_USER } from '@/data/mockData'

interface MessageBubbleProps {
  message: ChatMessage
}

function formatTime(ts: string) {
  return new Date(ts).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
}

function renderContent(content: string) {
  // Convert **bold** and newlines for simple markdown-like rendering
  const lines = content.split('\n')
  return lines.map((line, i) => {
    const parts = line.split(/(\*\*[^*]+\*\*)/)
    return (
      <span key={i}>
        {parts.map((part, j) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={j}>{part.slice(2, -2)}</strong>
          }
          return part
        })}
        {i < lines.length - 1 && <br />}
      </span>
    )
  })
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === 'user'

  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className={cn('flex items-start gap-3 mb-4', isUser && 'flex-row-reverse')}
    >
      {/* Avatar */}
      <div
        className={cn(
          'flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold mt-0.5',
          isUser
            ? 'bg-primary text-primary-foreground'
            : 'bg-primary/10 text-primary'
        )}
      >
        {isUser ? CURRENT_USER.avatarInitials : 'AI'}
      </div>

      {/* Bubble */}
      <div className={cn('max-w-[75%]', isUser && 'items-end flex flex-col')}>
        <div
          className={cn(
            'rounded-2xl px-4 py-3 text-sm leading-relaxed',
            isUser
              ? 'rounded-tr-sm bg-primary text-primary-foreground'
              : 'rounded-tl-sm bg-white border border-border/60 shadow-sm text-slate-800'
          )}
        >
          {renderContent(message.content)}
        </div>

        {/* Sources */}
        {message.sources.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-2">
            {message.sources.map((src, i) => (
              <SourceLink key={i} source={src} />
            ))}
          </div>
        )}

        <time className={cn('mt-1 text-xs text-slate-400', isUser && 'text-right')}>
          {formatTime(message.timestamp)}
        </time>
      </div>
    </motion.div>
  )
}
