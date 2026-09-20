import { motion } from 'framer-motion';
import { LogoLockup } from '../LogoLockup';

export function Scene6() {
  return (
    <motion.section className="absolute inset-0 overflow-hidden" initial={{ opacity: 0, scale: 1.08 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: .94 }} transition={{ duration: 1.15, ease: [0.16, 1, .3, 1] }}>
      <div className="bd-grid absolute inset-0 opacity-40" />
      <motion.div className="bd-beam" style={{ left: '27vw', top: '4vw', width: '48vw', height: '48vw' }} animate={{ scale: [1, 1.14, 1], opacity: [.65, 1, .65] }} transition={{ duration: 5.5, repeat: Infinity }} />
      <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at 50% 48%, rgba(245,201,106,.11), transparent 36%)' }} />
      <motion.div className="absolute left-[9vw] top-[13vh] bd-mono" style={{ color: 'var(--color-primary)', fontSize: 'clamp(.46rem, .7vw, .75rem)' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .35 }}>06 / THE DESK IS LIVE</motion.div>
      <motion.div className="absolute left-[9vw] top-[25vh]" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .55, duration: .9 }}>
        <LogoLockup />
      </motion.div>
      <motion.div className="absolute left-[9vw] bottom-[15vh]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: .7 }}>
        <p className="bd-display" style={{ color: 'var(--color-text-secondary)', fontSize: 'clamp(1rem, 2.2vw, 2.35rem)', margin: 0, lineHeight: 1.15 }}>The signal stays <span style={{ color: 'var(--color-accent)' }}>clear.</span></p>
        <div className="bd-mono" style={{ color: 'var(--color-text-muted)', fontSize: 'clamp(.42rem, .62vw, .68rem)', marginTop: '1vw' }}>TV-STYLE VIEWER / OPEN SOURCE TEST / LOCAL CONTROL ROOM</div>
      </motion.div>
      <motion.div className="absolute right-[9vw] bottom-[15vh]" initial={{ opacity: 0, scale: .8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.05, duration: .8 }}>
        <div className="bd-mono" style={{ color: 'var(--color-accent)', fontSize: 'clamp(.42rem, .64vw, .7rem)' }}>BANGLAR DARPAN LIVE</div>
        <div className="bd-rule" style={{ width: '14vw', marginTop: '.7vw' }} />
      </motion.div>
    </motion.section>
  );
}