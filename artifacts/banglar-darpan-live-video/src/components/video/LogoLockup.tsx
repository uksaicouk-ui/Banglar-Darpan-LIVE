import { motion } from 'framer-motion';

export function LogoLockup({ compact = false }: { compact?: boolean }) {
  return (
    <motion.div className="bd-logo-lockup" animate={{ opacity: 1 }} initial={{ opacity: 0 }}>
      <motion.div
        className="bd-logo-mark"
        animate={{ rotate: compact ? 0 : [0, -5, 0], scale: compact ? .7 : [1, 1.04, 1] }}
        transition={{ duration: compact ? .5 : 2.8, repeat: compact ? 0 : Infinity, ease: 'easeInOut' }}
      />
      <div className="bd-logo-word">
        <span className="bd-logo-bengali">বাংলার দর্পণ</span>
        <span className="bd-logo-sub">LIVE / THE SIGNAL OF BANGLA</span>
      </div>
    </motion.div>
  );
}