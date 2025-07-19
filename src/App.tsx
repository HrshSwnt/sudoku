import SudokuGrid from './components/SudokuGrid';
import Controls from './components/Controls';
import NumberPad from './components/NumberPad';
import WinBanner from './components/WinBanner';
import FailBanner from './components/FailBanner';
import GameTimer from './components/GameTimer';
import GameStartPrompt from './components/GameStartPrompt';
import PauseOverlay from './components/PauseOverlay';
import BloomModeSelector from './components/BloomModeSelector';
import DarkModeToggle from './components/DarkModeToggle';
import { SudokuProvider } from './hooks/SudokuProvider';

export default function App() {
  return (
    <SudokuProvider>
      <main className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white flex flex-col items-center justify-center p-4 transition-colors duration-300">
        <DarkModeToggle />
        <GameStartPrompt />
        <h1 className="text-3xl font-bold mb-4">Sudoku</h1>
        <GameTimer />
        <SudokuGrid />
        <NumberPad />
        <Controls />
        <WinBanner />
        <FailBanner />
        <PauseOverlay />
        <BloomModeSelector />
      </main>
    </SudokuProvider>
  );
}
