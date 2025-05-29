# How theming works?

This template uses Tailwind CSS for styling and shadcn/ui for components. The theming system has two main features:

1. Light/dark mode toggle
2. Theme presets that modify component styles

## Toggle between light and dark mode

The app supports three theme modes:

- 🌞 Light mode
- 🌙 Dark mode
- 💻 System mode (follows your computer's settings)

To switch themes, use the theme toggle button in the app. The theme preference is saved automatically.

Relevant files:

- `src/types/theme-types.ts` - Defines theme types
- `src/stores/theme-store.ts` - Manages theme state
- `src/hooks/use-theme.tsx` - Hook to use and change themes
- `src/components/theme-toggle.tsx` - The theme toggle button component

## Use a custom theme preset

Theme presets let you customize the look of shadcn/ui components (like buttons, cards, etc.) with different colors and styles. Each preset is a set of CSS variables that define colors, shadows, and other visual properties.

To change the theme preset:

1. Use the theme preset selector in the app
2. Choose from available presets (like default, modern, retro, etc.)

### How Theme Preset Selection Works

When you select a theme preset, here's what happens behind the scenes:

1. **User Interaction**:

   - You click the palette icon (🎨) in the app
   - A popup menu shows all available theme presets
   - You can search themes or use the random theme button (🔄)

2. **Theme Selection Flow**:

   ```
   User clicks theme preset
   ↓
   ThemePresetSelector component calls setPreset()
   ↓
   ThemeProvider updates the theme state
   ↓
   CSS variables are updated in real-time
   ↓
   All components using theme colors update automatically
   ```

3. **Technical Details**:
   - Theme presets are stored in `src/theme/presets/*.ts`
   - Each preset defines colors for both light and dark modes
   - The theme state is managed by `ThemeProvider` and persisted in localStorage
   - Components use CSS variables to access theme colors

Relevant files:

- `src/styles/index.css` - Contains CSS variables for theming
- `src/theme/presets/*.ts` - Different theme preset definitions
- `src/hooks/use-theme-preset.tsx` - Hook to use and change theme presets
- `src/components/theme-preset-selector.tsx` - The theme preset selector component
- `src/providers/theme-provider.tsx` - Manages theme state and updates
- `src/contexts/theme-context.tsx` - Provides theme data to components

## Quick Start for Developers

1. To add a new theme preset:

   - Create a new file in `src/theme/presets/`
   - Define your colors and styles
   - Add it to the presets list in `src/theme/theme-presets.ts`

2. To modify existing themes:

   - Edit the CSS variables in `src/styles/index.css`
   - Update the preset files in `src/theme/presets/`

3. To use theme colors in your components:

   ```tsx
   import { useThemePreset } from "@/hooks/use-theme-preset";

   function MyComponent() {
     const { themeState } = useThemePreset();
     // themeState.styles contains current theme colors
     return <div style={{ color: themeState.styles.primary }}>Hello</div>;
   }
   ```

Remember: Theme changes are applied instantly and saved automatically!

## Technical Deep Dive

### CSS Variables and Runtime Updates

The theming system uses CSS custom properties (variables) to update styles at runtime. Here's what's important to know:

1. **Variable Definition and Application**:

   - Theme variables are defined in `src/styles/index.css`
   - During runtime, `ThemeProvider` updates these variables using `applyThemeToElement`
   - The variables are applied to `:root` element, making them globally available

2. **Color Space Handling**:

   - Theme presets (`src/theme/presets/*.ts`) can use either hex or oklch colors
   - Hex colors (e.g., `"#FF0000"`) are automatically converted to HSL in `src/theme/apply-theme.ts`
   - oklch colors (e.g., `"oklch(0.623 0.214 259.815)"`) are used as-is without conversion
   - oklch is used in some presets (like default-blue) for better color interpolation and accessibility
   - The conversion happens in the `colorToHsl` function which preserves oklch values while converting hex to HSL

3. **Debugging Theme Issues**:

   ```js
   // In browser console:
   getComputedStyle(document.documentElement).getPropertyValue("--primary");
   // Shows current theme variable value

   // To check if variables are properly reset:
   document.documentElement.style.cssText;
   // Should show all current CSS variables
   ```

4. **Common Pitfalls**:

   - If colors don't update: Check if `applyThemeToElement` is called after preset change
   - If colors look wrong: Verify hex to HSL conversion in `apply-theme.ts` or check oklch values
   - If styles persist: Ensure `ThemeProvider` cleanup properly removes old variables

### Theme State Management

The theme system uses a combination of React Context and nanostores for state management:

```tsx
// How theme state flows:
ThemePresetSelector
  → calls setPreset() from ThemeContext
    → updates nanostore ($themePreset)
      → triggers ThemeProvider effect
        → calls applyThemeToElement
          → updates CSS variables
```

Key files for debugging:

- `src/theme/apply-theme.ts` - Handles CSS variable updates
- `src/theme/theme-presets.ts` - Defines preset structure and color conversion
- `src/providers/theme-provider.tsx` - Manages theme state and updates

### Adding New Theme Presets

When creating a new theme preset, you can use either hex or oklch colors:

1. Using hex colors (will be converted to HSL):

   ```ts
   // src/theme/presets/my-theme.ts
   export const myTheme = {
     light: {
       primary: "#FF0000", // Will be converted to HSL
       secondary: "#00FF00", // Will be converted to HSL
       // ...
     },
     dark: {
       // ...
     },
   };
   ```

2. Using oklch colors (used as-is):

   ```ts
   // src/theme/presets/my-theme.ts
   export const myTheme = {
     light: {
       primary: "oklch(0.623 0.214 259.815)", // Used as-is
       secondary: "oklch(0.967 0.001 286.375)", // Used as-is
       // ...
     },
     dark: {
       // ...
     },
   };
   ```

3. The conversion happens in `apply-theme.ts`:

   ```ts
   // Simplified version of what happens
   function applyThemeToElement(themeState, element) {
     const { styles, currentMode } = themeState;
     const modeStyles = styles[currentMode];

     // Convert hex to HSL or use oklch as-is
     Object.entries(modeStyles).forEach(([key, colorValue]) => {
       if (typeof colorValue === "string") {
         const finalValue = colorValue.startsWith("#")
           ? colorToHsl(colorValue) // Convert hex to HSL
           : colorValue; // Use oklch as-is
         element.style.setProperty(`--${key}`, finalValue);
       }
     });
   }
   ```

Remember: The key to debugging theme issues is understanding that:

1. Colors can be stored as either hex (converted to HSL) or oklch (used as-is)
2. CSS variables are the source of truth for current theme
3. Theme changes must trigger `applyThemeToElement`
4. All variables should be properly reset when switching presets
