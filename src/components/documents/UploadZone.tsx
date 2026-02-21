import { useState, useRef } from 'react'
import { Upload, FileUp } from 'lucide-react'
import { cn } from '@/lib/utils'

interface UploadZoneProps {
  onFileSelected: (file: File) => void
}

export default function UploadZone({ onFileSelected }: UploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault()
    setIsDragging(true)
  }

  function handleDragLeave() {
    setIsDragging(false)
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) onFileSelected(file)
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) onFileSelected(file)
  }

  return (
    <div
      className={cn(
        'relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-10 transition-all duration-200 cursor-pointer',
        isDragging
          ? 'border-primary bg-primary/5 scale-[1.01]'
          : 'border-border hover:border-primary/50 hover:bg-slate-50'
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
    >
      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.jpg,.jpeg,.png,.tiff"
        className="hidden"
        onChange={handleChange}
      />

      <div className={cn(
        'mb-4 flex h-14 w-14 items-center justify-center rounded-xl transition-colors',
        isDragging ? 'bg-primary/20' : 'bg-slate-100'
      )}>
        {isDragging ? (
          <FileUp className="h-7 w-7 text-primary" />
        ) : (
          <Upload className="h-7 w-7 text-slate-500" />
        )}
      </div>

      <p className="text-sm font-semibold text-slate-900 mb-1">
        {isDragging ? 'Drop to upload' : 'Upload medical document'}
      </p>
      <p className="text-xs text-slate-500 text-center">
        Drag & drop or click to browse · PDF, JPG, PNG, TIFF
      </p>
    </div>
  )
}
