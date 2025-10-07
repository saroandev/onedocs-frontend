import classnames from "classnames";
import styles from "./alert.module.scss";

interface AlertProps extends React.ComponentProps<"div"> {
  variant?: "default" | "destructive";
}

function Alert({ className, variant = "default", ...props }: AlertProps) {
  return (
    <div
      data-slot="alert"
      data-variant={variant}
      role="alert"
      className={classnames(styles.alert, className)}
      {...props}
    />
  );
}

function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="alert-title" className={classnames(styles.title, className)} {...props} />;
}

function AlertDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-description"
      className={classnames(styles.description, className)}
      {...props}
    />
  );
}

export { Alert, AlertTitle, AlertDescription };
