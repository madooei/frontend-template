import {
  ResizablePanelGroup,
  ResizableHandle,
  ResizablePanel,
} from "@/components/ui/resizable";
import Header from "./narrow-header";
import Footer from "./narrow-footer";
import { cn } from "@/lib/utils";
import { WithSidebarLayout } from "./with-sidebar";

const DEBUG = false;

interface ResizableShellLayoutProps {
  header?: React.ReactNode;
  footer?: React.ReactNode;
  leftPanelContent: React.ReactNode;
  middlePanelContent: React.ReactNode;
  rightPanelContent: React.ReactNode;
}

const ResizableShellLayout: React.FC<ResizableShellLayoutProps> = ({
  header,
  footer,
  leftPanelContent,
  middlePanelContent,
  rightPanelContent,
}) => {
  return (
    <WithSidebarLayout>
      <ResizablePanelGroup
        autoSaveId="layout-vertical"
        direction="vertical"
        className={cn({
          "border-2 border-red-500": DEBUG,
        })}
      >
        <ResizablePanel
          className={cn({
            "border-2 border-blue-500": DEBUG,
          })}
          minSize={5}
          order={1}
          collapsedSize={0}
          collapsible={true}
          id="top-panel"
        >
          {header || <Header />}
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel
          order={2}
          minSize={50}
          collapsible={false}
          id="main-panel"
          className={cn({
            "border-2 border-pink-500 ": DEBUG,
          })}
        >
          <ResizablePanelGroup
            autoSaveId="layout-horizontal"
            direction="horizontal"
            className={cn("flex-grow", {
              "border-2 border-pink-500 ": DEBUG,
            })}
          >
            {leftPanelContent && (
              <ResizablePanel
                className={cn({
                  "border-2 border-blue-500": DEBUG,
                })}
                minSize={30}
                order={1}
                collapsedSize={0}
                collapsible={true}
                id="left-panel"
              >
                {leftPanelContent}
              </ResizablePanel>
            )}
            {leftPanelContent && (middlePanelContent || rightPanelContent) && (
              <ResizableHandle withHandle />
            )}
            {middlePanelContent && (
              <ResizablePanel
                minSize={30}
                className={cn({
                  "border-2 border-green-500": DEBUG,
                })}
                order={2}
                id="middle-panel"
              >
                {middlePanelContent}
              </ResizablePanel>
            )}
            {(leftPanelContent || middlePanelContent) && rightPanelContent && (
              <ResizableHandle withHandle />
            )}
            {rightPanelContent && (
              <ResizablePanel
                minSize={30}
                className={cn({
                  "border-2 border-yellow-500": DEBUG,
                })}
                order={3}
                collapsedSize={0}
                collapsible={true}
                id="right-panel"
              >
                {rightPanelContent}
              </ResizablePanel>
            )}
          </ResizablePanelGroup>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel
          minSize={5}
          className={cn({
            "border-2 border-yellow-500": DEBUG,
          })}
          order={3}
          collapsedSize={0}
          collapsible={true}
          id="bottom-panel"
        >
          {footer || <Footer />}
        </ResizablePanel>
      </ResizablePanelGroup>
    </WithSidebarLayout>
  );
};

export default ResizableShellLayout;
