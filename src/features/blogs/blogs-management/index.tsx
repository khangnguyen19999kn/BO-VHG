import { DataTable } from "@/components/data-table/data-table";
import { Button } from "@/components/ui/button";
import useTableBlogs from "@/features/blogs/blogs-management/hooks/useTableBlogs";
import { Link } from "@tanstack/react-router";
import { FilePlus } from "lucide-react";

export default function BlogsManagement() {
  const { columnsTableBlogs, dataTableBlogs } = useTableBlogs();
  return (
    <div className="w-full">
      {dataTableBlogs && (
        <DataTable
          columns={columnsTableBlogs}
          data={dataTableBlogs}
          tableName="Blogs"
          toolbarCustom={
            <Link to="/blogs/create">
              <Button className="bg-green-500 flex gap-1 bold items-center">
                <FilePlus />
                <p>Tạo bài viết mới</p>
              </Button>
            </Link>
          }
        />
      )}
    </div>
  );
}
