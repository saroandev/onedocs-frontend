/* eslint-disable @typescript-eslint/no-unused-vars */
import classnames from "classnames";
import styles from "./loading.module.scss";
import { Disc3, LoaderPinwheel, Shell } from "lucide-react";

export const Loading = (props: Props) => {
  const { className } = props;

  return (
    <div className={classnames(styles.container, className)}>
      <Disc3 className={styles.loading} />
      {/* <LoaderPinwheel className={styles.loading} /> */}
      {/* <Shell className={styles.loading} /> */}
    </div>
  );
};

export interface Props {
  className?: string;
}
