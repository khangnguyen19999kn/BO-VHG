import BlogsManagement from "@/features/blogs/blogs-management";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected-route/_auth/_layout/blogs/")({
  component: () => <BlogsManagement />,
});
