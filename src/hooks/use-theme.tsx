import { useEffect, useState } from "react";
import { $theme, setTheme as setNanostoreTheme } from "@/stores/theme-store";
import type { Theme } from "@/types/theme-types";
import { useStore } from "@nanostores/react";

const DEBUG = false;

export const useTheme = () => {
  const currentStoreTheme = useStore($theme); // 'light', 'dark', or 'system'
  const [resolvedTheme, setResolvedTheme] = useState<Theme>(() => {
    // Initialize resolvedTheme correctly based on the initial store theme
    if (currentStoreTheme === "system") {
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
    return currentStoreTheme; // 'light' or 'dark'
  });

  useEffect(() => {
    if (DEBUG) {
      console.log(
        `useTheme effect triggered. Store theme: ${currentStoreTheme}`,
      );
    }

    if (currentStoreTheme === "light") {
      if (DEBUG) {
        console.log("Setting resolvedTheme to light");
      }
      setResolvedTheme("light");
      // No listener to manage for 'light' theme, prior 'system' listener
      // would be cleaned up by effect's previous run's cleanup.
      return;
    }

    if (currentStoreTheme === "dark") {
      if (DEBUG) {
        console.log("Setting resolvedTheme to dark");
      }
      setResolvedTheme("dark");
      // No listener to manage for 'dark' theme.
      return;
    }

    // --- Theme is "system" ---
    if (DEBUG) {
      console.log("Theme is system. Setting up media query listener.");
    }
    const darkModeMediaQuery = window.matchMedia(
      "(prefers-color-scheme: dark)",
    );

    // Define the handler for media query changes
    const handleMediaQueryChange = (e: MediaQueryListEvent) => {
      if (DEBUG) {
        console.log(
          "Media query changed (system mode):",
          e.matches ? "dark" : "light",
        );
      }
      setResolvedTheme(e.matches ? "dark" : "light");
    };

    // Set initial resolved theme based on current system preference
    // (This also ensures it's correct if theme switches TO system)
    setResolvedTheme(darkModeMediaQuery.matches ? "dark" : "light");

    if (DEBUG) {
      console.log("Adding media query listener for system theme.");
    }
    darkModeMediaQuery.addEventListener("change", handleMediaQueryChange);

    // Cleanup function for THIS effect instance (when theme was "system")
    return () => {
      if (DEBUG) {
        console.log("Cleaning up 'system' theme effect. Removing listener.");
      }
      darkModeMediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, [currentStoreTheme]); // Re-run this effect only when the store's theme value changes

  return {
    theme: currentStoreTheme, // The preference ('light', 'dark', 'system')
    resolvedTheme, // The actual theme to apply ('light' or 'dark')
    setTheme: setNanostoreTheme, // The function to change the theme preference in the store
  };
};
