import { useTheme } from "@/hooks/use-theme";
import { TooltipProvider } from "@madooei/shadcn-all-in-one/tooltip";
import { cn } from "@madooei/shadcn-all-in-one/utils";
import { Toaster } from "@madooei/shadcn-all-in-one/sonner";
import { ThemePresetProvider } from "@madooei/shadcn-theme-presets";

const DEBUG = false;

interface BaseLayoutProps {
  children: React.ReactNode;
}

const BaseLayout: React.FC<BaseLayoutProps> = ({ children }) => {
  const { resolvedTheme } = useTheme();

  return (
    <ThemePresetProvider
      isDark={resolvedTheme === "dark"}
      defaultPreset="default-neutral"
    >
      <TooltipProvider>
        <div
          className={cn("flex min-h-screen w-full antialiased scroll-smooth", {
            "bg-red-500": DEBUG,
          })}
        >
          {children}
        </div>
        <Toaster richColors position="bottom-right" theme={resolvedTheme} />
      </TooltipProvider>
    </ThemePresetProvider>
  );
};

export default BaseLayout;
