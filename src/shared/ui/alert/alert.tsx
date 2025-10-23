import { IconErrorCircle, IconInfo, IconSuccess, IconWarning } from "../icons";
import styles from "./alert.module.scss";
import classnames from "classnames";

export const Alert = (props: Props) => {
  const {
    variant,
    title,
    message,
    showLink = false,
    linkHref = "/",
    linkText = "Learn more",
  } = props;

  const variantClasses = {
    success: {
      container: styles.successContainer,
      icon: styles.successIcon,
    },
    error: {
      container: styles.errorContainer,
      icon: styles.errorIcon,
    },
    warning: {
      container: styles.warningContainer,
      icon: styles.warningIcon,
    },
    info: {
      container: styles.infoContainer,
      icon: styles.infoIcon,
    },
  };

  const icons = {
    success: <IconSuccess />,
    error: <IconErrorCircle />,
    warning: <IconWarning />,
    info: <IconInfo />,
  };

  return (
    <div className={classnames(styles.container, variantClasses[variant].container)}>
      <div className={styles.content}>
        <div className={classnames(styles.iconWrapper, variantClasses[variant].icon)}>
          {icons[variant]}
        </div>
        <div>
          <h4 className={styles.title}>{title}</h4>
          <p className={styles.description}>{message}</p>
          {showLink && (
            <a href={linkHref} className={styles.link}>
              {linkText}
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export interface Props {
  variant: "success" | "error" | "warning" | "info";
  title: string;
  message: string;
  showLink?: boolean;
  linkHref?: string;
  linkText?: string;
}
