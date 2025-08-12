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

      <body className="font-primary bg-black text-phosphor-green overflow-hidden">
        {children}
      </body>
    </html>
  )
}