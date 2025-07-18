import SudokuGrid from './components/SudokuGrid';
import Controls from './components/Controls';
import NumberPad from './components/NumberPad';
import WinBanner from './components/WinBanner';
import { SudokuProvider } from './hooks/SudokuProvider';

export default function App() {
  return (
    <SudokuProvider>
      <main className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
        <h1 className="text-3xl font-bold mb-4">Sudoku</h1>
        <SudokuGrid />
        <NumberPad />
        <Controls />
        <WinBanner />
      </main>
    </SudokuProvider>
  );
}

// Need to add
// pencil marks UI (make the provided numbers stand out)
// timer
// diificulty levels
// dark mode
// mistake fail state