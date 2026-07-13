import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { applicationsApi } from "../api/application_api.ts";
import type { ApplicationWithSessions } from "../types/application.ts";
import { SessionsTable } from "../components/session/SessionsTable.tsx";
import ApplicationDetails from "../components/application/ApplicationDetails.tsx";
import { calculateTotalPlayTime } from "../shared/utils.ts";

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
        <div className="rounded-sm border-l-4 border-l-accent flex items-center">
          <span className="text-2xl font-bold ml-2">{application.title}</span>
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

      <div className="mb-2">
        <span className="text-xl text-base-content/60 ml-2">
          Total playtime: {calculateTotalPlayTime(application)}
        </span>
      </div>

      <ApplicationDetails application={application} />

      <SessionsTable
        tableName={tableName}
        sessionsList={application.sessions}
      />
    </>
  );
};

export default ApplicationViewPage;
