import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'UniDownloader',
  description: 'Download any video in any quality',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  )
}