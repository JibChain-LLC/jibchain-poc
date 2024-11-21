import { faker } from '@faker-js/faker';
import type { Meta, StoryObj } from '@storybook/react';
import {
  QueryClient,
  QueryClientProvider,
  keepPreviousData,
  useQuery
} from '@tanstack/react-query';
import { ColumnDef, PaginationState } from '@tanstack/react-table';
import * as React from 'react';
import { Badge } from '#/components/ui/badge';
import { Button } from '#/components/ui/button';
import { DataTable, DataTableColumnHeader } from '#/components/ui/data-table';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger
} from '#/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '#/components/ui/select';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '#/components/ui/tooltip';

enum RiskEnum {
  LOW = 'low',
  MED = 'medium',
  HIGH = 'high'
}

enum RegionEnum {
  NA = 'North America',
  EU = 'Europe',
  SA = 'South America',
  AS = 'Asia',
  AF = 'Africa'
}

const regions = Object.values(RegionEnum);
const risks = Object.values(RiskEnum);
const risksMap = new Map<RiskEnum, number>([
  [RiskEnum.LOW, 0],
  [RiskEnum.MED, 1],
  [RiskEnum.HIGH, 2]
]);

function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

type Supplier = {
  name: string;
  exposure: RiskEnum;
  region: RegionEnum[];
  impact: RiskEnum;
};

const meta: Meta<typeof DataTable> = {
  title: 'Components/DataTable',
  component: DataTable,
  decorators: [
    (Story) => (
      <div className='bg-green-50 p-4'>
        <Story />
      </div>
    )
  ],
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof DataTable>;

function createFakeSupplier(): Supplier {
  return {
    name: faker.company.name(),
    exposure: risks[getRandomInt(0, risks.length)],
    region: Array.from(
      { length: getRandomInt(1, 4) },
      () => regions[getRandomInt(0, regions.length)]
    ),
    impact: risks[getRandomInt(0, risks.length)]
  };
}

const supplierColumns: ColumnDef<Supplier>[] = [
  {
    accessorKey: 'name',
    header: 'Supplier',
    cell: ({ row }) => {
      return <p className='font-semibold'>{row.original.name}</p>;
    }
  },
  {
    accessorKey: 'exposure',
    header: 'Exposure to Risk',
    cell: ({ row }) => {
      const status = row.original.exposure;
      let variant: React.ComponentProps<typeof Badge>['variant'] = 'secondary';
      switch (status) {
        case 'low':
          variant = 'default';
          break;
        case 'medium':
          variant = 'warning';
          break;
        case 'high':
          variant = 'destructive';
          break;
        default:
          break;
      }

      return (
        <Badge variant={variant} className='capitalize'>
          {status}
        </Badge>
      );
    }
  },
  {
    accessorKey: 'region',
    cell: ({ row }) => {
      const [first, ...rest] = row.original.region;

      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <p className='w-fit text-sm font-medium hover:cursor-pointer'>
                {first} {rest.length > 0 && `+${rest.length}`}
              </p>
            </TooltipTrigger>
            <TooltipContent side='right'>
              <div>
                {[first, ...rest].map((r) => (
                  <p key={r}>{r}</p>
                ))}
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    }
  },
  {
    accessorKey: 'impact',
    header: 'Impact to Operation',
    cell: ({ row }) => <p className='capitalize'>{row.original.impact}</p>
  }
];

export const Simple: Story = {
  render: () => {
    const suppliers: Supplier[] = faker.helpers.multiple(createFakeSupplier, {
      count: 20
    });

    return <DataTable data={suppliers} columns={supplierColumns} />;
  }
};

export const Sorting: Story = {
  render: () => {
    const suppliers: Supplier[] = faker.helpers.multiple(createFakeSupplier, {
      count: 20
    });

    const columns: ColumnDef<Supplier>[] = [...supplierColumns];
    columns[1] = {
      ...columns[1],
      sortingFn: (rowA, rowB) => {
        return (
          risksMap.get(rowA.original.exposure)! -
          risksMap.get(rowB.original.exposure)!
        );
      },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title='Exposure to Risk' />
      )
    } as ColumnDef<Supplier>;
    columns[3] = {
      ...columns[3],
      sortingFn: (rowA, rowB) => {
        return (
          risksMap.get(rowA.original.impact)! -
          risksMap.get(rowB.original.impact)!
        );
      },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title='Impact to Operation' />
      )
    } as ColumnDef<Supplier>;

    return <DataTable data={suppliers} columns={columns} />;
  }
};

export const Filtering: Story = {
  render: () => {
    const suppliers: Supplier[] = faker.helpers.multiple(createFakeSupplier, {
      count: 20
    });

    return (
      <DataTable
        data={suppliers}
        columns={supplierColumns}
        controls={({ table }) => (
          <div className='mb-4 flex gap-1'>
            <Select
              onValueChange={(v) => {
                table
                  .getColumn('exposure')
                  ?.setFilterValue(v === 'all' ? null : v);
              }}>
              <SelectTrigger className='w-[180px]'>
                <SelectValue placeholder='Filter by Exposure' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value='all'>All</SelectItem>
                  {risks.map((r) => (
                    <SelectItem value={r} key={r} className='capitalize'>
                      {r}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        )}
      />
    );
  }
};

export const Visiblity: Story = {
  render: () => {
    const suppliers: Supplier[] = faker.helpers.multiple(createFakeSupplier, {
      count: 10
    });

    return (
      <DataTable
        controls={({ table }) => (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='secondary' className='mb-4 mr-auto'>
                Columns
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className='capitalize'
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }>
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
        wrapperClassName='w-[900px]'
        data={suppliers}
        columns={supplierColumns}
      />
    );
  }
};

export const AutomaticPagination: Story = {
  render: () => {
    const suppliers: Supplier[] = faker.helpers.multiple(createFakeSupplier, {
      count: 100
    });

    return (
      <DataTable
        wrapperClassName='w-[900px]'
        pagination={{ pageSize: 10, manual: false }}
        data={suppliers}
        columns={supplierColumns}
      />
    );
  }
};

const queryClient = new QueryClient();

export const ManualPagination: Story = {
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <Story />
      </QueryClientProvider>
    )
  ],
  render: () => {
    const suppliers: Supplier[] = React.useMemo(
      () =>
        faker.helpers.multiple(createFakeSupplier, {
          count: 100
        }),
      []
    );

    async function fetchData(options: { pageIndex: number; pageSize: number }) {
      // Simulate some network latency
      await new Promise((r) => setTimeout(r, 250));

      return {
        rows: suppliers.slice(
          options.pageIndex * options.pageSize,
          (options.pageIndex + 1) * options.pageSize
        ),
        pageCount: Math.ceil(suppliers.length / options.pageSize),
        rowCount: suppliers.length
      };
    }

    const [pagination, setPagination] = React.useState<PaginationState>({
      pageIndex: 0,
      pageSize: 10
    });

    const dataQuery = useQuery({
      queryKey: ['data', pagination],
      queryFn: () => fetchData(pagination),
      placeholderData: keepPreviousData
    });

    return (
      <DataTable
        wrapperClassName='w-[900px]'
        pagination={{
          ...pagination,
          manual: true,
          rowCount: dataQuery.data?.rowCount ?? 0,
          onPageChange: setPagination
        }}
        data={dataQuery.data?.rows ?? []}
        columns={supplierColumns}
      />
    );
  }
};

export const ComplexExample: Story = {
  render: () => {
    const suppliers: Supplier[] = faker.helpers.multiple(createFakeSupplier, {
      count: 100
    });

    const columns: ColumnDef<Supplier>[] = [...supplierColumns];
    columns[1] = {
      ...columns[1],
      sortingFn: (rowA, rowB) => {
        return (
          risksMap.get(rowA.original.exposure)! -
          risksMap.get(rowB.original.exposure)!
        );
      },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title='Exposure to Risk' />
      )
    } as ColumnDef<Supplier>;
    columns[2] = {
      ...columns[2],
      filterFn: 'arrIncludes'
    } as ColumnDef<Supplier>;
    columns[3] = {
      ...columns[3],
      sortingFn: (rowA, rowB) => {
        return (
          risksMap.get(rowA.original.impact)! -
          risksMap.get(rowB.original.impact)!
        );
      },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title='Impact to Operation' />
      )
    } as ColumnDef<Supplier>;

    return (
      <DataTable
        wrapperClassName='w-[900px]'
        pagination={{ pageSize: 10, manual: false }}
        data={suppliers}
        columns={columns}
        controls={({ table }) => (
          <div className='mb-4 flex gap-1'>
            <Select
              onValueChange={(v) => {
                table
                  .getColumn('exposure')
                  ?.setFilterValue(v === 'all' ? null : v);
              }}>
              <SelectTrigger className='w-[180px]'>
                <SelectValue placeholder='Filter by Exposure' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value='all'>All</SelectItem>
                  {risks.map((r) => (
                    <SelectItem value={r} key={r} className='capitalize'>
                      {r}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <Select
              onValueChange={(v) => {
                table
                  .getColumn('region')
                  ?.setFilterValue(v === 'all' ? null : v);
              }}>
              <SelectTrigger className='w-[180px]'>
                <SelectValue placeholder='Filter by Region' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value='all'>All</SelectItem>
                  {regions.map((r) => (
                    <SelectItem value={r} key={r} className='capitalize'>
                      {r}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        )}
      />
    );
  }
};
