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
    } = useSudoku();

    const canUndo = history.length > 0;

    return (
        <div className="flex flex-wrap gap-3 items-center justify-center mt-4">
            <button
                onClick={giveHint}
                className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded transition"
            >
                Hint
            </button>

            <button
                onClick={clearCell}
                className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded transition"
            >
                Clear
            </button>

            <button
                onClick={undo}
                disabled={!canUndo}
                className={`px-4 py-2 rounded transition ${canUndo
                    ? 'bg-gray-600 hover:bg-gray-700 text-white'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
            >
                Undo
            </button>

            <button
                onClick={() => setShowStartPrompt(true)}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded transition"
            >
                New Game
            </button>
            <button
                onClick={() => setIsPaused(!isPaused)}
                className={`px-4 py-2 rounded text-white font-semibold shadow transition ${isPaused ? 'bg-green-600 hover:bg-green-700' : 'bg-yellow-500 hover:bg-yellow-600'
                    }`}
            >
                {isPaused ? 'Resume' : 'Pause'}
            </button>


            <span className="text-red-600 font-bold text-lg ml-2">
                Mistakes: {mistakes}
            </span>

            <span className="text-blue-600 font-bold text-lg ml-2">
                Hints: {hintsUsed}
            </span>
        </div>
    );
}
