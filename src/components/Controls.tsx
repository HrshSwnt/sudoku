import { useSudoku } from '../hooks/useSudoku';

export default function Controls() {
  const { resetBoard, giveHint, mistakes } = useSudoku();

  return (
    <div className="flex gap-4 items-center mt-4">
      <button onClick={resetBoard} className="px-4 py-2 bg-blue-500 text-white rounded">Reset</button>
      <button onClick={giveHint} className="px-4 py-2 bg-purple-500 text-white rounded">Hint</button>
      <span className="text-red-600 font-bold text-lg">Mistakes: {mistakes}</span>
    </div>
  );
}
