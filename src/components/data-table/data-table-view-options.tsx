import { Table } from "@tanstack/react-table";
import { SlidersHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface DataTableViewOptionsProps<TData> {
  table: Table<TData>;
}

export function DataTableViewOptions<TData>({
  table,
}: Readonly<DataTableViewOptionsProps<TData>>) {
  const hideAllColumns = () => {
    table
      .getAllLeafColumns()
      .filter((col) => col.columnDef.enableHiding !== false)
      .forEach((col) => col.toggleVisibility(false));
  };

  const showAllColumns = () => {
    table.toggleAllColumnsVisible();
  };

  const resetColumnVisibility = () => {
    table.resetColumnVisibility();
  };

  return (
    <DropdownMenu>
      <TooltipProvider delayDuration={100}>
        <Tooltip>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button
                className="ml-auto hidden lg:flex"
                size="sm"
                variant="outline"
              >
                <SlidersHorizontal className="mr-2" size={16} />
                View
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent>Hide / show columns</TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <DropdownMenuContent
        align="end"
        className="max-h-[400px] w-[200px] overflow-auto"
      >
        <DropdownMenuLabel>Table toggle column</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => showAllColumns()}
          onSelect={(e) => e.preventDefault()}
        >
          Show all
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => hideAllColumns()}
          onSelect={(e) => e.preventDefault()}
        >
          Hide all
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => resetColumnVisibility()}
          onSelect={(e) => e.preventDefault()}
        >
          Reset to default
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {table
          .getAllColumns()
          .filter(
            (column) =>
              typeof column.accessorFn !== "undefined" && column.getCanHide()
          )
          .map((column) => {
            const id = String(column.id).toUpperCase();
            return (
              <DropdownMenuCheckboxItem
                key={column.id}
                checked={column.getIsVisible()}
                className="cursor-pointer capitalize hover:bg-muted"
                onCheckedChange={(value) => column.toggleVisibility(!!value)}
                onSelect={(e) => e.preventDefault()}
              >
                {id}
              </DropdownMenuCheckboxItem>
            );
          })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
