import {
  getHeroSectionControllerGetHeroSectionQueryOptions,
  useHeroSectionControllerCreateHeroSection,
} from "@/api/endpoints/hero-section/hero-section";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import {
  THeroSectionManagement,
  heroSectionManagementSchema,
} from "@/features/hero-section/hero-section-management-schema";
import InputMultiImage from "@/features/product-detail/components/input-image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function HeroSectionManagementPage() {
  const { data: dataHeroSection } = useSuspenseQuery(
    getHeroSectionControllerGetHeroSectionQueryOptions()
  );
  const { mutate: createHeroSection } =
    useHeroSectionControllerCreateHeroSection({
      mutation: {
        onSuccess: () => {
          toast.success("Tạo thành công");
        },
        onError: () => {
          toast.error("Có lỗi xảy ra vui lòng thử lại");
        },
      },
    });
  const form = useForm<THeroSectionManagement>({
    resolver: zodResolver(heroSectionManagementSchema),
    defaultValues: {
      images: dataHeroSection?.data,
    },
  });
  const handleSubmitForm = (data: THeroSectionManagement) => {
    createHeroSection({ data: data.images });
  };

  return (
    <div className="w-full h-full">
      <h1 className="text-3xl bold mb-5">
        Chỉnh sửa ảnh slide trong trang chủ
      </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmitForm)}
          className="space-y-8"
        >
          <InputMultiImage
            control={form.control}
            name="images"
            label="Ảnh trang chủ"
            folderName="hero-section"
          />

          <Button type="submit">Lưu</Button>
        </form>
      </Form>
    </div>
  );
}
