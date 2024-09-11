import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected-route/_auth")({
  beforeLoad: ({ context, location }) => {
    console.log(1111, context.auth.isAuthenticated);
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: "/login",
        search: { redirect: location.href },
      });
    }
  },

  component: () => (
    <div>
      <Outlet />
    </div>
  ),
});
