type SaveSessionBadgeProps = {
  visibility: boolean;
  className?: string;
};

const SaveSessionBadge = (props: SaveSessionBadgeProps) => {
  return (
    <span
      className={`${props.className} btn btn-sm btn-soft ${props.visibility ? "btn-success" : "btn-warning"}`}
    >
      {props.visibility ? "Visible" : "Hidden"}
    </span>
  );
};

export default SaveSessionBadge;
