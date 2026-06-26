import type { Metadata } from 'next'
import './globals.css'
import DatabuddyWidget from './databuddy-widget'

export const metadata: Metadata = {
  metadataBase: new URL('https://burnusage.xyz'),
  title: 'Burn — Claude Usage in Your Menu Bar',
  description: 'Burn sits in your macOS menu bar and shows your Claude usage at a glance.',
  verification: {
    google: 'idLetIZWVH5yF1WYP1HwnVTkiLGCuAGjtxLzj_JVS-o',
  },
  openGraph: {
    siteName: 'Burn',
    title: 'Burn Waitlist',
    description: 'Burn sits in your macOS menu bar and shows your Claude usage at a glance.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Burn Waitlist',
    description: 'Burn sits in your macOS menu bar and shows your Claude usage at a glance.',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <DatabuddyWidget />
      </body>
    </html>
  )
}
