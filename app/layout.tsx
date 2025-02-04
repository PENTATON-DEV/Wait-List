import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Pentaton App',
  description: 'Pentaton redefines the music industry with decentralized streaming, NFT-backed music, and blockchain-powered royalty distribution, empowering artists and fans alike.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
