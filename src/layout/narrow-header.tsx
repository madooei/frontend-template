import { cn } from "@/lib/utils";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ThemeToggle } from "@/components/theme-toggle";

const DEBUG = false;

const Header: React.FC = () => {
  return (
    <header
      className={cn("flex items-center justify-between gap-1 w-full py-1", {
        "border-2 border-green-500": DEBUG,
      })}
    >
      <SidebarTrigger />
      <ThemeToggle />
    </header>
  );
};

export default Header;
