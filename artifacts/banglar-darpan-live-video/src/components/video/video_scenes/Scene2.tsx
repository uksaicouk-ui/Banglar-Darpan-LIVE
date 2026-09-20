import { motion } from 'framer-motion';

const titles = ['36 Days in July: Secret Orders Revealed', 'Bangladesh Tribunal Sentences Ex-PM', 'Orders to Halt Protests Revealed', 'Ousted Ex-PM Report'];

export function Scene2() {
  return (
    <motion.section className="absolute inset-0 overflow-hidden" initial={{ clipPath: 'circle(0% at 80% 10%)' }} animate={{ clipPath: 'circle(150% at 80% 10%)' }} exit={{ clipPath: 'circle(0% at 20% 90%)' }} transition={{ duration: 1.05, ease: [0.16, 1, .3, 1] }}>
      <div className="bd-grid absolute inset-0 opacity-30" />
      <div className="bd-photo" style={{ right: '-5vw', top: '-13vh', width: '47vw', height: '126vh', transform: 'rotate(7deg)', opacity: .35 }}>
        <img src={`${import.meta.env.BASE_URL}newsprint-texture.png`} alt="" />
      </div>
      <motion.div className="absolute left-[9vw] top-[14vh]" initial={{ x: -30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: .25, duration: .7 }}>
        <div className="bd-scene-tag bd-mono">02 / FOUR REPORTS. ONE WINDOW.</div>
        <h2 className="bd-display" style={{ fontSize: 'clamp(2.6rem, 6.6vw, 8rem)', lineHeight: .9, letterSpacing: '-.065em', margin: '.75vw 0 0', maxWidth: '47vw' }}>A lineup<br /><span style={{ color: 'var(--color-primary)' }}>you can trust.</span></h2>
      </motion.div>
      <motion.div className="bd-window absolute" style={{ left: '9vw', bottom: '11vh', width: '72vw', height: '28vh' }} initial={{ y: 30, opacity: 0, scale: .96 }} animate={{ y: 0, opacity: 1, scale: 1 }} transition={{ delay: .55, duration: .8 }}>
        <div className="bd-window-bar bd-mono"><span style={{ color: 'var(--color-accent)' }}>CURATED SIGNAL / 04 CHANNELS</span><span style={{ color: 'var(--color-text-muted)' }}>DEFAULT LINEUP</span></div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', height: 'calc(100% - 3.2vw)' }}>
          {titles.map((title, index) => (
            <motion.div key={title} style={{ padding: '1.25vw', borderRight: index < 3 ? '1px solid rgba(246,240,223,.1)' : 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .72 + index * .13, duration: .5 }}>
              <span className="bd-mono" style={{ color: index === 0 ? 'var(--color-primary)' : 'var(--color-text-muted)', fontSize: 'clamp(.5rem, .7vw, .75rem)' }}>{String(index + 1).padStart(2, '0')} / NEWS REPORT</span>
              <strong className="bd-sans" style={{ fontSize: 'clamp(.55rem, 1vw, 1.05rem)', lineHeight: 1.25, fontWeight: 700 }}>{title}</strong>
              <span className="bd-mono" style={{ fontSize: 'clamp(.42rem, .6vw, .65rem)', color: 'var(--color-success)' }}>● READY TO AIR</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
      <motion.div className="absolute right-[8vw] top-[17vh] bd-mono" style={{ color: 'var(--color-accent)', fontSize: 'clamp(.5rem, .72vw, .8rem)' }} animate={{ opacity: [.35, 1, .35] }} transition={{ duration: 1.7, repeat: Infinity }}>● LIVE / SIGNAL LOCKED</motion.div>
    </motion.section>
  );
}