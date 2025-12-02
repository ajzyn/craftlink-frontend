import { Link } from "@tanstack/react-router"

//TODO: dodać strony
export const Footer = () => {
   return (
      <footer className="mt-16 py-4 px-8 border-t border-gray-200">
         <div className="flex flex-col justify-center md:flex-row md:justify-between items-center gap-4">
            <div className="text-sm text-muted-foreground">
               © 2025 CraftLink. Wszystkie prawa zastrzeżone.
            </div>
            <div className="flex gap-6 text-sm">
               <Link to="#" className="text-muted-foreground hover:text-primary transition">
                  Pomoc
               </Link>
               <Link to="#" className="text-muted-foreground hover:text-primary transition">
                  Kontakt
               </Link>
               <Link to="#" className="text-muted-foreground hover:text-primary transition">
                  Regulamin
               </Link>
               <Link to="#" className="text-muted-foreground hover:text-primary transition">
                  Polityka prywatności
               </Link>
            </div>
         </div>
      </footer>
   )
}
