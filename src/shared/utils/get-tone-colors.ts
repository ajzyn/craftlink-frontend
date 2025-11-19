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
