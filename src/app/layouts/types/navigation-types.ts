import type { ReactNode } from "react"

export interface BaseMenuItem {
   label: string
   icon: ReactNode
}

export interface LinkMenuItem extends BaseMenuItem {
   type: "link"
   href: string
}

export interface ActionMenuItem extends BaseMenuItem {
   type: "action"
   onClick: VoidFunction
   onClickMobile?: VoidFunction
}

export type MenuItem = LinkMenuItem | ActionMenuItem

export interface NavSection {
   id: string
   items: MenuItem[]
}

export interface NavigationConfig {
   desktop: {
      header: MenuItem[]
      userDropdown?: NavSection[]
   }
   mobile: {
      header: MenuItem[]
      hamburger: NavSection[]
   }
}
