import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, FileText } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAppContext } from '@/context/useAppContext'
import DocumentCard from '@/components/documents/DocumentCard'
import UploadZone from '@/components/documents/UploadZone'
import UploadProgressModal from '@/components/documents/UploadProgressModal'

export default function DocumentsPage() {
  const { state, openUploadModal } = useAppContext()
  const { documents } = state
  const [fileName, setFileName] = useState('document.pdf')

  function handleFileSelected(file: File) {
    setFileName(file.name)
    openUploadModal()
  }

  return (
    <div className="p-6 space-y-6 max-w-[1400px]">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Documents</h1>
          <p className="text-sm text-slate-500 mt-0.5">
            {documents.length} document{documents.length !== 1 ? 's' : ''} · Michael Chen
          </p>
        </div>
        <Button
          className="bg-primary hover:bg-primary/90"
          onClick={() => openUploadModal()}
        >
          <Plus className="h-4 w-4 mr-2" />
          Upload Document
        </Button>
      </div>

      {/* Upload zone */}
      <UploadZone onFileSelected={handleFileSelected} />

      {/* Documents grid */}
      {documents.length > 0 ? (
        <section>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500 mb-3">
            Processed Documents
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {documents.map((doc, i) => (
              <motion.div
                key={doc.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.06 }}
              >
                <DocumentCard document={doc} />
              </motion.div>
            ))}
          </div>
        </section>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <FileText className="h-12 w-12 text-slate-300 mb-4" />
          <p className="text-slate-500 font-medium">No documents yet</p>
          <p className="text-sm text-slate-400 mt-1">Upload a medical document to get started</p>
        </div>
      )}

      {/* Upload modal */}
      <UploadProgressModal fileName={fileName} />
    </div>
  )
}
