import { useSudoku } from "../hooks/useSudoku";
import { motion, AnimatePresence } from "framer-motion";

const WinBanner = () => {
  const { hasWon, resetBoard } = useSudoku();

  return (
    <AnimatePresence>
      {hasWon && (
        <motion.div
          key="win-banner"
          initial={{ opacity: 0, scale: 0.8, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -10 }}
          transition={{ duration: 0.4, type: "spring", stiffness: 200 }}
          className="bg-green-100 text-green-800 border border-green-400 px-4 py-3 rounded mb-4 text-center font-semibold text-lg flex flex-col items-center gap-2 shadow-lg"
        >
          <div className="text-2xl">🎉 You solved the Sudoku! 🎉</div>
          <div className="text-3xl animate-bounce">🥳🎊🎉</div>

          <button
            onClick={resetBoard}
            className="mt-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-1 px-4 rounded transition-colors"
          >
            New Game
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WinBanner;
