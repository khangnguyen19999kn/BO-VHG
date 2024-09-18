import UsersManagement from "@/features/users";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected-route/_auth/_layout/users/")({
  component: () => <UsersManagement />,
});
