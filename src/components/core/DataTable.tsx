import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { MdArrowDownward, MdArrowUpward } from "react-icons/md";
import { tableConfigApi } from "../../api/table_config_api.ts";
import { useSearchParams } from "react-router-dom";

type DataTableProps<TData> = {
  tableName: string;
  data: TData[] | undefined;
  columns: ColumnDef<TData, any>[];
};

export const DataTable = <TData,>(props: DataTableProps<TData>) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const handlePageChange = (newPageIndex: number) => {
    setSearchParams({ page: (newPageIndex + 1).toString() }, { replace: true });
  };

  const goToPage = (pageIndex: number) => {
    table.setPageIndex(pageIndex);
    handlePageChange(pageIndex);
  };

  const table = useReactTable({
    data: props.data ? props.data : [],
    columns: props.columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onSortingChange: setSorting,
    autoResetPageIndex: false,
    state: {
      sorting,
      columnVisibility,
    },
    initialState: {
      pagination: {
        pageIndex: parseInt(searchParams.get("page") || "1", 10) - 1,
        pageSize: 50,
      },
    },
    rowCount: props.data ? props.data.length : 0,
  });

  const paginationComponent = () => {
    const currentPageIndex = table.getState().pagination.pageIndex;
    const pageCount = table.getPageCount();

    const paginationButtons = [
      {
        key: "previous",
        label: "<",
        pageIndex: currentPageIndex - 1,
        disabled: !table.getCanPreviousPage(),
        className: "btn-neutral",
      },
      {
        key: "current",
        label: currentPageIndex + 1,
        pageIndex: currentPageIndex,
        className: "btn-accent",
      },
      ...(currentPageIndex + 1 < pageCount
        ? [
            {
              key: "next-1",
              label: currentPageIndex + 2,
              pageIndex: currentPageIndex + 1,
              disabled: false,
              className: "btn-neutral",
            },
          ]
        : []),
      ...(currentPageIndex + 2 < pageCount
        ? [
            {
              key: "next-2",
              label: currentPageIndex + 3,
              pageIndex: currentPageIndex + 2,
              disabled: false,
              className: "btn-neutral",
            },
          ]
        : []),
      {
        key: "ellipsis",
        label: "...",
        pageIndex: undefined,
        disabled: true,
        className: "btn-ghost",
      },
      {
        key: "last",
        label: pageCount,
        pageIndex: pageCount - 1,
        disabled: pageCount <= 1 || currentPageIndex === pageCount - 1,
        className: "btn-neutral",
      },
      {
        key: "next",
        label: ">",
        pageIndex: currentPageIndex + 1,
        disabled: !table.getCanNextPage(),
        className: "btn-neutral",
      },
    ];

    return (
      <div className="join">
        {paginationButtons.map((button) => (
          <button
            key={button.key}
            className={`join-item btn ${button.className}`}
            onClick={() => {
              if (button.pageIndex !== undefined) {
                goToPage(button.pageIndex);
              }
            }}
            disabled={button.disabled}
          >
            {button.label}
          </button>
        ))}
      </div>
    );
  };

  useEffect(() => {
    tableConfigApi.read(props.tableName).then((response) => {
      if (response.tableConfigJson) {
        setColumnVisibility(JSON.parse(response.tableConfigJson));
      }

      setIsLoaded(true);
    });
  }, [props.tableName]);

  useEffect(() => {
    if (!isLoaded) return;

    tableConfigApi.write({
      tableName: props.tableName,
      tableConfigJson: JSON.stringify(columnVisibility),
    });
  }, [props.tableName, columnVisibility, isLoaded]);

  if (!props.data) {
    return (
      <div className="min-h-screen overflow-x-auto rounded-box border border-base-content/10 bg-base-100 p-4">
        <div className="animate-pulse space-y-3">
          {Array.from({ length: 20 }).map((_, index) => (
            <div
              key={`skeleton_${index}`}
              className="h-10 w-full rounded bg-base-300"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-row relative">
        <div className="dropdown mb-4">
          <button
            tabIndex={0}
            role="button"
            className="btn btn-neutral btn-sm select-none"
          >
            Choose columns
          </button>

          <ul
            tabIndex={-1}
            className="dropdown-content menu p-2 shadow-md bg-base-300 rounded-box w-52"
          >
            {table
              .getAllColumns()
              .filter((column) => {
                return column.getCanHide();
              })
              .map((column) => (
                <li key={column.id}>
                  <label className="cursor-pointer">
                    <input
                      type="checkbox"
                      className="checkbox checkbox-sm"
                      checked={column.getIsVisible()}
                      onChange={() => {
                        column.toggleVisibility(!column.getIsVisible());
                      }}
                    />
                    {column.columnDef.header?.toString()}
                  </label>
                </li>
              ))}
          </ul>
        </div>

        <div className="flex flex-1 justify-center absolute left-1/2 transform -translate-x-1/2">
          {paginationComponent()}
        </div>
      </div>

      <div className="max-h-screen overflow-auto rounded-box border border-base-content/10 drop-shadow-md">
        <table className="table table-pin-rows">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className={`cursor-pointer select-none hover:bg-base-200/70 ${header.id}`}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    <div className="flex items-center">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                      {header.column.getIsSorted() ? (
                        header.column.getIsSorted() === "asc" ? (
                          <MdArrowUpward className="ml-2" />
                        ) : (
                          <MdArrowDownward className="ml-2" />
                        )
                      ) : null}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="hover:bg-base-200/80 drop-shadow-2xl">
                {row.getVisibleCells().map((cell, index) => (
                  <td key={`td_${index}`}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="my-4 flex flex-1 justify-center">
        {paginationComponent()}
      </div>
    </>
  );
};
