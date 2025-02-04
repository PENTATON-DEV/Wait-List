interface AvatarProps {
  initials: string
  index: number
}

export function Avatar({ initials, index }: AvatarProps) {
  const colors = [
    "bg-[#8B1F3F]", // Primary brand color
    "bg-[#6B1730]", // Darker shade
    "bg-[#AB2F4F]", // Lighter shade
  ]

  return (
    <div
      className={`w-10 h-10 rounded-full border border-white/20 ${colors[index]} flex items-center justify-center text-white font-semibold text-sm`}
    >
      {initials}
    </div>
  )
}

