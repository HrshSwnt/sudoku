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
    const [mistakes, setMistakes] = useState(0);

    function selectCell(row: number, col: number) {
        setSelectedCell([row, col]);
    }

    function inputValue(value: number) {
        if (!selectedCell || !solution) return;
        const [r, c] = selectedCell;

        // Clone the board first
        const updatedBoard = board.map((row, rowIndex) =>
            row.map((cell, colIndex) => {
                const newCell = { ...cell };
                if (rowIndex === r && colIndex === c && !newCell.readonly) {
                    newCell.value = value;
                    newCell.error = solution[r][c] !== value;
                }
                return newCell;
            })
        );

        // Check if it was a mistake
        const isMistake =
            !board[r][c].readonly &&
            solution[r][c] !== value &&
            board[r][c].value !== value;

        // Update state
        setBoard(updatedBoard);

        if (isBoardSolved(updatedBoard, solution)) {
            setHasWon(true);
        }

        if (isMistake) {
            setMistakes((prev) => prev + 1);
        }
    }


    function resetBoard() {
        const newBoard = generateSudoku();
        const newSolution = solveSudoku(newBoard);
        setBoard(newBoard);
        setSolution(newSolution);
        setSelectedCell(null);
        setHasWon(false);
        setMistakes(0);
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
        mistakes, // for Controls
    };
}
