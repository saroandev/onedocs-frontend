import {
  SIDEBAR_MENU_BOTTOM,
  SIDEBAR_MENU_IDS,
  SIDEBAR_MENU_TOP,
} from "../constants/sidebar-config";
import { TabItem } from "@/widgets/sidebar/components/tab-item";
import { Link } from "react-router-dom";
import styles from "./sidebar-list.module.scss";
import { CollectionTab } from "@/features/sidebar/collection-tab";
import { PlaybookTab } from "@/features/sidebar/playbook-tab";
import { TemplateTab } from "@/features/sidebar/template-tab";
import { TableTab } from "@/features/sidebar/table-tab";
import { ChatTab } from "@/features/sidebar/chat-tab";
import { TimetrackTab } from "@/features/sidebar/timetrack-tab";
import { AdminTab } from "@/features/sidebar/admin-tab";
import { ProfileTab } from "@/features/sidebar/profile-tab";
import { useUIStore } from "@/shared/store/ui.store";

export const SidebarList = () => {
  const choosenTab = useUIStore((state) => state.choosenTab);

  return (
    <aside className={styles.container}>
      <div className={styles.tabs}>
        <div className={styles.top}>
          <Link to="/" className={styles.logo}>
            <img
              src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/Group-1758453889486.png"
              alt="Logo"
            />
          </Link>
          {SIDEBAR_MENU_TOP.map((item) => (
            <TabItem
              icon={item.icon}
              label={item.label}
              onClick={() => setChoosenTab(item.id)}
              selected={choosenTab == item.id}
              key={item.id}
            />
          ))}
        </div>
        <div className={styles.bottom}>
          {SIDEBAR_MENU_BOTTOM.map((item) => (
            <TabItem
              icon={item.icon}
              label={item.label}
              onClick={() => setChoosenTab(item.id)}
              selected={choosenTab == item.id}
              key={item.id}
            />
          ))}
        </div>
      </div>
      {choosenTab == SIDEBAR_MENU_IDS.COLLECTION && <CollectionTab />}

      {choosenTab == SIDEBAR_MENU_IDS.PLAYBOOK && <PlaybookTab />}

      {choosenTab == SIDEBAR_MENU_IDS.TEMPLATE && <TemplateTab />}

      {choosenTab == SIDEBAR_MENU_IDS.TABLE && <TableTab />}

      {choosenTab == SIDEBAR_MENU_IDS.CHAT && <ChatTab />}

      {choosenTab == SIDEBAR_MENU_IDS.TIME_TRACK && <TimetrackTab />}

      {choosenTab == SIDEBAR_MENU_IDS.ADMIN && <AdminTab />}

      {choosenTab == SIDEBAR_MENU_IDS.PROFILE && <ProfileTab />}
    </aside>
  );
};
