import React from "react";
import { Outlet } from "react-router-dom";
import styles from "./public-layout.module.scss";

export const PublicLayout: React.FC = () => {
  return (
    <div className={styles.authLayout}>
      <Outlet />
    </div>
  );
};
