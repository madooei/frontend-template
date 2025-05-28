import { Icons } from "@/components/icons";

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="w-full flex justify-center">
        <div className="w-full max-w-7xl px-6 sm:px-8 md:px-12 py-8 md:py-12">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
            <div className="flex flex-col items-center md:items-start space-y-4 md:space-y-2">
              <a href="/" className="flex items-center space-x-2">
                <span className="text-lg font-bold">Frontend Template</span>
              </a>
              <p className="text-sm text-muted-foreground text-center md:text-left max-w-xs">
                A template for building a frontend application with React,
                TypeScript, Tailwind CSS, and Shadcn UI.
              </p>
            </div>
            <div className="flex flex-col items-center md:items-end space-y-4">
              <div className="flex space-x-4">
                <a
                  href="https://github.com/madooei/frontend-template"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Icons.gitHub className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </a>
              </div>
              <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} Madooei. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
