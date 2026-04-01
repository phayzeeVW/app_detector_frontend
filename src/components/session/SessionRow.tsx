import type {SessionSummary} from "../../types/session.ts";

export type SessionRowProps = {
  key: number,
  session: SessionSummary
}

export const SessionRow = (props: SessionRowProps) => {
  return (
    <tr className="hover:bg-base-300">
      <td>{props.session.id}</td>
      <td>{props.session.sessionStart}</td>
      <td>{props.session.sessionStop}</td>
      <td>{props.session.applicationAlias}</td>
      <td>{props.session.applicationTitle}</td>
      <td>{props.session.applicationPath}</td>
    </tr>
  )
}
