import { Suspense, lazy } from "react";
import { RouterProvider, createBrowserRouter } from "react-router";
import BaseLayout from "@/layout/base";
import ShellLayout from "@/layout/shell";
import ResizableShellLayout from "@/layout/resizable-shell";
import { useIsMobile } from "@/hooks/use-mobile";

import {
  loader as postsLoader,
  action as postsAction,
} from "@/pages/posts-page";

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
const CardsDemoPage = lazy(() => import("@/pages/cards-demo-page"));
const TypographyPage = lazy(() => import("@/pages/typography-page"));
const SidebarTestPage = lazy(() => import("@/pages/sidebar-test-page"));
const TodosPage = lazy(() => import("@/pages/todos-page"));
const PostsPage = lazy(() => import("@/pages/posts-page"));

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

const CardsDemo = () => (
  <Suspense fallback={<LoadingFallback />}>
    <CardsDemoPage />
  </Suspense>
);

const Typography = () => (
  <Suspense fallback={<LoadingFallback />}>
    <TypographyPage />
  </Suspense>
);

const SidebarTest = () => (
  <Suspense fallback={<LoadingFallback />}>
    <SidebarTestPage />
  </Suspense>
);

const Todos = () => (
  <Suspense fallback={<LoadingFallback />}>
    <TodosPage />
  </Suspense>
);

const Posts = () => (
  <Suspense fallback={<LoadingFallback />}>
    <PostsPage />
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
          {
            path: ":messageId",
            loader: async ({ params }) => {
              // Route loaders provide data to route components before they are rendered
              return {
                message: `Message ${params.messageId} from the loader!`,
              };
            },
            Component: Message,
          },
        ],
      },
      { path: "search", Component: Search },
      { path: "toaster", Component: Toaster },
      { path: "cards-demo", Component: CardsDemo },
      { path: "typography", Component: Typography },
      { path: "todos", Component: Todos },
      {
        path: "posts",
        Component: Posts,
        loader: postsLoader,
        action: postsAction,
        HydrateFallback: () => null,
      },
    ],
  },
  { path: "/resizable-shell", Component: ResizableComponent },
  { path: "/login", Component: Login },
  { path: "/sidebar-test", Component: SidebarTest },
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
