type SaveSessionBadgeProps = {
  visibility: boolean;
};

const SaveSessionBadge = (props: SaveSessionBadgeProps) => {
  return (
    <span
      className={`badge badge-soft cursor-default ${props.visibility ? "badge-success" : "badge-warning"}`}
    >
      {props.visibility ? "Visible" : "Hidden"}
    </span>
  );
};

export default SaveSessionBadge;
