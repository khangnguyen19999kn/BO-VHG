import { useProductsControllerFindAll } from "@/api/endpoints/products/products";
import { DataTable } from "@/components/data-table/data-table";
import { Button } from "@/components/ui/button";
import { columnsTableProducts } from "@/features/products/table/columns-table-products";
import { Link } from "@tanstack/react-router";

export default function ProductsPage() {
  const { data } = useProductsControllerFindAll();
  const dataTable = data?.data;
  return (
    <div className="w-full">
      {dataTable && (
        <DataTable
          columns={columnsTableProducts}
          data={dataTable}
          tableName="Products"
          toolbarCustom={
            <Link to="/products/create">
              <Button className="bg-green-500">Create Product</Button>
            </Link>
          }
        />
      )}
    </div>
  );
}
