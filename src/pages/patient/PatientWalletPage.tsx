import { useRef, useState } from 'react'
import { FlaskConical, Stethoscope, ScanLine, ChevronRight, Upload } from 'lucide-react'
import { type MedicalDocument } from '@/data/mockData'
import { PLAIN_ENGLISH_SUMMARIES } from '@/data/patientPortalData'
import { useAppContext } from '@/context/useAppContext'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import UploadProgressModal from '@/components/documents/UploadProgressModal'

function DocIcon({ type }: { type: MedicalDocument['type'] }) {
  if (type === 'lab_result') return <FlaskConical className="h-5 w-5 text-blue-500" />
  if (type === 'clinical_note') return <Stethoscope className="h-5 w-5 text-emerald-500" />
  return <ScanLine className="h-5 w-5 text-violet-500" />
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export default function PatientWalletPage() {
  const { state, openUploadModal } = useAppContext()
  const patientDocs = state.documents
  const [selectedDoc, setSelectedDoc] = useState<MedicalDocument | null>(null)
  const [fileName, setFileName] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  function handleUploadClick() {
    fileInputRef.current?.click()
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setFileName(file.name)
    openUploadModal()
    // Reset input so the same file can be picked again if needed
    e.target.value = ''
  }

  return (
    <div className="max-w-lg mx-auto px-4 py-6 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">My Medical Wallet</h1>
          <p className="text-sm text-slate-500 mt-0.5">
            <Badge variant="secondary" className="font-normal">
              {patientDocs.length} records
            </Badge>
          </p>
        </div>
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.jpg,.png,.tiff"
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Upload button */}
      <Button
        className="w-full rounded-2xl h-12 text-base bg-blue-600 hover:bg-blue-700 text-white"
        onClick={handleUploadClick}
      >
        <Upload className="h-4 w-4 mr-2" />
        Upload New Record
      </Button>

      {/* Document cards */}
      <div className="space-y-3">
        {patientDocs.map((doc) => (
          <button
            key={doc.id}
            onClick={() => setSelectedDoc(doc)}
            className="w-full text-left rounded-2xl bg-white shadow-sm border border-slate-200 p-4 flex items-center gap-4 hover:border-blue-300 hover:shadow-md transition-all"
          >
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-slate-50 border border-slate-100">
              <DocIcon type={doc.type} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-base font-semibold text-slate-900 truncate">{doc.title}</p>
              <p className="text-sm text-slate-500 truncate">{doc.provider}</p>
              <p className="text-xs text-slate-400 mt-0.5">{formatDate(doc.dateOfService)}</p>
            </div>
            <div className="flex flex-col items-end gap-2 flex-shrink-0">
              <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-50 text-xs">
                ✓ Processed
              </Badge>
              <ChevronRight className="h-4 w-4 text-slate-400" />
            </div>
          </button>
        ))}
      </div>

      {/* Document detail modal */}
      <Dialog open={!!selectedDoc} onOpenChange={(open) => !open && setSelectedDoc(null)}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle className="text-lg pr-6">{selectedDoc?.title}</DialogTitle>
            <p className="text-sm text-slate-500">
              {selectedDoc?.provider} · {selectedDoc && formatDate(selectedDoc.dateOfService)}
            </p>
          </DialogHeader>

          {selectedDoc && (
            <Tabs defaultValue="summary" className="flex-1 overflow-hidden flex flex-col">
              <TabsList className="w-full">
                <TabsTrigger value="summary" className="flex-1">
                  AI Summary
                </TabsTrigger>
                <TabsTrigger value="original" className="flex-1">
                  Original Record
                </TabsTrigger>
              </TabsList>

              <TabsContent
                value="summary"
                className="flex-1 overflow-y-auto mt-4 space-y-4"
              >
                <div className="text-base leading-relaxed text-slate-800 whitespace-pre-line">
                  {PLAIN_ENGLISH_SUMMARIES[selectedDoc.id] ?? 'Summary not available.'}
                </div>
                <p className="text-sm italic text-slate-500 border-t pt-3 mt-3">
                  This summary was generated by AI to help you understand your results. Please
                  discuss these results with your doctor.
                </p>
              </TabsContent>

              <TabsContent
                value="original"
                className="flex-1 overflow-y-auto mt-4 space-y-4"
              >
                {selectedDoc.paragraphs.map((para) => (
                  <div key={para.id}>
                    <h3 className="text-sm font-semibold text-slate-600 mb-1">{para.label}</h3>
                    {para.isTable && para.tableRows ? (
                      <div className="overflow-x-auto rounded-lg border border-slate-200">
                        <table className="w-full text-sm">
                          <thead className="bg-slate-50">
                            <tr>
                              <th className="text-left px-3 py-2 font-medium text-slate-600">
                                Test
                              </th>
                              <th className="text-left px-3 py-2 font-medium text-slate-600">
                                Result
                              </th>
                              <th className="text-left px-3 py-2 font-medium text-slate-600">
                                Reference
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {para.tableRows.map((row, i) => (
                              <tr key={i} className="border-t border-slate-100">
                                <td className="px-3 py-2 text-slate-700">{row.marker}</td>
                                <td className="px-3 py-2 font-medium">
                                  <span
                                    className={
                                      row.flag === 'H'
                                        ? 'text-amber-700'
                                        : row.flag === 'L'
                                          ? 'text-blue-700'
                                          : 'text-slate-800'
                                    }
                                  >
                                    {row.value} {row.unit}
                                    {row.flag !== 'N' && (
                                      <span className="ml-1 text-xs">({row.flag})</span>
                                    )}
                                  </span>
                                </td>
                                <td className="px-3 py-2 text-slate-500">{row.referenceRange}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <p className="text-sm text-slate-700 whitespace-pre-line">{para.content}</p>
                    )}
                  </div>
                ))}
              </TabsContent>
            </Tabs>
          )}
        </DialogContent>
      </Dialog>

      {/* Upload progress modal */}
      <UploadProgressModal fileName={fileName} />
    </div>
  )
}
