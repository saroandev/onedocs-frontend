import { IconGrid } from "../icons";
import styles from "./grid-shape.module.scss";

export const GridShape = () => {
  return (
    <div className={styles.container}>
      <div className={styles.rightCorner}>
        <IconGrid />
      </div>
      <div className={styles.leftCorner}>
        <IconGrid />
      </div>
    </div>
  );
};
