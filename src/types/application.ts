import type {SessionSummary} from "./session.ts";

export interface ApplicationWithSessions {
  id: number,
  rawgGameId: number,
  path: string,
  title: string,
  alias: string,
  saveSession: boolean,
  sessions: SessionSummary[],
}

export type ApplicationSummary = Omit<ApplicationWithSessions, "sessions"> & {
  numberOfSessions: number,
}