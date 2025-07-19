import { useSudoku } from '../hooks/useSudoku';

export default function NumberPad() {
    const { inputValue } = useSudoku();

    return (
        <div className="grid grid-cols-9 gap-0 mt-4">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <button
                key={num}
                onClick={() => inputValue(num)}
                className="w-10 h-10 p-0 flex items-center justify-center bg-gray-300 hover:bg-gray-400 rounded dark:bg-gray-700 dark:hover:bg-gray-600"
            >
                <span className="text-2xl w-full h-full flex items-center justify-center">{num}</span>
            </button>
            ))}
        </div>
    );
}
