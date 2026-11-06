import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { couple, cover, invocation, invitation, programme, venue, sender, countdownTarget } from '../content'
import { Divider, Monogram } from './Ornaments'
import { asset } from '../asset'

const ease = [0.22, 1, 0.36, 1]

const reveal = {
  hidden: { opacity: 0, y: 28 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.9, ease, delay: i * 0.12 } }),
}

const inView = { initial: 'hidden', whileInView: 'show', viewport: { once: true, margin: '-60px' } }

// Veo hero loops; set to null to use the still image only.
const HERO_VIDEO = null // { portrait: asset('hero-portrait.mp4'), landscape: asset('hero-landscape.mp4') }

function Eyebrow({ hi, en }) {
  return (
    <motion.div className="eyebrow" variants={reveal} {...inView}>
      <span className="eyebrow__hi">{hi}</span>
      {en && <span className="eyebrow__en">{en}</span>}
    </motion.div>
  )
}

/* ------------------------------------------------------------------ Hero */

export function Hero({ started }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const videoRef = useRef(null)
  const [videoSrc] = useState(() =>
    window.matchMedia('(min-aspect-ratio: 1/1)').matches ? HERO_VIDEO?.landscape : HERO_VIDEO?.portrait,
  )

  useEffect(() => {
    if (started) videoRef.current?.play().catch(() => {})
  }, [started])

  const step = (i) => ({
    initial: { opacity: 0, y: 24, filter: 'blur(6px)' },
    animate: started ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {},
    transition: { duration: 1.3, ease, delay: 0.5 + i * 0.22 },
  })

  return (
    <header className="hero" ref={ref} id="top">
      <motion.div className="hero__media" style={{ y }}>
        <picture>
          <source media="(min-aspect-ratio: 1/1)" srcSet={asset('hero-landscape.webp')} />
          <img src={asset('hero-portrait.webp')} alt="" className="hero__img" />
        </picture>
        {HERO_VIDEO && (
          <video
            ref={videoRef}
            className="hero__video"
            src={videoSrc}
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
            onPlaying={(e) => e.currentTarget.classList.add('is-playing')}
          />
        )}
      </motion.div>
      <div className="hero__veil" aria-hidden="true" />

      <motion.div className="hero__content" style={{ opacity: fade }}>
        <motion.img src={asset('ganesha.webp')} alt="श्री गणेश" className="hero__ganesha" {...step(0)} />
        <motion.p className="hero__mantra" {...step(0)}>
          {invocation.salutation}
        </motion.p>
        <motion.p className="hero__title" {...step(1)}>
          {cover.title}
        </motion.p>
        <motion.h1 className="hero__names" {...step(2)}>
          <span className="hero__name">{couple.groom}</span>
          <span className="hero__joiner">{couple.joiner}</span>
          <span className="hero__name">{couple.bride}</span>
        </motion.h1>
        <motion.div {...step(3)}>
          <Divider className="divider--light" />
        </motion.div>
        <motion.p className="hero__ceremony" {...step(3)}>
          {cover.ceremony[0]} {cover.ceremony[1]}
        </motion.p>
        <motion.p className="hero__date" {...step(4)}>
          {cover.dateLine}
        </motion.p>
      </motion.div>

      <motion.a
        href="#nimantran"
        className="hero__scroll"
        initial={{ opacity: 0 }}
        animate={started ? { opacity: 1 } : {}}
        transition={{ delay: 2.4, duration: 1 }}
        aria-label="नीचे देखें"
      >
        <span />
      </motion.a>
    </header>
  )
}

/* ------------------------------------------------------------ Invitation */

function Person({ p, side }) {
  return (
    <motion.article className={`person person--${side}`} variants={reveal} {...inView}>
      <div className="person__portrait">
        <img src={asset(`${side}.webp`)} alt="" loading="lazy" />
      </div>
      <p className="person__title">{p.title}</p>
      <h3 className="person__name">{p.name}</h3>
      <dl className="person__lines">
        {p.lines.map(([k, v]) => (
          <div key={k}>
            <dt>{k}</dt>
            <dd>{v}</dd>
          </div>
        ))}
      </dl>
    </motion.article>
  )
}

export function Invitation() {
  return (
    <section className="section invitation" id="nimantran">
      <div className="paper-card">
        <span className="corner corner--tl" aria-hidden="true" />
        <span className="corner corner--br" aria-hidden="true" />
        <motion.img
          src={asset('ganesha.webp')}
          alt="श्री गणेश"
          className="invitation__ganesha"
          variants={reveal}
          {...inView}
          loading="lazy"
        />
        <motion.p className="mantra" variants={reveal} {...inView}>
          {invocation.salutation}
        </motion.p>
        <motion.blockquote className="doha" variants={reveal} custom={1} {...inView}>
          {invocation.doha.map((l) => (
            <span key={l}>{l}</span>
          ))}
        </motion.blockquote>
        <Divider />
        <motion.p className="invitation__greeting" variants={reveal} {...inView}>
          {invitation.greeting}
        </motion.p>
        <motion.p className="invitation__opening" variants={reveal} custom={1} {...inView}>
          {invitation.opening}
        </motion.p>

        <div className="people">
          <Person p={invitation.groom} side="groom" />
          <motion.div
            className="people__joiner"
            initial={{ opacity: 0, scale: 0.6 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, type: 'spring', bounce: 0.4 }}
          >
            {invitation.joiner}
          </motion.div>
          <Person p={invitation.bride} side="bride" />
        </div>

        <motion.p className="invitation__festival" variants={reveal} {...inView}>
          {invitation.festival}
        </motion.p>
        <motion.p className="invitation__closing" variants={reveal} custom={1} {...inView}>
          {invitation.closing}
        </motion.p>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------- Countdown */

function diff(target) {
  const ms = Math.max(0, new Date(target).getTime() - Date.now())
  return {
    done: ms === 0,
    d: Math.floor(ms / 86400000),
    h: Math.floor(ms / 3600000) % 24,
    m: Math.floor(ms / 60000) % 60,
    s: Math.floor(ms / 1000) % 60,
  }
}

function Unit({ value, label }) {
  const v = String(value).padStart(2, '0')
  return (
    <div className="unit">
      <div className="unit__num">
        <motion.span
          key={v}
          initial={{ y: '-60%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          transition={{ duration: 0.45, ease }}
        >
          {v}
        </motion.span>
      </div>
      <span className="unit__label">{label}</span>
    </div>
  )
}

export function Countdown() {
  const [t, setT] = useState(() => diff(countdownTarget))
  useEffect(() => {
    const id = setInterval(() => setT(diff(countdownTarget)), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <section className="section countdown" aria-label="शुभ घड़ी की प्रतीक्षा">
      <Eyebrow hi="शुभ घड़ी की प्रतीक्षा" en="Counting down to the day" />
      {t.done ? (
        <p className="countdown__done">॥ शुभ विवाह ॥</p>
      ) : (
        <motion.div className="countdown__grid" variants={reveal} {...inView}>
          <Unit value={t.d} label="दिन" />
          <Unit value={t.h} label="घंटे" />
          <Unit value={t.m} label="मिनट" />
          <Unit value={t.s} label="सेकंड" />
        </motion.div>
      )}
      <p className="countdown__for">
        {programme.events[2].name} · {programme.events[2].day} {programme.events[2].date}
      </p>
    </section>
  )
}

/* ------------------------------------------------------------- Programme */

export function Programme() {
  return (
    <section className="section programme" id="karyakram">
      <Eyebrow hi={invocation.salutation} en="The Wedding Celebrations" />
      <motion.h2 className="section__title" variants={reveal} {...inView}>
        {programme.heading}
      </motion.h2>
      <Divider />

      <ol className="events">
        {programme.events.map((e, i) => (
          <motion.li
            key={e.id}
            className={`event ${e.highlight ? 'event--main' : ''}`}
            variants={reveal}
            custom={i % 2}
            {...inView}
          >
            <div className="event__arch">
              <img src={asset(`${e.image}.webp`)} alt="" loading="lazy" />
            </div>
            <div className="event__body">
              <span className="event__en">{e.en}</span>
              <h3 className="event__name">{e.name}</h3>
              <p className="event__date">
                {e.day} <b>{e.date}</b>
              </p>
              {e.time && <p className="event__time">{e.time}</p>}
            </div>
          </motion.li>
        ))}
      </ol>

      <motion.p className="note" variants={reveal} {...inView}>
        {programme.note}
      </motion.p>
    </section>
  )
}

/* ----------------------------------------------------------------- Venue */

const calUrl = (() => {
  const p = new URLSearchParams({
    action: 'TEMPLATE',
    text: 'हरेन्द्र संग शिवा · टीका पाणिग्रहण संस्कार एवं प्रीतिभोज',
    dates: '20261125T123000Z/20261125T183000Z',
    details: 'सायं 6 बजे से आपके आगमन तक',
    location: `${venue.name}, ${venue.address}`,
    ctz: 'Asia/Kolkata',
  })
  return `https://calendar.google.com/calendar/render?${p}`
})()

export function Venue() {
  const [showMap, setShowMap] = useState(false)
  const mapRef = useRef(null)

  useEffect(() => {
    const el = mapRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([en]) => {
        if (en.isIntersecting) {
          setShowMap(true)
          io.disconnect()
        }
      },
      { rootMargin: '300px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <section className="section venue" id="sthal">
      <Eyebrow hi={venue.label} en="The Venue" />
      <motion.div className="venue__frame" variants={reveal} {...inView}>
        <picture>
          <source media="(min-width: 720px)" srcSet={asset('venue-landscape.webp')} />
          <img src={asset('venue-portrait.webp')} alt="Grand Castle Resort" loading="lazy" />
        </picture>
        <div className="venue__plate">
          <h2 className="venue__name">{venue.name}</h2>
          <p className="venue__addr">{venue.address}</p>
        </div>
      </motion.div>

      <motion.div className="venue__actions" variants={reveal} {...inView}>
        <a className="btn btn--maroon" href={venue.mapsUrl} target="_blank" rel="noreferrer">
          मार्ग देखें <small>Directions</small>
        </a>
        <a className="btn btn--ghost" href={calUrl} target="_blank" rel="noreferrer">
          कैलेंडर में जोड़ें <small>Save the date</small>
        </a>
      </motion.div>

      <div className="venue__map" ref={mapRef}>
        {showMap && (
          <iframe
            title="Grand Castle Resort map"
            src={`https://www.google.com/maps?q=${encodeURIComponent(venue.embedQuery)}&output=embed`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        )}
      </div>
    </section>
  )
}

/* ---------------------------------------------------------------- Sender */

export function Sender() {
  const phone = sender.phones[0]
  const wa = `https://wa.me/91${phone}?text=${encodeURIComponent(
    'नमस्ते 🙏 हरेन्द्र संग शिवा के मंगल परिणय (25 नवम्बर 2026) में हम सम्मिलित होंगे।\nनाम: ',
  )}`
  return (
    <section className="section sender" id="sampark">
      <Eyebrow hi={sender.label} en="With warm regards" />
      <motion.div className="sender__card" variants={reveal} {...inView}>
        <h2 className="sender__name">
          {sender.name} <span>{sender.alias}</span>
        </h2>
        {sender.address.map((l) => (
          <p key={l} className="sender__addr">
            {l}
          </p>
        ))}
        <p className="sender__phones">
          मो.{' '}
          {sender.phones.map((p, i) => (
            <a key={p} href={`tel:+91${p}`}>
              {p}
              {i < sender.phones.length - 1 ? ', ' : ''}
            </a>
          ))}
        </p>
        <div className="sender__actions">
          <a className="btn btn--maroon" href={`tel:+91${phone}`}>
            कॉल करें <small>Call</small>
          </a>
          <a className="btn btn--ghost" href={wa} target="_blank" rel="noreferrer">
            WhatsApp पर सूचित करें <small>RSVP</small>
          </a>
        </div>
      </motion.div>
    </section>
  )
}

/* --------------------------------------------------------------- Closing */

export function Closing() {
  return (
    <footer className="closing">
      <div className="closing__bg" aria-hidden="true" />
      <motion.div className="closing__inner" variants={reveal} {...inView}>
        <Monogram size={110} />
        <p className="closing__names">
          {couple.groom} <span>{couple.joiner}</span> {couple.bride}
        </p>
        <p className="closing__line">{invitation.festival}</p>
        <p className="closing__meta">
          {cover.dateLine} · {venue.name}, ग्वालियर
        </p>
        <a href="#top" className="closing__top">
          ↑ ऊपर जाएँ
        </a>
      </motion.div>
    </footer>
  )
}
