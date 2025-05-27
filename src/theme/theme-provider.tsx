import { type ReactNode, useEffect, useMemo, useState } from "react";
import type { ThemeMode, ThemePreset, ThemeState } from "./theme-types";
import {
  defaultPresets,
  getDefaultPresetKey,
  getPresetThemeStyles,
} from "./theme-presets";
import { applyThemeToElement } from "./apply-theme";
import { STORAGE_KEYS, storage } from "./local-storage";
import {
  ThemeContext,
  type Coords,
  type ThemeContextValue,
} from "./theme-context";

interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: ThemeMode;
  defaultPreset?: string;
}

export function ThemeProvider({
  children,
  defaultTheme = "light",
  defaultPreset,
}: ThemeProviderProps) {
  // Initialize presets
  const [presets] = useState<Record<string, ThemePreset>>(defaultPresets);

  // Get the default preset key if not provided
  const firstPresetKey = getDefaultPresetKey();
  const initialPreset = defaultPreset || firstPresetKey;

  // Load saved theme mode from localStorage
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    // First check localStorage
    const savedMode = storage.get<ThemeMode | null>(
      STORAGE_KEYS.THEME_MODE,
      null,
    );
    if (savedMode) return savedMode;

    // Then check system preference
    if (typeof window !== "undefined") {
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }

    // Fallback to default
    return defaultTheme;
  });

  // Load saved preset from localStorage
  const [preset, setPresetState] = useState<string>(() => {
    // Get preset from localStorage or use the provided/default preset
    const savedPreset = storage.get<string | null>(
      STORAGE_KEYS.THEME_PRESET,
      null,
    );

    // If we have a saved preset and it exists in our presets, use it
    if (savedPreset && presets[savedPreset]) {
      return savedPreset;
    }

    // Otherwise use the developer-provided default or the first preset
    return initialPreset;
  });

  // Create theme state object, memoized to avoid unnecessary re-renders
  const themeState: ThemeState = useMemo(
    () => ({
      preset,
      styles: getPresetThemeStyles(preset, presets),
      currentMode: theme,
    }),
    [preset, presets, theme],
  );

  // Handle theme mode changes
  const setTheme = (newMode: ThemeMode) => {
    setThemeState(newMode);
    storage.set(STORAGE_KEYS.THEME_MODE, newMode);
  };

  // Handle preset changes
  const setPreset = (newPreset: string) => {
    // Only save valid presets
    if (presets[newPreset]) {
      setPresetState(newPreset);
      storage.set(STORAGE_KEYS.THEME_PRESET, newPreset);
    }
  };

  // Handle theme toggle with optional transition
  const toggleTheme = (coords?: Coords) => {
    const root = document.documentElement;
    const newMode = theme === "light" ? "dark" : "light";

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Check if browser supports view transitions API
    if (document.startViewTransition && !prefersReducedMotion && coords) {
      root.style.setProperty("--x", `${coords.x}px`);
      root.style.setProperty("--y", `${coords.y}px`);

      document.startViewTransition(() => {
        setTheme(newMode);
      });
    } else {
      setTheme(newMode);
    }
  };

  // Apply theme whenever themeState changes
  useEffect(() => {
    const root = document.documentElement;
    if (!root) return;

    applyThemeToElement(themeState, root);
  }, [themeState]);

  // Context value
  const value: ThemeContextValue = {
    theme,
    setTheme,
    toggleTheme,
    preset,
    setPreset,
    presets,
    themeState,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
