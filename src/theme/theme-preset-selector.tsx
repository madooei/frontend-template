import React, { useCallback, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  // ChevronDown,
  Moon,
  PaletteIcon,
  Search,
  Shuffle,
  Sun,
} from "lucide-react";

import { useThemePreset } from "./use-theme-preset";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import type { ThemeMode } from "./theme-types";
import { TooltipButton } from "@/components/tooltip-button";

interface ThemePresetSelectorProps extends React.ComponentProps<typeof Button> {
  withCycleThemes?: boolean;
}

interface ColorBoxProps {
  color: string;
}

// Simple color box component to display theme colors
const ColorBox: React.FC<ColorBoxProps> = ({ color }) => (
  <div
    className="border-muted h-3 w-3 rounded-sm border"
    style={{ backgroundColor: color }}
  />
);

interface ThemeColorsProps {
  presetName: string;
  mode: ThemeMode;
}

// Component to display a row of theme colors
const ThemeColors: React.FC<ThemeColorsProps> = ({ presetName, mode }) => {
  const { themeState, presets } = useThemePreset();
  const styles = presets[presetName]?.styles[mode] || themeState.styles[mode];

  return (
    <div className="flex gap-0.5">
      <ColorBox color={styles.primary} />
      <ColorBox color={styles.accent} />
      <ColorBox color={styles.secondary} />
      <ColorBox color={styles.border} />
    </div>
  );
};

// Check if a theme is new (created in the last 5 days)
const isThemeNew = (createdAt?: string) => {
  if (!createdAt) return false;
  const createdDate = new Date(createdAt);
  const timePeriod = new Date();
  timePeriod.setDate(timePeriod.getDate() - 5);
  return createdDate > timePeriod;
};

// Theme controls component (theme toggle and random button)
const ThemeControls = () => {
  const { theme, toggleTheme, presets, setPreset } = useThemePreset();

  // Get all preset keys
  const presetNames = useMemo(() => Object.keys(presets), [presets]);

  const randomize = useCallback(() => {
    const random = Math.floor(Math.random() * presetNames.length);
    setPreset(presetNames[random]);
  }, [presetNames, setPreset]);

  const handleThemeToggle = (event: React.MouseEvent<HTMLButtonElement>) => {
    const { clientX: x, clientY: y } = event;
    toggleTheme({ x, y });
  };

  return (
    <div className="flex gap-1">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="h-7 w-7 p-0"
            onClick={handleThemeToggle}
          >
            {theme === "light" ? (
              <Sun className="h-3.5 w-3.5" />
            ) : (
              <Moon className="h-3.5 w-3.5" />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p className="text-xs">Toggle theme</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="h-7 w-7 p-0"
            onClick={randomize}
          >
            <Shuffle className="h-3.5 w-3.5" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p className="text-xs">Random theme</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
};

interface ThemeCycleButtonProps extends React.ComponentProps<typeof Button> {
  direction: "prev" | "next";
}

// Button to cycle through themes
const ThemeCycleButton: React.FC<ThemeCycleButtonProps> = ({
  direction,
  onClick,
  className,
  ...props
}) => (
  <Tooltip>
    <TooltipTrigger asChild>
      <Button
        variant="ghost"
        size="icon"
        className={cn("aspect-square h-full shrink-0", className)}
        onClick={onClick}
        {...props}
      >
        {direction === "prev" ? (
          <ArrowLeft className="h-4 w-4" />
        ) : (
          <ArrowRight className="h-4 w-4" />
        )}
      </Button>
    </TooltipTrigger>
    <TooltipContent>
      {direction === "prev" ? "Previous theme" : "Next theme"}
    </TooltipContent>
  </Tooltip>
);

interface ThemePresetCycleControlsProps
  extends React.ComponentProps<typeof Button> {
  filteredPresets: string[];
  currentPresetName: string;
  className?: string;
}

// Controls for cycling through themes
const ThemePresetCycleControls: React.FC<ThemePresetCycleControlsProps> = ({
  filteredPresets,
  currentPresetName,
  className,
  ...props
}) => {
  const { setPreset } = useThemePreset();

  // Find current index
  const currentIndex = useMemo(() => {
    const index = filteredPresets.indexOf(currentPresetName);
    return index >= 0 ? index : 0;
  }, [filteredPresets, currentPresetName]);

  const cycleTheme = useCallback(
    (direction: "prev" | "next") => {
      const newIndex =
        direction === "next"
          ? (currentIndex + 1) % filteredPresets.length
          : (currentIndex - 1 + filteredPresets.length) %
            filteredPresets.length;
      setPreset(filteredPresets[newIndex]);
    },
    [currentIndex, filteredPresets, setPreset],
  );

  return (
    <>
      <Separator orientation="vertical" className="min-h-8" />

      <ThemeCycleButton
        direction="prev"
        size="icon"
        className={cn("aspect-square min-h-8 w-auto", className)}
        onClick={() => cycleTheme("prev")}
        {...props}
      />

      <Separator orientation="vertical" className="min-h-8" />

      <ThemeCycleButton
        direction="next"
        size="icon"
        className={cn("aspect-square min-h-8 w-auto", className)}
        onClick={() => cycleTheme("next")}
        {...props}
      />
    </>
  );
};

// Main theme preset selector component
const ThemePresetSelector: React.FC<ThemePresetSelectorProps> = ({
  withCycleThemes = false,
  className,
  ...props
}) => {
  const { theme, preset, setPreset, presets } = useThemePreset();
  const currentPreset = preset;
  const mode = theme;

  const [search, setSearch] = useState("");

  // Get all preset names directly from the presets object
  const presetNames = useMemo(() => Object.keys(presets), [presets]);

  // Filter presets based on search query
  const filteredPresets = useMemo(() => {
    const filteredList =
      search.trim() === ""
        ? presetNames
        : Object.entries(presets)
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            .filter(([_, preset]) =>
              preset.label?.toLowerCase().includes(search.toLowerCase()),
            )
            .map(([name]) => name);

    // Sort themes alphabetically
    return filteredList.sort((a, b) => {
      const labelA = presets[a]?.label || a;
      const labelB = presets[b]?.label || b;
      return labelA.localeCompare(labelB);
    });
  }, [presetNames, search, presets]);

  return (
    <div className="flex w-full items-center">
      <Popover>
        <PopoverTrigger asChild>
          <TooltipButton
            variant="ghost"
            size="icon"
            className="w-7 h-7 flex-shrink-0"
            tooltipContent="Toggle theme preset"
            {...props}
          >
            <PaletteIcon />
          </TooltipButton>
          {/* 
          <Button
            variant="ghost"
            className={cn("group relative w-full justify-between md:min-w-56", className)}
            {...props}
          >
            <div className="flex w-full items-center gap-3 overflow-hidden">
              <div className="flex gap-0.5">
                <ColorBox color={presets[currentPreset]?.styles[mode].primary || "#000"} />
                <ColorBox color={presets[currentPreset]?.styles[mode].accent || "#000"} />
                <ColorBox color={presets[currentPreset]?.styles[mode].secondary || "#000"} />
                <ColorBox color={presets[currentPreset]?.styles[mode].border || "#000"} />
              </div>
              <span className="truncate text-left font-medium capitalize">
                {presets[currentPreset]?.label || currentPreset}
              </span>
            </div>
            <ChevronDown className="size-4 shrink-0" />
          </Button> 
          */}
        </PopoverTrigger>
        <PopoverContent className="w-[300px] p-0" align="center">
          <Command className="h-100 w-full rounded-lg border shadow-md">
            <div className="flex w-full items-center">
              <div className="flex w-full items-center border-b px-3 py-1">
                <Search className="size-4 shrink-0 opacity-50" />
                <Input
                  placeholder="Search themes..."
                  className="border-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
            <div className="flex items-center justify-between px-4 py-2">
              <div className="text-muted-foreground text-xs">
                {filteredPresets.length} theme
                {filteredPresets.length !== 1 ? "s" : ""}
              </div>
              <ThemeControls />
            </div>
            <Separator />
            <ScrollArea className="h-[500px] max-h-[70vh]">
              <CommandEmpty>No themes found.</CommandEmpty>

              {/* Themes List */}
              <CommandGroup heading="Themes">
                {filteredPresets.map((presetName, index) => (
                  <CommandItem
                    key={`${presetName}-${index}`}
                    value={`${presetName}-${index}`}
                    onSelect={() => {
                      setPreset(presetName);
                      setSearch("");
                    }}
                    className="data-[highlighted]:bg-secondary/50 flex items-center gap-2 py-2"
                  >
                    <ThemeColors presetName={presetName} mode={mode} />
                    <div className="flex flex-1 items-center gap-2">
                      <span className="text-sm font-medium capitalize">
                        {presets[presetName]?.label || presetName}
                      </span>
                      {presets[presetName]?.createdAt &&
                        isThemeNew(presets[presetName]?.createdAt) && (
                          <Badge
                            variant="secondary"
                            className="rounded-full text-xs"
                          >
                            New
                          </Badge>
                        )}
                    </div>
                    {presetName === currentPreset && (
                      <Check className="h-4 w-4 shrink-0 opacity-70" />
                    )}
                  </CommandItem>
                ))}
              </CommandGroup>
            </ScrollArea>
          </Command>
        </PopoverContent>
      </Popover>

      {withCycleThemes && filteredPresets.length > 1 && (
        <ThemePresetCycleControls
          filteredPresets={filteredPresets}
          currentPresetName={currentPreset}
          className={className}
        />
      )}
    </div>
  );
};

export default ThemePresetSelector;
