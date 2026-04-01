import type {Application} from "../../types/application.ts";

export type ApplicationRowProps = {
  key: number,
  application: Application
}

export const ApplicationRow = (props: ApplicationRowProps) => {
  return (
    <tr className="hover:bg-base-300">
      <td>{props.application.id}</td>
      <td>{props.application.title}</td>
      <td>{props.application.alias}</td>
      <td>{props.application.path}</td>
      <td>{props.application.saveSession.toString()}</td>
    </tr>
  )
}