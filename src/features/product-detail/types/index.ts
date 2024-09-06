import { Control, FieldValues, Path, UseFormReturn } from "react-hook-form";

export interface IFieldProps<T extends FieldValues> {
  control: Control<T>;
  form?: UseFormReturn<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
}
