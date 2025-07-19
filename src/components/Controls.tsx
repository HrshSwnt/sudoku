import { useSudoku } from '../hooks/useSudoku';

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
    } = useSudoku();

    const canUndo = history.length > 0;

    return (
        <div className="flex flex-wrap gap-3 items-center justify-center mt-4">
            <button
                onClick={giveHint}
                disabled={hintsUsed >= maxHints}
                className={`px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-default dark:bg-green-700 dark:hover:bg-green-800 dark:disabled:bg-gray-700`}
            >
                💡 Hint ({maxHints - hintsUsed})
            </button>

            <button
                onClick={clearCell}
                className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded transition dark:bg-yellow-600 dark:hover:bg-yellow-700"
            >
                Clear
            </button>

            <button
                onClick={undo}
                disabled={!canUndo}
                className={`px-4 py-2 rounded transition ${canUndo
                        ? 'bg-gray-600 hover:bg-gray-700 text-white dark:bg-gray-700 dark:hover:bg-gray-800'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-gray-700 dark:text-gray-400'
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
                className={`px-4 py-2 rounded text-white font-semibold shadow transition ${isPaused
                        ? 'bg-green-600 hover:bg-green-700 dark:bg-green-800 dark:hover:bg-green-900'
                        : 'bg-yellow-500 hover:bg-yellow-600 dark:bg-yellow-700 dark:hover:bg-yellow-800'
                    }`}
            >
                {isPaused ? 'Resume' : 'Pause'}
            </button>

            <span className="text-red-600 font-bold text-lg ml-2 dark:text-red-400">
                Mistakes: {mistakes}
            </span>

            <span className="text-blue-600 font-bold text-lg ml-2 dark:text-blue-400">
                Hints: {hintsUsed}
            </span>
        </div>
    );
}
