import CreateUserPage from "@/features/users/create-user";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_protected-route/_auth/_layout/users/create"
)({
  component: () => <CreateUserPage />,
});
