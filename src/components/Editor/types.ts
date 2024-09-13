export type TUploadBeforeResponse = {
  errorMessage?: string;
  result: TFileInfo[];
};
export type TFileInfo = {
  url: string;
  name: string;
  size: number;
  public_id: string;
};
export type TStateImageUpload = "create" | "update" | "delete";
export enum EImageStatusEditor {
  CREATE = "create",
  UPDATE = "update",
  DELETE = "delete",
}
