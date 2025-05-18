import { GitHubLogo } from "@/components/logos/github-logo";
import { cn } from "@/lib/utils";

const DEBUG = false;

const Footer: React.FC = () => {
  return (
    <footer
      className={cn("w-full flex justify-between items-center p-2 border-t", {
        "border-2 border-yellow-500": DEBUG,
      })}
    >
      <p className="text-sm text-muted-foreground">
        © {new Date().getFullYear()} Madooei. All rights reserved.
      </p>
      <a
        href="https://github.com/madooei/frontend-template"
        target="_blank"
        rel="noopener noreferrer"
        className="text-muted-foreground hover:text-foreground transition-colors"
      >
        <GitHubLogo className="h-4 w-4" />
        <span className="sr-only">GitHub</span>
      </a>
    </footer>
  );
};

export default Footer;
