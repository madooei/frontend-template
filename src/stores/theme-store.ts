import { persistentAtom } from "@nanostores/persistent";
import type { ThemeMode } from "@/types/theme-types";

const DEBUG = false;

const defaultTheme = "system";
const storageKey = "vite-ui-theme";

export const $theme = persistentAtom<ThemeMode>(storageKey, defaultTheme, {
  encode: JSON.stringify,
  decode: JSON.parse,
});

export function setTheme(newTheme: ThemeMode) {
  $theme.set(newTheme);
}

if (DEBUG) {
  import("@nanostores/logger").then(({ logger }) => {
    logger({ $theme });
  });
}
