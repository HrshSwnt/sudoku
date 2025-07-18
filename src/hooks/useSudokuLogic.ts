import { useState, useEffect, useRef } from 'react';
import { type Cell } from '../logic/types';
import { generateSudoku, solveSudoku } from '../logic/generate';
import { isBoardSolved } from '../logic/validate';

export function useSudokuLogic() {
    const [board, setBoard] = useState<Cell[][]>([]);
    const [solution, setSolution] = useState<number[][] | null>(null);
    const [selectedCell, setSelectedCell] = useState<[number, number] | null>(null);
    const [history, setHistory] = useState<Cell[][][]>([]);
    const [mistakes, setMistakes] = useState(0);
    const [hintsUsed, setHintsUsed] = useState(0);
    const [hasWon, setHasWon] = useState(false);
    const [hasFailed, setHasFailed] = useState(false);
    const [showStartPrompt, setShowStartPrompt] = useState(true);


    // Game configuration limits
    const [maxMistakes, setMaxMistakes] = useState(5);
    const [maxHints, setMaxHints] = useState(5);
    const [timeLimit, setTimeLimit] = useState(180); // in seconds
    const [timeLeft, setTimeLeft] = useState(180); // ticks down

    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

    // Run countdown timer
    useEffect(() => {
        if (hasWon || hasFailed || timeLeft <= 0) return;

        timerRef.current = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    setHasFailed(true);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [hasWon, hasFailed]);

    function selectCell(row: number, col: number) {
        setSelectedCell([row, col]);
    }

    function inputValue(value: number) {
        if (!selectedCell || !solution || hasWon || hasFailed) return;
        const [r, c] = selectedCell;

        const prevBoard = board.map((row) => row.map((cell) => ({ ...cell })));
        setHistory((h) => [...h, prevBoard]);

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

        if (
            !board[r][c].readonly &&
            solution[r][c] !== value &&
            board[r][c].value !== value
        ) {
            setMistakes((m) => m + 1);
        }

        if (isBoardSolved(updatedBoard, solution)) {
            setHasWon(true);
        }

        checkFailCondition();
    }

    function clearCell() {
        if (!selectedCell || hasWon || hasFailed) return;
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

    function giveHint() {
        if (!selectedCell || !solution || hasWon || hasFailed) return;
        const [r, c] = selectedCell;

        if (board[r][c].readonly || board[r][c].value !== null) return;

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

        checkFailCondition();
    }

    function checkFailCondition() {
        if (mistakes + 1 > maxMistakes || hintsUsed + 1 > maxHints) {
            setHasFailed(true);
        }
    }

    function resetBoard(config?: {
        maxMistakes?: number;
        maxHints?: number;
        timeLimit?: number;
    }) {
        const newBoard = generateSudoku();
        const newSolution = solveSudoku(newBoard);

        setBoard(newBoard);
        setSolution(newSolution);
        setSelectedCell(null);
        setHasWon(false);
        setHasFailed(false);
        setMistakes(0);
        setHintsUsed(0);
        setHistory([]);

        const time = config?.timeLimit ?? 180;
        const mistakeLimit = config?.maxMistakes ?? 5;
        const hintLimit = config?.maxHints ?? 5;

        setTimeLimit(time);
        setTimeLeft(time);
        setMaxMistakes(mistakeLimit);
        setMaxHints(hintLimit);

        setShowStartPrompt(false); // 🟢 hide the prompt on start
    }


    return {
        board,
        selectedCell,
        selectCell,
        inputValue,
        resetBoard,
        giveHint,
        hasWon,
        hasFailed,
        mistakes,
        maxMistakes,
        hintsUsed,
        maxHints,
        clearCell,
        undo,
        history,
        timeLeft,
        timeLimit,
        setHasFailed,
        showStartPrompt,
        setShowStartPrompt,
    };
}
