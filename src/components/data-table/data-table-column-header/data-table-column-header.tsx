import { Column } from '@tanstack/react-table';
import { Group, Ungroup } from 'lucide-react';

import { ButtonWithTooltip } from '@/components/button-with-tooltip';
import { cn } from '@/lib/utils';

import { ActionsMenu } from './actions';
import { SortButton } from './sort-button';

export interface DataTableColumnHeaderProps<TData, TValue> extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: Readonly<DataTableColumnHeaderProps<TData, TValue>>) {
  if (!column.getCanSort() && !column.getCanGroup()) {
    return <div className={cn(className)}>{title}</div>;
  }

  return (
    <div className={cn('flex w-full gap-2', className)}>
      <div className="flex flex-1 items-center gap-1 text-wrap">
        <span className="text-left">{title}</span>
      </div>
      <div className="flex items-center">
        {/* SORT ICONS */}
        {column.getCanSort() && (
          <SortButton direction={column.getIsSorted()} title={title} onClick={() => column.toggleSorting()} />
        )}
        {column.getCanGroup() ? (
          // If the header can be grouped, let's add a toggle
          <ButtonWithTooltip
            label={!column.getIsGrouped() ? 'Group' : 'Un-group'}
            size={'icon'}
            variant={'ghost'}
            {...{
              onClick: column.getToggleGroupingHandler(),
            }}
          >
            {!column.getIsGrouped() ? <Group /> : <Ungroup />}
          </ButtonWithTooltip>
        ) : null}
        {/* ACTION MENU */}
        <ActionsMenu column={column} title={''} />
      </div>
    </div>
  );
}
