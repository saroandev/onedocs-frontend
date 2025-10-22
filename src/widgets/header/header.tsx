// import { CirclePlus } from "lucide-react";
import styles from "./header.module.scss";

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.titleContainer}>
        {/* <h2 className={styles.title}>headerTitle</h2> */}
      </div>

      {/* <div className={styles.actions}>
        <div
          // variant="ghost"
          // size="icon"
          className={styles.actionButton}
          aria-label="Yeni Sohbet"
          title="Yeni Sohbet"
          onClick={() => console.log("handleNewChat")}
        >
          <CirclePlus className={styles.actionIcon} />
        </div>
      </div> */}
    </header>
  );
};
