import { useEffect, useRef, useState } from 'react'
import { Sparkles } from 'lucide-react'
import { useAppContext } from '@/context/useAppContext'
import { DEMO_RESPONSES, type ChatMessage } from '@/data/mockData'
import MessageBubble from '@/components/ai-chat/MessageBubble'
import TypingIndicator from '@/components/ai-chat/TypingIndicator'
import ChatInput from '@/components/ai-chat/ChatInput'

function generateId() {
  return `msg-${Date.now()}-${Math.random().toString(36).slice(2)}`
}

function getScriptedResponse(input: string) {
  const lower = input.toLowerCase()
  if (lower.includes('echo') || lower.includes('lv') || lower.includes('heart')) {
    return DEMO_RESPONSES.echocardiogram
  }
  if (lower.includes('medic') || lower.includes('lisinopril') || lower.includes('statin')) {
    return DEMO_RESPONSES.medications
  }
  if (lower.includes('diagnos') || lower.includes('hypert') || lower.includes('lipid')) {
    return DEMO_RESPONSES.diagnosis
  }
  return DEMO_RESPONSES.default
}

export default function AIAssistantPage() {
  const { state, appendChatMessage } = useAppContext()
  const { chatMessages, currentPatient } = state
  const [isTyping, setIsTyping] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chatMessages, isTyping])

  async function handleSend(text: string) {
    // Append user message
    const userMsg: ChatMessage = {
      id: generateId(),
      role: 'user',
      content: text,
      timestamp: new Date().toISOString(),
      sources: [],
    }
    appendChatMessage(userMsg)

    // Show typing indicator
    setIsTyping(true)

    // After 1.5s, send scripted response
    setTimeout(() => {
      setIsTyping(false)
      const response = getScriptedResponse(text)
      const aiMsg: ChatMessage = {
        id: generateId(),
        role: 'assistant',
        content: response.content,
        timestamp: new Date().toISOString(),
        sources: response.sources,
      }
      appendChatMessage(aiMsg)
    }, 1500)
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-border bg-white px-6 py-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
          <Sparkles className="h-4 w-4 text-primary" />
        </div>
        <div>
          <h1 className="text-sm font-semibold text-slate-900">AI Medical Assistant</h1>
          <p className="text-xs text-slate-500">
            Context: {currentPatient.name} · {currentPatient.documents.length} documents loaded
          </p>
        </div>
        <div className="ml-auto flex items-center gap-1.5">
          <div className="h-2 w-2 rounded-full bg-emerald-500" />
          <span className="text-xs text-slate-500">Ready</span>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto bg-slate-50 px-6 py-4">
        {chatMessages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}

        {isTyping && <TypingIndicator />}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <ChatInput onSend={handleSend} disabled={isTyping} />
    </div>
  )
}
