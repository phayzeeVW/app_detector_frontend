import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { applicationsApi } from "../api/application_api.ts";
import type { ApplicationWithSessions } from "../types/application.ts";
import { SessionsTable } from "../components/session/SessionsTable.tsx";
import ApplicationDetails from "../components/application/ApplicationDetails.tsx";

const ApplicationViewPage = () => {
  const { id } = useParams<{ id: string }>();
  const [application, setApplication] =
    useState<ApplicationWithSessions | null>(null);
  const tableName = "applicationSessionsTable";
  const navigate = useNavigate();

  useEffect(() => {
    if (id) applicationsApi.getById(Number(id)).then(setApplication);
  }, [id]);

  if (!application) {
    return <div className="skeleton h-48 w-full rounded-box" />;
  }

  return (
    <>
      <div className="flex justify-between items-center">
        <div className="text-2xl font-bold rounded-sm border-l-4 border-l-accent">
          <span className="ml-2">{application.title}</span>
        </div>
        <ul className="menu menu-horizontal px-1 font-bold">
          <li>
            <button
              className="menu btn btn-sm btn-neutral"
              onClick={() => navigate(-1)}
            >
              {" "}
              Back to Applications
            </button>
          </li>
        </ul>
      </div>

      <ApplicationDetails application={application} />

      <div className="text-xl font-semibold mb-3 rounded-sm border-l-4 border-l-accent">
        <span className="ml-2">Sessions</span>
      </div>
      <SessionsTable
        tableName={tableName}
        sessionsList={application.sessions}
      />
    </>
  );
};

export default ApplicationViewPage;
