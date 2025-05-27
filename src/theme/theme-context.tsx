import { createContext } from "react";
import type { ThemeMode, ThemePreset, ThemeState } from "./theme-types";

export type Coords = { x: number; y: number };

export interface ThemeContextValue {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: (coords?: Coords) => void;
  preset: string;
  setPreset: (preset: string) => void;
  presets: Record<string, ThemePreset>;
  themeState: ThemeState;
}

export const ThemeContext = createContext<ThemeContextValue | undefined>(
  undefined,
);
