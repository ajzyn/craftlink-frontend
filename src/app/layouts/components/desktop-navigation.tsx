import type { MenuElement } from "@/app/layouts/hooks/use-navigation-items.tsx"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"
import { type UserDto, UserType } from "@/features/auth/types/auth.ts"
import { ChevronDown, LogOut, Settings } from "lucide-react"

interface DesktopNavigationProps {
  navigationItems: MenuElement[]
  user: UserDto | null
  onLogout: VoidFunction
}

export const DesktopNavigation = ({ navigationItems, user, onLogout }: DesktopNavigationProps) => {
  const getUserInitials = (user: UserDto) => {
    return user?.username ? user.username[0].toUpperCase() : "U"
  }

  return (
    <nav className="hidden lg:flex items-center space-x-1">
      {navigationItems.map((item, index) => (
        <Button key={index} variant="ghost" className="h-10" asChild>
          {item.href ? (
            <a href={item.href} className="flex items-center space-x-2">
              <span className="text-muted-foreground">{item.icon}</span>
              <span className="text-md">{item.label}</span>
            </a>
          ) : (
            <button onClick={item.onClick?.desktop} className="flex items-center space-x-2">
              <span className="text-muted-foreground">{item.icon}</span>
              <span className="text-md">{item.label}</span>
            </button>
          )}
        </Button>
      ))}

      <Separator orientation="vertical" className="h-4 mx-4" />

      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="flex items-center space-x-3 h-12 px-4 bg-muted/50 hover:bg-muted"
            >
              <div className="h-8 w-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                {getUserInitials(user)}
              </div>
              <ChevronDown size={16} className="text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-56" align="end">
            <DropdownMenuLabel>
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium">{user.username}</p>
                <p className="text-xs text-muted-foreground">
                  {user.userType === UserType.SPECIALIST
                    ? "Specjalista"
                    : user.userType === UserType.CLIENT
                      ? "Klient"
                      : "Administrator"}
                </p>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuItem asChild>
              <a href="/settings" className="flex items-center space-x-2 cursor-pointer">
                <Settings size={16} />
                <span>Ustawienia</span>
              </a>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              className="text-red-600 focus:text-red-600 focus:bg-red-50 cursor-pointer"
              onClick={onLogout}
            >
              <LogOut size={16} className="mr-2" />
              <span>Wyloguj się</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button
          variant="ghost"
          className="cursor-pointer hover:bg-muted text-muted-foreground text-md"
        >
          Craftlink dla wykonawców
        </Button>
      )}
    </nav>
  )
}
