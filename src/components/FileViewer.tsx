import { Textarea } from "@/components/ui/textarea"

interface FileViewerProps {
  code: string
  onChange: (value: string) => void
}

export function FileViewer({ code, onChange }: FileViewerProps) {
  return (
    <div className="h-[60vh]">
      <Textarea
        className="w-full h-full resize-none"
        value={code}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Código do arquivo selecionado..."
      />
    </div>
  )
}
