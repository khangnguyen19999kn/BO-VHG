import BlogDetailCreate from "@/features/blogs/blog-detail-create";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_protected-route/_auth/_layout/blogs/create"
)({
  component: () => <BlogDetailCreate />,
});
