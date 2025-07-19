import { useEffect, useRef, useState } from 'react';
import { useSudoku } from '../hooks/useSudoku';

export default function GameTimer() {
    const {
        timeLimit,
        isPaused,
        hasWon,
        hasFailed,
        setHasFailed,
        startTime,
        totalPauseDuration,
        pauseStartedAt,
    } = useSudoku();

    const [remaining, setRemaining] = useState(timeLimit);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    // 🟡 When game starts, reset everything
    useEffect(() => {
        if (startTime) {
            setRemaining(timeLimit);
        }
    }, [startTime, timeLimit]);

    // ✅ Update remaining time every 250ms (only if not paused)
    useEffect(() => {
        if (!startTime || hasWon || hasFailed || isPaused) return;

        intervalRef.current = setInterval(() => {
            const pausedTime = totalPauseDuration +
                (pauseStartedAt.current ? Date.now() - pauseStartedAt.current : 0);

            const elapsed = Math.floor((Date.now() - startTime - pausedTime) / 1000);
            const newRemaining = Math.max(timeLimit - elapsed, 0);

            setRemaining(newRemaining);

            if (newRemaining <= 0 && !hasWon && !hasFailed) {
                setHasFailed(true);
            }
        }, 250);

        return () => clearInterval(intervalRef.current!);
    }, [isPaused, hasWon, hasFailed, startTime, timeLimit, totalPauseDuration, pauseStartedAt, setHasFailed]);

    if (!startTime) return null;

    const mins = Math.floor(remaining / 60);
    const secs = Math.floor(remaining % 60);

    const fillColor = remaining < 15 ? 'bg-red-500 dark:bg-red-700' : 'bg-blue-400 dark:bg-blue-600';
    const pulse = remaining < 10 ? 'animate-pulse' : '';

    return (
        <div className="w-full max-w-md mb-2">
            <div className="relative w-full h-8 border border-gray-400 dark:border-gray-600 rounded overflow-hidden bg-white dark:bg-gray-900">
                <div
                    className={`absolute top-0 left-0 h-full transition-all duration-300 ease-linear ${fillColor} ${pulse}`}
                    style={{ width: `${(remaining / timeLimit) * 100}%` }}
                ></div>
                <div className="absolute inset-0 flex items-center justify-center font-mono text-sm text-gray-800 dark:text-gray-200 z-10">
                    ⏳ Time: {mins}:{secs.toString().padStart(2, '0')}
                </div>
            </div>
        </div>
    );
}
