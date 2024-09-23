import {
  useImagesControllerDeleteImage,
  useImagesControllerUploadFile,
} from "@/api/endpoints/images/images";
import Editor from "@/components/Editor";
import {
  EImageStatusEditor,
  TFileInfo,
  TStateImageUpload,
  TUploadBeforeResponse,
} from "@/components/Editor/types";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { IFieldProps } from "@/features/product-detail/types";
import { useRef } from "react";
import { FieldValues } from "react-hook-form";
import {
  UploadBeforeHandler,
  UploadInfo,
} from "suneditor-react/dist/types/upload";
import SunEditorCore from "suneditor/src/lib/core";

export default function EditorField<T extends FieldValues>({
  control,
  name,
  label,
  folderName,
}: IFieldProps<T>) {
  const editor = useRef<SunEditorCore>();
  const getSunEditorInstance = (sunEditor: SunEditorCore) => {
    editor.current = sunEditor;
  };
  const listImageRef = useRef<string[]>([]);
  const { mutateAsync: uploadImage } = useImagesControllerUploadFile();
  const { mutateAsync: deleteImage } = useImagesControllerDeleteImage();
  const getPublicIdInURL = (url: string) => {
    const match = url.match(
      // eslint-disable-next-line no-useless-escape
      /\/upload\/[^\/]+\/([^\/]+)\/([^\/]+)\.[a-zA-Z0-9]+$/
    );
    if (match) {
      const result = `${match[1]}/${match[2]}`;
      return result;
    }
  };
  const handleImageStateChange = (
    _targetImgElement: HTMLImageElement,
    index: number,
    state: TStateImageUpload,
    imageInfo: UploadInfo<HTMLImageElement>
  ) => {
    if (state === EImageStatusEditor.CREATE) {
      listImageRef.current.push(imageInfo.src);
      return;
    }
    if (state === EImageStatusEditor.DELETE) {
      const imageSrc = listImageRef.current[index];
      const public_id = getPublicIdInURL(imageSrc || "");
      deleteImage({
        data: {
          public_id,
        },
      })
        .then(() => {
          editor.current?.getImagesInfo().splice(index, 1);
          return;
        })
        .catch((err) => {
          console.error(111, err);
        });
    }
  };

  const handleUpLoadFile = (
    files: File[],
    uploadHandler: UploadBeforeHandler
  ) => {
    const uploadsFile = Array.from(files);
    uploadImage({
      data: {
        files: uploadsFile,
        folder: folderName,
      },
    })
      .then((res) => {
        if (!res.data) {
          return;
        }
        const fileInfo: TFileInfo = {
          name: files[0].name,
          size: 100,
          url: res.data[0].url || "",
          public_id: res.data[0].public_id || "",
        };
        const uploadResponse: TUploadBeforeResponse = {
          errorMessage: undefined,
          result: [fileInfo],
        };
        uploadHandler(uploadResponse);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  function resizeImage(files: File[], uploadHandler: UploadBeforeHandler) {
    const [uploadFile] = files;
    const img = document.createElement("img");
    const canvas = document.createElement("canvas");
    const reader = new FileReader();

    reader.onload = function (e) {
      img.src = e?.target?.result as string;
      img.onload = function () {
        let ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0);

        const MAX_WIDTH = 960;
        const MAX_HEIGHT = 400;
        let { width, height } = img;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;

        ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              handleUpLoadFile(
                [new File([blob], uploadFile.name, { type: uploadFile.type })],
                uploadHandler
              );
            }
          },
          uploadFile.type,
          1
        );
      };
    };

    reader.readAsDataURL(uploadFile);
  }

  const handleImageUploadBefore = (
    files: File[],
    _info: object,
    uploadHandler: UploadBeforeHandler
  ) => {
    resizeImage(files, uploadHandler);

    return false;
  };
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Editor
              {...field}
              getSunEditorInstance={getSunEditorInstance}
              defaultValue={field.value}
              onImageUploadBefore={handleImageUploadBefore}
              onImageUpload={handleImageStateChange}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
