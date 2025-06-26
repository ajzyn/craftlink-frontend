import type { LucideProps } from "lucide-react"
import * as LucideIcons from "lucide-react"
import type { ComponentType } from "react"
import { capitalize } from "lodash"

interface DynamicIconProps extends Omit<LucideProps, "ref"> {
  iconName?: string
}

export const DynamicIcon = ({ iconName, ...props }: DynamicIconProps) => {
  const IconComponent = LucideIcons[
    capitalize(iconName) as keyof typeof LucideIcons
  ] as ComponentType<LucideProps>

  if (!IconComponent) {
    return <LucideIcons.Circle {...props} />
  }

  return <IconComponent {...props} />
}
