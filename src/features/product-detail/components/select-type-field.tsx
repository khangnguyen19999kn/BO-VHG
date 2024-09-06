import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IFieldProps } from "@/features/product-detail/types";
import { FieldValues } from "react-hook-form";

export default function SelectTypeField<T extends FieldValues>({
  control,
  name,
  label,
}: IFieldProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Chọn kiểu sản phẩm" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="1">Suit</SelectItem>
              <SelectItem value="2">Shirt</SelectItem>
              <SelectItem value="3">Jacket</SelectItem>
              <SelectItem value="4">Trouser</SelectItem>
              <SelectItem value="5">Vest</SelectItem>
              <SelectItem value="6">Blazer</SelectItem>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
