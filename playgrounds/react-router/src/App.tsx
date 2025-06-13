import * as ItemsPage from "./pages/items-page";
import { createBrowserRouter, Link, RouterProvider } from "react-router";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        Visit <Link to={"/items"}>Items Page</Link>
      </div>
    ),
  },
  {
    path: "/items",
    Component: ItemsPage.Component,
    action: ItemsPage.action,
    loader: ItemsPage.loader,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
