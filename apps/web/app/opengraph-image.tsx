import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0a0a0b',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 32,
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 256 256"
          width={120}
          height={120}
        >
          <path
            fill="#d97757"
            d="M143.38,17.85a8,8,0,0,0-12.63,3.41l-22,60.41L84.59,58.26a8,8,0,0,0-11.93.89C51,87.53,40,116.08,40,144a88,88,0,0,0,176,0C216,84.55,165.21,36,143.38,17.85Zm40.51,135.49a57.6,57.6,0,0,1-46.56,46.55A7.65,7.65,0,0,1,136,200a8,8,0,0,1-1.32-15.89c16.57-2.79,30.63-16.85,33.44-33.45a8,8,0,0,1,15.78,2.68Z"
          />
        </svg>
        <div
          style={{
            fontSize: 96,
            fontWeight: 700,
            color: '#f0f0f0',
            lineHeight: 1,
            letterSpacing: '-2px',
          }}
        >
          Burn
        </div>
        <div
          style={{
            fontSize: 32,
            color: '#888888',
            letterSpacing: '-0.5px',
          }}
        >
          Claude Usage in Your Menu Bar
        </div>
      </div>
    ),
    { ...size }
  )
}
