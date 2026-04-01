import type {Session} from "./session.ts";

export interface Application {
  id: number,
  rawgGameId: number,
  path: string,
  title: string,
  alias: string,
  saveSession: boolean,
  sessions: Session[],
}