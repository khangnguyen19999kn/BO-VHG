import { IAuthContext } from "@/context/auth";
import { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import * as React from "react";
import { Toaster } from "sonner";

interface IRouterContext {
  auth: IAuthContext;
  queryClient: QueryClient;
}
export const Route = createRootRouteWithContext<IRouterContext>()({
  component: () => (
    <React.Fragment>
      <Outlet />
      <Toaster />
    </React.Fragment>
  ),
});
