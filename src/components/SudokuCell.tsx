import { type Cell } from '../logic/types';
import { useSudoku } from '../hooks/useSudoku';

interface Props {
    row: number;
    col: number;
    cell: Cell;
}

export default function SudokuCell({ row, col, cell }: Props) {
    const { selectCell, selectedCell, bloomMode } = useSudoku();
    const isSelected = selectedCell?.[0] === row && selectedCell?.[1] === col;

    const isSameRow = selectedCell?.[0] === row;
    const isSameCol = selectedCell?.[1] === col;
    const rowDist = selectedCell ? Math.abs(selectedCell[0] - row) : 0;
    const colDist = selectedCell ? Math.abs(selectedCell[1] - col) : 0;
    const dist = rowDist + colDist;

    // Background based on mode
    let bgClass = 'bg-white dark:bg-gray-800';
    if (cell.readonly) {
        bgClass = 'bg-gray-200 dark:bg-gray-700';
    } else if (isSelected) {
        bgClass = 'bg-blue-300 dark:bg-blue-700';
    } else if (cell.error) {
        bgClass = 'bg-red-300 dark:bg-red-700';
    } else if (bloomMode === 'rowcol' && (isSameRow || isSameCol)) {
        if (row === selectedCell?.[0] && col === selectedCell?.[1]) {
            bgClass = 'bg-blue-300 dark:bg-blue-700';
        } else if (rowDist + colDist === 1) {
            bgClass = 'bg-blue-100 dark:bg-blue-800';
        } else {
            bgClass = 'bg-blue-50 dark:bg-blue-900';
        }
    } else if (bloomMode === 'radial' && selectedCell) {
        if (dist === 1) bgClass = 'bg-blue-100 dark:bg-blue-800';
        else if (dist === 2) bgClass = 'bg-blue-50 dark:bg-blue-900';
    }

    return (
        <button
            onClick={() => selectCell(row, col)}
            className={`aspect-square w-full h-full border border-gray-400 dark:border-gray-600 text-center font-semibold ${bgClass} relative flex items-center justify-center p-0`}
        >
            {cell.value !== null ? (
            <span className="w-full h-full flex items-center justify-center text-[min(2.5rem,8vw)] leading-none">
                {cell.value}
            </span>
            ) : (
            <div className="grid grid-cols-3 gap-[1px] w-full h-full text-[min(0.6rem,2.5vw)] leading-tight text-gray-700 dark:text-gray-300">
                {Array.from({ length: 9 }, (_, i) => i + 1).map((num) => (
                <span
                    key={num}
                    className="flex items-center justify-center"
                >
                    {cell.pencilMarks.includes(num) ? num : ''}
                </span>
                ))}
            </div>
            )}
        </button>
    );
}
