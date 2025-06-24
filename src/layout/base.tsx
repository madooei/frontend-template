import { useEffect } from "react";
import { useTheme } from "@/hooks/use-theme";
import { TooltipProvider } from "@madooei/shadcn-all-in-one/tooltip";
import { cn } from "@madooei/shadcn-all-in-one/utils";
import { Toaster } from "@madooei/shadcn-all-in-one/sonner";

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
      <Toaster richColors position="bottom-right" theme={resolvedTheme} />
    </TooltipProvider>
  );
};

export default BaseLayout;
