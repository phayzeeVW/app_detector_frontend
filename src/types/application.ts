import type { SessionSummary } from "./session.ts";

export interface ApplicationWithoutSessions {
  id: number;
  rawgGameId: number;
  path: string;
  title: string;
  alias: string;
  saveSession: boolean;
  numberOfSessions: number;
}

export interface ApplicationWithSessions extends ApplicationWithoutSessions {
  sessions: SessionSummary[];
}
