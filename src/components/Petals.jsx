import { useState } from 'react'

const COLORS = ['#f2a33a', '#e8862a', '#d9475a', '#f4c7c3', '#f7d67a']

/** Marigold and rose petals drifting down: a short burst after the gate opens, then a sparse loop. */
function makePetals() {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const n = reduce ? 0 : window.innerWidth < 640 ? 10 : 22
  return Array.from({ length: n }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    size: 8 + Math.random() * 10,
    dur: 9 + Math.random() * 9,
    delay: i < n / 2 ? Math.random() * 1.5 : 2 + Math.random() * 14,
    sway: 20 + Math.random() * 50,
    spin: (Math.random() > 0.5 ? 1 : -1) * (180 + Math.random() * 360),
    color: COLORS[i % COLORS.length],
  }))
}

export default function Petals() {
  const [petals] = useState(makePetals)

  return (
    <div className="petals" aria-hidden="true">
      {petals.map((p) => (
        <span
          key={p.id}
          className="petal"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size * 1.35,
            background: `radial-gradient(ellipse at 30% 30%, #fff8 0%, ${p.color} 55%)`,
            animationDuration: `${p.dur}s`,
            animationDelay: `${p.delay}s`,
            '--sway': `${p.sway}px`,
            '--spin': `${p.spin}deg`,
          }}
        />
      ))}
    </div>
  )
}
