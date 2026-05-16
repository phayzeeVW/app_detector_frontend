import type { ApplicationSummary } from "../../types/application.ts";
import { applicationsApi } from "../../api/application_api.ts";
import { useEffect, useState } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import { DataTable } from "../core/DataTable";
import { MdEdit, MdRemoveRedEye } from "react-icons/md";
import { Link } from "react-router-dom";
import { ApplicationEditDrawer } from "./ApplicationEditDrawer.tsx";
import SaveSessionButton from "../core/SaveSessionButton.tsx";

const columnHelper = createColumnHelper<ApplicationSummary>();
const tableName = "applicationsTable";

export const ApplicationsTable = () => {
  const columns = [
    columnHelper.accessor("id", {
      header: "ID",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("title", {
      header: "Title",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("alias", {
      header: "Alias",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("path", {
      header: "Path",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("saveSession", {
      header: "Visibility",
      cell: (info) => <SaveSessionButton visibility={info.getValue()} />,
    }),
    columnHelper.accessor((row) => row.numberOfSessions, {
      header: "Number of sessions",
      cell: (info) => info.getValue(),
    }),
    columnHelper.display({
      id: "edit",
      header: "",
      cell: ({ row }) => (
        <div className="tooltip tooltip-info tooltip-left" data-tip="Edit">
          <label
            htmlFor="edit-drawer"
            className="cursor-pointer hover:text-info"
            aria-label="Edit"
            onClick={() => setSelectedApplication(row.original)}
          >
            <MdEdit size={25} />
          </label>
        </div>
      ),
      enableSorting: false,
      enableHiding: false,
    }),
    columnHelper.display({
      id: "details",
      header: "",
      cell: ({ row }) => (
        <div
          className="tooltip tooltip-info tooltip-left"
          data-tip="View details"
        >
          <Link
            to={`/applications/id/${row.original.id}`}
            className="hover:text-info"
            aria-label="Open details"
          >
            <MdRemoveRedEye size={25} />
          </Link>
        </div>
      ),
      enableSorting: false,
      enableHiding: false,
    }),
  ];

  const [applicationsList, setApplicationsList] =
    useState<ApplicationSummary[]>();
  const [selectedApplication, setSelectedApplication] =
    useState<ApplicationSummary | null>(null);

  useEffect(() => {
    applicationsApi.getAll().then(setApplicationsList);
  }, []);

  return (
    <div className="drawer drawer-end">
      <input type="checkbox" id="edit-drawer" className="drawer-toggle" />
      <div className="drawer-content">
        <DataTable
          tableName={tableName}
          data={applicationsList}
          columns={columns}
        />
        ;
      </div>
      <div className="drawer-side">
        <label htmlFor="edit-drawer" className="drawer-overlay"></label>
        <ApplicationEditDrawer application={selectedApplication} />
      </div>
    </div>
  );
};
