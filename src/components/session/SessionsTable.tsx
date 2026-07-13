import type { SessionSummary } from "../../types/session.ts";
import { createColumnHelper } from "@tanstack/react-table";
import { DataTable } from "../core/DataTable";
import {
  formatDuration,
  formatUtcToLocalDateTime,
  getDurationMs,
} from "../../shared/utils.ts";

const columnHelper = createColumnHelper<SessionSummary>();
const columns = [
  columnHelper.accessor("id", {
    header: "ID",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("sessionStart", {
    header: "Start",
    cell: (info) => formatUtcToLocalDateTime(info.getValue().toString()),
  }),
  columnHelper.accessor("sessionStop", {
    header: "Stop",
    cell: (info) => formatUtcToLocalDateTime(info.getValue().toString()),
  }),
  columnHelper.accessor("applicationAlias", {
    header: "Alias",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("applicationTitle", {
    header: "Title",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("applicationPath", {
    header: "Path",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("duration", {
    id: "duration",
    header: "Duration",
    cell: ({ row }) => {
      const sessionStart = row.original.sessionStart;
      const sessionStop = row.original.sessionStop;

      return formatDuration(getDurationMs(sessionStart, sessionStop));
    },
    enableSorting: true,
    sortingFn: (rowA, rowB) => {
      if (
        getDurationMs(rowA.original.sessionStart, rowA.original.sessionStop) >
        getDurationMs(rowB.original.sessionStart, rowB.original.sessionStop)
      ) {
        return -1;
      } else if (
        getDurationMs(rowA.original.sessionStart, rowA.original.sessionStop) <
        getDurationMs(rowB.original.sessionStart, rowB.original.sessionStop)
      ) {
        return 1;
      } else {
        return 0;
      }
    },
  }),
];

type SessionsTableProps = {
  sessionsList: SessionSummary[] | undefined;
  tableName: string;
};

export const SessionsTable = (props: SessionsTableProps) => {
  return (
    <>
      <div className="text-2xl font-semibold mb-3 rounded-sm border-l-4 border-l-accent">
        <span className="ml-2"> Sessions ({props.sessionsList?.length})</span>
      </div>
      <DataTable
        tableName={props.tableName}
        data={props.sessionsList}
        columns={columns}
      />
    </>
  );
};
