import ProductDetailCreate from "@/features/product-detail/product-detail-create";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_protected-route/_auth/_layout/products/create"
)({
  component: () => (
    <ProductDetailCreate title="Create Product" typePage="create" />
  ),
});
