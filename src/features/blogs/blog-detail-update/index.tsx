import {
  getBlogsControllerFindOneQueryOptions,
  useBlogsControllerUpdate,
} from "@/api/endpoints/blogs/blogs";
import EditorField from "@/components/Editor/editor-field";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import InputImageField from "@/features/blogs/components/input-image-field";
import { TBlogDetail, schemaDetailBlog } from "@/features/blogs/types/schema";
import { Route } from "@/routes/_protected-route/_auth/_layout/blogs/edit/$slug";

import { zodResolver } from "@hookform/resolvers/zod";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function BlogDetailUpdate() {
  const postSlug = Route.useParams().slug;
  const navigate = useNavigate();
  const { data: post } = useSuspenseQuery(
    getBlogsControllerFindOneQueryOptions(postSlug)
  );
  const defaultValues = post?.data;

  const { mutate: updateBlog } = useBlogsControllerUpdate({
    mutation: {
      onSuccess: () => {
        toast.success("Update blog successfully");
        navigate({ to: "/blogs" });
      },
      onError: () => {
        toast.error("Update blog failed");
      },
    },
  });
  const form = useForm<TBlogDetail>({
    resolver: zodResolver(schemaDetailBlog),
    defaultValues,
  });

  const handleSubmit = (data: TBlogDetail) => {
    updateBlog({ slug: postSlug, data });
  };

  return (
    <div className="w-full h-full">
      <h1 className="text-3xl bold mb-5">Cập nhật bài viết</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tiêu đề bài viết</FormLabel>
                <FormControl>
                  <Input placeholder="Nhập tiêu đề bài viết" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <InputImageField
            control={form.control}
            name="coverImage"
            label="Ảnh bìa của bài viết"
          />

          <EditorField
            control={form.control}
            name="content"
            label="Nội dung bài viết"
          />

          <Button type="submit">Lưu</Button>
        </form>
      </Form>
    </div>
  );
}
