import type { Metadata } from 'next'
import './globals.css'
import DatabuddyWidget from './databuddy-widget'

export const metadata: Metadata = {
  title: 'Burn — Claude Usage in Your Menu Bar',
  description: 'Burn sits in your macOS menu bar and shows your Claude usage at a glance.',
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 256 256'><path fill='%23d97757' d='M143.38,17.85a8,8,0,0,0-12.63,3.41l-22,60.41L84.59,58.26a8,8,0,0,0-11.93.89C51,87.53,40,116.08,40,144a88,88,0,0,0,176,0C216,84.55,165.21,36,143.38,17.85Zm40.51,135.49a57.6,57.6,0,0,1-46.56,46.55A7.65,7.65,0,0,1,136,200a8,8,0,0,1-1.32-15.89c16.57-2.79,30.63-16.85,33.44-33.45a8,8,0,0,1,15.78,2.68Z'/></svg>",
  },
  openGraph: {
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
