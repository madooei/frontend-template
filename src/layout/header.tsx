import { ModeToggle } from "@/components/theme-toggle";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/40 backdrop-blur px-4">
      <div className="flex items-center justify-between py-4">
        <a href="/" className="flex items-center gap-x-2.5">
          <p className="font-bold">Frontend Template</p>
        </a>
        <ModeToggle />
      </div>
    </header>
  );
}
