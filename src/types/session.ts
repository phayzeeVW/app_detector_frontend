export interface Session {
  id: number,
  sessionStart: string,
  sessionStop: string,
  applicationId: number,
}

export interface SessionSummary extends Session {
  applicationTitle: string,
  applicationAlias: string,
  applicationPath: string,
}