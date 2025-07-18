import { useState } from 'react';
import { type Cell } from '../logic/types';
import { generateSudoku, solveSudoku } from '../logic/generate';
import { isBoardSolved } from '../logic/validate';

export function useSudokuLogic() {
  const [board, setBoard] = useState<Cell[][]>(() => generateSudoku());
  const [selectedCell, setSelectedCell] = useState<[number, number] | null>(null);
  const [solution, setSolution] = useState<number[][] | null>(() =>
    solveSudoku(board)
  );
  const [hasWon, setHasWon] = useState(false);

  function selectCell(row: number, col: number) {
    setSelectedCell([row, col]);
  }

  function inputValue(value: number) {
    if (!selectedCell) return;
    const [r, c] = selectedCell;

    setBoard((prev) => {
      const updated = prev.map((row) => row.map((cell) => ({ ...cell })));
      if (!updated[r][c].readonly) {
        updated[r][c].value = value;

        // Check win after value is placed
        if (solution && isBoardSolved(updated, solution)) {
          setHasWon(true);
        }
      }
      return updated;
    });
  }

  function resetBoard() {
    const newBoard = generateSudoku();
    const newSolution = solveSudoku(newBoard);
    setBoard(newBoard);
    setSolution(newSolution);
    setSelectedCell(null);
    setHasWon(false);
  }

  function giveHint() {
    if (!solution || !selectedCell) return;
    const [r, c] = selectedCell;
    if (!board[r][c].readonly && board[r][c].value === null) {
      const hintValue = solution[r][c];
      inputValue(hintValue);
    }
  }

  return {
    board,
    selectedCell,
    selectCell,
    inputValue,
    resetBoard,
    giveHint,
    hasWon, // for WinBanner
  };
}
