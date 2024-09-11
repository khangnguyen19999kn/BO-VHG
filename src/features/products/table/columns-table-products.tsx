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

export const columnsTableProducts: ColumnDef<Partial<TColumnProductsTable>>[] =
  [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "price",
      header: "Price",
    },
    {
      accessorKey: "description",
      header: "Description",
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
          <Link to={`/products/edit/${row.getValue("id")}`}>
            <Button
              variant="outline"
              className="bg-yellow-200"
              onClick={() => {
                console.log(1111, row.getValue("id"));
              }}
            >
              Edit
            </Button>
          </Link>
          <AlertDialog>
            <AlertDialogTrigger>
              <Button variant={"destructive"}>Delete</Button>
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
                <AlertDialogAction className="bg-red-600 border hover:bg-slate-50 hover:border-red-500 hover:text-red-500">
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      ),
    },
  ];
