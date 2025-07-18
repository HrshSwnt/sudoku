import { useSudoku } from '../hooks/useSudoku';

interface Props {
  row: number;
  col: number;
  value: number | null;
}

export default function SudokuCell({ row, col, value }: Props) {
  const { selectCell, selectedCell } = useSudoku();
  const isSelected = selectedCell?.[0] === row && selectedCell?.[1] === col;

  return (
    <button
      onClick={() => selectCell(row, col)}
      className={`w-10 h-10 border border-gray-400 text-center text-lg ${
        isSelected ? 'bg-blue-200' : 'bg-white'
      }`}
    >
      {value || ''}
    </button>
  );
}