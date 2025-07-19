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
    let bgClass = 'bg-white';

    if (isSelected) {
        bgClass = 'bg-blue-300';
    } else if (cell.readonly) {
        bgClass = 'bg-gray-200';
    } else if (cell.error) {
        bgClass = 'bg-red-300';
    } else if (bloomMode === 'rowcol' && (isSameRow || isSameCol)) {
        if (row === selectedCell?.[0] && col === selectedCell?.[1]) {
            bgClass = 'bg-blue-300';
        } else if (rowDist + colDist === 1) {
            bgClass = 'bg-blue-100';
        } else {
            bgClass = 'bg-blue-50';
        }
    } else if (bloomMode === 'radial' && selectedCell) {
        if (dist === 1) bgClass = 'bg-blue-100';
        else if (dist === 2) bgClass = 'bg-blue-50';
    }

    return (
        <button
            onClick={() => selectCell(row, col)}
            className={`w-10 h-10 border border-gray-400 text-center text-lg font-semibold ${bgClass}`}
        >
            {cell.value || ''}
        </button>
    );
}
