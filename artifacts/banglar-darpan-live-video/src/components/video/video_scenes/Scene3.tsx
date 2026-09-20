import { motion } from 'framer-motion';

export function Scene3() {
  return (
    <motion.section className="absolute inset-0 overflow-hidden" initial={{ clipPath: 'polygon(100% 0,100% 0,100% 100%,100% 100%)' }} animate={{ clipPath: 'polygon(0 0,100% 0,100% 100%,0 100%)' }} exit={{ clipPath: 'polygon(0 0,0 0,0 100%,0 100%)' }} transition={{ duration: .95, ease: [0.16, 1, .3, 1] }}>
      <div className="absolute inset-0" style={{ background: 'linear-gradient(125deg, #16243a 0%, #0d1728 58%, #101a2b 100%)' }} />
      <motion.div className="bd-beam" style={{ right: '-14vw', bottom: '-18vw', background: 'radial-gradient(circle, rgba(245,201,106,.15), transparent 68%)' }} animate={{ scale: [1, 1.15, 1], rotate: [0, 10, 0] }} transition={{ duration: 7, repeat: Infinity }} />
      <div className="bd-grid absolute inset-0 opacity-20" />
      <motion.div className="absolute left-[9vw] top-[17vh]" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .3, duration: .7 }}>
        <div className="bd-scene-tag bd-mono">03 / TV-STYLE VIEWER</div>
        <h2 className="bd-display" style={{ fontSize: 'clamp(2.6rem, 6.5vw, 8rem)', lineHeight: .9, letterSpacing: '-.065em', margin: '.85vw 0 0', maxWidth: '39vw' }}>A broadcast<br /><span style={{ color: 'var(--color-accent)' }}>in your hands.</span></h2>
        <p className="bd-sans" style={{ margin: '1.4vw 0 0', color: 'var(--color-text-secondary)', fontSize: 'clamp(.75rem, 1.25vw, 1.35rem)', maxWidth: '25vw', lineHeight: 1.45 }}>One focused window for the stories shaping Bangladesh.</p>
      </motion.div>
      <motion.div className="bd-window absolute" style={{ right: '9vw', top: '16vh', width: '43vw', height: '59vh', transform: 'perspective(1200px) rotateY(-8deg) rotateX(2deg)' }} initial={{ opacity: 0, x: 45, rotateY: -24 }} animate={{ opacity: 1, x: 0, rotateY: -8 }} transition={{ delay: .55, duration: 1, ease: [0.16, 1, .3, 1] }}>
        <div className="bd-window-bar bd-mono"><div className="bd-window-dots"><i /><i /><i /></div><span style={{ color: 'var(--color-primary)' }}>LIVE SIGNAL</span><span>BD / VIEWER</span></div>
        <div style={{ position: 'relative', height: 'calc(100% - 3vw)', padding: '1.2vw' }}>
          <div style={{ position: 'relative', overflow: 'hidden', height: '72%', background: '#0a101c' }}>
            <img src={`${import.meta.env.BASE_URL}dhaka-aerial.png`} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'saturate(.72) contrast(1.1)' }} />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(9,17,31,.05), rgba(9,17,31,.78))' }} />
            <span className="bd-mono absolute left-[1vw] top-[1vw]" style={{ fontSize: 'clamp(.5rem, .7vw, .76rem)', color: 'white', background: 'var(--color-primary)', padding: '.45vw .6vw' }}>● LIVE</span>
            <span className="bd-display absolute left-[1vw] bottom-[1vw]" style={{ fontSize: 'clamp(1rem, 2vw, 2.1rem)', lineHeight: 1 }}>The signal stays clear.</span>
            <span className="bd-mono absolute right-[1vw] top-[1vw]" style={{ fontSize: 'clamp(.4rem, .56vw, .62rem)', color: 'var(--color-accent)' }}>BANGLAR DARPAN LIVE</span>
            <div className="bd-scanline" style={{ top: '8%' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1.2vw' }}>
            <div><div className="bd-mono" style={{ fontSize: 'clamp(.4rem, .55vw, .6rem)', color: 'var(--color-primary)' }}>ON AIR / BANGLAR DARPAN</div><div className="bd-sans" style={{ fontWeight: 700, fontSize: 'clamp(.55rem, .95vw, 1rem)', marginTop: '.35vw' }}>36 Days in July: Secret Orders Revealed</div></div>
            <span className="bd-mono" style={{ color: 'var(--color-accent)', border: '1px solid rgba(245,201,106,.3)', padding: '.55vw .7vw', fontSize: 'clamp(.42rem, .6vw, .68rem)' }}>YOUTUBE REPORT</span>
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
}