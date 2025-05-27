import { Suspense, lazy } from "react";
import { RouterProvider, createBrowserRouter } from "react-router";
import BaseLayout from "@/layout/base";
import ShellLayout from "@/layout/shell";
import ResizableShellLayout from "@/layout/resizable-shell";
import { useIsMobile } from "@/hooks/use-mobile";

// Lazy load all page components
const HomePage = lazy(() => import("@/pages/home-page"));
const AboutPage = lazy(() => import("@/pages/about-page"));
const LoginPage = lazy(() => import("@/pages/login-page"));
const NotFoundPage = lazy(() => import("@/pages/not-found-page"));
const LoadingPage = lazy(() => import("@/pages/loading-page"));
const MessagePage = lazy(() => import("@/pages/message-page"));
const InboxPage = lazy(() => import("@/pages/inbox-page"));
const SearchPage = lazy(() => import("@/pages/search-page"));
const ToasterPage = lazy(() => import("@/pages/toaster-page"));
const ScrollAreaDemoPage = lazy(() => import("@/pages/scroll-area-demo"));

// Loading component for Suspense fallback
const LoadingFallback = ({ className }: { className?: string }) => (
  <LoadingPage className={className} />
);

// Wrappers for lazy loading
const Home = () => (
  <Suspense fallback={<LoadingFallback />}>
    <HomePage />
  </Suspense>
);

const About = () => (
  <Suspense fallback={<LoadingFallback />}>
    <AboutPage />
  </Suspense>
);

const Login = () => (
  <Suspense fallback={<LoadingFallback className="min-h-screen" />}>
    <LoginPage />
  </Suspense>
);

const NotFound = () => (
  <Suspense fallback={<LoadingFallback className="min-h-screen" />}>
    <NotFoundPage />
  </Suspense>
);

const Message = () => (
  <Suspense fallback={<LoadingFallback />}>
    <MessagePage />
  </Suspense>
);

const Inbox = () => (
  <Suspense fallback={<LoadingFallback />}>
    <InboxPage />
  </Suspense>
);

const Search = () => (
  <Suspense fallback={<LoadingFallback />}>
    <SearchPage />
  </Suspense>
);

const Toaster = () => (
  <Suspense fallback={<LoadingFallback />}>
    <ToasterPage />
  </Suspense>
);

const ScrollAreaDemo = () => (
  <Suspense fallback={<LoadingFallback />}>
    <ScrollAreaDemoPage />
  </Suspense>
);

const ResizableComponent = () => {
  const isMobile = useIsMobile();

  return (
    <ResizableShellLayout
      leftPanelContent={isMobile ? null : <ScrollAreaDemo />}
      middlePanelContent={<ScrollAreaDemo />}
      rightPanelContent={isMobile ? null : <ScrollAreaDemo />}
    />
  );
};

const router = createBrowserRouter([
  {
    Component: ShellLayout,
    children: [
      { index: true, Component: Home },
      { path: "about", Component: About },
      {
        path: "messages",
        children: [
          { index: true, Component: Inbox },
          { path: ":messageId", Component: Message },
        ],
      },
      { path: "search", Component: Search },
      { path: "toaster", Component: Toaster },
    ],
  },
  { path: "/resizable-shell", Component: ResizableComponent },
  { path: "/login", Component: Login },
  { path: "*", Component: NotFound },
]);

function App() {
  return (
    <BaseLayout>
      <RouterProvider router={router} />
    </BaseLayout>
  );
}

export default App;
