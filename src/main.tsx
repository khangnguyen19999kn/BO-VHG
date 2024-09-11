import { RouterProvider, createRouter } from "@tanstack/react-router";
import React, { useEffect, useMemo } from "react";
import ReactDOM from "react-dom/client";

import { AuthProvider, useAuth } from "@/context/auth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import { routeTree } from "./routeTree.gen";
// Set up a Router instance
const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  context: {
    auth: undefined!,
    queryClient: new QueryClient(),
  },
});

// Register things for typesafety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function InnerApp() {
  const auth = useAuth();
  const routerContext = useMemo(() => {
    return {
      auth,
    };
  }, [auth]);
  useEffect(() => {
    router.invalidate();
  }, [routerContext]);
  return <RouterProvider router={router} context={routerContext} />;
}

function App() {
  return (
    <AuthProvider>
      <InnerApp />
    </AuthProvider>
  );
}

const rootElement = document.getElementById("root")!;
const queryClient = new QueryClient();
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </React.StrictMode>
  );
}
