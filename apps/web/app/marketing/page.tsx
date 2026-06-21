import type { Metadata } from 'next'
import Link from 'next/link'
import './marketing.css'

export const metadata: Metadata = {
  title: 'Burn — Marketing assets',
  robots: { index: false, follow: false },
}

function Flame() {
  return (
    <svg viewBox="0 0 256 256" fill="currentColor" aria-hidden="true">
      <path d="M143.38,17.85a8,8,0,0,0-12.63,3.41l-22,60.41L84.59,58.26a8,8,0,0,0-11.93.89C51,87.53,40,116.08,40,144a88,88,0,0,0,176,0C216,84.55,165.21,36,143.38,17.85Zm40.51,135.49a57.6,57.6,0,0,1-46.56,46.55A7.65,7.65,0,0,1,136,200a8,8,0,0,1-1.32-15.89c16.57-2.79,30.63-16.85,33.44-33.45a8,8,0,0,1,15.78,2.68Z" />
    </svg>
  )
}

function Check() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25z" clipRule="evenodd" />
    </svg>
  )
}

function WifiGlyph() {
  return (
    <span className="mk-mb-glyph">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 9.5C7.5 4 16.5 4 22 9.5" />
        <path d="M5.5 13c3.6-3.4 9.4-3.4 13 0" />
        <path d="M9 16.5c1.7-1.6 4.3-1.6 6 0" />
        <circle cx="12" cy="20" r="1" fill="currentColor" stroke="none" />
      </svg>
    </span>
  )
}

function BatteryGlyph() {
  return (
    <span className="mk-mb-glyph">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round">
        <rect x="2" y="8" width="17" height="8" rx="2.2" />
        <rect x="4" y="10" width="9" height="4" rx="1" fill="currentColor" stroke="none" />
        <path d="M21.5 10.5v3" strokeLinecap="round" />
      </svg>
    </span>
  )
}

function MenuBar() {
  return (
    <div className="mk-menubar">
      <span className="mk-mb-pill"><Flame /></span>
      <WifiGlyph />
      <BatteryGlyph />
      <span className="mk-mb-time">9:41</span>
    </div>
  )
}

function ProWidget() {
  return (
    <div className="mk-widget">
      <MenuBar />
      <div className="mk-popover">
        <div className="mk-pop-head">
          <div className="mk-pop-brand"><Flame /> Burn</div>
          <span className="mk-pop-tag">PRO</span>
        </div>

        <div className="mk-metric">
          <div className="mk-metric-row"><span>Current session</span><span className="mk-metric-val">64%</span></div>
          <div className="mk-bar"><i style={{ width: '64%' }} /></div>
          <div className="mk-metric-sub">2h 14m until reset</div>
        </div>

        <div className="mk-metric">
          <div className="mk-metric-row"><span>Weekly limit</span><span className="mk-metric-val">38%</span></div>
          <div className="mk-bar"><i style={{ width: '38%' }} /></div>
        </div>

        <div className="mk-extra">
          <div className="mk-metric-row">
            <span>Usage history · 7d</span>
            <span className="mk-trend">↑ 12%</span>
          </div>
          <div className="mk-spark">
            {[42, 58, 35, 71, 49, 64, 88].map((h, i) => (
              <i key={i} className={h > 80 ? 'hot' : undefined} style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function LifetimeWidget() {
  return (
    <div className="mk-widget">
      <MenuBar />
      <div className="mk-popover">
        <div className="mk-pop-head">
          <div className="mk-pop-brand"><Flame /> Burn</div>
          <span className="mk-pop-tag">LIFETIME</span>
        </div>

        <div className="mk-metric">
          <div className="mk-metric-row"><span>Current session</span><span className="mk-metric-val">64%</span></div>
          <div className="mk-bar"><i style={{ width: '64%' }} /></div>
          <div className="mk-metric-sub">2h 14m until reset</div>
        </div>

        <div className="mk-metric">
          <div className="mk-metric-row"><span>Weekly limit</span><span className="mk-metric-val">38%</span></div>
          <div className="mk-bar"><i style={{ width: '38%' }} /></div>
        </div>

        <div className="mk-extra">
          <div className="mk-metric-row">
            <span>Usage history · 7d</span>
            <span className="mk-trend">↑ 12%</span>
          </div>
          <div className="mk-spark">
            {[42, 58, 35, 71, 49, 64, 88].map((h, i) => (
              <i key={i} className={h > 80 ? 'hot' : undefined} style={{ height: `${h}%` }} />
            ))}
          </div>
          <div className="mk-foreverline">
            <span className="inf">∞</span>
            <span>All future updates included</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function ProFrame() {
  return (
          <div className="mk-frame mk-frame--pro">
            <div className="mk-bg mk-bg--pro" />
            <div className="mk-blob" />
            <div className="mk-content mk-content--pro">
              <div className="mk-copy">
                <div className="mk-brand"><Flame /><span className="mk-brand-name">Burn</span></div>
                <span className="mk-eyebrow">Pro Plan</span>
                <h2 className="mk-title">See the<br /><em>whole</em> picture.</h2>
                <p className="mk-sub">Every number, plus the history and trends behind it.</p>
                <ul className="mk-feats">
                  <li><Check /> Usage history &amp; trends</li>
                  <li><Check /> Metrics &amp; reports</li>
                  <li><Check /> Everything in Free</li>
                </ul>
                <div className="mk-price">
                  <span className="mk-price-val">$10</span>
                  <span className="mk-price-per">/ month</span>
                </div>
              </div>
              <div className="mk-product"><ProWidget /></div>
            </div>
            <div className="mk-grain" />
          </div>
  )
}

function LifetimeFrame() {
  return (
          <div className="mk-frame mk-frame--lifetime">
            <div className="mk-bg mk-bg--lifetime" />
            <div className="mk-blob" />
            <div className="mk-content mk-content--lifetime">
              <div className="mk-copy">
                <div className="mk-brand"><Flame /><span className="mk-brand-name">Burn</span></div>
                <span className="mk-eyebrow">Lifetime License</span>
                <h2 className="mk-title">Pay once.<br /><em>Yours forever.</em></h2>
                <p className="mk-sub">One purchase. Every version of Burn, for life.</p>
                <ul className="mk-feats">
                  <li><Check /> Everything in Pro</li>
                  <li><Check /> Pay once, yours forever</li>
                  <li><Check /> All future updates included</li>
                </ul>
                <div className="mk-price">
                  <span className="mk-price-val">$99</span>
                  <span className="mk-price-per">one-time</span>
                </div>
              </div>
              <div className="mk-product"><LifetimeWidget /></div>
            </div>
            <div className="mk-grain" />
          </div>
  )
}

export default async function MarketingPage({
  searchParams,
}: {
  searchParams: Promise<{ only?: string }>
}) {
  const { only } = await searchParams

  if (only === 'pro' || only === 'lifetime') {
    return (
      <main className="mk-export">
        <div className="mk-stage mk-stage--bare">
          {only === 'pro' ? <ProFrame /> : <LifetimeFrame />}
        </div>
      </main>
    )
  }

  return (
    <main className="mk-page">
      <div className="mk-page-head">
        <Link href="/" className="mk-back">← Back to site</Link>
        <h1 className="mk-page-title">Product <em>images</em></h1>
        <p className="mk-page-sub">
          Showcase art for the Pro &amp; Lifetime plans. Each frame renders at a true 16:9 —
          export at 1600×900. Key content sits inside a safe zone so storefront cards can crop
          the edges without losing anything.
        </p>
      </div>

      {/* ── PRO ── */}
      <section className="mk-asset">
        <div className="mk-asset-label">
          <span className="name">Pro</span>
          <span className="dim">1600 × 900 · 16:9</span>
        </div>
        <div className="mk-stage"><ProFrame /></div>
      </section>

      {/* ── LIFETIME ── */}
      <section className="mk-asset">
        <div className="mk-asset-label">
          <span className="name">Lifetime</span>
          <span className="dim">1600 × 900 · 16:9</span>
        </div>
        <div className="mk-stage"><LifetimeFrame /></div>
      </section>
    </main>
  )
}
