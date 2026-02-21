import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2, FileText, Loader2 } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { useAppContext } from '@/context/useAppContext'
import { MOCK_DOCUMENTS } from '@/data/mockData'

const STEPS = [
  { label: 'Uploading document...', start: 0, end: 33, time: 0 },
  { label: 'AI is OCRing document...', start: 33, end: 33, time: 1000 },
  { label: 'Extracting clinical entities...', start: 33, end: 66, time: 2000 },
  { label: 'Generating AI summary...', start: 66, end: 100, time: 2500 },
]

interface UploadProgressModalProps {
  fileName: string
}

export default function UploadProgressModal({ fileName }: UploadProgressModalProps) {
  const { state, closeUploadModal, setUploadStep, addDocument } = useAppContext()
  const { isUploadModalOpen, uploadStep } = state
  const [progress, setProgress] = useState(0)
  const [stepIndex, setStepIndex] = useState(0)
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([])

  useEffect(() => {
    if (uploadStep !== 'upload') return

    // Clear any existing timers
    timersRef.current.forEach(clearTimeout)
    timersRef.current = []
    setProgress(0)
    setStepIndex(0)

    // Step 1 — progress 0 → 33
    const t1 = setTimeout(() => {
      setStepIndex(0)
      setProgress(33)
    }, 100)

    // Step 2 — show OCR label at 1s
    const t2 = setTimeout(() => {
      setStepIndex(1)
    }, 1000)

    // Step 3 — progress 33 → 66 at 2s
    const t3 = setTimeout(() => {
      setStepIndex(2)
      setProgress(66)
    }, 2000)

    // Step 4 — progress 66 → 100 at 2.5s
    const t4 = setTimeout(() => {
      setStepIndex(3)
      setProgress(100)
    }, 2500)

    // Complete at 3s
    const t5 = setTimeout(() => {
      addDocument(MOCK_DOCUMENTS[3]) // doc-004
      setUploadStep('success')
    }, 3200)

    timersRef.current = [t1, t2, t3, t4, t5]

    return () => timersRef.current.forEach(clearTimeout)
  }, [uploadStep])

  function handleClose() {
    timersRef.current.forEach(clearTimeout)
    closeUploadModal()
    setProgress(0)
    setStepIndex(0)
  }

  if (!isUploadModalOpen) return null

  return (
    <Dialog open={isUploadModalOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {uploadStep === 'success' ? 'Document Processed' : 'Processing Document'}
          </DialogTitle>
        </DialogHeader>

        <div className="mt-2">
          {/* File name */}
          <div className="flex items-center gap-3 rounded-lg bg-slate-50 border border-border px-4 py-3 mb-5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
              <FileText className="h-4.5 w-4.5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-900 truncate max-w-[280px]">{fileName}</p>
              <p className="text-xs text-slate-500">PDF Document</p>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {uploadStep === 'processing' || uploadStep === 'upload' ? (
              <motion.div
                key="processing"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
              >
                {/* Progress bar */}
                <div className="mb-3">
                  <Progress value={progress} className="h-2" />
                </div>

                {/* Step label */}
                <div className="flex items-center gap-2 mb-4">
                  <Loader2 className="h-4 w-4 text-primary animate-spin" />
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={stepIndex}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.2 }}
                      className="text-sm text-slate-700 font-medium"
                    >
                      {STEPS[stepIndex]?.label}
                    </motion.p>
                  </AnimatePresence>
                </div>

                {/* Step indicators */}
                <div className="space-y-2">
                  {STEPS.map((step, i) => (
                    <div key={i} className="flex items-center gap-2.5">
                      <div className={`h-1.5 w-1.5 rounded-full transition-colors ${i <= stepIndex ? 'bg-primary' : 'bg-slate-200'}`} />
                      <span className={`text-xs transition-colors ${i <= stepIndex ? 'text-slate-700' : 'text-slate-400'}`}>
                        {step.label.replace('...', '')}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="text-center py-4"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="flex justify-center mb-4"
                >
                  <CheckCircle2 className="h-14 w-14 text-emerald-500" />
                </motion.div>
                <h3 className="text-base font-semibold text-slate-900 mb-1">
                  Document ready
                </h3>
                <p className="text-sm text-slate-500 mb-5">
                  CBC with Differential has been processed and added to Michael's chart.
                </p>
                <Button onClick={handleClose} className="w-full bg-primary hover:bg-primary/90">
                  View Document
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  )
}
