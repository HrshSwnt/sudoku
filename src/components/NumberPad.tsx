import { useSudoku } from '../hooks/useSudoku';

export default function NumberPad() {
  const { inputValue } = useSudoku();

  return (
    <div className="grid grid-cols-9 gap-1 mt-4">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
        <button
          key={num}
          onClick={() => inputValue(num)}
          className="w-10 h-10 bg-gray-300 hover:bg-gray-400 rounded"
        >
          {num}
        </button>
      ))}
    </div>
  );
}
