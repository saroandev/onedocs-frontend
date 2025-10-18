import classnames from "classnames";
import styles from "./skeleton.module.scss";

export const Skeleton = (props: SkeletonProps) => {
  const { className, variant = "default", lines = 4, animated = true } = props;

  const renderLines = (count: number, withVariation: boolean = true) => {
    return Array.from({ length: count }, (_, index) => (
      <div
        key={index}
        className={classnames(styles.line, styles.skeleton, !animated && styles.static)}
        style={
          withVariation
            ? {
                width: `${Math.random() * 40 + 40}%`,
                ...(index === count - 1 && { width: "70%" }),
              }
            : undefined
        }
      />
    ));
  };

  const renderVariant = () => {
    switch (variant) {
      case "article":
        return (
          <>
            <div className={styles.content}>
              <div className={styles.header}>
                <div
                  className={classnames(styles.avatar, styles.skeleton, !animated && styles.static)}
                />
                <div className={styles.headerInfo}>
                  <div
                    className={classnames(
                      styles.title,
                      styles.skeleton,
                      !animated && styles.static
                    )}
                  />
                  <div
                    className={classnames(
                      styles.subtitle,
                      styles.skeleton,
                      !animated && styles.static
                    )}
                  />
                </div>
              </div>
              <div className={styles.body}>{renderLines(3)}</div>
            </div>
          </>
        );

      case "card":
        return (
          <div className={styles.content}>
            <div
              className={classnames(styles.image, styles.skeleton, !animated && styles.static)}
            />
            <div className={styles.cardBody}>
              <div
                className={classnames(
                  styles.cardTitle,
                  styles.skeleton,
                  !animated && styles.static
                )}
              />
              {renderLines(2)}
            </div>
          </div>
        );

      case "list":
        return (
          <>
            {Array.from({ length: lines || 4 }, (_, index) => (
              <div key={index} className={styles.listItem}>
                <div
                  className={classnames(
                    styles.listAvatar,
                    styles.skeleton,
                    !animated && styles.static
                  )}
                />
                <div className={styles.listContent}>
                  <div
                    className={classnames(
                      styles.listTitle,
                      styles.skeleton,
                      !animated && styles.static
                    )}
                  />
                  <div
                    className={classnames(
                      styles.listSubtitle,
                      styles.skeleton,
                      !animated && styles.static
                    )}
                  />
                </div>
              </div>
            ))}
          </>
        );

      default:
        return (
          <>
            {Array.from({ length: 2 }, (_, contentIndex) => (
              <div key={contentIndex} className={styles.content}>
                <div className={styles.section}>{renderLines(contentIndex === 0 ? 2 : lines)}</div>
                <div className={styles.section}>{renderLines(contentIndex === 0 ? 2 : lines)}</div>
              </div>
            ))}
          </>
        );
    }
  };

  return (
    <div className={classnames(styles.container, styles[variant], className)}>
      {renderVariant()}
    </div>
  );
};

export interface SkeletonProps {
  className?: string;
  variant?: "default" | "article" | "card" | "list";
  lines?: number;
  animated?: boolean;
}
