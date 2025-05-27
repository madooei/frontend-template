import "@/styles/index.css"; // Keep this line at the top so richColors can be used in the Toaster
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "@/components/ui/sonner";
import App from "./App.tsx";
import { ThemeProvider } from "./theme/theme-provider.tsx";

const root = document.getElementById("root");

createRoot(root!).render(
  <StrictMode>
    <ThemeProvider>
      <App />
      <Toaster richColors position="bottom-right" />
    </ThemeProvider>
  </StrictMode>,
);
