import { type Cell } from '../logic/types';
import { useSudoku } from '../hooks/useSudoku';

interface Props {
    row: number;
    col: number;
    cell: Cell;
}

export default function SudokuCell({ row, col, cell }: Props) {
    const { board, selectCell, selectedCell, bloomMode } = useSudoku();
    const isSelected = selectedCell?.[0] === row && selectedCell?.[1] === col;

    const isSameRow = selectedCell?.[0] === row;
    const isSameCol = selectedCell?.[1] === col;
    const rowDist = selectedCell ? Math.abs(selectedCell[0] - row) : 0;
    const colDist = selectedCell ? Math.abs(selectedCell[1] - col) : 0;
    const dist = rowDist + colDist;
    const selectedCellHasError = selectedCell && board[selectedCell[0]][selectedCell[1]].error;


    // Background color logic
    let bgClass = 'bg-white dark:bg-gray-800';


    if (cell.readonly) {
        bgClass = 'bg-gray-200 dark:bg-gray-700';
    } else if (isSelected && cell.error) {
        bgClass = 'bg-red-400 dark:bg-red-800';
    } else if (isSelected) {
        bgClass = 'bg-blue-300 dark:bg-blue-700';
    } else if (cell.error) {
        bgClass = 'bg-red-300 dark:bg-red-700';
    } else if (bloomMode === 'rowcol' && (isSameRow || isSameCol)) {
        if (selectedCellHasError) {
            if (dist === 1) bgClass = 'bg-red-200 dark:bg-red-900';
            else bgClass = 'bg-red-100 dark:bg-red-950';
        } else {
            if (dist === 1) bgClass = 'bg-blue-100 dark:bg-blue-800';
            else bgClass = 'bg-blue-50 dark:bg-blue-900';
        }
    } else if (bloomMode === 'radial' && selectedCell) {
        if (selectedCellHasError) {
            if (dist === 1) bgClass = 'bg-red-200 dark:bg-red-900';
            else if (dist === 2) bgClass = 'bg-red-100 dark:bg-red-950';
        } else {
            if (dist === 1) bgClass = 'bg-blue-100 dark:bg-blue-800';
            else if (dist === 2) bgClass = 'bg-blue-50 dark:bg-blue-900';
        }
    } 

    // Thicker border styles for 3x3 subgrid divisions
    const borderClasses = [
        row % 3 === 0 ? 'border-t-4' : 'border-t',
        col % 3 === 0 ? 'border-l-4' : 'border-l',
        row === 8 ? 'border-b-4' : 'border-b',
        col === 8 ? 'border-r-4' : 'border-r',
        'border-gray-500 dark:border-gray-600'
    ].join(' ');

    return (
        <button
            onClick={() => selectCell(row, col)}
            className={`aspect-square w-full h-full text-center font-semibold relative flex items-center justify-center p-0 ${bgClass} ${borderClasses}`}
        >
            {cell.value !== null ? (
                <span className="w-full h-full flex items-center justify-center text-[min(3.3rem,11vw)] leading-none">
                    {cell.value}
                </span>
            ) : (
                <div className="grid grid-cols-3 gap-[1px] w-full h-full text-[min(0.75rem,3vw)] leading-tight text-gray-700 dark:text-gray-300">
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
