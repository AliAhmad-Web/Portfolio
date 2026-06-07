import { motion } from 'framer-motion';

export default function LoadingScreen() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-100 flex items-center justify-center bg-[#020617]"
    >
      <motion.div
        animate={{ rotate: 360, scale: [1, 1.08, 1] }}
        transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
        className="h-16 w-16 rounded-full border-4 border-cyan-400/30 border-t-cyan-400"
      />
    </motion.div>
  );
}
