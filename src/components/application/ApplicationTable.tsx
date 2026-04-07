import type {Application} from "../../types/application.ts";
import {applicationsApi} from "../../api/application.ts";
import {useEffect, useState} from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable
} from "@tanstack/react-table";
import {MdArrowDownward, MdArrowUpward} from "react-icons/md";

const columnHelper = createColumnHelper<Application>()
const columns = [
  columnHelper.accessor("id", {
    header: "ID",
    cell: info => info.getValue()
  }),
  columnHelper.accessor("title", {
    header: "Title",
    cell: info => info.getValue()
  }),
  columnHelper.accessor("alias", {
    header: "Alias",
    cell: info => info.getValue()
  }),
  columnHelper.accessor("path", {
    header: "Path",
    cell: info => info.getValue()
  }),
  columnHelper.accessor("saveSession", {
    header: "Save Session",
    cell: info => info.getValue().toString()
  }),
  columnHelper.accessor(row => row.sessions.length, {
    header: "Number of sessions",
    cell: info => info.getValue()
  })
]

export const ApplicationTable = () => {
  const [applicationList, setApplicationList] = useState<Application[]>([]);
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnVisibility, setColumnVisibility] = useState({})

  useEffect(() => {
    applicationsApi.getAll().then(r => {
      setApplicationList(r)
    });
  }, [])

  const table = useReactTable({
    data: applicationList,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onSortingChange: setSorting,
    state: {
      sorting,
      columnVisibility
    },
  })

  if (applicationList.length === 0) {
    return (
      <div className="min-h-screen overflow-x-auto rounded-box border border-base-content/10 bg-base-100 p-4">
        <div className="animate-pulse space-y-3">
          {
            Array.from({length: 20}).map((_, index) => (
              <div key={`div_1_${index}`} className="h-10 w-full rounded bg-base-300" />
            ))
          }
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="dropdown mb-4">
        <div tabIndex={0} role="button" className="btn btn-neutral btn-sm select-none">Choose columns</div>
        <ul tabIndex={-1} className="dropdown-content menu p-2 shadow-md bg-base-300 rounded-box w-52">
          {table.getAllColumns().map((column) => (
            <li key={column.id}>
              <label className="cursor-pointer">
                <input
                  type="checkbox"
                  className="checkbox checkbox-sm"
                  checked={column.getIsVisible()}
                  onChange={(event) => column.toggleVisibility(event.target.checked)}
                  />
                {column.columnDef.header?.toString()}
              </label>
            </li>
          ))}
        </ul>
      </div>

      <div className="max-h-screen overflow-auto rounded-box border border-base-content/10 bg-base-100 drop-shadow-md">
        <table className="table table-pin-rows">
          <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}
                    className={`cursor-pointer select-none hover:bg-base-200/80 ${header.id}`}
                    onClick={header.column.getToggleSortingHandler()}
                >
                  <div className="flex items-center">
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {header.column.getIsSorted() ?
                      header.column.getIsSorted() === "asc" ?
                        <MdArrowUpward className="ml-2"/> :
                        <MdArrowDownward className="ml-2"/> : null}
                  </div>
                </th>
              ))}
            </tr>
          ))}
          </thead>
          <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="hover:bg-base-200/80">
              {row.getVisibleCells().map((cell, index) => (
                <td key={`td_${index}`}> {flexRender(cell.column.columnDef.cell, cell.getContext())} </td>
              ))}
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </>
  )
}