import {SessionsTable} from "../components/session/SessionsTable.tsx";
import {useEffect, useState} from "react";
import {sessionsApi} from "../api/session_api.ts";
import type {SessionSummary} from "../types/session.ts";

const SessionsPage = () => {
  const [sessionsList, setSessionsList] = useState<SessionSummary[]>();
  const tableName = "sessionsTable";

  useEffect(() => {
    sessionsApi.getAllSessionsSummary().then(setSessionsList);
  }, []);

  return (
    <>
      <div className="text-2xl font-bold mb-4">Sessions</div>
      <SessionsTable sessionsList={sessionsList} tableName={tableName}/>
    </>
  )
}

export default SessionsPage
