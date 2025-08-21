import {
  QueryClient,
  QueryClientProvider,
  QueryCache,
  MutationCache,
} from "@tanstack/react-query";
import App from "./App.jsx";
import { useGlobalErrorHandler } from "@/hooks/useGlobalError";

export default function AppWrapper() {
  const { handleError } = useGlobalErrorHandler();

  const qc = new QueryClient({
    queryCache: new QueryCache({
      onError: handleError,
    }),
    mutationCache: new MutationCache({
      onError: handleError,
    }),
  });

  return (
    <QueryClientProvider client={qc}>
      <App />
    </QueryClientProvider>
  );
}
