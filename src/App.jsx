import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import Gate from './components/Gate'
import { Hero, Invitation, Countdown, Programme, Venue, Sender, Closing } from './components/Sections'
import Petals from './components/Petals'
import { asset } from './asset'

const MUSIC_VOLUME = 0.55

function fadeTo(audio, target, ms = 1800) {
  const from = audio.volume
  const t0 = performance.now()
  const tick = (now) => {
    const k = Math.min(1, (now - t0) / ms)
    audio.volume = from + (target - from) * k
    if (k < 1) requestAnimationFrame(tick)
    else if (target === 0) audio.pause()
  }
  requestAnimationFrame(tick)
}

const NAV = [
  ['#nimantran', 'निमंत्रण'],
  ['#karyakram', 'कार्यक्रम'],
  ['#sthal', 'स्थल'],
  ['#sampark', 'संपर्क'],
]

export default function App() {
  const params = useMemo(() => new URLSearchParams(location.search), [])
  // ?open skips the door screen (direct link / previews); music then waits for the toggle.
  const skipGate = params.has('open')
  const [gateOpen, setGateOpen] = useState(!skipGate)
  const [started, setStarted] = useState(skipGate)
  const [playing, setPlaying] = useState(false)
  const audioRef = useRef(null)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })
  const [pastHero, setPastHero] = useState(false)

  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > window.innerHeight * 0.8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock scroll while the gate is up.
  useEffect(() => {
    document.documentElement.classList.toggle('locked', gateOpen)
  }, [gateOpen])

  // Pause music when the tab is hidden; resume on return if it was playing.
  useEffect(() => {
    const onVis = () => {
      const a = audioRef.current
      if (!a) return
      if (document.hidden) a.pause()
      else if (playing) a.play().catch(() => {})
    }
    document.addEventListener('visibilitychange', onVis)
    return () => document.removeEventListener('visibilitychange', onVis)
  }, [playing])

  const startMusic = () => {
    const a = audioRef.current
    if (!a) return
    a.volume = 0
    a.play()
      .then(() => {
        setPlaying(true)
        fadeTo(a, MUSIC_VOLUME, 2500)
      })
      .catch(() => setPlaying(false))
  }

  const toggleMusic = () => {
    const a = audioRef.current
    if (!a) return
    if (playing) {
      setPlaying(false)
      fadeTo(a, 0, 600)
    } else {
      startMusic()
    }
  }

  return (
    <>
      <audio ref={audioRef} src={asset('music.m4a')} loop preload="auto" />

      <AnimatePresence>
        {gateOpen && (
          <Gate
            onOpen={() => {
              startMusic()
              setStarted(true)
            }}
            onDone={() => setGateOpen(false)}
          />
        )}
      </AnimatePresence>

      <motion.div className="progress" style={{ scaleX: progress }} aria-hidden="true" />

      <nav className={`nav ${gateOpen ? '' : 'nav--in'} ${pastHero ? 'nav--solid' : ''}`} aria-label="अनुभाग">
        <a href="#top" className="nav__mark" aria-label="ऊपर">
          H<span>✦</span>S
        </a>
        <div className="nav__links">
          {NAV.map(([href, label]) => (
            <a key={href} href={href}>
              {label}
            </a>
          ))}
        </div>
      </nav>

      {started && <Petals />}

      <main>
        <Hero started={started} />
        <Invitation />
        <Countdown />
        <Programme />
        <Venue />
        <Sender />
        <Closing />
      </main>

      <AnimatePresence>
        {!gateOpen && (
          <motion.button
            type="button"
            className={`music ${playing ? 'music--on' : ''}`}
            onClick={toggleMusic}
            aria-label={playing ? 'संगीत बंद करें' : 'संगीत चलाएँ'}
            aria-pressed={playing}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', bounce: 0.4 }}
          >
            <span className="music__bars" aria-hidden="true">
              <i />
              <i />
              <i />
              <i />
            </span>
            <span className="music__label">{playing ? 'संगीत' : 'मौन'}</span>
          </motion.button>
        )}
      </AnimatePresence>
    </>
  )
}
