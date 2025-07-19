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

// pencil marks UI (make the provided numbers stand out)
// I need to add notes/pencil UI to each cell. 
// Basically, users often take notes of possible numbers without making attempts. 
// I want to allow them to do this in the existing UI by adding a pencil button. 
// The user can select the pencil button which will highlight it to indicate pencil mode. 
// Now, the user can select any number they wish and they will be noted in a tinier font within the cell. 
// The text should adjust dynamically as more numbers are selected. 
// The user stays in pencil mode until it is toggled off by clicking the pencil icon again. 
// This will also necessitate the addition of an erase button and changing the existing erase button to a clear button.