import { useBlogsControllerCreate } from "@/api/endpoints/blogs/blogs";
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

import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function BlogDetailCreate() {
  const navigate = useNavigate();
  const { mutate: createBlog } = useBlogsControllerCreate({
    mutation: {
      onSuccess: () => {
        toast.success("Blog được tạo thành công");
        navigate({ to: "/blogs" });
      },
      onError: () => {
        toast.error("Có lỗi xảy ra khi tạo blog");
      },
    },
  });

  const form = useForm<TBlogDetail>({
    resolver: zodResolver(schemaDetailBlog),
    defaultValues: {
      title: "",
      content: "",
      coverImage: {
        url: "",
        public_id: "",
      },
    },
  });

  const handleSubmit = (data: TBlogDetail) => {
    createBlog({ data });
  };

  return (
    <div className="w-full h-full">
      <h1 className="text-3xl bold mb-5">Tạo bài viết mới</h1>
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

          <Button type="submit">Tạo bài viết</Button>
        </form>
      </Form>
    </div>
  );
}
