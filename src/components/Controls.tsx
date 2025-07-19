import { useSudoku } from '../hooks/useSudoku';
import { Pencil, Eraser, Trash2 } from 'lucide-react';

export default function Controls() {
    const {
        giveHint,
        clearCell,
        undo,
        mistakes,
        hintsUsed,
        history,
        setShowStartPrompt,
        setIsPaused,
        isPaused,
        maxHints,
        hasFailed,
        hasWon,
        setIsPencilMode,
        isPencilMode,
        erasePencilMark,
    } = useSudoku();

    const canUndo = history.length > 0;
    const gameOver = hasWon || hasFailed;

    return (
        <div className="flex flex-wrap gap-3 items-center justify-center mt-4">
            <button
                onClick={giveHint}
                disabled={hintsUsed >= maxHints || hasWon || hasFailed}
                className={`px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-default dark:bg-green-700 dark:hover:bg-green-800 dark:disabled:bg-gray-700`}
            >
                💡 Hint ({maxHints - hintsUsed})
            </button>

            <button
                onClick={undo}
                disabled={!canUndo || hasWon || hasFailed}
                className={`px-4 py-2 rounded transition ${!canUndo || hasWon || hasFailed
                    ? 'bg-gray-300 text-gray-500 cursor-default dark:bg-gray-700 dark:text-gray-400'
                    : 'bg-gray-600 hover:bg-gray-700 text-white dark:bg-gray-700 dark:hover:bg-gray-800'
                    }`}
            >
                Undo
            </button>


            <button
                onClick={() => setShowStartPrompt(true)}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded transition dark:bg-blue-700 dark:hover:bg-blue-800"
            >
                New Game
            </button>
            <button
                onClick={() => setIsPaused(!isPaused)}
                disabled={hasWon || hasFailed}
                className={`px-4 py-2 rounded font-semibold shadow transition 
                    ${hasWon || hasFailed
                        ? 'bg-gray-400 text-gray-200 cursor-default dark:bg-gray-700 dark:text-gray-400'
                        : isPaused
                            ? 'bg-green-600 hover:bg-green-700 text-white dark:bg-green-800 dark:hover:bg-green-900'
                            : 'bg-yellow-500 hover:bg-yellow-600 text-white dark:bg-yellow-700 dark:hover:bg-yellow-800'
                    }`}
            >
                {isPaused ? 'Resume' : 'Pause'}
            </button>

            <div className="flex gap-3 mt-4">
                {/* ✏️ Pencil Mode Button */}
                <button
                    onClick={() => setIsPencilMode((prev) => !prev)}
                    disabled={gameOver}
                    className={`flex items-center gap-2 px-4 py-2 rounded font-semibold transition
          ${gameOver
                            ? 'bg-gray-300 text-gray-500 dark:bg-gray-700 dark:text-gray-400 cursor-not-allowed'
                            : isPencilMode
                                ? 'bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800'
                                : 'bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700'
                        }`}
                >
                    <Pencil size={16} />
                    Pencil
                </button>

                {/* 🧽 Erase Button (only erases pencil marks) */}
                <button
                    onClick={erasePencilMark}
                    disabled={gameOver}
                    className={`flex items-center gap-2 px-4 py-2 rounded font-semibold transition
          ${gameOver
                            ? 'bg-gray-300 text-gray-500 dark:bg-gray-700 dark:text-gray-400 cursor-not-allowed'
                            : 'bg-yellow-500 text-white hover:bg-yellow-600 dark:bg-yellow-600 dark:hover:bg-yellow-700'
                        }`}
                >
                    <Eraser size={16} />
                    Erase
                </button>

                {/* 🗑️ Clear Button (clears the selected cell value) */}
                <button
                    onClick={clearCell}
                    disabled={gameOver}
                    className={`flex items-center gap-2 px-4 py-2 rounded font-semibold transition
          ${gameOver
                            ? 'bg-gray-300 text-gray-500 dark:bg-gray-700 dark:text-gray-400 cursor-not-allowed'
                            : 'bg-red-500 text-white hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700'
                        }`}
                >
                    <Trash2 size={16} />
                    Clear
                </button>
            </div>


            <span className="text-red-600 font-bold text-lg ml-2 dark:text-red-400">
                Mistakes: {mistakes}
            </span>

            <span className="text-blue-600 font-bold text-lg ml-2 dark:text-blue-400">
                Hints: {hintsUsed}
            </span>
        </div>
    );
}
