import { Outlet } from "react-router-dom";
import styles from "./auth-layout.module.scss";
import { Header } from "@/widgets/header";
import { Sidebar } from "@/widgets/sidebar";

export const AuthLayout = () => {
  return (
    <div className={styles.container}>
      {/* <div className={styles.sidebarWrapper}>
        <div className={styles.sidebarDesktop}>
          <Sidebar />
        </div>
      </div> */}

      <Sidebar />

      <div className={styles.mainWrapper}>
        <Header />

        <main className={styles.main}>
          <div className={styles.contentWrapper}>
            <Outlet />
          </div>
          {/* DocumentEditor buraya gelecek */}
        </main>
      </div>
    </div>
  );
};
