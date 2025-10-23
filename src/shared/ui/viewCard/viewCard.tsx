import classnames from "classnames";
import styles from "./viewCard.module.scss";
import { IconEmpty } from "../icons";

export const ViewCard = (props: Props) => {
  const { className, description, title, children } = props;

  if (children) {
    return (
      <div className={styles.containerWithCard}>
        {title && (
          <div className={styles.header}>
            <h3 className={styles.title}>{title}</h3>
            {description && <p className={styles.description}>{description}</p>}
          </div>
        )}
        <div className={classnames(styles.content, className)}>{children}</div>
      </div>
    );
  }

  return (
    <div className={classnames(styles.containerWithEmptyCard, className)}>
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
      </div>
      <div className={styles.icon}>
        <IconEmpty />
      </div>
    </div>
  );
};

export interface Props {
  className?: string;
  title?: string;
  description?: string;
  children?: React.ReactNode | null | undefined;
}
