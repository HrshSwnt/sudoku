import { useSudoku } from '../hooks/useSudoku';
import { useState } from 'react';
import DifficultySlider from './DifficultySlider';

export default function GameStartPrompt() {
    const {
        resetBoard,
        showStartPrompt,
        setShowStartPrompt,
    } = useSudoku();

    const [mistakes, setMistakes] = useState(5);
    const [hints, setHints] = useState(5);
    const [time, setTime] = useState(3); // in minutes
    const [difficulty, setDifficulty] = useState(40); // default: Easy

    function startGame() {
        resetBoard({
            prefilledCells: difficulty,
            maxMistakes: mistakes,
            maxHints: hints,
            timeLimit: time * 60,
        });
        setShowStartPrompt(false);
    }

    if (!showStartPrompt) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-xl w-[28rem] space-y-4 text-center">
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">🎮 Start New Game</h2>

                <div className="mb-12">
                    <DifficultySlider value={difficulty} onChange={setDifficulty} />
                </div>
                <div className="space-y-2 text-left">
                    <label className="flex justify-between items-center text-gray-700 dark:text-gray-200">
                        Max Mistakes:
                        <input
                            type="number"
                            value={mistakes}
                            min={1}
                            max={9}
                            onChange={(e) => setMistakes(+e.target.value)}
                            className="w-16 border rounded px-2 py-1 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700"
                        />
                    </label>

                    <label className="flex justify-between items-center text-gray-700 dark:text-gray-200">
                        Max Hints:
                        <input
                            type="number"
                            value={hints}
                            min={1}
                            max={9}
                            onChange={(e) => setHints(+e.target.value)}
                            className="w-16 border rounded px-2 py-1 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700"
                        />
                    </label>

                    <label className="flex justify-between items-center text-gray-700 dark:text-gray-200">
                        Time Limit (min):
                        <input
                            type="number"
                            value={time}
                            min={1}
                            max={10}
                            onChange={(e) => setTime(+e.target.value)}
                            className="w-16 border rounded px-2 py-1 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700"
                        />
                    </label>
                </div>

                <button
                    onClick={startGame}
                    className="bg-blue-600 dark:bg-blue-700 text-white font-semibold px-4 py-2 rounded hover:bg-blue-700 dark:hover:bg-blue-800 transition"
                >
                    Start Game
                </button>
            </div>
        </div>
    );
}
