import { useSudoku } from '../hooks/useSudoku';
import SudokuCell from './SudokuCell';

export default function SudokuGrid() {
  const { board } = useSudoku();

  return (
    <div className="grid grid-cols-9 border border-black">
      {board.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <SudokuCell key={`${rowIndex}-${colIndex}`} row={rowIndex} col={colIndex} value={cell.value} />
        ))
      )}
    </div>
  );
}