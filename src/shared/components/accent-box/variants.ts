import { cva } from "class-variance-authority"

export const accentBoxVariants = cva("rounded-md px-4 py-2 border", {
   variants: {
      tone: {
         amber: "bg-amber-50 border-amber-200 text-amber-800",
         red: "bg-red-50 border-red-200 text-red-800",
         green: "bg-green-50 border-green-200 text-green-800",
         blue: "bg-blue-50 border-blue-200 text-blue-800",
         violet: "bg-violet-50 border-violet-200 text-violet-800",
         orange: "bg-orange-50 border-orange-200 text-orange-800",
      },
   },
   defaultVariants: {
      tone: "amber",
   },
})
