import { motion } from 'framer-motion';

export function Scene4() {
  return (
    <motion.section className="absolute inset-0 overflow-hidden" initial={{ clipPath: 'inset(100% 0 0 0)' }} animate={{ clipPath: 'inset(0 0 0 0)' }} exit={{ clipPath: 'inset(0 0 100% 0)' }} transition={{ duration: .9, ease: [0.16, 1, .3, 1] }}>
      <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #111e31, #1c293e)' }} />
      <div className="bd-photo" style={{ left: '-3vw', bottom: '-19vh', width: '44vw', height: '80vh', transform: 'rotate(-10deg)', opacity: .46 }}>
        <img src={`${import.meta.env.BASE_URL}newsprint-texture.png`} alt="" />
      </div>
      <motion.div className="absolute left-[9vw] top-[16vh]" initial={{ opacity: 0, x: -25 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: .25, duration: .7 }}>
        <div className="bd-scene-tag bd-mono">04 / OPEN SOURCE TEST</div>
        <h2 className="bd-display" style={{ fontSize: 'clamp(2.55rem, 6.6vw, 8rem)', lineHeight: .9, letterSpacing: '-.065em', margin: '.85vw 0 0', maxWidth: '37vw' }}>Bring your<br /><span style={{ color: 'var(--color-primary)' }}>own signal.</span></h2>
        <p className="bd-sans" style={{ margin: '1.4vw 0 0', color: 'var(--color-text-secondary)', fontSize: 'clamp(.75rem, 1.2vw, 1.3rem)', maxWidth: '25vw', lineHeight: 1.45 }}>Try YouTube, HLS, MP4, or a local recording. Your desk, your rules.</p>
      </motion.div>
      <motion.div className="bd-window absolute" style={{ right: '9vw', top: '17vh', width: '43vw', height: '58vh' }} initial={{ opacity: 0, scale: .9, y: 35 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ delay: .45, duration: .9, ease: [0.16, 1, .3, 1] }}>
        <div className="bd-window-bar bd-mono"><div className="bd-window-dots"><i /><i /><i /></div><span>COMMUNITY / OPEN SOURCE</span><span style={{ color: 'var(--color-success)' }}>READY</span></div>
        <div style={{ padding: '1.7vw' }}>
          <div className="bd-mono" style={{ fontSize: 'clamp(.45rem, .7vw, .75rem)', color: 'var(--color-text-secondary)' }}>STREAM URL</div>
          <div style={{ marginTop: '.55vw', padding: '1vw', border: '1px solid rgba(246,240,223,.18)', background: 'rgba(9,17,31,.75)', color: 'var(--color-accent)', fontFamily: 'var(--font-mono)', fontSize: 'clamp(.5rem, .75vw, .82rem)' }}>https://news-desk.example/stream.m3u8</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1vw', marginTop: '1.35vw' }}>
            <div style={{ border: '1px dashed rgba(245,201,106,.42)', padding: '2vw 1vw', textAlign: 'center' }}><div style={{ color: 'var(--color-accent)', fontSize: '2vw' }}>↗</div><div className="bd-sans" style={{ fontWeight: 700, fontSize: 'clamp(.56rem, .95vw, 1rem)', marginTop: '.6vw' }}>Drop a video here</div><div className="bd-mono" style={{ color: 'var(--color-text-muted)', marginTop: '.45vw', fontSize: 'clamp(.38rem, .58vw, .64rem)' }}>MP4 / WEBM / MOV</div></div>
            <div style={{ padding: '1vw', background: 'rgba(232,93,63,.08)', border: '1px solid rgba(232,93,63,.22)' }}><div className="bd-mono" style={{ color: 'var(--color-primary)', fontSize: 'clamp(.42rem, .62vw, .68rem)' }}>INPUTS ACCEPTED</div>{['YouTube', 'HLS .m3u8', 'Direct video'].map((item, i) => <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '.6vw', marginTop: '1vw', fontSize: 'clamp(.52rem, .8vw, .86rem)' }}><span style={{ color: i === 1 ? 'var(--color-accent)' : 'var(--color-success)' }}>●</span>{item}</div>)}</div>
          </div>
          <div className="bd-rule" style={{ marginTop: '1.7vw' }} />
          <div className="bd-mono" style={{ marginTop: '1vw', color: 'var(--color-text-muted)', fontSize: 'clamp(.4rem, .58vw, .64rem)' }}>SAFE LOCAL PREVIEW / NOTHING REPLACES THE TRUSTED LINEUP</div>
        </div>
      </motion.div>
    </motion.section>
  );
}