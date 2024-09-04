import { Table } from "@tanstack/react-table";
import { Search, SearchX } from "lucide-react";
import { ReactNode, useEffect, useState } from "react";
import { CSVLink } from "react-csv";

import { DataTableViewOptions } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  toolbarCustomActions?: ({ table }: { table: Table<TData> }) => ReactNode;
  endActions?: ({ table }: { table: Table<TData> }) => ReactNode;
  debounceTime?: number;
  hideViewOption?: boolean;
  tableName: string;
}

export function DataTableToolbar<TData>({
  table,
  toolbarCustomActions,
  endActions,
  hideViewOption,
  tableName,
}: Readonly<DataTableToolbarProps<TData>>) {
  const [isSearch, setIsSearch] = useState(window.screen.width > 768);
  const [searchValue, setSearchValue] = useState("");
  const listColNotExport = ["select", "Actions"];
  const isColumnExportable = (colId: string) =>
    !listColNotExport.includes(colId);

  useEffect(() => {
    table.setGlobalFilter(searchValue);
  }, [searchValue]);
  const headers = table
    .getAllLeafColumns()
    .filter((col) => isColumnExportable(col.id))
    .map((col) => col.id);

  const csvData = table.getRowModel().rows.map((row) => {
    const rowObject: { [key: string]: unknown } = {};
    headers.forEach((header) => {
      rowObject[header] = row.getValue(header);
    });
    return rowObject;
  });

  return (
    <div className="mb-2 flex flex-wrap items-center justify-between gap-4">
      {toolbarCustomActions?.({ table }) ?? null}
      <div className="ml-auto flex items-center gap-2 ">
        {!isSearch && (
          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => setIsSearch(true)}
                >
                  <Search size={16} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Type to search</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
        {isSearch && (
          <>
            <Input
              className="h-10 w-[150px] bg-background lg:w-[250px]"
              defaultValue={searchValue}
              placeholder={"Search"}
              onChange={(event) => setSearchValue(event.currentTarget.value)}
            />
            <TooltipProvider delayDuration={100}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => setIsSearch(false)}
                  >
                    <SearchX size={16} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Hide search</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </>
        )}
        {!hideViewOption && <DataTableViewOptions table={table} />}
        {endActions?.({ table })}
        <CSVLink data={csvData} filename={`${tableName}.csv`} headers={headers}>
          <Button>
            <span className="mr-2">"Download Excel"</span>
          </Button>
        </CSVLink>
      </div>
    </div>
  );
}
