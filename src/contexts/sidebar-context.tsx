import { createContext } from "react";
import type { SidebarContextProps } from "@/types/sidebar-types";

export const SidebarContext = createContext<SidebarContextProps | null>(null);
