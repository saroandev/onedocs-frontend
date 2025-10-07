import { UserSection } from "./components/user-section";
import { SIDEBAR_MENU, SIDEBAR_MENU_IDS } from "./constants/sidebar-config";
import { TabItem } from "@/widgets/sidebar/components/tab-item";
import { Link } from "react-router-dom";
import { useState } from "react";
import { PlaybookTab } from "./components/playbook-tab";
import { CollectionTab } from "./components/collection-tab";
import { TemplateTab } from "./components/template-tab";
import { TableTab } from "./components/table-tab";
import { ChatTab } from "./components/chat-tab";
import styles from "./sidebar.module.scss";

export const Sidebar = () => {
  const [choosenTab, setChoosenTab] = useState("");

  return (
    <div className={styles.sidebarContainer}>
      <div className={styles.rail}>
        <div className={styles.railTop}>
          <Link to="/" className={styles.logoLink}>
            <img
              src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/Group-1758453889486.png"
              alt="Logo"
              className={styles.logo}
            />
          </Link>
          {SIDEBAR_MENU.map((item) => (
            <TabItem
              icon={item.icon}
              label={item.label}
              onClick={() => setChoosenTab(item.id)}
              selected={choosenTab == item.id}
              key={item.id}
            />
          ))}
        </div>
        <UserSection />
      </div>

      <CollectionTab choosenTab={choosenTab} setChoosenTab={setChoosenTab} />

      {choosenTab == SIDEBAR_MENU_IDS.PLAYBOOK && <PlaybookTab setChoosenTab={setChoosenTab} />}

      {choosenTab == SIDEBAR_MENU_IDS.TEMPLATE && <TemplateTab setChoosenTab={setChoosenTab} />}

      {choosenTab == SIDEBAR_MENU_IDS.TABLE && <TableTab setChoosenTab={setChoosenTab} />}

      {choosenTab == SIDEBAR_MENU_IDS.CHAT && <ChatTab setChoosenTab={setChoosenTab} />}
    </div>
  );
};
