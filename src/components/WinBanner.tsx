import { useSudoku } from "../hooks/useSudoku"; // <- assumes this exposes context

const WinBanner = () => {
  const { hasWon } = useSudoku();

  if (!hasWon) return null;

  return (
    <div className="bg-green-100 text-green-800 border border-green-400 px-4 py-3 rounded mb-4 text-center font-semibold text-lg">
        🎉 You solved the Sudoku! 🎉
    </div>
  );

};

export default WinBanner;
