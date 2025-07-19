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
        maxMistakes,
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
            {/* 💡 Hint */}
            <button
                onClick={giveHint}
                disabled={hintsUsed >= maxHints || hasWon || hasFailed}
                className={`px-4 py-2 rounded transition font-semibold
                    ${hintsUsed >= maxHints || hasWon || hasFailed
                        ? 'bg-gray-300 text-gray-500 cursor-default dark:bg-gray-700 dark:text-gray-400'
                        : 'bg-green-500 text-white hover:bg-green-600 dark:bg-green-700 dark:hover:bg-green-800'
                    }`}
            >
                💡 Hint ({maxHints - hintsUsed})
            </button>

            {/* ↩️ Undo */}
            <button
                onClick={undo}
                disabled={!canUndo || hasWon || hasFailed}
                className={`px-4 py-2 rounded transition font-semibold
                    ${!canUndo || hasWon || hasFailed
                        ? 'bg-gray-300 text-gray-500 cursor-default dark:bg-gray-700 dark:text-gray-400'
                        : 'bg-gray-600 text-white hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-800'
                    }`}
            >
                Undo
            </button>

            {/* 🔄 New Game */}
            <button
                onClick={() => setShowStartPrompt(true)}
                className="px-4 py-2 rounded font-semibold transition bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800"
            >
                New Game
            </button>

            {/* ⏸️ Pause / Resume */}
            <button
                onClick={() => setIsPaused(!isPaused)}
                disabled={hasWon || hasFailed}
                className={`px-4 py-2 rounded font-semibold transition shadow
                    ${hasWon || hasFailed
                        ? 'bg-gray-300 text-gray-500 cursor-default dark:bg-gray-700 dark:text-gray-400'
                        : isPaused
                            ? 'bg-green-600 text-white hover:bg-green-700 dark:bg-green-800 dark:hover:bg-green-900'
                            : 'bg-yellow-500 text-white hover:bg-yellow-600 dark:bg-yellow-700 dark:hover:bg-yellow-800'
                    }`}
            >
                {isPaused ? 'Resume' : 'Pause'}
            </button>

            {/* Pencil / Erase / Clear */}
            <div className="flex flex-wrap gap-3 mt-4 justify-center">
                {/* ✏️ Pencil */}
                <button
                    onClick={() => setIsPencilMode((prev) => !prev)}
                    disabled={gameOver}
                    className={`flex items-center gap-2 px-4 py-2 rounded font-semibold transition
                        ${gameOver
                            ? 'bg-gray-300 text-gray-500 cursor-default dark:bg-gray-700 dark:text-gray-400'
                            : isPencilMode
                                ? 'bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800'
                                : 'bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700'
                        }`}
                >
                    <Pencil size={16} />
                    Pencil
                </button>

                {/* 🧽 Erase */}
                <button
                    onClick={erasePencilMark}
                    disabled={gameOver}
                    className={`flex items-center gap-2 px-4 py-2 rounded font-semibold transition
                        ${gameOver
                            ? 'bg-gray-300 text-gray-500 cursor-default dark:bg-gray-700 dark:text-gray-400'
                            : 'bg-yellow-500 text-white hover:bg-yellow-600 dark:bg-yellow-600 dark:hover:bg-yellow-700'
                        }`}
                >
                    <Eraser size={16} />
                    Erase
                </button>

                {/* 🗑️ Clear */}
                <button
                    onClick={clearCell}
                    disabled={gameOver}
                    className={`flex items-center gap-2 px-4 py-2 rounded font-semibold transition
                        ${gameOver
                            ? 'bg-gray-300 text-gray-500 cursor-default dark:bg-gray-700 dark:text-gray-400'
                            : 'bg-red-500 text-white hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700'
                        }`}
                >
                    <Trash2 size={16} />
                    Clear
                </button>
            </div>


            <span className="text-red-600 font-bold text-lg ml-2 dark:text-red-400">
                Mistakes: {mistakes} / {maxMistakes}
            </span>

            <span className="text-blue-600 font-bold text-lg ml-2 dark:text-blue-400">
                Hints: {hintsUsed} / {maxHints}
            </span>
        </div>
    );
}
