// LoadingScreen: A full-screen spinning loader displayed when the app first loads.
// Uses Framer Motion for the fade-out exit animation (controlled by AnimatePresence in App.jsx).
// The spinner is a circular border that rotates infinitely.

import { motion } from 'framer-motion';

export default function LoadingScreen() {
  return (
    <motion.div
      initial={{ opacity: 1 }}   // Start fully visible.
      exit={{ opacity: 0 }}       // Fade out when AnimatePresence triggers exit.
      className="fixed inset-0 z-100 flex items-center justify-center bg-[#020617]"  // Full-screen overlay.
    >
      <motion.div
        animate={{ rotate: 360, scale: [1, 1.08, 1] }} // Continuous rotation + subtle pulse.
        transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
        className="h-16 w-16 rounded-full border-4 border-cyan-400/30 border-t-cyan-400" // Cyan spinner ring.
      />
    </motion.div>
  );
}