import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router";
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

function App() {
  const isMobile = useIsMobile();

  return (
    <BaseLayout>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
        <Route element={<ShellLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="messages">
            <Route index element={<Inbox />} />
            <Route path=":messageId" element={<Message />} />
          </Route>
          <Route path="search" element={<Search />} />
          <Route path="toaster" element={<Toaster />} />
        </Route>
        <Route
          path="resizable-shell"
          element={
            <ResizableShellLayout
              leftPanelContent={isMobile ? null : <ScrollAreaDemo />}
              middlePanelContent={<ScrollAreaDemo />}
              rightPanelContent={isMobile ? null : <ScrollAreaDemo />}
            />
          }
        />
      </Routes>
    </BaseLayout>
  );
}

export default App;
