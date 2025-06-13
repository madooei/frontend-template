import { ItemsPage } from "./pages/items-page";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ItemsPage />
    </QueryClientProvider>
  );
}

export default App;
