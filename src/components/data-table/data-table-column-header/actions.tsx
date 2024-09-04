import { ArrowDownIcon, ArrowUpIcon, EyeOff, MoreVertical } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { DataTableColumnHeaderProps } from "./data-table-column-header";
import { Button } from "@/components/ui/button";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface ActionsMenuProps<TData, TValue>
  extends DataTableColumnHeaderProps<TData, TValue> {}

export const ActionsMenu = <TData, TValue>({
  column,
}: ActionsMenuProps<TData, TValue>) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="h-6 w-6" variant="ghost">
          <MoreVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {column.getCanSort() && (
          <>
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
                <ArrowUpIcon size={16} />
                ASC
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
                <ArrowDownIcon size={16} />
                DESC
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
          </>
        )}

        {column.getCanHide() && (
          <DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
            <EyeOff size={16} />
            Hide
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
