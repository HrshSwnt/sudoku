import { useSudoku } from '../hooks/useSudoku';
import SudokuCell from './SudokuCell';

export default function SudokuGrid() {
  const { board } = useSudoku();

  return (
    <div className="grid grid-cols-9 border border-black bg-white dark:bg-gray-900">
      {board.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <SudokuCell key={`${rowIndex}-${colIndex}`} row={rowIndex} col={colIndex} cell={cell} />
        ))
      )}
    </div>
  );
}