import { useAuth } from "@/context/auth";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/")({
  component: Index,
});
const fallback = "/products" as const;
function Index() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  useEffect(() => {
    console.log(5555, isAuthenticated);
    if (!isAuthenticated) {
      navigate({ to: "/login" });
      return;
    }
    window.location.href = fallback;
  });

  return <div>Hellooooo</div>;
}
