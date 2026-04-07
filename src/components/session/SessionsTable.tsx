import {useEffect, useState} from "react";
import {sessionsApi} from "../../api/session.ts";
import type {SessionSummary} from "../../types/session.ts";
import {createColumnHelper} from "@tanstack/react-table";
import {DataTable} from "../core/DataTable";

const columnHelper = createColumnHelper<SessionSummary>();

const columns = [
  columnHelper.accessor("id",
    { header: "ID", cell: info => info.getValue() }),
  columnHelper.accessor("sessionStart",
    { header: "Start", cell: info => info.getValue() }),
  columnHelper.accessor("sessionStop",
    { header: "Stop", cell: info => info.getValue() }),
  columnHelper.accessor("applicationAlias",
    { header: "Alias", cell: info => info.getValue() }),
  columnHelper.accessor("applicationTitle",
    { header: "Title", cell: info => info.getValue() }),
  columnHelper.accessor("applicationPath",
    { header: "Path", cell: info => info.getValue() }),
];

export const SessionsTable = () => {
  const [sessionList, setSessionList] = useState<SessionSummary[]>([]);

  useEffect(() => {
    sessionsApi.getAllSessionsSummary().then(setSessionList);
  }, []);

  return <DataTable data={sessionList} columns={columns} />;
};