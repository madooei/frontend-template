import { useEffect } from "react";
import { useTheme } from "@/hooks/use-theme";

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

  return <div className="flex flex-col min-h-screen">{children}</div>;
};

export default BaseLayout;
