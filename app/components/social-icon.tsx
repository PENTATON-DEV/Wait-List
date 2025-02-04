import Link from "next/link"
import type { ReactNode } from "react"

interface SocialIconProps {
  href: string
  target?: string
  rel?: string
  "aria-label": string
  icon: ReactNode
}

export function SocialIcon({ href, target, rel, "aria-label": ariaLabel, icon }: SocialIconProps) {
  return (
    <Link
      href={href}
      target={target}
      rel={rel}
      aria-label={ariaLabel}
      className="text-gray-400 hover:text-white transition-all duration-300 ease-in-out transform hover:scale-110"
    >
      {icon}
    </Link>
  )
}

