import { useEffect, useState } from "react"

export enum StorageKeys {
   FAVORITE_JOBS = "FAVORITE_JOBS",
}

export const useLocalStorage = <T,>(key: StorageKeys) => {
   const [value, setValue] = useState<T | undefined>(() => {
      try {
         const item = localStorage.getItem(key)
         return item ? (JSON.parse(item) as T) : undefined
      } catch {
         return undefined
      }
   })

   useEffect(() => {
      const handleStorage = (e: StorageEvent) => {
         if (e.key === key) {
            try {
               setValue(e.newValue ? JSON.parse(e.newValue) : undefined)
            } catch {
               setValue(undefined)
            }
         }
      }
      window.addEventListener("storage", handleStorage)
      return () => window.removeEventListener("storage", handleStorage)
   }, [key])

   const write = (newValue: T) => {
      try {
         localStorage.setItem(key, JSON.stringify(newValue))
         setValue(newValue)
      } catch (error) {
         console.warn(`Error writing localStorage key "${key}":`, error)
      }
   }

   const remove = () => {
      localStorage.removeItem(key)
      setValue(undefined)
   }

   return { value, write, remove }
}
