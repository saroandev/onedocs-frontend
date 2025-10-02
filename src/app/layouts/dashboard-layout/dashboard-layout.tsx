import { Outlet } from "react-router-dom";
import styles from "./dashboard-layout.module.scss";

export const DashboardLayout = () => {
  return (
    <div className={styles.container}>
      {/* <Sidebar className={classnames(styles.sidebar)} />
      <Header className={styles.header} /> */}
      <main className={styles.outlet}>
        <Outlet />
      </main>
      {/* <Footer className={styles.footer} /> */}
    </div>
  );
};
