// src/components/DarkModeToggle.tsx
import { useEffect, useState } from 'react';

export default function DarkModeToggle() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const root = window.document.documentElement;
    if (enabled) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [enabled]);

  return (
    <button
      onClick={() => setEnabled((prev) => !prev)}
      className="text-sm border px-3 py-1 mb-3 rounded font-medium transition bg-gray-200 dark:bg-gray-700 dark:text-white"
    >
      {enabled ? '🌙 Dark Mode' : '☀️ Light Mode'}
    </button>
  );
}
