import { type ReactNode, useEffect, useMemo } from "react";
import type { ThemeMode, ThemeState } from "@/types/theme-types";
import { getPresetThemeStyles, defaultPresets } from "@/theme/theme-presets";
import { applyThemeToElement } from "@/theme/apply-theme";
import {
  ThemeContext,
  type Coords,
  type ThemeContextValue,
} from "@/contexts/theme-context";
import { useTheme } from "@/hooks/use-theme";
import { useStore } from "@nanostores/react";
import {
  $themePreset,
  setThemePreset as setStorePreset,
} from "@/stores/theme-preset-store";
import { $theme } from "@/stores/theme-store";
import { allPresets } from "@/theme/presets";

interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: ThemeMode;
  defaultPreset?: string;
}

export function ThemeProvider({
  children,
  defaultTheme,
  defaultPreset,
}: ThemeProviderProps) {
  const {
    theme: currentThemePreference,
    resolvedTheme,
    setTheme: setNanostoreTheme,
  } = useTheme();

  const currentPresetKey = useStore($themePreset);

  useEffect(() => {
    if (defaultPreset) {
      const currentPreset = $themePreset.get();
      if (allPresets[currentPreset]) {
        // if the preset is already set, don't change it
        return;
      }
      if (defaultPresets[defaultPreset]) {
        setStorePreset(defaultPreset);
      } else if (!defaultPresets[defaultPreset]) {
        console.warn(
          `ThemeProvider: defaultPreset "${defaultPreset}" is not a valid preset key. Available presets:`,
          Object.keys(defaultPresets),
        );
      }
    }
  }, [defaultPreset]);

  const themeState: ThemeState = useMemo(
    () => ({
      preset: currentPresetKey,
      styles: getPresetThemeStyles(currentPresetKey, defaultPresets),
      currentMode: resolvedTheme,
    }),
    [currentPresetKey, resolvedTheme],
  );

  const setPreset = (newPreset: string) => {
    setStorePreset(newPreset);
  };

  const toggleTheme = (coords?: Coords) => {
    const root = document.documentElement;
    const newMode = resolvedTheme === "light" ? "dark" : "light";

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (document.startViewTransition && !prefersReducedMotion && coords) {
      root.style.setProperty("--x", `${coords.x}px`);
      root.style.setProperty("--y", `${coords.y}px`);

      document.startViewTransition(() => {
        setNanostoreTheme(newMode);
      });
    } else {
      setNanostoreTheme(newMode);
    }
  };

  useEffect(() => {
    const root = document.documentElement;
    if (!root) return;

    applyThemeToElement(themeState, root);
  }, [themeState]);

  useEffect(() => {
    if (defaultTheme) {
      const currentTheme = $theme.get();
      if (defaultTheme !== "system" && currentTheme === "system") {
        setNanostoreTheme(defaultTheme);
      } else if (defaultTheme !== "system" && currentTheme !== defaultTheme) {
        setNanostoreTheme(defaultTheme);
      }
    }
  }, [defaultTheme, setNanostoreTheme]);

  const value: ThemeContextValue = {
    theme: currentThemePreference,
    setTheme: setNanostoreTheme,
    toggleTheme,
    preset: currentPresetKey,
    setPreset,
    presets: defaultPresets,
    themeState,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
