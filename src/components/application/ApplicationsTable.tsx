import type {ApplicationSummary} from "../../types/application.ts";
import {applicationsApi} from "../../api/application_api.ts";
import {useEffect, useState} from "react";
import {createColumnHelper} from "@tanstack/react-table";
import {DataTable} from "../core/DataTable";
import {MdDelete, MdRemoveRedEye} from "react-icons/md";
import {Link} from "react-router-dom";

const columnHelper = createColumnHelper<ApplicationSummary>();
const tableName = "applicationsTable";

const columns = [
  columnHelper.accessor("id",
    {header: "ID", cell: info => info.getValue()}),
  columnHelper.accessor("title",
    {header: "Title", cell: info => info.getValue()}),
  columnHelper.accessor("alias",
    {header: "Alias", cell: info => info.getValue()}),
  columnHelper.accessor("path",
    {header: "Path", cell: info => info.getValue()}),
  columnHelper.accessor("saveSession", {
    header: "Save Session",
    cell: info => info.getValue().toString(),
  }),
  columnHelper.accessor(row => row.numberOfSessions, {
    header: "Number of sessions",
    cell: info => info.getValue(),
  }),
  columnHelper.display({
    id: "details",
    header: "",
    cell: ({row}) => (
      <div className="tooltip tooltip-info tooltip-left" data-tip="View details">
        <Link
          to={`/applications/id/${row.original.id}`}
          className="hover:text-info"
          aria-label="Open details"
        >
          <MdRemoveRedEye size={25}/>
        </Link>
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  }),
];

export const ApplicationsTable = () => {
  const [applicationsList, setApplicationsList] = useState<ApplicationSummary[]>();

  useEffect(() => {
    applicationsApi.getAll().then(setApplicationsList);
  }, []);

  return <DataTable tableName={tableName} data={applicationsList} columns={columns}/>;
};