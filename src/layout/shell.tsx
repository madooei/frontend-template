import { Footer } from "./footer";
import { Header } from "./header";
import { Outlet } from "react-router";
import { WithSidebarLayout } from "./with-sidebar";

export default function ShellLayout() {
  return (
    <WithSidebarLayout>
      <Header />
      <div className="flex flex-grow">
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
      <Footer />
    </WithSidebarLayout>
  );
}
