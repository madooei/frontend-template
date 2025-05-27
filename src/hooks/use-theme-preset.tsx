import { useContext } from "react";
import { ThemeContext } from "@/contexts/theme-context";

// Hook to use the theme context
export function useThemePreset() {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
}
