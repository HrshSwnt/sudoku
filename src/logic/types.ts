export type Cell = {
  value: number | null;
  readonly: boolean;
  pencilMarks: number[];
  error: boolean;
};