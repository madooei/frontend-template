import { Footer } from "./footer";
import { Header } from "./header";
import SidebarPage from "@/pages/sidebar-page";
import { Outlet } from "react-router";
import BaseLayout from "./base";

export default function ShellLayout() {
  return (
    <BaseLayout>
      <Header />
      <div className="flex flex-grow">
        <SidebarPage />
        <main className="flex-1">
          {/* Outlet is a placeholder for the nested routes */}
          <Outlet />
        </main>
      </div>
      <Footer />
    </BaseLayout>
  );
}
