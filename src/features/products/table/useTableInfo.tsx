import {
  useProductsControllerDelete,
  useProductsControllerFindAll,
} from "@/api/endpoints/products/products";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";

import { ColumnDef } from "@tanstack/react-table";
import { Pencil, Trash } from "lucide-react";
import { toast } from "sonner";

export type TColumnProductsTable = {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  material: string;
  type: string;
  viewCount: number;
};
export default function useTableInfo() {
  const { data, refetch } = useProductsControllerFindAll();
  const dataTable = data?.data;
  const { mutate: deleteProduct } = useProductsControllerDelete({
    mutation: {
      onSuccess: () => {
        toast.success("Xóa sản phẩm thành công");
        refetch();
      },
      onError: () => {
        toast.error("Xóa sản phẩm thất bai");
      },
    },
  });
  const handleDelete = (id: string) => {
    deleteProduct({ id });
  };

  const columnsTableProducts: ColumnDef<Partial<TColumnProductsTable>>[] = [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "slug",
      header: "Slug",
    },
    {
      accessorKey: "price",
      header: "Price",
    },
    {
      accessorKey: "material",
      header: "Material",
    },
    {
      accessorKey: "type",
      header: "Type",
    },
    {
      accessorKey: "link",
      header: "Link to buy",
    },
    {
      accessorKey: "viewCount",
      header: "View Count",
    },
    {
      accessorKey: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <Link to={`/products/edit/${row.getValue("slug")}`}>
            <Button
              variant="outline"
              className="bg-yellow-200 flex gap-1 bold items-center"
            >
              <Pencil />
              <p>Edit</p>
            </Button>
          </Link>
          <AlertDialog>
            <AlertDialogTrigger>
              <Button
                variant={"destructive"}
                className="flex gap-1 bold items-center"
              >
                <Trash />
                <p>Delete</p>
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Bạn có chắn chắn muốn xóa sản phẩm
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Sản phẩm sau khi xóa sẽ không được hiển thị và không thể khôi
                  phục lại
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  className="bg-red-600 border hover:bg-slate-50 hover:border-red-500 hover:text-red-500"
                  onClick={() => handleDelete(row.getValue("id"))}
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      ),
    },
  ];
  return { columnsTableProducts, dataTable };
}
