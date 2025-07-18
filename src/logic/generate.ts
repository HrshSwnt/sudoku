import { type Cell } from './types';
import { isValid } from './validate';


function fillBoard(board: number[][]): boolean {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === 0) {
        const nums = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]);
        for (const num of nums) {
          if (isValid(board, row, col, num)) {
            board[row][col] = num;
            if (fillBoard(board)) return true;
            board[row][col] = 0;
          }
        }
        return false;
      }
    }
  }
  return true;
}

function shuffle<T>(arr: T[]): T[] {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function generateSudoku(): Cell[][] {
  const solved: number[][] = Array.from({ length: 9 }, () => Array(9).fill(0));
  fillBoard(solved);

  const puzzle = solved.map((row) => [...row]);

  const positions = shuffle(
    Array.from({ length: 81 }, (_, i) => [Math.floor(i / 9), i % 9])
  );

  for (const [r, c] of positions) {
    const backup = puzzle[r][c];
    puzzle[r][c] = 0;

    const copy = puzzle.map((row) => [...row]);
    if (countSolutions(copy) !== 1) {
      puzzle[r][c] = backup; // Restore if solution is not unique
    }
  }

  return puzzle.map((row) =>
    row.map((val) => ({
      value: val === 0 ? null : val,
      readonly: val !== 0,
      pencilMarks: [],
      error: false,
    }))
  );
}


export function solveSudoku(inputBoard: Cell[][]): number[][] | null {
  const board = inputBoard.map((row) => row.map((cell) => cell.value || 0));
  if (fillBoard(board)) return board;
  return null;
}

function countSolutions(board: number[][], limit = 2): number {
  let count = 0;

  function solve() {
    if (count >= limit) return; // Early exit if more than 1 solution

    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] === 0) {
          for (let num = 1; num <= 9; num++) {
            if (isValid(board, row, col, num)) {
              board[row][col] = num;
              solve();
              board[row][col] = 0;
            }
          }
          return;
        }
      }
    }

    count++;
  }

  solve();
  return count;
}
