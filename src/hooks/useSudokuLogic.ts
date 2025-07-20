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
    const [startTime, setStartTime] = useState<number | null>(null);
    const [totalPauseDuration, setTotalPauseDuration] = useState(0);
    const pauseStartedAt = useRef<number | null>(null);
    const [isPaused, setIsPaused] = useState(false);
    const [bloomMode, setBloomMode] = useState<'none' | 'rowcol' | 'radial'>('rowcol');
    const [isPencilMode, setIsPencilMode] = useState(false);
    const [numberCounts, setNumberCounts] = useState<Map<number, number>>(new Map());





    // Game configuration limits
    const [maxMistakes, setMaxMistakes] = useState(5);
    const [maxHints, setMaxHints] = useState(5);
    const [timeLimit, setTimeLimit] = useState(180); // in seconds

    useEffect(() => {
        const counts = computeNumberCounts(board);
        setNumberCounts(counts);
    }, [board]);


    // Run countdown timer
    useEffect(() => {
        if (isPaused) {
            pauseStartedAt.current = Date.now(); // Start tracking pause
        } else if (pauseStartedAt.current !== null) {
            const pauseDuration = Date.now() - pauseStartedAt.current;
            setTotalPauseDuration((prev) => prev + pauseDuration); // Add to total
            pauseStartedAt.current = null;
        }
    }, [isPaused]);

    function stopGame() {
        setIsPaused(false);
        setHasFailed(false);
        setHasWon(false);
        setStartTime(null); // ⛔ Stop the timer loop
        setShowStartPrompt(true);
    }

    function computeNumberCounts(board: Cell[][]): Map<number, number> {
        const counts = new Map<number, number>();
        for (const row of board) {
            for (const cell of row) {
                if (cell.value !== null) {
                    counts.set(cell.value, (counts.get(cell.value) || 0) + 1);
                }
            }
        }
        return counts;
    }

    function selectCell(row: number, col: number) {
        setSelectedCell([row, col]);
    }

    function inputValue(value: number) {
        if (!selectedCell || !solution || hasWon || hasFailed) return;
        const [r, c] = selectedCell;

        // ✅ Deep copy including pencilMarks
        const prevBoard = board.map((row) =>
            row.map((cell) => ({
                ...cell,
                pencilMarks: [...cell.pencilMarks],
            }))
        );
        setHistory((h) => [...h, prevBoard]);

        const updatedBoard = prevBoard.map((row, rowIndex) =>
            row.map((cell, colIndex) => {
                const newCell = { ...cell };

                if (rowIndex === r && colIndex === c && !newCell.readonly) {
                    if (isPencilMode) {
                        if (newCell.value === null) {
                            // ✅ Toggle pencil mark safely
                            const marks = [...newCell.pencilMarks];
                            const index = marks.indexOf(value);
                            if (index !== -1) {
                                marks.splice(index, 1);
                            } else {
                                marks.push(value);
                                marks.sort();
                            }
                            newCell.pencilMarks = marks;
                        }
                    } else {
                        newCell.value = value;
                        newCell.error = solution[r][c] !== value;
                        newCell.pencilMarks = []; // Clear on value commit
                    }
                }

                return newCell;
            })
        );

        setBoard(updatedBoard);

        if (!isPencilMode) {
            if (
                !board[r][c].readonly &&
                solution[r][c] !== value &&
                board[r][c].value !== value
            ) {
                setMistakes((m) => {
                    const updated = m + 1;
                    if (updated >= maxMistakes) setHasFailed(true);
                    return updated;
                });
            }

            if (isBoardSolved(updatedBoard, solution)) {
                setHasWon(true);
            }
        }
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

        if (board[r][c].readonly || board[r][c].value !== null || hintsUsed >= maxHints) return;

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
        setHintsUsed((h) => Math.min(h + 1, maxHints));


        if (isBoardSolved(updatedBoard, solution)) {
            setHasWon(true);
        }

    }



    function resetBoard(config?: {
        prefilledCells?: number;
        maxMistakes?: number;
        maxHints?: number;
        timeLimit?: number;
    }) {
        const cellsToKeep = config?.prefilledCells ?? 40;
        const newBoard = generateSudoku(cellsToKeep);
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
        setMaxMistakes(mistakeLimit);
        setMaxHints(hintLimit);

        setShowStartPrompt(false); // 🟢 hide the prompt on start
        setStartTime(Date.now());
        setTotalPauseDuration(0);
        pauseStartedAt.current = null;
        setIsPaused(false);

    }

    function erasePencilMark() {
        if (!selectedCell || hasWon || hasFailed) return;
        const [r, c] = selectedCell;

        if (board[r][c].readonly || board[r][c].value !== null) return;

        // ✅ Save snapshot before change
        const prevBoard = board.map((row) =>
            row.map((cell) => ({
                ...cell,
                pencilMarks: [...cell.pencilMarks],
            }))
        );
        setHistory((h) => [...h, prevBoard]);

        const updatedBoard = prevBoard.map((row, rowIndex) =>
            row.map((cell, colIndex) => {
                if (rowIndex === r && colIndex === c) {
                    return { ...cell, pencilMarks: [] }; // Clear only pencil marks
                }
                return cell;
            })
        );

        setBoard(updatedBoard);
    }


    return {
        board,
        selectedCell,
        selectCell,
        inputValue,
        resetBoard,
        giveHint,
        setHasWon,
        hasWon,
        hasFailed,
        mistakes,
        maxMistakes,
        hintsUsed,
        maxHints,
        clearCell,
        undo,
        history,
        timeLimit,
        setHasFailed,
        showStartPrompt,
        setShowStartPrompt,
        isPaused,
        setIsPaused,
        totalPauseDuration,
        startTime,
        setStartTime,
        pauseStartedAt,
        bloomMode,
        setBloomMode,
        isPencilMode,
        setIsPencilMode,
        erasePencilMark,
        stopGame,
        numberCounts,
    };
}
