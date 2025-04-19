import { Button } from "@/components/ui/button"
import { Wand2, MessageSquare, Brain } from "lucide-react"

interface AiOptionsProps {
  onOptionClick: (option: "refactor" | "chat" | "challenge") => void
}

export function AiOptions({ onOptionClick }: AiOptionsProps) {
  return (
    <div className="grid grid-cols-3 gap-4 mt-4">
      <Button
        variant="outline"
        onClick={() => onOptionClick("refactor")}
        className="flex flex-col items-center justify-center h-32"
      >
        <Wand2 className="mb-2" />
        Refatorar
      </Button>
      <Button
        variant="outline"
        onClick={() => onOptionClick("chat")}
        className="flex flex-col items-center justify-center h-32"
      >
        <MessageSquare className="mb-2" />
        Conversar
      </Button>
      <Button
        variant="outline"
        onClick={() => onOptionClick("challenge")}
        className="flex flex-col items-center justify-center h-32"
      >
        <Brain className="mb-2" />
        Desafios Técnicos
      </Button>
    </div>
  )
}
