import { createContext, useContext } from "react";
import type { ThemeMode, ThemePreset, ThemeState } from "@/types/theme-types";

export interface Coords {
  x: number;
  y: number;
}

export interface ThemeContextValue {
  theme: ThemeMode; // 'light', 'dark', or 'system'
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: (coords?: Coords) => void;
  preset: string; // The key of the current preset
  setPreset: (preset: string) => void;
  presets: Record<string, ThemePreset>; // All available presets
  themeState: ThemeState; // Includes resolvedMode, presetKey, and styles
}

export const ThemeContext = createContext<ThemeContextValue | undefined>(
  undefined,
);

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeContext must be used within a ThemeProvider");
  }
  return context;
};
