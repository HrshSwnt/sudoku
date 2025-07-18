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
    const [hintsUsed, setHintsUsed] = useState(0);
    const [history, setHistory] = useState<Cell[][][]>([]);


    function selectCell(row: number, col: number) {
        setSelectedCell([row, col]);
    }

    function inputValue(value: number) {
        if (!selectedCell || !solution) return;
        const [r, c] = selectedCell;

        const prevBoard = board.map((row) => row.map((cell) => ({ ...cell })));

        // Save to history
        setHistory((h) => [...h, prevBoard]);

        // Prepare new board
        const updatedBoard = prevBoard.map((row, rowIndex) =>
            row.map((cell, colIndex) => {
                const newCell = { ...cell };
                if (rowIndex === r && colIndex === c && !newCell.readonly) {
                    newCell.value = value;
                    newCell.error = solution[r][c] !== value;
                }
                return newCell;
            })
        );

        setBoard(updatedBoard);

        if (isBoardSolved(updatedBoard, solution)) {
            setHasWon(true);
        }

        // Count mistake only on fresh wrong input
        if (
            !board[r][c].readonly &&
            solution[r][c] !== value &&
            board[r][c].value !== value
        ) {
            setMistakes((m) => m + 1);
        }
    }

    function clearCell() {
        if (!selectedCell) return;
        const [r, c] = selectedCell;

        if (board[r][c].readonly) return;

        const prevBoard = board.map((row) => row.map((cell) => ({ ...cell })));
        setHistory((h) => [...h, prevBoard]);

        const updatedBoard = prevBoard.map((row, rowIndex) =>
            row.map((cell, colIndex) => {
                const newCell = { ...cell };
                if (rowIndex === r && colIndex === c) {
                    newCell.value = null;
                    newCell.error = false;
                }
                return newCell;
            })
        );

        setBoard(updatedBoard);
    }

    function undo() {
        setHistory((prev) => {
            if (prev.length === 0) return prev;

            const last = prev[prev.length - 1];
            setBoard(last);
            return prev.slice(0, -1);
        });
    }



    function resetBoard() {
        const newBoard = generateSudoku();
        const newSolution = solveSudoku(newBoard);
        setBoard(newBoard);
        setSolution(newSolution);
        setSelectedCell(null);
        setHasWon(false);
        setMistakes(0);
        setHintsUsed(0);
        setHistory([]);
    }

    function giveHint() {
        if (!selectedCell || !solution) return;
        const [r, c] = selectedCell;

        // Ignore if already filled or readonly
        if (board[r][c].readonly || board[r][c].value !== null) return;

        // Save to history for undo
        const prevBoard = board.map((row) => row.map((cell) => ({ ...cell })));
        setHistory((h) => [...h, prevBoard]);

        const updatedBoard = prevBoard.map((row, rowIndex) =>
            row.map((cell, colIndex) => {
                const newCell = { ...cell };
                if (rowIndex === r && colIndex === c) {
                    newCell.value = solution[r][c];
                    newCell.error = false;
                }
                return newCell;
            })
        );

        setBoard(updatedBoard);
        setHintsUsed((h) => h + 1);

        if (isBoardSolved(updatedBoard, solution)) {
            setHasWon(true);
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
        clearCell,
        undo,
        history, // for undo functionality
        hintsUsed, // for Controls
    };
}

