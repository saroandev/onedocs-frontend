import { Button } from "@/shared/ui";
import { MessageSquare, X } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import classNames from "classnames";
import styles from "./chat-tab.module.scss";

export const ChatTab = (props: ChatTabProps) => {
  const { setChoosenTab } = props;

  const todayChats = [
    {
      id: "1",
      title: "Sözleşme İncelemesi",
      preview: "SaaS sözleşmesindeki önemli maddeleri analiz ettik...",
      time: "15 dakika önce",
    },
  ];

  const yesterdayChats = [
    {
      id: "2",
      title: "İş Hukuku Danışma",
      preview: "İş sözleşmesi fesih koşulları hakkında...",
      time: "Dün, 14:30",
    },
    {
      id: "3",
      title: "Ticari Sözleşme",
      preview: "Tedarik sözleşmesindeki teslimat koşulları...",
      time: "Dün, 10:15",
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h2 className={styles.title}>Sohbet Geçmişi</h2>
          <p className={styles.subtitle}>Geçmiş sohbetlerinizi görüntüleyin</p>
        </div>
        <Button
          size="icon"
          variant="ghost"
          className={styles.closeButton}
          onClick={() => setChoosenTab(uuidv4())}
        >
          <X className={styles.closeIcon} />
        </Button>
      </div>

      <div className={styles.content}>
        <div className={styles.actionBar}>
          <Button
            size="sm"
            className={styles.newChatButton}
            onClick={() => {
              setChoosenTab(uuidv4());
              window.location.href = "/";
            }}
          >
            <MessageSquare className={styles.buttonIcon} />
            Yeni Sohbet
          </Button>
        </div>

        <div className={styles.sectionHeader}>
          <span className={styles.sectionTitle}>Bugün</span>
        </div>

        <div className={styles.chatList}>
          {todayChats.map((chat) => (
            <div key={chat.id} className={styles.chatCard}>
              <h3 className={styles.chatTitle}>{chat.title}</h3>
              <p className={styles.chatPreview}>{chat.preview}</p>
              <p className={styles.chatTime}>{chat.time}</p>
            </div>
          ))}
        </div>

        <div className={classNames(styles.sectionHeader, styles.sectionHeaderSpaced)}>
          <span className={styles.sectionTitle}>Dün</span>
        </div>

        <div className={styles.chatList}>
          {yesterdayChats.map((chat) => (
            <div key={chat.id} className={styles.chatCard}>
              <h3 className={styles.chatTitle}>{chat.title}</h3>
              <p className={styles.chatPreview}>{chat.preview}</p>
              <p className={styles.chatTime}>{chat.time}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

interface ChatTabProps {
  setChoosenTab: (val: string) => void;
}
