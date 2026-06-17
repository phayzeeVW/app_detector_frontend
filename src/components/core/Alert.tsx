import { useEffect, useState } from "react";

interface AlertProps {
  type: "success" | "error" | "warning" | "info";
  message: string;
  duration?: number;
  className?: string;
  onClose?: () => void;
}

const alertTypeClass: Record<AlertProps["type"], string> = {
  success: "alert-success",
  error: "alert-error",
  warning: "alert-warning",
  info: "alert-info",
};

const Alert = (props: AlertProps) => {
  const [showAlert, setShowAlert] = useState(true);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setShowAlert(false);
      props.onClose?.();
    }, props.duration ?? 3000);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [props, props.duration, props.onClose]);

  if (!showAlert) {
    return null;
  }

  return (
    <div
      role="alert"
      className={`alert ${alertTypeClass[props.type]} ${props.className ?? ""}`}
    >
      <span>{props.message}</span>
    </div>
  );
};

export default Alert;
