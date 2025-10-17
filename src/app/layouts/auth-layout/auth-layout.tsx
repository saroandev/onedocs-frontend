import styles from "./auth-layout.module.scss";
import { Header } from "@/widgets/header";
import { Sidebar } from "@/widgets/sidebar";

export const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={styles.container}>
      <Sidebar />

      <div className={styles.mainWrapper}>
        <Header />
        <main className={styles.main}>
          <div className={styles.contentWrapper}>{children}</div>
          {/* DocumentEditor buraya gelecek */}
        </main>
      </div>
    </div>
  );
};
