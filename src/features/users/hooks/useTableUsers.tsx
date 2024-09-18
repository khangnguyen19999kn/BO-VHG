import {
  useUsersControllerDeleteUser,
  useUsersControllerFindAll,
} from "@/api/endpoints/users/users";
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
import UpdateUser from "@/features/users/update-user";

import { ColumnDef } from "@tanstack/react-table";
import { Trash } from "lucide-react";
import { toast } from "sonner";
type TColumnBlogsTable = {
  id: string;
  username: string;
  name: string;
};
export default function useTableUsers() {
  const { data, refetch } = useUsersControllerFindAll();
  const dataTableUser = data?.data;
  const { mutate: deleteUser } = useUsersControllerDeleteUser({
    mutation: {
      onSuccess: () => {
        refetch();
        toast.success("Xóa người dùng thành công");
      },
      onError: () => {
        toast.error("Xóa người dùng thất bại");
      },
    },
  });

  const handleDeleteUser = (id: string) => {
    deleteUser({id});
  };

  const columnsTableUsers: ColumnDef<Partial<TColumnBlogsTable>>[] = [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "username",
      header: "User Name",
    },
    {
      accessorKey: "name",
      header: "Tên của người dùng",
    },

    {
      accessorKey: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex gap-2 justify-center">
          <UpdateUser defaultValues={row.original} />
          <AlertDialog>
            <AlertDialogTrigger>
              <Button
                variant={"destructive"}
                className="flex gap-1 bold items-center"
              >
                <Trash />
                <p>Xóa</p>
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Bạn có chắn chắn muốn xóa người dùng này
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Người dùng sau khi xóa sẽ không được hiển thị và không thể
                  khôi phục lại
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  className="bg-red-600 border hover:bg-slate-50 hover:border-red-500 hover:text-red-500"
                    onClick={() => handleDeleteUser(row.getValue("id"))}
                >
                  Xóa người dùng
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      ),
    },
  ];
  return {
    // dataTableBlogs,
    columnsTableUsers,
    dataTableUser,
  };
}
