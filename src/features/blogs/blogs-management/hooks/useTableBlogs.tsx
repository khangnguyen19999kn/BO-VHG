import { useBlogsControllerFindAll } from "@/api/endpoints/blogs/blogs";
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
import {  Pencil, Trash } from "lucide-react";
type TColumnBlogsTable = {
  id: string;
  title: string;
  content: string;
  coverImage: string;
  author: string;
  createdAt: string;
};
export default function useTableBlogs() {
  const { data } = useBlogsControllerFindAll();
  const dataTableBlogs = data?.data;
  const columnsTableBlogs: ColumnDef<Partial<TColumnBlogsTable>>[] = [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "title",
      header: "Title",
      cell: ({ row }) => <p>{row.getValue("title")}</p>,
    },
    {
      accessorKey: "content",
      header: "Content",
      //   cell: ({ row }) => (
      //     <div className="line-clamp-2">
      //       {row.getValue("content")?.slice(0, 100)}...
      //     </div>
      //   ),
    },
    {
      accessorKey: "coverImage",
      header: "Cover Image",
      cell: ({ row }) => (
        <img
          src={row.getValue("coverImage")}
          alt="Cover"
          className="w-16 h-16 object-cover"
        />
      ),
    },
    {
      accessorKey: "author",
      header: "Author",
      cell: ({ row }) => <p>{row.getValue("author")}</p>,
    },
    {
      accessorKey: "createdAt",
      header: "Created At",
      cell: ({ row }) => (
        <p>{new Date(row.getValue("createdAt")).toLocaleDateString()}</p>
      ),
    },

    {
      accessorKey: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <Link to={`/products/edit/${row.getValue("id")}`}>
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
                  //   onClick={() => handleDelete(row.getValue("id"))}
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
  return {
    dataTableBlogs,
    columnsTableBlogs,
  };
}
