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
import React, { useRef, useState } from "react";
import { FieldValues, useController } from "react-hook-form";
import { toast } from "sonner";

type TImage = ImagesControllerUploadFile200DataItem;
export default function InputImageField<T extends FieldValues>({
  control,
  name,
  label,
  folderName,
}: IFieldProps<T>) {
  const { field } = useController({
    control,
    name,
  });
  const inputRef = useRef<HTMLInputElement>(null);
  const emptyImage: TImage = {
    url: "",
    public_id: "",
  };
  const defaultImageList: TImage = (field.value as TImage) || emptyImage;
  const [imageDetail, setImageDetail] = useState<TImage>(defaultImageList);
  const { mutate: uploadImage, isPending: isImageUploadPending } =
    useImagesControllerUploadFile({
      mutation: {
        onSuccess: (data) => {
          if (data.data) {
            setImageDetail(data.data[0]);
            field.onChange(data.data[0]);
          }
        },
        onError: () => {
          toast.error("Upload lỗi, vui lòng thử lại");
        },
      },
    });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(1234);
    const files = event.target.files;
    if (!files) return;
    const filesUpload: Blob[] = Array.from(files);
    uploadImage({
      data: {
        files: filesUpload,
        folder: folderName,
      },
    });
  };

  const removeImageInListImage = () => {
    setImageDetail(emptyImage);
    field.onChange(emptyImage);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };
  const { mutate: deleteImage } = useImagesControllerDeleteImage({
    mutation: {
      onSuccess: () => {
        removeImageInListImage();
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
              imageDetail?.public_id &&
              imageDetail?.url && (
                <div key={imageDetail.public_id} className="relative">
                  <img
                    key={imageDetail.public_id}
                    src={imageDetail.url}
                    className="w-32"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(imageDetail.public_id)}
                    className="absolute top-1 right-1 bg-red-600 rounded-xl group hover:bg-red-200"
                  >
                    <X className="text-white group-hover:text-red-600" />
                  </button>
                </div>
              )
            )}
            <label
              htmlFor="upload-image"
              className="w-14 h-14 bg-blue-500 rounded-full flex justify-center items-center cursor-pointer"
            >
              <Plus className="text-white" />
              <input
                id="upload-image"
                type="file"
                className="hidden"
                onChange={handleInputChange}
                ref={inputRef}
              />
            </label>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
