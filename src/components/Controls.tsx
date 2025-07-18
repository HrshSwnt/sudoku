import { useSudoku } from '../hooks/useSudoku';

export default function Controls() {
    const {
        resetBoard,
        giveHint,
        clearCell,
        undo,
        mistakes,
        hintsUsed,
        history,
    } = useSudoku();

    const canUndo = history.length > 0;

    return (
        <div className="flex flex-wrap gap-3 items-center justify-center mt-4">
            <button
                onClick={resetBoard}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded transition"
            >
                Reset
            </button>

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

            <span className="text-red-600 font-bold text-lg ml-2">
                Mistakes: {mistakes}
            </span>

            <span className="text-blue-600 font-bold text-lg ml-2">
                Hints: {hintsUsed}
            </span>
        </div>
    );
}
