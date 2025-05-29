import "@/styles/index.css"; // Keep this line at the top so richColors can be used in the Toaster
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/providers/theme-provider.tsx";
import App from "./App.tsx";

const root = document.getElementById("root");

createRoot(root!).render(
  <StrictMode>
    <ThemeProvider defaultPreset="default-neutral">
      <App />
      <Toaster richColors position="bottom-right" />
    </ThemeProvider>
  </StrictMode>,
);
