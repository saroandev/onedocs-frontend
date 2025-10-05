import React from "react";
import { Outlet } from "react-router-dom";
import styles from "./auth-layout.module.scss";
import { Header } from "@/widgets/header";
import { Sidebar } from "@/widgets/sidebar";

export const AuthLayout: React.FC = () => {
  return (
    <div className={styles.container}>
      <Sidebar />

      <div className={styles.mainWrapper}>
        <Header />

        <main className={styles.main}>
          <div className={styles.mainContent}>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};
