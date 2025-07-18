import { useState } from 'react';
import { type Cell } from '../logic/types';
import { generateSudoku, solveSudoku } from '../logic/generate';

export function useSudokuLogic() {
  const [board, setBoard] = useState<Cell[][]>(generateSudoku());
  const [selectedCell, setSelectedCell] = useState<[number, number] | null>(null);

  function selectCell(row: number, col: number) {
    setSelectedCell([row, col]);
  }

  function inputValue(value: number) {
    if (!selectedCell) return;
    const [r, c] = selectedCell;
    setBoard((prev) => {
      const updated = prev.map((row) => row.map((cell) => ({ ...cell })));
      if (!updated[r][c].readonly) updated[r][c].value = value;
      return updated;
    });
  }

  function resetBoard() {
    setBoard(generateSudoku());
    setSelectedCell(null);
  }

  function giveHint() {
    const solution = solveSudoku(board);
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
  };
}
