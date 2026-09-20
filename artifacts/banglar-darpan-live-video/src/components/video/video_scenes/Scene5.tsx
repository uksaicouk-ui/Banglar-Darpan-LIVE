import { motion } from 'framer-motion';

export function Scene5() {
  return (
    <motion.section className="absolute inset-0 overflow-hidden" initial={{ clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)' }} animate={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }} exit={{ clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)' }} transition={{ duration: 1, ease: [0.16, 1, .3, 1] }}>
      <div className="absolute inset-0" style={{ background: 'linear-gradient(120deg, #0c1525, #1c2437 48%, #121b2c)' }} />
      <div className="bd-grid absolute inset-0 opacity-25" />
      <motion.div className="absolute right-[-10vw] top-[-20vw] bd-beam" animate={{ rotate: [0, -12, 0], scale: [1, 1.2, 1] }} transition={{ duration: 8, repeat: Infinity }} />
      <motion.div className="absolute left-[9vw] top-[16vh]" initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .3, duration: .7 }}>
        <div className="bd-scene-tag bd-mono">05 / CONTROL ROOM</div>
        <h2 className="bd-display" style={{ fontSize: 'clamp(2.55rem, 6.6vw, 8rem)', lineHeight: .9, letterSpacing: '-.065em', margin: '.85vw 0 0', maxWidth: '37vw' }}>Your lineup.<br /><span style={{ color: 'var(--color-accent)' }}>Your desk.</span></h2>
        <p className="bd-sans" style={{ margin: '1.4vw 0 0', color: 'var(--color-text-secondary)', fontSize: 'clamp(.75rem, 1.2vw, 1.3rem)', maxWidth: '24vw', lineHeight: 1.45 }}>A browser-local control room. Add, edit, remove, or restore — no account required.</p>
      </motion.div>
      <motion.div className="bd-window absolute" style={{ right: '8vw', top: '14vh', width: '47vw', height: '64vh' }} initial={{ opacity: 0, x: 50, rotateY: -16 }} animate={{ opacity: 1, x: 0, rotateY: 0 }} transition={{ delay: .48, duration: 1, ease: [0.16, 1, .3, 1] }}>
        <div className="bd-window-bar bd-mono"><div className="bd-window-dots"><i /><i /><i /></div><span>CONTROL ROOM / LINEUP MANAGEMENT</span><span style={{ color: 'var(--color-accent)' }}>LOCAL STORAGE</span></div>
        <div style={{ padding: '1.4vw' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginBottom: '1.15vw' }}><div><div className="bd-mono" style={{ color: 'var(--color-primary)', fontSize: 'clamp(.42rem, .62vw, .68rem)' }}>LOCAL CONTROL ROOM</div><div className="bd-display" style={{ fontSize: 'clamp(1.2rem, 2.3vw, 2.5rem)', lineHeight: 1, marginTop: '.35vw' }}>Manage the lineup.</div></div><span className="bd-mono" style={{ border: '1px solid rgba(245,201,106,.28)', color: 'var(--color-accent)', padding: '.45vw .6vw', fontSize: 'clamp(.38rem, .55vw, .6rem)' }}>4 CHANNELS CONFIGURED</span></div>
          <div style={{ border: '1px solid rgba(246,240,223,.13)' }}>
            {['36 Days in July: Secret Orders Revealed', 'Bangladesh Tribunal Sentences Ex-PM', "Sheikh Hasina's Orders to Halt Protests Revealed", 'Bangladesh Ousted Ex-PM Report'].map((item, index) => <motion.div key={item} style={{ display: 'grid', gridTemplateColumns: '3vw 1fr 8vw 4vw', alignItems: 'center', gap: '.7vw', padding: '.9vw', borderBottom: index < 3 ? '1px solid rgba(246,240,223,.1)' : 0 }} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: .7 + index * .12, duration: .45 }}><span className="bd-mono" style={{ color: 'var(--color-accent)', fontSize: 'clamp(.42rem, .6vw, .66rem)' }}>{String(index + 1).padStart(2, '0')}</span><span className="bd-sans" style={{ fontWeight: 600, fontSize: 'clamp(.48rem, .76vw, .8rem)' }}>{item}</span><span className="bd-mono" style={{ color: 'var(--color-text-muted)', fontSize: 'clamp(.36rem, .5vw, .55rem)', overflow: 'hidden', whiteSpace: 'nowrap' }}>YOUTUBE.COM/…</span><span className="bd-mono" style={{ color: 'var(--color-success)', fontSize: 'clamp(.38rem, .54vw, .6rem)' }}>READY</span></motion.div>)}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1.25vw' }}><span className="bd-mono" style={{ color: 'var(--color-text-muted)', fontSize: 'clamp(.38rem, .55vw, .6rem)' }}>CHANGES SAVED TO THIS BROWSER</span><span style={{ color: 'var(--color-primary)', fontSize: 'clamp(.5rem, .7vw, .76rem)', fontWeight: 800 }}>+ ADD CHANNEL</span></div>
        </div>
      </motion.div>
    </motion.section>
  );
}