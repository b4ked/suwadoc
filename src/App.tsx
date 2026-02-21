import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AppProvider } from '@/context/AppContext'
import AppLayout from '@/layouts/AppLayout'
import DashboardPage from '@/pages/DashboardPage'
import PatientOverviewPage from '@/pages/PatientOverviewPage'
import PatientsPage from '@/pages/PatientsPage'
import DocumentsPage from '@/pages/DocumentsPage'
import DocumentReviewPage from '@/pages/DocumentReviewPage'
import AIAssistantPage from '@/pages/AIAssistantPage'
import SettingsPage from '@/pages/SettingsPage'
import PatientPortalLayout from '@/layouts/PatientPortalLayout'
import PatientHomePage from '@/pages/patient/PatientHomePage'
import PatientWalletPage from '@/pages/patient/PatientWalletPage'
import PatientSharePage from '@/pages/patient/PatientSharePage'
import PatientChatPage from '@/pages/patient/PatientChatPage'

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/overview" element={<PatientOverviewPage />} />
            <Route path="/patients" element={<PatientsPage />} />
            <Route path="/documents" element={<DocumentsPage />} />
            <Route path="/documents/:id/review" element={<DocumentReviewPage />} />
            <Route path="/ai-assistant" element={<AIAssistantPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Route>
          <Route path="/patient" element={<Navigate to="/patient/home" replace />} />
          <Route element={<PatientPortalLayout />}>
            <Route path="/patient/home" element={<PatientHomePage />} />
            <Route path="/patient/wallet" element={<PatientWalletPage />} />
            <Route path="/patient/share" element={<PatientSharePage />} />
            <Route path="/patient/chat" element={<PatientChatPage />} />
          </Route>
        </Routes>
      </AppProvider>
    </BrowserRouter>
  )
}
