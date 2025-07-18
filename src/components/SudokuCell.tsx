// src/components/SudokuCell.tsx

import { type Cell } from '../logic/types';
import { useSudoku } from '../hooks/useSudoku';

interface Props {
  row: number;
  col: number;
  cell: Cell;
}

export default function SudokuCell({ row, col, cell }: Props) {
  const { selectCell, selectedCell } = useSudoku();
  const isSelected = selectedCell?.[0] === row && selectedCell?.[1] === col;

  return (
    <button
      onClick={() => selectCell(row, col)}
      className={`w-10 h-10 border border-gray-400 text-center text-lg font-semibold ${
        isSelected ? 'bg-blue-200' : cell.error ? 'bg-red-300' : 'bg-white'
      }`}
    >
      {cell.value || ''}
    </button>
  );
}
