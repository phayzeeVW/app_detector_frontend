import type {SessionSummary} from "../../types/session.ts";
import {createColumnHelper} from "@tanstack/react-table";
import {DataTable} from "../core/DataTable";

const columnHelper = createColumnHelper<SessionSummary>();
const columns = [
  columnHelper.accessor("id",
    {header: "ID", cell: info => info.getValue()}),
  columnHelper.accessor("sessionStart",
    {header: "Start", cell: info => info.getValue()}),
  columnHelper.accessor("sessionStop",
    {header: "Stop", cell: info => info.getValue()}),
  columnHelper.accessor("applicationAlias",
    {header: "Alias", cell: info => info.getValue()}),
  columnHelper.accessor("applicationTitle",
    {header: "Title", cell: info => info.getValue()}),
  columnHelper.accessor("applicationPath",
    {header: "Path", cell: info => info.getValue()}),
];

type SessionsTableProps = {
  sessionsList: SessionSummary[] | undefined;
  tableName: string;
}

export const SessionsTable = (props: SessionsTableProps) => {
  return <DataTable tableName={props.tableName} data={props.sessionsList} columns={columns}/>;
};