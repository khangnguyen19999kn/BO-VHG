import {
  useImagesControllerDeleteImage,
  useImagesControllerUploadFile,
} from "@/api/endpoints/images/images";
import { ImagesControllerUploadFile200DataItem } from "@/api/model";
import LoadingSpin from "@/components/loading-spin";
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { IFieldProps } from "@/features/product-detail/types";
import { Plus, X } from "lucide-react";
import { useEffect, useState } from "react";
import { FieldValues, useController } from "react-hook-form";
import { toast } from "sonner";

type TImage = ImagesControllerUploadFile200DataItem;
export default function InputMultiImage<T extends FieldValues>({
  control,
  name,
  label,
  folderName,
}: IFieldProps<T>) {
  const { field } = useController({
    control,
    name,
  });

  const [imageList, setImageList] = useState<TImage[]>([]);
  useEffect(() => {
    if (field.value) {
      setImageList(field.value);
    }
  }, [field.value]);
  const { mutate: uploadImages, isPending: isImageUploadPending } =
    useImagesControllerUploadFile({
      mutation: {
        onSuccess: (data) => {
          if (data.data) {
            const newImages = [...imageList, ...data.data];
            setImageList(newImages);
            field.onChange(newImages);
          }
        },
        onError: () => {
          toast.error("Upload lỗi, vui lòng thử lại");
        },
      },
    });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;
    const filesUpload: Blob[] = Array.from(files);
    if (files.length + imageList.length > 5) {
      toast.warning("Chỉ có thể upload tối đa 5 ảnh");
      return;
    }
    uploadImages({
      data: {
        files: filesUpload,
        folder: folderName,
      },
    });
  };

  const removeImageInListImage = (public_id: string) => {
    const imagesUpdate = imageList.filter(
      (item) => item.public_id !== public_id
    );
    setImageList(imagesUpdate);
    field.onChange(imagesUpdate);
  };
  const { mutate: deleteImage } = useImagesControllerDeleteImage({
    mutation: {
      onSuccess: (_, { data }) => {
        const public_id = data.public_id || "";
        removeImageInListImage(public_id);
        toast.success("Xóa ảnh thành công");
      },
      onError: () => {
        toast.error("Xóa ảnh thất bại vui lòng thử lại");
      },
    },
  });
  const handleRemoveImage = (public_id?: string) => {
    if (!public_id) return;
    deleteImage({
      data: {
        public_id: public_id,
      },
    });
  };
  return (
    <FormField
      control={control}
      name={name}
      render={() => (
        <FormItem className="flex flex-col">
          <FormLabel>{label}</FormLabel>

          <div className="flex gap-5 items-center w-full min-h-32">
            {isImageUploadPending ? (
              <LoadingSpin />
            ) : (
              imageList.map((item) => (
                <div key={item.public_id} className="relative">
                  <img
                    key={item.public_id}
                    src={item.url}
                    className="w-32 h-40"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(item.public_id)}
                    className="absolute top-1 right-1 bg-red-600 rounded-xl group hover:bg-red-200"
                  >
                    <X className="text-white group-hover:text-red-600" />
                  </button>
                </div>
              ))
            )}
            <div className="w-14 h-14 bg-blue-500 rounded-full flex justify-center items-center ">
              <label htmlFor="upload-image" className="cursor-pointer">
                <Plus className="text-white" />
                <input
                  id="upload-image"
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                  onChange={handleInputChange}
                />
              </label>
            </div>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
