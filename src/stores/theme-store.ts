import { createThemeStore } from "@madooei/omni-themes";

// Create theme store
export const {
  themes, // Available themes array
  $theme, // Current theme atom
  $resolvedTheme, // Resolved theme atom (handles 'system')
  $systemTheme, // System preference atom
  setTheme, // Function to change theme
} = createThemeStore({});

// Export types for TypeScript usage
export type { ThemeName } from "@madooei/omni-themes";
