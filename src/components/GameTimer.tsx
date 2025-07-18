import { useEffect, useState } from 'react';
import { useSudoku } from '../hooks/useSudoku';

export default function GameTimer() {
  const {
    timeLeft,        // in seconds, set on new game
    hasWon,
    hasFailed,
    setHasFailed,
  } = useSudoku();

  const [remaining, setRemaining] = useState(timeLeft);
  const [startTime, setStartTime] = useState(Date.now());

  // 🧠 Reset timer on new game
  useEffect(() => {
    setRemaining(timeLeft);
    setStartTime(Date.now());
  }, [timeLeft]);

  // 🧠 Accurate ticking using Date.now()
  useEffect(() => {
    if (hasWon || hasFailed) return;

    const interval = setInterval(() => {
      const now = Date.now();
      const elapsed = Math.floor((now - startTime) / 1000); // in seconds
      const updated = timeLeft - elapsed;

      if (updated <= 0) {
        setRemaining(0);
        setHasFailed(true);
        clearInterval(interval);
      } else {
        setRemaining(updated);
      }
    }, 250); // smooth interval

    return () => clearInterval(interval);
  }, [timeLeft, hasWon, hasFailed, startTime, setHasFailed]);

  const mins = Math.floor(remaining / 60);
  const secs = remaining % 60;
  const isDanger = remaining <= 30; // 🔴 Red if under 30 seconds
  return (
    <div className={`font-mono text-xl ${isDanger ? 'text-red-600' : 'text-gray-800'} mb-2`}>
      ⏳ Time: {mins}:{secs.toString().padStart(2, '0')}
    </div>
  );
}
