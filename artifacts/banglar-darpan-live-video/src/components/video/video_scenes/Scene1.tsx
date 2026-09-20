import { motion } from 'framer-motion';
import { LogoLockup } from '../LogoLockup';

export function Scene1() {
  return (
    <motion.section
      className="absolute inset-0 overflow-hidden"
      initial={{ clipPath: 'inset(0 100% 0 0)' }}
      animate={{ clipPath: 'inset(0 0% 0 0)' }}
      exit={{ clipPath: 'inset(0 0 0 100%)' }}
      transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="bd-beam bd-drift" style={{ left: '-12vw', top: '-19vw' }} />
      <div className="bd-grid absolute inset-0 opacity-50" />
      <motion.div className="absolute left-[9vw] top-[17vh]" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: .35, duration: .8 }} style={{ width: '29vw' }}>
        <div className="bd-rule" />
      </motion.div>
      <motion.div className="absolute left-[9vw] top-[24vh]" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .55, duration: .8 }}>
        <div className="bd-scene-tag bd-mono">01 / THE SIGNAL ARRIVES</div>
        <h1 className="bd-display" style={{ margin: '.9vw 0 0', fontSize: 'clamp(2.7rem, 7.5vw, 9rem)', lineHeight: .9, letterSpacing: '-.07em' }}>
          News,<br /><span style={{ color: 'var(--color-accent)' }}>without noise.</span>
        </h1>
      </motion.div>
      <motion.div className="absolute left-[9vw] bottom-[14vh]" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.15, duration: .7 }}>
        <LogoLockup compact />
      </motion.div>
      <motion.div className="bd-photo" style={{ right: '8vw', top: '15vh', width: '34vw', height: '62vh', transform: 'rotate(4deg)' }} initial={{ opacity: 0, scale: .84, rotate: 10 }} animate={{ opacity: 1, scale: 1, rotate: 4 }} transition={{ delay: .7, duration: 1.1, ease: [0.16, 1, .3, 1] }}>
        <img src={`${import.meta.env.BASE_URL}dhaka-aerial.png`} alt="" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 30%, rgba(9,17,31,.9))' }} />
        <div className="absolute left-[1.3vw] bottom-[1.1vw] bd-mono" style={{ color: 'var(--color-accent)', fontSize: 'clamp(.42rem, .7vw, .78rem)' }}>DHAKA / 23°45′N 90°24′E</div>
      </motion.div>
      <div className="bd-corner-label bd-mono">B D / 2025 — ON AIR</div>
    </motion.section>
  );
}