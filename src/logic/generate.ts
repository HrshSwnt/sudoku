import { type Cell } from './types';


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

function shuffle(arr: number[]): number[] {
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
  for (let i = 0; i < 40; i++) {
    const r = Math.floor(Math.random() * 9);
    const c = Math.floor(Math.random() * 9);
    puzzle[r][c] = 0;
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

function isValid(board: number[][], row: number, col: number, num: number): boolean {
  for (let i = 0; i < 9; i++) {
    if (board[row][i] === num || board[i][col] === num) return false;
  }
  const startRow = Math.floor(row / 3) * 3;
  const startCol = Math.floor(col / 3) * 3;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[startRow + i][startCol + j] === num) return false;
    }
  }
  return true;
}