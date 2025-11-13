import { useState } from "react"
import { Button } from "@/shared/ui/button"

export const Input = ({ onSend }: { onSend: (msg: string) => void }) => {
   const [text, setText] = useState("")

   const handleSend = () => {
      if (text.trim()) {
         onSend(text.trim())
         setText("")
      }
   }

   return (
      <div className="flex items-center gap-2 p-2 border-t">
         <input
            className="flex-1 border rounded-md px-2 py-1"
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Napisz wiadomość..."
            onKeyDown={e => e.key === "Enter" && handleSend()}
         />
         <Button onClick={handleSend}>Wyślij</Button>
      </div>
   )
}
