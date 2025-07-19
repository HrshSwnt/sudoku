import { useSudoku } from '../hooks/useSudoku';
import SudokuCell from './SudokuCell';

export default function SudokuGrid() {
  const { board } = useSudoku();

  return (
    <div className="w-full max-w-[90vw] sm:max-w-[420px] aspect-square bg-black rounded overflow-hidden">
      <div className="w-full h-full grid grid-cols-9">
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