import {useEffect, useState} from "react";
import {sessionsApi} from "../../api/session.ts";
import { SessionRow } from "./SessionRow.tsx";
import type {SessionSummary} from "../../types/session.ts";

export const SessionsTable = () => {
  const [sessionList, setSessionList] = useState<SessionSummary[]>();

  useEffect(() => {
    sessionsApi.getAllSessionsSummary().then(r => {
      setSessionList(r)
    });
  }, [])

  if (!sessionList) {
    return (
      <div className="min-h-screen overflow-x-auto rounded-box border border-base-content/10 bg-base-200 p-4">
        <div className="animate-pulse space-y-3">
          {
            Array.from({length: 20}).map(() => (
              <div className="h-10 w-full rounded bg-base-300" />
            ))
          }
        </div>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto rounded-box border border-base-content/10 bg-base-200">
      <table className="table">
        <thead className="">
        <tr>
          <th>ID</th>
          <th>Start</th>
          <th>Stop</th>
          <th>Alias</th>
          <th>Title</th>
          <th>Path</th>
        </tr>
        </thead>

        <tbody>
        {sessionList && sessionList.map(session => {
          return <SessionRow key={session.id} session={session}/>
        })}
        </tbody>
      </table>
    </div>
  )
}