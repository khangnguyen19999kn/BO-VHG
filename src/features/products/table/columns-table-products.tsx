import { Button } from "@/components/ui/button";
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

export const columnsTableProducts: ColumnDef<TColumnProductsTable>[] = [
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
    accessorKey: "image",
    header: "Image",
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
    accessorKey: "viewCount",
    header: "View Count",
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <div className="flex gap-2">
        <Button
          variant="outline"
          className="bg-yellow-200"
          onClick={() => {
            console.log(1111,row.getValue("id"));
          }}
        >
          Edit
        </Button>
        <Button variant="destructive">Delete</Button>
      </div>
    ),
  },
];
