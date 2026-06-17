import type { ApplicationWithoutSessions } from "../../types/application.ts";
import { applicationsApi } from "../../api/application_api.ts";
import { useEffect, useState } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import { DataTable } from "../core/DataTable";
import { MdEdit, MdRemoveRedEye } from "react-icons/md";
import { Link } from "react-router-dom";
import { ApplicationEditDrawer } from "./ApplicationEditDrawer.tsx";
import SaveSessionButton from "../core/SaveSessionButton.tsx";

const columnHelper = createColumnHelper<ApplicationWithoutSessions>();
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
      maxSize: 200,
      header: "Path",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("saveSession", {
      header: "Visibility",
      cell: (info) => (
        <SaveSessionButton
          onClick={() => onSaveSessionButtonClick(info.cell.row.original)}
          visibility={info.getValue()}
        />
      ),
    }),
    columnHelper.accessor((row) => row.numberOfSessions, {
      header: "Number of sessions",
      cell: (info) => info.getValue(),
    }),
    columnHelper.display({
      id: "edit",
      header: "",
      cell: ({ row }) => (
        <button className="btn btn-circle btn-info btn-soft rounded-md">
          <label
            htmlFor="edit-drawer"
            className="cursor-pointer"
            aria-label="Edit"
            onClick={() => setSelectedApplication(row.original)}
          >
            <MdEdit size={25} />
          </label>
        </button>
      ),
      enableSorting: false,
      enableHiding: false,
    }),
    columnHelper.display({
      id: "details",
      header: "",
      cell: ({ row }) => (
        <button
          className="btn btn-circle btn-accent btn-soft rounded-md"
          data-tip="View details"
        >
          <Link
            to={`/applications/id/${row.original.id}`}
            className=""
            aria-label="Open details"
          >
            <MdRemoveRedEye size={25} />
          </Link>
        </button>
      ),
      enableSorting: false,
      enableHiding: false,
    }),
  ];

  const [applicationsList, setApplicationsList] =
    useState<ApplicationWithoutSessions[]>();
  const [selectedApplication, setSelectedApplication] =
    useState<ApplicationWithoutSessions | null>(null);

  const onSaveSessionButtonClick = (
    application: ApplicationWithoutSessions,
  ) => {
    const updatedApplication = {
      ...application,
      saveSession: !application.saveSession,
    };

    applicationsApi.update(updatedApplication).then(() => {
      setApplicationsList((currentApplications) =>
        currentApplications?.map((app) =>
          app.id === updatedApplication.id ? updatedApplication : app,
        ),
      );
    });
  };

  const handleApplicationUpdated = (
    updatedApplication: ApplicationWithoutSessions,
  ) => {
    setApplicationsList((currentApplications) =>
      currentApplications?.map((app) =>
        app.id === updatedApplication.id ? updatedApplication : app,
      ),
    );

    setSelectedApplication(updatedApplication);
  };

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
      </div>
      <div className="drawer-side">
        <label htmlFor="edit-drawer" className="drawer-overlay"></label>
        {selectedApplication && (
          <ApplicationEditDrawer
            application={selectedApplication}
            onUpdated={handleApplicationUpdated}
          />
        )}
      </div>
    </div>
  );
};
