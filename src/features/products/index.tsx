import { DataTable } from "@/components/data-table/data-table";
import { columnsTableProducts } from "@/features/products/table/columns-table-products";
import { dataTableProductsMock } from "@/features/products/table/mock-data-table-product";

export default function ProductsPage() {
  return (
    <div className="w-full">
      <DataTable
        columns={columnsTableProducts}
        data={dataTableProductsMock}
        tableName="Products"
      />
    </div>
  );
}
