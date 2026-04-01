import type {Application} from "../../types/application.ts";
import {ApplicationRow} from "./ApplicationRow.tsx";
import {applicationsApi} from "../../api/application.ts";
import {useEffect, useState} from "react";

export const ApplicationTable = () => {
  const [applicationList, setApplicationList] = useState<Application[]>();

  useEffect(() => {
    applicationsApi.getAll().then(r => {
      setApplicationList(r)
    });
  }, [])

  if (!applicationList) {
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
    );
  }

  return (
    <div className="overflow-x-auto rounded-box border border-base-content/10 bg-base-200">
      <table className="table">
        <thead className="">
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Alias</th>
            <th>Path</th>
            <th>Save session</th>
          </tr>
        </thead>

        <tbody>
        {applicationList && applicationList.map((application) => {
          return <ApplicationRow key={application.id} application={application} />;
        })}
        </tbody>
      </table>
    </div>
  )
}