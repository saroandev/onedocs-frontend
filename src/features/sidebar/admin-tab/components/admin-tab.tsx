import { Button } from "@/shared/ui";
import { Building2, Settings, Users } from "lucide-react";
import { useState } from "react";
import styles from "../styles/admin-tab.module.scss";
import { AdminUserPanel } from "./admin-user-panel";
import { AdminOrgPanel } from "./admin-org-panel";
import { useUIStore } from "@/shared/store/ui.store";

export const AdminTab = () => {
  const setChoosenTab = useUIStore((state) => state.setChoosenTab);
  const [activeTab, setActiveTab] = useState("users");

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerTitle}>
          <Settings className={styles.headerIcon} />
          <h2 className={styles.title}>Yönetim</h2>
        </div>
        <Button
          label=""
          buttonType="justIcon"
          onClick={() => setChoosenTab("")}
          iconType={{ default: "close" }}
        />
      </div>

      <div className={styles.tabs}>
        <button
          onClick={() => setActiveTab("users")}
          className={`${styles.tab} ${activeTab === "users" ? styles.tabActive : ""}`}
        >
          <Users className={styles.tabIcon} />
          Kullanıcılar
          {activeTab === "users" && <div className={styles.tabIndicator} />}
        </button>
        <button
          onClick={() => setActiveTab("settings")}
          className={`${styles.tab} ${activeTab === "settings" ? styles.tabActive : ""}`}
        >
          <Building2 className={styles.tabIcon} />
          Ayarlar
          {activeTab === "settings" && <div className={styles.tabIndicator} />}
        </button>
      </div>

      <div className={styles.content}>
        {activeTab === "users" ? <AdminUserPanel /> : <AdminOrgPanel />}
      </div>
    </div>
  );
};
