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

    return (
        <div className="font-mono text-xl text-gray-800 mb-2">
            ⏳ Time: {mins}:{secs.toString().padStart(2, '0')}
        </div>
    );
}
