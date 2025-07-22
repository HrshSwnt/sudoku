import { useSudoku } from '../hooks/useSudoku';
import { useState } from 'react';
import DifficultySlider from './DifficultySlider';

export default function GameStartPrompt() {
    const {
        resetBoard,
        showStartPrompt,
        setShowStartPrompt,
    } = useSudoku();

    const defaultMistakes = 3;
    const defaultHints = 3;
    const defaultTime = 5;

    const [mistakes, setMistakes] = useState<number | ''>(defaultMistakes);
    const [mistakesTouched, setMistakesTouched] = useState(false);

    const [hints, setHints] = useState<number | ''>(defaultHints);
    const [hintsTouched, setHintsTouched] = useState(false);

    const [time, setTime] = useState<number | ''>(defaultTime);
    const [timeTouched, setTimeTouched] = useState(false);

    const [difficulty, setDifficulty] = useState(30);

    function startGame() {
        resetBoard({
            prefilledCells: difficulty,
            maxMistakes: typeof mistakes === 'number' ? mistakes : defaultMistakes,
            maxHints: typeof hints === 'number' ? hints : defaultHints,
            timeLimit: (typeof time === 'number' ? time : defaultTime) * 60,
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
                            max={200}
                            onFocus={() => {
                                if (!mistakesTouched) {
                                    setMistakes('');
                                }
                            }}
                            onBlur={() => {
                                if (mistakes === '') {
                                    setMistakes(defaultMistakes);
                                    setMistakesTouched(false);
                                }
                            }}
                            onChange={(e) => {
                                setMistakes(+e.target.value);
                                setMistakesTouched(true);
                            }}
                            className="w-16 border rounded px-2 py-1 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700"
                        />
                    </label>

                    <label className="flex justify-between items-center text-gray-700 dark:text-gray-200">
                        Max Hints:
                        <input
                            type="number"
                            value={hints}
                            min={1}
                            max={200}
                            onFocus={() => {
                                if (!hintsTouched) {
                                    setHints('');
                                }
                            }}
                            onBlur={() => {
                                if (hints === '') {
                                    setHints(defaultHints);
                                    setHintsTouched(false);
                                }
                            }}
                            onChange={(e) => {
                                setHints(+e.target.value);
                                setHintsTouched(true);
                            }}
                            className="w-16 border rounded px-2 py-1 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700"
                        />
                    </label>

                    <label className="flex justify-between items-center text-gray-700 dark:text-gray-200">
                        Time Limit (min):
                        <input
                            type="number"
                            value={time}
                            min={1}
                            max={100}
                            onFocus={() => {
                                if (!timeTouched) {
                                    setTime('');
                                }
                            }}
                            onBlur={() => {
                                if (time === '') {
                                    setTime(defaultTime);
                                    setTimeTouched(false);
                                }
                            }}
                            onChange={(e) => {
                                setTime(+e.target.value);
                                setTimeTouched(true);
                            }}
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
