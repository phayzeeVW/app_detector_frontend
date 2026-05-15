import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {applicationsApi} from "../api/application_api.ts";
import type {ApplicationWithSessions} from "../types/application.ts";
import {SessionsTable} from "../components/session/SessionsTable.tsx";
import {FaHashtag} from "react-icons/fa6";
import {GoRelFilePath} from "react-icons/go";
import {MdOutlineTextFields} from "react-icons/md";
import SaveSessionBadge from "../components/core/SaveSessionBadge.tsx";

const ApplicationViewPage = () => {
  const {id} = useParams<{ id: string }>();
  const [application, setApplication] = useState<ApplicationWithSessions | null>(null);
  const tableName = "applicationSessionsTable";
  const navigate = useNavigate();

  useEffect(() => {
    if (id) applicationsApi.getById(Number(id)).then(setApplication);
  }, [id]);

  if (!application) {
    return <div className="skeleton h-48 w-full rounded-box"/>;
  }

  return (
    <>
      <div className="flex justify-between items-center">
        <div className="text-2xl font-bold rounded-sm border-l-4 border-l-accent">
          <span className="ml-2">{application.title}</span>
        </div>
        <ul className="menu menu-horizontal px-1 font-bold">
          <li>
            <button className="menu btn btn-sm btn-neutral drawer-button" onClick={() => navigate(-1)}> Back to
              Applications
            </button>
          </li>
        </ul>
      </div>

      <div className="card bg-base-100 shadow-sm mb-6">
        <div className="card-body">
          <h2 className="card-title">Details</h2>
          <div className="grid grid-cols-[auto_auto_1fr] gap-x-4 gap-y-2 mt-2 items-center">
            <FaHashtag className="text-base-content/60"/>
            <span className="text-base-content/60">ID</span>
            <span>{application.id}</span>

            <MdOutlineTextFields className="text-base-content/60"/>
            <span className="text-base-content/60">Title</span>
            <span>{application.title}</span>

            <span className="text-base-content/60 select-none">" "</span>
            <span className="text-base-content/60">Alias</span>
            <span>{application.alias}</span>

            <GoRelFilePath className="text-base-content/60 text-xl"/>
            <span className="text-base-content/60">Path</span>
            <span className="break-all">{application.path}</span>

            <FaHashtag className="text-base-content/60"/>
            <span className="text-base-content/60">RAWG Game ID</span>
            <span>{application.rawgGameId}</span>

            <span></span>
            <span className="text-base-content/60">Visibility</span>
            <SaveSessionBadge visibility={application.saveSession}/>
          </div>
        </div>
      </div>

      <div className="text-xl font-semibold mb-3 rounded-sm border-l-4 border-l-accent">
        <span className="ml-2">Sessions</span>
      </div>
      <SessionsTable tableName={tableName} sessionsList={application.sessions}/>
    </>
  );
};

export default ApplicationViewPage;
