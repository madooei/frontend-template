import { ThemeToggle } from "@/components/theme-toggle";
import { SidebarTrigger } from "@madooei/shadcn-all-in-one/sidebar";
import ThemePresetSelector from "@/components/theme-preset-selector";
import { Link } from "react-router";

export function Header() {
  return (
    <header className="border-b bg-background/40 backdrop-blur px-4">
      <div className="flex items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <SidebarTrigger />
          <Link to="/" className="flex items-center gap-x-2.5">
            <p className="font-bold">Frontend Template</p>
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <ThemePresetSelector />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
