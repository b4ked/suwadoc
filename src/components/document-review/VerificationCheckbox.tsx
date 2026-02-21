import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ShieldCheck, AlertTriangle } from 'lucide-react'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { useAppContext } from '@/context/useAppContext'

interface VerificationCheckboxProps {
  documentId: string
}

export default function VerificationCheckbox({ documentId }: VerificationCheckboxProps) {
  const { state, markDocumentVerified } = useAppContext()
  const isVerified = state.verifiedDocumentIds.has(documentId)
  const [checked, setChecked] = useState(false)

  function handleCheck(val: boolean | 'indeterminate') {
    setChecked(val === true)
  }

  function handleVerify() {
    if (checked) {
      markDocumentVerified(documentId)
    }
  }

  if (isVerified) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center gap-2 rounded-lg bg-emerald-50 border border-emerald-200 px-4 py-3"
      >
        <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
        <p className="text-sm font-medium text-emerald-800">
          Summary verified — Export unlocked
        </p>
        <Button
          size="sm"
          className="ml-auto bg-emerald-600 hover:bg-emerald-700 text-white"
        >
          Export Summary
        </Button>
      </motion.div>
    )
  }

  return (
    <div className="space-y-3">
      {/* Warning banner */}
      <AnimatePresence>
        {!checked && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="flex items-start gap-2 rounded-lg bg-amber-50 border border-amber-200 px-4 py-3">
              <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
              <p className="text-sm text-amber-800">
                Please verify the AI-generated summary against the source document before exporting.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Checkbox row */}
      <div className="flex items-center justify-between rounded-lg border border-border bg-white px-4 py-3">
        <div className="flex items-center gap-3">
          <Checkbox
            id="verify-check"
            checked={checked}
            onCheckedChange={handleCheck}
          />
          <Label htmlFor="verify-check" className="text-sm cursor-pointer">
            I have reviewed and verified this summary against the source document
          </Label>
        </div>
        <Button
          size="sm"
          disabled={!checked}
          onClick={handleVerify}
          className="ml-4 bg-primary hover:bg-primary/90 disabled:opacity-40"
        >
          Verify & Export
        </Button>
      </div>
    </div>
  )
}
