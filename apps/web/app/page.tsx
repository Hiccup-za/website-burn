'use client'

import { useState, useEffect, useCallback } from 'react'


interface Particle {
  x: number; y: number; vx: number; vy: number
  w: number; h: number; color: string; rot: number; rotV: number; born: number
}

function launchConfetti() {
  const colors = ['#d97757', '#e8946e', '#c45e38', '#f2a47a', '#b8512e', '#f0a882', '#e06b44', '#cc6340']
  const WAVES = 3
  const WAVE_INTERVAL = 600
  const FADE_START = 4000
  const DURATION = 6000

  const canvas = document.createElement('canvas')
  canvas.style.cssText = 'position:fixed;inset:0;z-index:9999;pointer-events:none;'
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  document.body.appendChild(canvas)
  const ctx = canvas.getContext('2d')!

  const allParticles: Particle[] = []

  function spawnWave() {
    const born = performance.now()
    for (let i = 0; i < 420; i++) {
      allParticles.push({
        x: Math.random() * canvas.width,
        y: -12 - Math.random() * 140,
        vx: (Math.random() - 0.5) * 3.5,
        vy: 0.6 + Math.random() * 1.8,
        w: 6 + Math.random() * 9,
        h: 3 + Math.random() * 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        rot: Math.random() * Math.PI * 2,
        rotV: (Math.random() - 0.5) * 0.18,
        born,
      })
    }
  }

  for (let i = 0; i < WAVES; i++) {
    setTimeout(spawnWave, i * WAVE_INTERVAL)
  }

  const globalStart = performance.now()
  const totalDuration = (WAVES - 1) * WAVE_INTERVAL + DURATION

  ;(function frame() {
    const now = performance.now()
    const globalElapsed = now - globalStart
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    let any = false
    for (const p of allParticles) {
      const age = now - p.born
      if (age < 0) continue
      p.x += p.vx
      p.y += p.vy
      p.vy += 0.03
      p.vx *= 0.995
      p.rot += p.rotV
      const opacity = age < FADE_START ? 1 : Math.max(0, 1 - (age - FADE_START) / (DURATION - FADE_START))
      if (opacity > 0 && p.y < canvas.height + 20) any = true
      ctx.save()
      ctx.globalAlpha = opacity
      ctx.translate(p.x, p.y)
      ctx.rotate(p.rot)
      ctx.fillStyle = p.color
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h)
      ctx.restore()
    }

    if (globalElapsed < totalDuration || any) requestAnimationFrame(frame)
    else canvas.remove()
  })()
}

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  const [submitError, setSubmitError] = useState('')
  const [company, setCompany] = useState('') // honeypot — real users leave this empty
  const [count, setCount] = useState<number | null>(null)

  useEffect(() => {
    fetch('/api/waitlist/count')
      .then(r => r.json())
      .then(({ count: n }) => setCount(n ?? 0))
      .catch(() => {})
  }, [])

  const openModal = useCallback(() => setModalOpen(true), [])
  const closeModal = useCallback(() => setModalOpen(false), [])

  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => { if (e.key === 'Escape') closeModal() }
    document.addEventListener('keydown', handleKeydown)
    return () => document.removeEventListener('keydown', handleKeydown)
  }, [closeModal])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (submitting) return

    if (!email.trim()) {
      setEmailError('Email is required.')
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setEmailError('Please enter a valid email address.')
      return
    }
    setEmailError('')
    setSubmitError('')
    setSubmitting(true)
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, company }),
      })
      if (res.status === 429) {
        setSubmitError('Too many attempts. Please wait a moment and try again.')
        return
      }
      if (!res.ok) {
        setSubmitError('Something went wrong. Please try again.')
        return
      }
      setSubmitted(true)
      launchConfetti()
      // Refresh count after signup
      fetch('/api/waitlist/count')
        .then(r => r.json())
        .then(({ count: n }) => setCount(n ?? 0))
        .catch(() => {})
    } catch {
      setSubmitError('Network error. Please check your connection and try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const countLabel = count === null
    ? null
    : `${count.toLocaleString()} ${count === 1 ? 'person' : 'people'} on the waitlist`

  return (
    <>
      {/* NAV */}
      <nav>
        <a href="#" className="nav-brand">
          <svg className="nav-logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true">
            <path d="M143.38,17.85a8,8,0,0,0-12.63,3.41l-22,60.41L84.59,58.26a8,8,0,0,0-11.93.89C51,87.53,40,116.08,40,144a88,88,0,0,0,176,0C216,84.55,165.21,36,143.38,17.85Zm40.51,135.49a57.6,57.6,0,0,1-46.56,46.55A7.65,7.65,0,0,1,136,200a8,8,0,0,1-1.32-15.89c16.57-2.79,30.63-16.85,33.44-33.45a8,8,0,0,1,15.78,2.68Z" />
          </svg>
          <span className="nav-name">Burn</span>
        </a>
        <a href="https://x.com/BurnUsage" target="_blank" rel="noopener noreferrer" className="nav-x-link" aria-label="Burn on X">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 256 256" aria-hidden="true">
            <path d="M214.75,211.71l-62.6-98.38,61.77-67.95a8,8,0,0,0-11.84-10.76L143.24,99.34,102.75,35.71A8,8,0,0,0,96,32H48a8,8,0,0,0-6.75,12.3l62.6,98.37-61.77,68a8,8,0,1,0,11.84,10.76l58.84-64.72,40.49,63.63A8,8,0,0,0,160,224h48a8,8,0,0,0,6.75-12.29ZM164.39,208,62.57,48h29L193.43,208Z" />
          </svg>
        </a>
      </nav>

      {/* HERO */}
      <section className="hero">
        <p className="hero-eyebrow">Menu Bar App for macOS</p>
        <h1>Your Claude usage,<br /><em>always visible</em></h1>
        <p className="hero-sub">
          Burn lives quietly in your menu bar and shows your Claude usage at a glance. No tab switching, no guessing.
        </p>

        {/* CTA */}
        <div className="cta-wrap">
          <button className="btn-download" onClick={openModal}>
            Join the Waitlist
          </button>
          <p className="cta-meta">
            <span>v0.1</span><span>macOS 13+</span>
          </p>
          {countLabel !== null && (
            <p className="waitlist-count">
              <span className="waitlist-count-dot"></span>
              <span>{countLabel}</span>
            </p>
          )}
        </div>

        {/* Mockup */}
        <div className="mockup-wrap">
          <div className="menubar-pill">
            <p className="mb-section-title">Usage</p>
            <p className="mb-sublabel">Current session</p>
            <div className="mb-bar-track">
              <div className="mb-bar-fill" style={{ width: '32%' }}></div>
            </div>
            <div className="mb-meta"><span>32% used</span><span>Resets in 2 hr 7 min</span></div>

            <p className="mb-section-title">Weekly limits</p>
            <p className="mb-sublabel">All models</p>
            <div className="mb-bar-track">
              <div className="mb-bar-fill green" style={{ width: '24%' }}></div>
            </div>
            <div className="mb-meta"><span>24% used</span><span>Resets in 3 hr 57 min</span></div>
          </div>
        </div>
      </section>

      {/* NOTIFICATIONS SECTION */}
      <section className="feature-section">
        <div className="feature-grid">
          <div className="feature-copy">
            <span className="section-eyebrow">Notifications</span>
            <h2 className="feature-heading">Never get<br /><em>caught off guard</em></h2>
            <p className="feature-text">Burn sends native macOS notifications as you approach your limits, so you always know when one is coming. Stay in flow and wrap up on your terms instead of hitting a wall.</p>
          </div>
          <div className="feature-visual">
        <div className="notif-stack">
          <div className="notif-card">
            <div className="notif-app-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true">
                <path d="M143.38,17.85a8,8,0,0,0-12.63,3.41l-22,60.41L84.59,58.26a8,8,0,0,0-11.93.89C51,87.53,40,116.08,40,144a88,88,0,0,0,176,0C216,84.55,165.21,36,143.38,17.85Zm40.51,135.49a57.6,57.6,0,0,1-46.56,46.55A7.65,7.65,0,0,1,136,200a8,8,0,0,1-1.32-15.89c16.57-2.79,30.63-16.85,33.44-33.45a8,8,0,0,1,15.78,2.68Z" />
              </svg>
            </div>
            <div className="notif-content">
              <div className="notif-top">
                <span className="notif-title">Current Session at 83%</span>
                <span className="notif-time">Yesterday, 19:58</span>
              </div>
              <p className="notif-body">Resets in 4 hr 1 min.</p>
            </div>
          </div>

          <div className="notif-card">
            <div className="notif-app-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true">
                <path d="M143.38,17.85a8,8,0,0,0-12.63,3.41l-22,60.41L84.59,58.26a8,8,0,0,0-11.93.89C51,87.53,40,116.08,40,144a88,88,0,0,0,176,0C216,84.55,165.21,36,143.38,17.85Zm40.51,135.49a57.6,57.6,0,0,1-46.56,46.55A7.65,7.65,0,0,1,136,200a8,8,0,0,1-1.32-15.89c16.57-2.79,30.63-16.85,33.44-33.45a8,8,0,0,1,15.78,2.68Z" />
              </svg>
            </div>
            <div className="notif-content">
              <div className="notif-top">
                <span className="notif-title">Session Resets in Under 5 Minutes</span>
                <span className="notif-time">Yesterday, 18:55</span>
              </div>
              <p className="notif-body">Your current session limit is about to reset.</p>
            </div>
          </div>

          <div className="notif-card">
            <div className="notif-app-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true">
                <path d="M143.38,17.85a8,8,0,0,0-12.63,3.41l-22,60.41L84.59,58.26a8,8,0,0,0-11.93.89C51,87.53,40,116.08,40,144a88,88,0,0,0,176,0C216,84.55,165.21,36,143.38,17.85Zm40.51,135.49a57.6,57.6,0,0,1-46.56,46.55A7.65,7.65,0,0,1,136,200a8,8,0,0,1-1.32-15.89c16.57-2.79,30.63-16.85,33.44-33.45a8,8,0,0,1,15.78,2.68Z" />
              </svg>
            </div>
            <div className="notif-content">
              <div className="notif-top">
                <span className="notif-title">Weekly Usage at 80%</span>
                <span className="notif-time">Yesterday, 14:02</span>
              </div>
              <p className="notif-body">Resets Mon 9:00 AM.</p>
            </div>
          </div>
        </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <span>© 2026 Burn</span>
        <span>Built by <a href="https://x.com/chriszeuch" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)' }}>Chris</a></span>
      </footer>

      {/* WAITLIST MODAL */}
      <div
        className={`modal-overlay${modalOpen ? ' open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-heading"
        onClick={(e) => { if (e.target === e.currentTarget) closeModal() }}
      >
        <div className="modal-card">
          <button className="modal-close" onClick={closeModal} aria-label="Close">&times;</button>

          <h2 className="modal-heading" id="modal-heading">Join the waitlist</h2>
          <p className="modal-subheading">Hello and thank you for your interest!</p>

          <div className="modal-body">
            <p>Heya, I&apos;m <a href="https://x.com/chriszeuch" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)' }}>Chris</a> 👋</p>
            <p>I built Burn so that I could check in on my Claude usage as I worked.</p>
            <p>Now that I&apos;ve used it for a few weeks, I&apos;m gearing up for an early access release. Drop your email below and you&apos;ll be among the first to know when a download is available.</p>
            <p>Thanks again for your interest!</p>
          </div>

          {!submitted ? (
            <form className="modal-form" onSubmit={handleSubmit} noValidate>
              {/* Honeypot: hidden from real users, bots tend to fill it */}
              <input
                type="text"
                name="company"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }}
                value={company}
                onChange={e => setCompany(e.target.value)}
              />
              <input
                className={`modal-input${emailError ? ' modal-input-error' : ''}`}
                id="waitlist-email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                required
                aria-describedby={emailError ? 'email-error' : undefined}
                value={email}
                onChange={e => { setEmail(e.target.value); setEmailError(''); setSubmitError('') }}
              />
              {emailError && (
                <p id="email-error" className="modal-input-error-msg" role="alert">{emailError}</p>
              )}
              {submitError && (
                <p className="modal-input-error-msg" role="alert">{submitError}</p>
              )}
              <button className="modal-submit" type="submit" disabled={submitting}>
                {submitting ? 'Joining…' : 'Join the Waitlist'}
              </button>
            </form>
          ) : (
            <div className="modal-success visible" role="status">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25z" clipRule="evenodd" />
              </svg>
              You&apos;re on the list
            </div>
          )}
        </div>
      </div>
    </>
  )
}
