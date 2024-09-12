import { DataTable } from "@/components/data-table/data-table";
import { Button } from "@/components/ui/button";
import useTableInfo from "@/features/products/table/useTableInfo";
import { Link } from "@tanstack/react-router";
import { FilePlus } from "lucide-react";

export default function ProductsPage() {
  const { columnsTableProducts, dataTable } = useTableInfo();
  return (
    <div className="w-full">
      {dataTable && (
        <DataTable
          columns={columnsTableProducts}
          data={dataTable}
          tableName="Products"
          toolbarCustom={
            <Link to="/products/create">
              <Button className="bg-green-500 flex gap-1 bold items-center">
                <FilePlus />
                <p>Create Product</p>
              </Button>
            </Link>
          }
        />
      )}
    </div>
  );
}
