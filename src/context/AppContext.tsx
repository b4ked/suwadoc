import React, { createContext, useReducer } from 'react'
import {
  type Patient,
  type MedicalDocument,
  type ChatMessage,
  type UploadStep,
  MOCK_PATIENT,
  ALL_PATIENTS,
  ALL_DOCUMENTS,
  INITIAL_CHAT_MESSAGES,
  CHAT_MESSAGES_BY_PATIENT,
} from '@/data/mockData'

// ============================================================
// STATE
// ============================================================

export interface AppState {
  patients: Patient[]
  currentPatientId: string
  currentPatient: Patient
  documents: MedicalDocument[]
  isUploadModalOpen: boolean
  uploadStep: UploadStep
  isSidebarCollapsed: boolean
  chatMessages: ChatMessage[]
  verifiedDocumentIds: Set<string>
}

function getDocsForPatient(patient: Patient, allDocs: MedicalDocument[]): MedicalDocument[] {
  return allDocs.filter((d) => patient.documents.includes(d.id))
}

const initialState: AppState = {
  patients: ALL_PATIENTS,
  currentPatientId: MOCK_PATIENT.id,
  currentPatient: MOCK_PATIENT,
  documents: getDocsForPatient(MOCK_PATIENT, ALL_DOCUMENTS),
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
  | { type: 'SET_CURRENT_PATIENT'; payload: string }
  | { type: 'OPEN_UPLOAD_MODAL' }
  | { type: 'CLOSE_UPLOAD_MODAL' }
  | { type: 'SET_UPLOAD_STEP'; payload: UploadStep }
  | { type: 'ADD_DOCUMENT'; payload: MedicalDocument }
  | { type: 'TOGGLE_SIDEBAR' }
  | { type: 'APPEND_CHAT_MESSAGE'; payload: ChatMessage }
  | { type: 'MARK_DOCUMENT_VERIFIED'; payload: string }

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'SET_CURRENT_PATIENT': {
      const patient = state.patients.find((p) => p.id === action.payload)
      if (!patient) return state
      return {
        ...state,
        currentPatientId: patient.id,
        currentPatient: patient,
        documents: getDocsForPatient(patient, ALL_DOCUMENTS),
        chatMessages: CHAT_MESSAGES_BY_PATIENT[patient.id] ?? [],
      }
    }
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
  setCurrentPatient: (id: string) => void
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
    setCurrentPatient: (id) => dispatch({ type: 'SET_CURRENT_PATIENT', payload: id }),
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
