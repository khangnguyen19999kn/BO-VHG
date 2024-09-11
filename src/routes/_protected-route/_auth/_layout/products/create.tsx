import ProductDetail from "@/features/product-detail";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_protected-route/_auth/_layout/products/create"
)({
  component: () => <ProductDetail title="Create Product" typePage="create" />,
});
