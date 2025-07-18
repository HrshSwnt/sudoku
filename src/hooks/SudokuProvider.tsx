import React, { createContext } from 'react';
import { useSudokuLogic } from './useSudokuLogic';

const SudokuContext = createContext<ReturnType<typeof useSudokuLogic> | null>(null);

export function SudokuProvider({ children }: { children: React.ReactNode }) {
  const logic = useSudokuLogic();
  return (
    <SudokuContext.Provider value={logic}>
      {children}
    </SudokuContext.Provider>
  );
}

export default SudokuContext;