import type {Application} from "../../types/application.ts";
import {applicationsApi} from "../../api/application.ts";
import {useEffect, useState} from "react";
import {createColumnHelper} from "@tanstack/react-table";
import {DataTable} from "../core/DataTable";

const columnHelper = createColumnHelper<Application>();

const columns = [
  columnHelper.accessor("id",
    { header: "ID", cell: info => info.getValue() }),
  columnHelper.accessor("title",
    { header: "Title", cell: info => info.getValue() }),
  columnHelper.accessor("alias",
    { header: "Alias", cell: info => info.getValue() }),
  columnHelper.accessor("path",
    { header: "Path", cell: info => info.getValue() }),
  columnHelper.accessor("saveSession", {
    header: "Save Session",
    cell: info => info.getValue().toString(),
  }),
  columnHelper.accessor(row => row.sessions.length, {
    header: "Number of sessions",
    cell: info => info.getValue(),
  }),
];

export const ApplicationTable = () => {
  const [applicationList, setApplicationList] = useState<Application[]>([]);

  useEffect(() => {
    applicationsApi.getAll().then(setApplicationList);
  }, []);

  return <DataTable data={applicationList} columns={columns} />;
};