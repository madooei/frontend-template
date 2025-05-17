/*
   NavLink is for navigation links that need to render an active state.

   Whenever a NavLink is active, it will automatically have an .active class name for easy styling with CSS:

   .active {
    color: red;
   }

   It also has callback props on className, style, and children with the active state for inline styling or conditional rendering:

   <NavLink
    to="/about"
    className={({ isActive }) => (isActive ? "text-primary" : "text-muted-foreground")}
   >
   </NavLink>
*/
import { NavLink } from "react-router";

const pages = [
  {
    path: "/",
    label: "Home",
  },
  {
    path: "/about",
    label: "About",
  },
  {
    path: "/messages",
    label: "Inbox",
  },
  {
    path: "/search",
    label: "Search",
  },
  {
    path: "/login",
    label: "Logout",
  },
];

const SidebarPage: React.FC = () => {
  return (
    <nav className="w-64 p-8 border-r border-border">
      <h1 className="text-xl">Sidebar</h1>
      <ul>
        {pages.map((page) => (
          <li key={page.path} className="p-2">
            <NavLink
              className={({ isActive }: { isActive: boolean }) =>
                isActive ? "text-primary" : "text-muted-foreground"
              }
              to={page.path}
            >
              {page.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SidebarPage;
