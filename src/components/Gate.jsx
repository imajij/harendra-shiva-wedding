import { useState } from 'react'
import { motion } from 'framer-motion'
import { couple, cover, invocation } from '../content'
import { Monogram } from './Ornaments'
import { asset } from '../asset'

const ease = [0.7, 0, 0.2, 1]

/**
 * Tap-to-enter screen: carved palace doors with the HS seal.
 * Tapping starts the music (user gesture) and swings the doors open.
 */
export default function Gate({ onOpen, onDone }) {
  const [opening, setOpening] = useState(false)

  const open = () => {
    if (opening) return
    setOpening(true)
    onOpen()
  }

  return (
    <motion.div
      className="gate"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.6 } }}
      onClick={open}
      role="dialog"
      aria-label="निमंत्रण खोलें"
    >
      <div className="gate__doors" aria-hidden="true">
        <motion.div
          className="gate__door gate__door--left"
          animate={opening ? { rotateY: 105 } : { rotateY: 0 }}
          transition={{ duration: 2.2, ease }}
        />
        <motion.div
          className="gate__door gate__door--right"
          animate={opening ? { rotateY: -105 } : { rotateY: 0 }}
          transition={{ duration: 2.2, ease }}
          onAnimationComplete={() => opening && onDone()}
        />
      </div>
      <div className="gate__glow" aria-hidden="true" />

      <motion.div
        className="gate__panel"
        animate={opening ? { opacity: 0, scale: 0.92, y: -10 } : { opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease }}
      >
        <motion.p
          className="gate__mantra"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
        >
          {invocation.salutation}
        </motion.p>

        <motion.div
          className="gate__seal"
          initial={{ opacity: 0, scale: 0.6, rotate: -20 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ delay: 0.5, duration: 1.2, type: 'spring', bounce: 0.35 }}
        >
          <img src={asset('seal.webp')} alt="" className="gate__seal-img" />
          <Monogram size={78} className="gate__seal-mono" />
        </motion.div>

        <motion.h1
          className="gate__names"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 1.1 }}
        >
          {couple.groom} <span>{couple.joiner}</span> {couple.bride}
        </motion.h1>
        <motion.p
          className="gate__title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
        >
          {cover.title}
        </motion.p>

        <motion.button
          type="button"
          className="btn btn--gold gate__btn"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.7, duration: 0.9 }}
          onClick={(e) => {
            e.stopPropagation()
            open()
          }}
        >
          <span className="gate__btn-ring" aria-hidden="true" />
          निमंत्रण खोलें
          <small>Open Invitation</small>
        </motion.button>
        <p className="gate__hint">♪ संगीत सहित</p>
      </motion.div>
    </motion.div>
  )
}
