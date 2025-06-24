import * as React from "react";
import SidebarPage from "@/pages/sidebar-page";
import { SidebarProvider } from "@madooei/shadcn-all-in-one/sidebar";

interface WithSidebarLayoutProps {
  children: React.ReactNode;
}

export const WithSidebarLayout: React.FC<WithSidebarLayoutProps> = ({
  children,
}) => {
  return (
    <SidebarProvider>
      <SidebarPage />
      <div className="flex flex-col flex-1">{children}</div>
    </SidebarProvider>
  );
};
