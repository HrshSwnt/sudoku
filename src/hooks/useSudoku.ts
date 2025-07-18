import { useContext } from 'react';
import SudokuContext from './SudokuProvider';

export function useSudoku() {
  const context = useContext(SudokuContext);
  if (!context) throw new Error('useSudoku must be used within a SudokuProvider');
  return context;
}
