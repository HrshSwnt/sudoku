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
      title={enabled ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      className="fixed top-2 right-2 z-50 p-2 text-xl rounded-full transition 
                 bg-gray-100 dark:bg-gray-800 dark:text-white shadow hover:scale-105"
    >
      {enabled ? '🌙' : '🌞'}
    </button>
  );
}
