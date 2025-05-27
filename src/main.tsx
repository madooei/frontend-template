import "@/styles/index.css"; // Keep this line at the top so richColors can be used in the Toaster
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "@/components/ui/sonner";
import App from "./App.tsx";

const root = document.getElementById("root");

createRoot(root!).render(
    <StrictMode>
      <App />
      <Toaster richColors position="bottom-right" />
    </StrictMode>
);
