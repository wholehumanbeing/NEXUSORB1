import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'The Philosophical Nexus',
  description: 'A revolutionary 3D exploration of 2,500+ years of philosophical thought',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=VT323&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet" />
      </head>
      <body className="font-mono bg-black text-phosphor-green overflow-hidden">
        {children}
      </body>
    </html>
  )
}