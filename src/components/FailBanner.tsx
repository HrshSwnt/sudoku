import { useSudoku } from '../hooks/useSudoku';

export default function FailBanner() {
    const { hasFailed, setShowStartPrompt } = useSudoku();

    if (!hasFailed) return null;

    return (
        <div className="bg-red-100 text-red-800 border border-red-400 px-4 py-3 rounded mb-4 text-center font-semibold text-lg flex flex-col items-center gap-2 shadow
            dark:bg-red-950 dark:text-red-200 dark:border-red-700">
            ❌ Game Over — You ran out of time or chances.
            <button
                onClick={() => setShowStartPrompt(true)}
                className="mt-2 bg-red-600 hover:bg-red-700 text-white font-semibold py-1 px-4 rounded
                    dark:bg-red-700 dark:hover:bg-red-800 dark:text-red-100"
            >
                Try Again
            </button>
        </div>
    );
}
