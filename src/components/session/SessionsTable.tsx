import {useEffect, useState} from "react";
import {sessionsApi} from "../../api/session.ts";
import type {SessionSummary} from "../../types/session.ts";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable
} from "@tanstack/react-table";

const columnHelper = createColumnHelper<SessionSummary>()

const columns = [
  columnHelper.accessor("id", {
    header: "ID",
    cell: (info) => info.getValue(),
    enableResizing: true
  }),
  columnHelper.accessor("sessionStart", {
    header: "Start",
    cell: (info) => info.getValue(),
    enableResizing: true
  }),
  columnHelper.accessor("sessionStop", {
    header: "Stop",
    cell: (info) => info.getValue(),
    enableResizing: true
  }),
  columnHelper.accessor("applicationAlias", {
    header: "Alias",
    cell: (info) => info.getValue(),
    enableResizing: true
  }),
  columnHelper.accessor("applicationTitle", {
    header: "Title",
    cell: (info) => info.getValue(),
    enableResizing: true
  }),
  columnHelper.accessor("applicationPath", {
    header: "Path",
    cell: (info) => info.getValue(),
    enableResizing: true
  })
]

export const SessionsTable = () => {
  const [sessionList, setSessionList] = useState<SessionSummary[]>([]);
  const [columnVisibility, setColumnVisibility] = useState({})

  useEffect(() => {
    sessionsApi.getAllSessionsSummary().then(r => {
      setSessionList(r)
    });
  }, [])

  const table = useReactTable({
    data: sessionList,
    columns,
    state: {
      columnVisibility,
    },
    columnResizeMode: "onChange",
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
  })

  if (sessionList.length === 0) {
    return (
      <div className="min-h-screen overflow-x-auto rounded-box border border-base-content/10 bg-base-200 p-4">
        <div className="animate-pulse space-y-3">
          {
            Array.from({length: 20}).map(() => (
              <div className="h-10 w-full rounded bg-base-300" />
            ))
          }
        </div>
      </div>
    )
  }

  return (
    <div className="max-h-screen overflow-auto rounded-box border border-base-content/10 bg-base-200">
      <table className="table table-pin-rows">
        <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id} className={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id} className={header.id}>
                {header.isPlaceholder ? null
                  : flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
              </th>
            ))}
          </tr>
        ))}
        </thead>
        <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id} className="hover:bg-base-300">
            {row.getVisibleCells().map((cell) => (
              <td> { cell.getValue<string>() ?? "" } </td>
            ))}
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  )
}