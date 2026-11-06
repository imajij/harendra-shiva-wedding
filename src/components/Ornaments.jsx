import { motion } from 'framer-motion'

const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  show: { pathLength: 1, opacity: 1, transition: { duration: 1.6, ease: [0.65, 0, 0.35, 1] } },
}

/** Gold scroll divider that draws itself when scrolled into view. */
export function Divider({ className = '' }) {
  return (
    <motion.svg
      className={`divider ${className}`}
      viewBox="0 0 320 28"
      fill="none"
      aria-hidden="true"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-40px' }}
    >
      <motion.path
        variants={draw}
        d="M4 14 H118 C128 14 132 6 140 6 C148 6 150 14 160 14 C170 14 172 6 180 6 C188 6 192 14 202 14 H316"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <motion.path
        variants={draw}
        d="M140 22 C150 22 152 14 160 14 C168 14 170 22 180 22"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <motion.circle
        cx="160"
        cy="14"
        r="3.2"
        fill="currentColor"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1, type: 'spring', stiffness: 260, damping: 14 }}
      />
      <circle cx="4" cy="14" r="1.8" fill="currentColor" />
      <circle cx="316" cy="14" r="1.8" fill="currentColor" />
    </motion.svg>
  )
}

/** HS monogram inside a filigree ring, as on the printed card. */
export function Monogram({ size = 120, className = '' }) {
  return (
    <svg className={`monogram ${className}`} width={size} height={size} viewBox="0 0 120 120" aria-label="H S">
      <defs>
        <linearGradient id="mg-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f3dc9a" />
          <stop offset="0.45" stopColor="#c99a45" />
          <stop offset="1" stopColor="#8a6424" />
        </linearGradient>
      </defs>
      <circle cx="60" cy="60" r="44" fill="none" stroke="url(#mg-gold)" strokeWidth="1.4" />
      <circle cx="60" cy="60" r="49" fill="none" stroke="url(#mg-gold)" strokeWidth="0.6" strokeDasharray="1.5 3" />
      {Array.from({ length: 8 }).map((_, i) => (
        <g key={i} transform={`rotate(${i * 45} 60 60)`}>
          <path d="M60 6 C63 10 63 13 60 16 C57 13 57 10 60 6Z" fill="url(#mg-gold)" />
        </g>
      ))}
      <text
        x="47"
        y="62"
        textAnchor="middle"
        fontFamily="'Cormorant Garamond', serif"
        fontStyle="italic"
        fontSize="38"
        fill="url(#mg-gold)"
      >
        H
      </text>
      <text
        x="72"
        y="80"
        textAnchor="middle"
        fontFamily="'Cormorant Garamond', serif"
        fontStyle="italic"
        fontSize="38"
        fill="url(#mg-gold)"
      >
        S
      </text>
    </svg>
  )
}

/** Small kalash / diya-style glyph used as a list bullet. */
export function Bud({ className = '' }) {
  return (
    <svg className={`bud ${className}`} viewBox="0 0 20 20" aria-hidden="true">
      <path d="M10 2 C14 7 14 11 10 14 C6 11 6 7 10 2Z" fill="currentColor" />
      <path d="M4 15 H16" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  )
}
