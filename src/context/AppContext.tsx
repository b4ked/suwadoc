import React, { createContext, useReducer } from 'react'
import {
  type Patient,
  type MedicalDocument,
  type ChatMessage,
  type UploadStep,
  MOCK_PATIENT,
  MOCK_DOCUMENTS,
  INITIAL_CHAT_MESSAGES,
} from '@/data/mockData'

// ============================================================
// STATE
// ============================================================

export interface AppState {
  currentPatient: Patient
  documents: MedicalDocument[]
  isUploadModalOpen: boolean
  uploadStep: UploadStep
  isSidebarCollapsed: boolean
  chatMessages: ChatMessage[]
  verifiedDocumentIds: Set<string>
}

const initialState: AppState = {
  currentPatient: MOCK_PATIENT,
  documents: MOCK_DOCUMENTS.slice(0, 3), // doc-004 reserved for upload demo
  isUploadModalOpen: false,
  uploadStep: 'idle',
  isSidebarCollapsed: false,
  chatMessages: INITIAL_CHAT_MESSAGES,
  verifiedDocumentIds: new Set(),
}

// ============================================================
// ACTIONS
// ============================================================

type Action =
  | { type: 'OPEN_UPLOAD_MODAL' }
  | { type: 'CLOSE_UPLOAD_MODAL' }
  | { type: 'SET_UPLOAD_STEP'; payload: UploadStep }
  | { type: 'ADD_DOCUMENT'; payload: MedicalDocument }
  | { type: 'TOGGLE_SIDEBAR' }
  | { type: 'APPEND_CHAT_MESSAGE'; payload: ChatMessage }
  | { type: 'MARK_DOCUMENT_VERIFIED'; payload: string }

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'OPEN_UPLOAD_MODAL':
      return { ...state, isUploadModalOpen: true, uploadStep: 'upload' }
    case 'CLOSE_UPLOAD_MODAL':
      return { ...state, isUploadModalOpen: false, uploadStep: 'idle' }
    case 'SET_UPLOAD_STEP':
      return { ...state, uploadStep: action.payload }
    case 'ADD_DOCUMENT':
      return {
        ...state,
        documents: [...state.documents, action.payload],
        currentPatient: {
          ...state.currentPatient,
          documents: [...state.currentPatient.documents, action.payload.id],
        },
      }
    case 'TOGGLE_SIDEBAR':
      return { ...state, isSidebarCollapsed: !state.isSidebarCollapsed }
    case 'APPEND_CHAT_MESSAGE':
      return { ...state, chatMessages: [...state.chatMessages, action.payload] }
    case 'MARK_DOCUMENT_VERIFIED': {
      const newSet = new Set(state.verifiedDocumentIds)
      newSet.add(action.payload)
      return { ...state, verifiedDocumentIds: newSet }
    }
    default:
      return state
  }
}

// ============================================================
// CONTEXT
// ============================================================

export interface AppContextValue {
  state: AppState
  openUploadModal: () => void
  closeUploadModal: () => void
  setUploadStep: (step: UploadStep) => void
  addDocument: (doc: MedicalDocument) => void
  toggleSidebar: () => void
  appendChatMessage: (msg: ChatMessage) => void
  markDocumentVerified: (id: string) => void
}

export const AppContext = createContext<AppContextValue | null>(null)

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  const value: AppContextValue = {
    state,
    openUploadModal: () => dispatch({ type: 'OPEN_UPLOAD_MODAL' }),
    closeUploadModal: () => dispatch({ type: 'CLOSE_UPLOAD_MODAL' }),
    setUploadStep: (step) => dispatch({ type: 'SET_UPLOAD_STEP', payload: step }),
    addDocument: (doc) => dispatch({ type: 'ADD_DOCUMENT', payload: doc }),
    toggleSidebar: () => dispatch({ type: 'TOGGLE_SIDEBAR' }),
    appendChatMessage: (msg) => dispatch({ type: 'APPEND_CHAT_MESSAGE', payload: msg }),
    markDocumentVerified: (id) => dispatch({ type: 'MARK_DOCUMENT_VERIFIED', payload: id }),
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
