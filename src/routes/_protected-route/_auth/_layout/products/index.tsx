import ProductsPage from "@/features/products";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_protected-route/_auth/_layout/products/"
)({
  component: () => <ProductsPage />,
});
