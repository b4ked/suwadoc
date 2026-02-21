import { cn } from '@/lib/utils'
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table'
import { ScrollArea } from '@/components/ui/scroll-area'
import type { MedicalDocument } from '@/data/mockData'

interface SourcePanelProps {
  document: MedicalDocument
  highlightedId: string | null
}

const flagConfig = {
  H: { label: 'H', className: 'bg-red-100 text-red-700 border-red-200' },
  L: { label: 'L', className: 'bg-blue-100 text-blue-700 border-blue-200' },
  N: { label: 'N', className: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
}

export default function SourcePanel({ document: doc, highlightedId }: SourcePanelProps) {
  return (
    <ScrollArea className="h-full">
      <div className="p-6 space-y-6">
        {/* Document header */}
        <div className="border-b border-border pb-4">
          <h2 className="text-base font-bold text-slate-900 mb-1">{doc.title}</h2>
          <div className="flex flex-wrap gap-3 text-xs text-slate-500">
            <span>{doc.provider}</span>
            <span>·</span>
            <span>
              {new Date(doc.dateOfService).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </span>
          </div>
        </div>

        {/* Paragraphs */}
        {doc.paragraphs.map((para) => (
          <div
            key={para.id}
            id={para.id}
            className={cn(
              'scroll-mt-6 rounded-lg transition-all duration-500',
              highlightedId === para.id
                ? 'ring-2 ring-primary ring-offset-2 bg-primary/5'
                : ''
            )}
          >
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2 px-1">
              {para.label}
            </h3>

            {para.isTable && para.tableRows ? (
              <div className="rounded-lg border border-border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-slate-50">
                      <TableHead className="font-semibold text-slate-700">Marker</TableHead>
                      <TableHead className="font-semibold text-slate-700">Value</TableHead>
                      <TableHead className="font-semibold text-slate-700">Unit</TableHead>
                      <TableHead className="font-semibold text-slate-700">Ref Range</TableHead>
                      <TableHead className="font-semibold text-slate-700 text-center">Flag</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {para.tableRows.map((row, i) => (
                      <TableRow key={i} className={row.flag !== 'N' ? 'bg-amber-50/40' : ''}>
                        <TableCell className="font-medium text-slate-800">{row.marker}</TableCell>
                        <TableCell
                          className={cn(
                            'font-bold tabular-nums',
                            row.flag === 'H' ? 'text-red-600' : row.flag === 'L' ? 'text-blue-600' : 'text-slate-800'
                          )}
                        >
                          {row.value}
                        </TableCell>
                        <TableCell className="text-slate-500">{row.unit}</TableCell>
                        <TableCell className="text-slate-500">{row.referenceRange}</TableCell>
                        <TableCell className="text-center">
                          <span
                            className={cn(
                              'inline-flex items-center justify-center rounded border px-1.5 py-0.5 text-xs font-bold',
                              flagConfig[row.flag].className
                            )}
                          >
                            {row.flag}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="rounded-lg bg-slate-50 border border-border/60 px-4 py-3">
                <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                  {para.content}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </ScrollArea>
  )
}
