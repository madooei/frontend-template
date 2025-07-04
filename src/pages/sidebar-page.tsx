import { cn } from "@madooei/shadcn-all-in-one/utils";
import { NavLink } from "react-router";

import {
  Sidebar as SidebarRoot,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarRail,
} from "@madooei/shadcn-all-in-one/sidebar";
import {
  ALargeSmallIcon,
  BellIcon,
  Grid2X2Icon,
  HomeIcon,
  InboxIcon,
  InfoIcon,
  ListIcon,
  LogOutIcon,
  MessageCircleCodeIcon,
  SearchIcon,
  NotebookIcon,
  NotebookPenIcon,
} from "lucide-react";
import { Icons } from "@/components/icons";

const pages = [
  {
    path: "/",
    label: "Home",
    icon: HomeIcon,
  },
  {
    path: "/about",
    label: "About",
    icon: InfoIcon,
  },
  {
    path: "/messages",
    label: "Inbox",
    icon: InboxIcon,
  },
  {
    path: "/search",
    label: "Search",
    icon: SearchIcon,
  },
  {
    path: "/toaster",
    label: "Toaster",
    icon: BellIcon,
  },
  {
    path: "/resizable-shell",
    label: "Resizable Shell",
    icon: Grid2X2Icon,
  },
  {
    path: "/cards-demo",
    label: "Cards Demo",
    icon: Icons.logo,
  },
  {
    path: "/typography",
    label: "Typography",
    icon: ALargeSmallIcon,
  },
  {
    path: "/todos",
    label: "Todos",
    icon: ListIcon,
  },
  {
    path: "/posts",
    label: "Posts",
    icon: MessageCircleCodeIcon,
  },
  {
    path: "/notes",
    label: "Notes",
    icon: NotebookIcon,
  },
  {
    path: "/notes/new",
    label: "Add Note",
    icon: NotebookPenIcon,
  },
];

const SidebarPage: React.FC = () => {
  return (
    <SidebarRoot>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Frontend Template</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {pages.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.path}
                      className={({ isActive }) =>
                        cn(
                          "flex items-center gap-2",
                          isActive && "text-primary",
                        )
                      }
                    >
                      <item.icon />
                      {item.label}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenuButton asChild>
          <NavLink to="/login">
            <LogOutIcon />
            Logout
          </NavLink>
        </SidebarMenuButton>
      </SidebarFooter>
      <SidebarRail />
    </SidebarRoot>
  );
};

export default SidebarPage;
