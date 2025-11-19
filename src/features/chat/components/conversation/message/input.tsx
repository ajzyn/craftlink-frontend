import { useState } from "react"
import { Button } from "@/shared/components/ui/button"
import { Input as ShadcnInput } from "@/shared/components/ui/input"
import { SendHorizontal } from "lucide-react"

export const Input = ({ onSend }: { onSend: (msg: string) => void }) => {
   const [text, setText] = useState("")

   const handleSend = () => {
      if (text.trim()) {
         onSend(text.trim())
         setText("")
      }
   }

   return (
      <div className="flex flex-wrap items-center gap-2 p-2 border-t border-gray-200">
         <ShadcnInput
            className="flex-1 min-w-[200px] min-h-12 md:min-h-11"
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Napisz wiadomość..."
            onKeyDown={e => e.key === "Enter" && handleSend()}
         />
         <Button variant="ghost" onClick={handleSend}>
            <SendHorizontal className="h-5 w-5 text-primary" aria-hidden="true" focusable="false" />
         </Button>
      </div>
   )
}
