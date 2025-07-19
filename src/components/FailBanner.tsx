import { useSudoku } from '../hooks/useSudoku';
import { motion, AnimatePresence } from 'framer-motion';

export default function FailBanner() {
  const { hasFailed, stopGame } = useSudoku();

  const handleRetry = () => {
    stopGame();
  };

  return (
    <AnimatePresence>
      {hasFailed && (
        <motion.div
          key="fail-banner"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="fixed inset-0 z-50 bg-white bg-opacity-90 dark:bg-gray-900 dark:bg-opacity-90 backdrop-blur-sm flex items-center justify-center"
        >
          <div className="text-center space-y-5 text-red-800 dark:text-red-100">
            <h2 className="text-3xl font-bold">❌ Game Over</h2>
            <p className="text-lg">You ran out of time or chances.</p>
            <div className="text-5xl animate-bounce">💀🧩</div>

            <button
              onClick={handleRetry}
              className="bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800 text-white px-6 py-2 rounded font-semibold text-lg shadow transition"
            >
              Try Again
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
