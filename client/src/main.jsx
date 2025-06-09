import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { routeTree } from "./routeTree.gen";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import './styles/app.css';
import './styles/statusboard.css';


// 🔧 Maak een nieuwe router aan op basis van de gegenereerde routeTree
const router = createRouter({ routeTree });

// 🔧 Setup voor React Query
const queryClient = new QueryClient();

// 🧠 Mount de app
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
);
