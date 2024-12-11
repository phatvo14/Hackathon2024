import { Toaster } from "@/components/ui/sonner";
import { router } from "@/routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";

const queryClient = new QueryClient();
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster theme="light" richColors position="bottom-right" />
    </QueryClientProvider>
  );
};

export default App;
