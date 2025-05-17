import { useEffect } from "react";
import { useTheme } from "@/hooks/use-theme";
import { TooltipProvider } from "@/providers/tooltip-provider";
import { cn } from "@/lib/utils";

const DEBUG = false;

interface BaseLayoutProps {
  children: React.ReactNode;
}

const BaseLayout: React.FC<BaseLayoutProps> = ({ children }) => {
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(resolvedTheme);
  }, [resolvedTheme]);

  return (
    <TooltipProvider>
      <div
        className={cn("flex min-h-screen w-full antialiased scroll-smooth", {
          "bg-red-500": DEBUG,
        })}
      >
        {children}
      </div>
    </TooltipProvider>
  );
};

export default BaseLayout;
