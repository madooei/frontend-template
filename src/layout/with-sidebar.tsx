import * as React from "react";
import SidebarPage from "@/pages/sidebar-page";
import BaseLayout from "./base";
import { SidebarProvider } from "@/providers/sidebar-provider";

interface WithSidebarLayoutProps {
  children: React.ReactNode;
}

export const WithSidebarLayout: React.FC<WithSidebarLayoutProps> = ({
  children,
}) => {
  return (
    <BaseLayout>
      <SidebarProvider>
        <SidebarPage />
        <div className="flex flex-col flex-1">{children}</div>
      </SidebarProvider>
    </BaseLayout>
  );
};
