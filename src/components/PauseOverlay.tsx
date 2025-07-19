// src/components/PauseOverlay.tsx
import { useSudoku } from '../hooks/useSudoku';

export default function PauseOverlay() {
  const { isPaused, setIsPaused } = useSudoku();

  if (!isPaused) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 dark:bg-gray-900 dark:bg-opacity-80 backdrop-blur-sm flex items-center justify-center text-white">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-bold">⏸️ Game Paused</h2>
        <button
          onClick={() => setIsPaused(false)}
          className="mt-4 bg-blue-500 hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800 px-6 py-2 text-lg rounded shadow"
        >
          Resume
        </button>
      </div>
    </div>
  );
}
