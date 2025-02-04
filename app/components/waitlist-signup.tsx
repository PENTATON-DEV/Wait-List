"use client"

import { useState, useEffect, useRef } from "react"
import { getWaitlistCount } from "../actions/waitlist"
import { X, Instagram, Facebook, Linkedin, Volume2, VolumeX } from "lucide-react"
import { Avatar } from "./avatar"
import { SocialIcon } from "./social-icon"
import { WaitlistForm } from "./waitlist-form"
import { Logo } from "./logo"
import { Button } from "@/components/ui/button"

export function WaitlistSignup() {
  const [waitlistCount, setWaitlistCount] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    getWaitlistCount().then((count) => setWaitlistCount(count))
  }, [])

  const handleSuccess = (count: number) => {
    setWaitlistCount(count)
  }

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  return (
    <div className="w-full max-w-xl mx-auto p-8 flex flex-col justify-between min-h-screen">
      <div className="flex-1 flex flex-col justify-center items-center text-center">
        <Logo />
        <div>
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-br from-[#8B1F3F] to-[#FF6B98]">
            Join Our Product Launch Waitlist
          </h2>
        </div>
        <div>
          <p className="text-lg sm:text-xl mb-8 text-gray-300">
            Be part of something truly extraordinary. Join others already gaining early access to our revolutionary new
            product.
          </p>
        </div>
        <div className="w-full">
          <WaitlistForm onSuccess={handleSuccess} />
        </div>
        <div>
          <div className="flex items-center justify-center mt-8">
            <div className="flex -space-x-2 mr-4">
              <Avatar initials="JD" index={0} />
              <Avatar initials="AS" index={1} />
              <Avatar initials="MK" index={2} />
            </div>
            <p className="text-white font-semibold">{waitlistCount}+ people on the waitlist</p>
          </div>
        </div>
      </div>
      <div className="pt-8 flex justify-center space-x-6">
        <SocialIcon
          href="https://x.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="X (formerly Twitter)"
          icon={<X className="w-6 h-6" />}
        />
        <SocialIcon
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          icon={<Instagram className="w-6 h-6" />}
        />
        <SocialIcon
          href="https://discord.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Discord"
          icon={
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
            </svg>
          }
        />
        <SocialIcon
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook"
          icon={<Facebook className="w-6 h-6" />}
        />
        <SocialIcon
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          icon={<Linkedin className="w-6 h-6" />}
        />
      </div>
      <div className="fixed bottom-4 right-4">
        <Button
          onClick={toggleMusic}
          variant="outline"
          size="icon"
          className="rounded-full bg-white/10 backdrop-blur-sm"
        >
          {isPlaying ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
        </Button>
      </div>
      <audio ref={audioRef} loop>
        <source
          src="/music.mp3"
          type="audio/mpeg"
        />
        Your browser does not support the audio element.
      </audio>
    </div>
  )
}

