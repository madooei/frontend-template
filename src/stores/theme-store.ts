import { logger } from "@nanostores/logger";
import { persistentAtom } from "@nanostores/persistent";
import type { Theme } from "@/types/theme-types";

const DEBUG = false;

const defaultTheme = "system";
const storageKey = "vite-ui-theme";

export const $theme = persistentAtom<Theme>(storageKey, defaultTheme, {
  encode: JSON.stringify,
  decode: JSON.parse,
});

export function setTheme(newTheme: Theme) {
  $theme.set(newTheme);
}

if (DEBUG) {
  logger({ $theme });
}
