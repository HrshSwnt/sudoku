import { useSudoku } from '../hooks/useSudoku';

export default function Controls() {
  const { resetBoard, giveHint } = useSudoku();

  return (
    <div className="mt-4 space-x-2">
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={resetBoard}
      >
        Reset
      </button>
      <button
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        onClick={giveHint}
      >
        Hint
      </button>
    </div>
  );
}
