import { useSudoku } from '../hooks/useSudoku';
import SudokuCell from './SudokuCell';

export default function SudokuGrid() {
  const { board } = useSudoku();

  return (
    <div className="w-full max-w-[90vw] sm:max-w-[420px] aspect-square p-1 bg-black rounded">
      <div className="grid grid-cols-9 w-full h-full">
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <SudokuCell
              key={`${rowIndex}-${colIndex}`}
              row={rowIndex}
              col={colIndex}
              cell={cell}
            />
          ))
        )}
      </div>
    </div>
  );
}