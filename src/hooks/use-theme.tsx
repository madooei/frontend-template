import { useEffect, useState } from "react";
import { $theme, setTheme as setNanostoreTheme } from "@/stores/theme-store";
import { useStore } from "@nanostores/react";

const DEBUG = false;
const IS_CLIENT = typeof window !== "undefined";

// Logger function for debug messages
function logger(...args: unknown[]) {
  if (DEBUG) {
    console.log(...args);
  }
}

export const useTheme = () => {
  const currentStoreTheme = useStore($theme); // 'light', 'dark', or 'system'
  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">(() => {
    // Initialize resolvedTheme correctly based on the initial store theme
    if (currentStoreTheme === "system") {
      if (IS_CLIENT) {
        return window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";
      }
      // SSR default for "system" theme: can be 'light', 'dark', or even undefined/null
      // Defaulting to 'light' is a common choice.
      return "light";
    }
    // When currentStoreTheme is 'light' or 'dark', it's directly assignable to "light" | "dark"
    return currentStoreTheme;
  });

  useEffect(() => {
    logger(`useTheme effect triggered. Store theme: ${currentStoreTheme}`);

    // All logic within useEffect runs only on the client-side after hydration.
    // However, an explicit IS_CLIENT check for window-dependent operations is good practice.

    if (currentStoreTheme === "light") {
      logger("Setting resolvedTheme to light");
      setResolvedTheme("light");
      // No listener to manage for 'light' theme, prior 'system' listener
      // would be cleaned up by effect's previous run's cleanup.
      return;
    }

    if (currentStoreTheme === "dark") {
      logger("Setting resolvedTheme to dark");
      setResolvedTheme("dark");
      // No listener to manage for 'dark' theme.
      return;
    }

    // --- Theme is "system" ---
    // This block will only be fully effective on the client.
    if (!IS_CLIENT) {
      // On the server, if theme is "system", we've already set a default resolvedTheme.
      // No listener can be attached.
      logger(
        "Theme is system (SSR context or pre-hydration), no listener setup.",
      );
      return;
    }

    logger("Theme is system. Setting up media query listener.");
    const darkModeMediaQuery = window.matchMedia(
      "(prefers-color-scheme: dark)",
    );

    // Define the handler for media query changes
    const handleMediaQueryChange = (e: MediaQueryListEvent) => {
      logger(
        "Media query changed (system mode):",
        e.matches ? "dark" : "light",
      );
      setResolvedTheme(e.matches ? "dark" : "light");
    };

    // Set initial resolved theme based on current system preference
    // (This also ensures it's correct if theme switches TO system)
    setResolvedTheme(darkModeMediaQuery.matches ? "dark" : "light");

    logger("Adding media query listener for system theme.");
    darkModeMediaQuery.addEventListener("change", handleMediaQueryChange);

    // Cleanup function for THIS effect instance (when theme was "system")
    return () => {
      logger("Cleaning up 'system' theme effect. Removing listener.");
      darkModeMediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, [currentStoreTheme]); // Re-run this effect only when the store's theme value changes

  return {
    theme: currentStoreTheme, // The preference ('light', 'dark', 'system')
    resolvedTheme, // The actual theme to apply ('light' or 'dark')
    setTheme: setNanostoreTheme, // The function to change the theme preference in the store
  };
};
