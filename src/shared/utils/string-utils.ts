export const capitalizeFirstLetter = (str?: string) => {
   if (!str) return ""
   return str.charAt(0).toUpperCase() + str.slice(1)
}

export const getUserInitials = (fullName = "") => {
   if (!fullName) return "?"
   return fullName
      .split(" ")
      .map(name => name[0].toUpperCase())
      .join("")
      .toUpperCase()
}
