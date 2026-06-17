type SaveSessionButtonProps = {
  visibility: boolean;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
};

const SaveSessionButton = (props: SaveSessionButtonProps) => {
  return (
    <button
      disabled={props.disabled}
      onClick={props.onClick}
      className={`${props.className} btn btn-sm btn-soft ${props.visibility ? "btn-success" : "btn-warning"}`}
    >
      {props.visibility ? "Visible" : "Hidden"}
    </button>
  );
};

export default SaveSessionButton;
