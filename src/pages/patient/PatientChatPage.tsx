import { useState, useRef, useEffect } from 'react'
import { Sparkles, Send } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { PATIENT_PORTAL_CHAT } from '@/data/patientPortalData'
import type { ChatMessage } from '@/data/mockData'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'

const FALLBACK_RESPONSE =
  "I can only answer questions based on your uploaded records. For personalised medical advice, please speak with Dr. Sarah Jenkins."

function MessageBubble({ msg }: { msg: ChatMessage }) {
  const isUser = msg.role === 'user'
  return (
    <div className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      {/* Avatar */}
      <div
        className={`flex-shrink-0 flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold ${
          isUser ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-600'
        }`}
      >
        {isUser ? 'MC' : <Sparkles className="h-4 w-4" />}
      </div>

      {/* Bubble */}
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-3 text-base leading-relaxed ${
          isUser
            ? 'bg-blue-600 text-white rounded-tr-sm'
            : 'bg-white text-slate-800 border border-slate-200 rounded-tl-sm'
        }`}
      >
        <p className="whitespace-pre-line">{msg.content}</p>
        {msg.sources.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {msg.sources.map((src, i) => (
              <Badge
                key={i}
                variant="secondary"
                className="text-xs bg-blue-50 text-blue-700 border-blue-200 cursor-default"
              >
                {src.label}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function TypingIndicator() {
  return (
    <div className="flex gap-3">
      <div className="flex-shrink-0 flex h-8 w-8 items-center justify-center rounded-full bg-slate-100">
        <Sparkles className="h-4 w-4 text-slate-600" />
      </div>
      <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1">
        <span className="h-2 w-2 rounded-full bg-slate-400 animate-bounce [animation-delay:0ms]" />
        <span className="h-2 w-2 rounded-full bg-slate-400 animate-bounce [animation-delay:150ms]" />
        <span className="h-2 w-2 rounded-full bg-slate-400 animate-bounce [animation-delay:300ms]" />
      </div>
    </div>
  )
}

export default function PatientChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>(PATIENT_PORTAL_CHAT)
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  function handleSend() {
    const text = input.trim()
    if (!text || isTyping) return

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date().toISOString(),
      sources: [],
    }
    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setIsTyping(true)

    setTimeout(() => {
      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        role: 'assistant',
        content: FALLBACK_RESPONSE,
        timestamp: new Date().toISOString(),
        sources: [],
      }
      setMessages((prev) => [...prev, aiMsg])
      setIsTyping(false)
    }, 1500)
  }

  return (
    <div className="flex flex-col h-[calc(100vh-41px-57px)] sm:h-[calc(100vh-41px-57px)] max-w-lg mx-auto w-full">
      {/* Page header */}
      <div className="px-4 pt-5 pb-3 border-b border-slate-200 bg-slate-50">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-slate-900">AI Health Assistant</h1>
            <p className="text-sm text-slate-500">Based on your uploaded records</p>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs text-emerald-600 font-medium">Ready</span>
          </div>
        </div>

        {/* Disclaimer bar */}
        <div className="mt-3 bg-blue-50 border border-blue-100 text-blue-700 text-xs rounded-lg px-3 py-2">
          🔒 This assistant answers questions about your uploaded documents only. It does not
          diagnose conditions or replace professional medical advice.
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageBubble msg={msg} />
            </motion.div>
          ))}
          {isTyping && (
            <motion.div
              key="typing"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <TypingIndicator />
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="border-t border-slate-200 bg-white px-4 py-3">
        <div className="flex gap-2 items-end">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about your health records..."
            className="flex-1 resize-none rounded-xl text-base min-h-[44px] max-h-32"
            rows={1}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                handleSend()
              }
            }}
          />
          <Button
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="rounded-xl h-11 w-11 p-0 bg-blue-600 hover:bg-blue-700 flex-shrink-0"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
