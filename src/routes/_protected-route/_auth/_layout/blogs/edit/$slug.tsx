import { getBlogsControllerFindOneQueryOptions } from "@/api/endpoints/blogs/blogs";
import BlogDetailUpdate from "@/features/blogs/blog-detail-update";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_protected-route/_auth/_layout/blogs/edit/$slug"
)({
  loader: ({ context: { queryClient }, params: { slug } }) =>
    queryClient.ensureQueryData(getBlogsControllerFindOneQueryOptions(slug)),
  component: () => <BlogDetailUpdate />,
});
