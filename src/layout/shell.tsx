import { Footer } from "./footer";
import { Header } from "./header";
import SidebarPage from "@/pages/sidebar-page";
import { Outlet } from "react-router";
import BaseLayout from "./base";
import { SidebarProvider } from "@/providers/sidebar-provider";

export default function ShellLayout() {
  return (
    <BaseLayout>
      <SidebarProvider>
        <SidebarPage />
        <div className="flex flex-col flex-1">
          <Header />
          <div className="flex flex-grow">
            <main className="flex-1">
              {/* Outlet is a placeholder for the nested routes */}
              <Outlet />
            </main>
          </div>
          <Footer />
        </div>
      </SidebarProvider>
    </BaseLayout>
  );
}
