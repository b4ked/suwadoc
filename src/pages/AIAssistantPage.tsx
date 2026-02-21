import { useEffect, useRef, useState } from 'react'
import { Sparkles } from 'lucide-react'
import { useAppContext } from '@/context/useAppContext'
import { DEMO_RESPONSES_BY_PATIENT, type ChatMessage } from '@/data/mockData'
import MessageBubble from '@/components/ai-chat/MessageBubble'
import TypingIndicator from '@/components/ai-chat/TypingIndicator'
import ChatInput from '@/components/ai-chat/ChatInput'

function generateId() {
  return `msg-${Date.now()}-${Math.random().toString(36).slice(2)}`
}

function getScriptedResponse(input: string, patientId: string) {
  const lower = input.toLowerCase()
  const responses = DEMO_RESPONSES_BY_PATIENT[patientId] ?? DEMO_RESPONSES_BY_PATIENT['patient-001']

  if (patientId === 'patient-002') {
    if (lower.includes('hba1c') || lower.includes('a1c') || lower.includes('glycem') || lower.includes('glucose')) {
      return responses.hba1c
    }
    if (lower.includes('kidney') || lower.includes('egfr') || lower.includes('ckd') || lower.includes('renal') || lower.includes('nephro')) {
      return responses.kidney
    }
    if (lower.includes('medic') || lower.includes('metformin') || lower.includes('insulin') || lower.includes('empagliflozin')) {
      return responses.medications
    }
  } else if (patientId === 'patient-003') {
    if (lower.includes('bnp') || lower.includes('heart fail') || lower.includes('volume') || lower.includes('fluid') || lower.includes('furosemide')) {
      return responses.bnp
    }
    if (lower.includes('echo') || lower.includes('ejection') || lower.includes(' ef') || lower.includes('lv') || lower.includes('fraction')) {
      return responses.echo
    }
    if (lower.includes('warfarin') || lower.includes('inr') || lower.includes('afib') || lower.includes('coagul') || lower.includes('anticoag')) {
      return responses.anticoagulation
    }
  } else {
    // patient-001 (Michael Chen)
    if (lower.includes('echo') || lower.includes('lv') || lower.includes('heart')) {
      return responses.echocardiogram
    }
    if (lower.includes('medic') || lower.includes('lisinopril') || lower.includes('statin')) {
      return responses.medications
    }
    if (lower.includes('diagnos') || lower.includes('hypert') || lower.includes('lipid')) {
      return responses.diagnosis
    }
  }

  return responses.default
}

export default function AIAssistantPage() {
  const { state, appendChatMessage } = useAppContext()
  const { chatMessages, currentPatient, currentPatientId } = state
  const [isTyping, setIsTyping] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chatMessages, isTyping])

  async function handleSend(text: string) {
    const userMsg: ChatMessage = {
      id: generateId(),
      role: 'user',
      content: text,
      timestamp: new Date().toISOString(),
      sources: [],
    }
    appendChatMessage(userMsg)

    setIsTyping(true)

    setTimeout(() => {
      setIsTyping(false)
      const response = getScriptedResponse(text, currentPatientId)
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
