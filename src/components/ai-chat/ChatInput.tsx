import { useState, useRef, type KeyboardEvent } from 'react'
import { Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

interface ChatInputProps {
  onSend: (message: string) => void
  disabled?: boolean
}

export default function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [value, setValue] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  function handleSend() {
    const trimmed = value.trim()
    if (!trimmed || disabled) return
    onSend(trimmed)
    setValue('')
    textareaRef.current?.focus()
  }

  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="flex items-end gap-3 border-t border-border bg-white p-4">
      <Textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Ask about Michael's records... (Enter to send)"
        className="min-h-[44px] max-h-[120px] resize-none border-border/60 focus-visible:ring-primary/50 rounded-xl text-sm"
        rows={1}
        disabled={disabled}
      />
      <Button
        onClick={handleSend}
        disabled={!value.trim() || disabled}
        size="icon"
        className="h-11 w-11 shrink-0 rounded-xl bg-primary hover:bg-primary/90 disabled:opacity-40"
      >
        <Send className="h-4 w-4" />
      </Button>
    </div>
  )
}
