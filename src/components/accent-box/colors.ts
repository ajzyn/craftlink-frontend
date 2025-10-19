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
export const getToneColors = (tone?: string | null) => {
   switch (tone) {
      case "amber":
         return {
            bg: "bg-amber-100",
            text: "text-amber-700",
            icon: "text-amber-600",
         }
      case "green":
         return {
            bg: "bg-green-100",
            text: "text-green-700",
            icon: "text-green-600",
         }
      case "blue":
         return {
            bg: "bg-blue-100",
            text: "text-blue-700",
            icon: "text-blue-600",
         }
      case "orange":
         return {
            bg: "bg-orange-100",
            text: "text-orange-700",
            icon: "text-orange-600",
         }
      case "violet":
         return {
            bg: "bg-violet-100",
            text: "text-violet-700",
            icon: "text-violet-600",
         }
      case "red":
         return {
            bg: "bg-red-100",
            text: "text-red-700",
            icon: "text-red-600",
         }
      default:
         return {
            bg: "bg-gray-100",
            text: "text-gray-700",
            icon: "text-gray-600",
         }
   }
}
