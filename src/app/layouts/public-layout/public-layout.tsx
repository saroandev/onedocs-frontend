import styles from "./public-layout.module.scss";
import AppLogo from "@/shared/assets/icons/onedocs.png";

export const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.header}>
          <div className={styles.logoWrapper}>
            <img src={AppLogo} alt="Onedocs Logo" />
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};
