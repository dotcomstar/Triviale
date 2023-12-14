import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { Analytics } from "@vercel/analytics/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
    <Analytics mode="production" />
  </React.StrictMode>
);
