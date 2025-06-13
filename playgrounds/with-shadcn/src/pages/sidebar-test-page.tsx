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
  useSidebar,
  SidebarProvider,
} from "@/components/ui/sidebar";
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
        <Label>
          State: <code>{state}</code>
        </Label>
        <Label>
          Open: <code>{open ? "true" : "false"}</code>
        </Label>
        <Label>
          Open Mobile: <code>{openMobile ? "true" : "false"}</code>
        </Label>
        <Label>
          Is Mobile: <code>{isMobile ? "true" : "false"}</code>
        </Label>
        <Label>
          Window Width: <code>{size.width}</code>
        </Label>
        <Label>
          Window Height: <code>{size.height}</code>
        </Label>
        <div className="text-lg font-bold">Actions</div>
        <Button variant={"outline"} onClick={() => setOpen(!open)}>
          Toggle Sidebar (use setOpen)
        </Button>
        <Button variant={"outline"} onClick={() => setOpenMobile(!openMobile)}>
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
            <SelectItem value="icon">
              <code>Icon</code>
            </SelectItem>
            <SelectItem value="offcanvas">
              <code>Offcanvas</code>
            </SelectItem>
            <SelectItem value="none">
              <code>None</code>
            </SelectItem>
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
            <SelectItem value="sidebar">
              <code>Sidebar</code>
            </SelectItem>
            <SelectItem value="floating">
              <code>Floating</code>
            </SelectItem>
            <SelectItem value="inset">
              <code>Inset</code>
            </SelectItem>
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
            <SelectItem value="left">
              <code>Left</code>
            </SelectItem>
            <SelectItem value="right">
              <code>Right</code>
            </SelectItem>
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
            <SelectItem value="true">
              <code>True</code>
            </SelectItem>
            <SelectItem value="false">
              <code>False</code>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default SidebarTestPage;
