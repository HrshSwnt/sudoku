import { useSudoku } from "../hooks/useSudoku";
import { motion, AnimatePresence } from "framer-motion";

const WinBanner = () => {
  const { hasWon, setShowStartPrompt, setHasWon } = useSudoku();

  const handleNewGame = () => {
    setHasWon(false); // Hide the banner
    setShowStartPrompt(true); // Show the config/start prompt
  };

  return (
    <AnimatePresence>
      {hasWon && (
        <motion.div
          key="win-banner"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed inset-0 z-50 bg-white bg-opacity-90 dark:bg-gray-900 dark:bg-opacity-90 backdrop-blur-sm flex items-center justify-center"
        >
          <div className="text-center space-y-5 text-green-800 dark:text-green-100">
            <h2 className="text-4xl font-bold">🎉 You solved the Sudoku! 🎉</h2>
            <div className="text-5xl animate-bounce">🥳🎊🎉</div>

            <button
              onClick={handleNewGame}
              className="bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800 text-white px-6 py-2 rounded font-semibold text-lg shadow transition"
            >
              New Game
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WinBanner;
