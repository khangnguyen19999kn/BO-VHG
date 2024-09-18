import { DataTable } from "@/components/data-table/data-table";
import CreateUser from "@/features/users/create-user";
import useTableUsers from "@/features/users/hooks/useTableUsers";

export default function UsersManagement() {
  const { columnsTableUsers, dataTableUser } = useTableUsers();
  return (
    <div className="w-full">
      {dataTableUser && (
        <DataTable
          columns={columnsTableUsers}
          data={dataTableUser}
          tableName="Blogs"
          toolbarCustom={<CreateUser />}
        />
      )}
    </div>
  );
}
