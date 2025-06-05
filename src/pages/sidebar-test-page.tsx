import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
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
} from "@/components/ui/sidebar";
import { useSidebar } from "@/hooks/use-sidebar";
import { SidebarProvider } from "@/providers/sidebar-provider";
import { useState } from "react";
import { useWindowSize } from "@uidotdev/usehooks";
import { HomeIcon, LogOutIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SidebarTestPage = () => {
  return (
    <SidebarProvider>
      <SidebarTest />
    </SidebarProvider>
  );
};

const SidebarTest = () => {
  const [collapsible, setCollapsible] = useState<"offcanvas" | "icon" | "none">(
    "offcanvas",
  );
  const [variant, setVariant] = useState<"sidebar" | "floating" | "inset">(
    "sidebar",
  );
  const [side, setSide] = useState<"left" | "right">("left");
  const [withRail, setWithRail] = useState(true);

  const size = useWindowSize();
  const {
    state,
    open,
    setOpen,
    openMobile,
    setOpenMobile,
    isMobile,
    toggleSidebar,
  } = useSidebar();

  return (
    <div className="flex">
      <SidebarRoot side={side} variant={variant} collapsible={collapsible}>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Sidebar Test</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <HomeIcon />
                    Home
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenuButton>
            <LogOutIcon />
            Logout
          </SidebarMenuButton>
        </SidebarFooter>
        {withRail && <SidebarRail />}
      </SidebarRoot>
      <div className="flex flex-col gap-2 p-4">
        <div className="text-lg font-bold">Information</div>
        <Label>State: {state}</Label>
        <Label>Open: {open ? "true" : "false"}</Label>
        <Label>Open Mobile: {openMobile ? "true" : "false"}</Label>
        <Label>Is Mobile: {isMobile ? "true" : "false"}</Label>
        <Label>Window Width: {size.width}</Label>
        <Label>Window Height: {size.height}</Label>
        <div className="text-lg font-bold">Actions</div>
        <Button onClick={() => setOpen(!open)}>
          Toggle Sidebar (use setOpen)
        </Button>
        <Button onClick={() => setOpenMobile(!openMobile)}>
          Toggle Mobile Sidebar (use setOpenMobile)
        </Button>
        <Button onClick={() => toggleSidebar()}>
          Toggle Sidebar (use toggleSidebar)
        </Button>
        <div className="text-lg font-bold">Sidebar Settings</div>
        <Label>Collapsible</Label>
        <Select
          value={collapsible}
          onValueChange={(value) =>
            setCollapsible(value as "offcanvas" | "icon" | "none")
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a collapsible" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="icon">Icon</SelectItem>
            <SelectItem value="offcanvas">Offcanvas</SelectItem>
            <SelectItem value="none">None</SelectItem>
          </SelectContent>
        </Select>
        <Label>Variant</Label>
        <Select
          value={variant}
          onValueChange={(value) =>
            setVariant(value as "sidebar" | "floating" | "inset")
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a variant" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="sidebar">Sidebar</SelectItem>
            <SelectItem value="floating">Floating</SelectItem>
            <SelectItem value="inset">Inset</SelectItem>
          </SelectContent>
        </Select>
        <Label>Side</Label>
        <Select
          value={side}
          onValueChange={(value) => setSide(value as "left" | "right")}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a side" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="left">Left</SelectItem>
            <SelectItem value="right">Right</SelectItem>
          </SelectContent>
        </Select>
        <Label>With Rail</Label>
        <Select
          value={withRail ? "true" : "false"}
          onValueChange={(value) => setWithRail(value === "true")}
        >
          <SelectTrigger>
            <SelectValue placeholder="Show Rail" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="true">True</SelectItem>
            <SelectItem value="false">False</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default SidebarTestPage;
