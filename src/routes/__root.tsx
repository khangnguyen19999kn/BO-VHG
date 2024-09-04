import { IAuthContext } from "@/context/auth";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import * as React from "react";
import { Toaster } from "sonner";

interface IRouterContext {
  auth: IAuthContext;
}
export const Route = createRootRouteWithContext<IRouterContext>()({
  component: () => (
    <React.Fragment>
      <Outlet />
      <Toaster />
    </React.Fragment>
  ),
});
