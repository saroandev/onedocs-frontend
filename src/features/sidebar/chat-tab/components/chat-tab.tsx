import { Button } from "@/shared/ui";
import classNames from "classnames";
import styles from "../styles/chat-tab.module.scss";
import { todayChats, yesterdayChats } from "../constants/chat-tab-config";
import { useUIStore } from "@/shared/store/ui.store";
import { useGetAllChats } from "@/features/chat/hooks/use-get-allChats";

export const ChatTab = () => {
  const setChoosenTab = useUIStore((state) => state.setChoosenTab);
  // const { data, isLoading, isError, error } = useGetAllChats();

  // if (isError) return <div>Hata oluştu</div>;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h2 className={styles.title}>Sohbet Geçmişi</h2>
          <p className={styles.subtitle}>Geçmiş sohbetlerinizi görüntüleyin</p>
        </div>
        <Button
          label=""
          buttonType="justIcon"
          onClick={() => setChoosenTab("")}
          iconType={{ default: "close" }}
        />
      </div>
      <div className={styles.content}>
        <div className={styles.actionBar}>
          <Button
            label="Yeni Sohbet"
            onClick={() => {
              setChoosenTab("");
            }}
            buttonType={"iconWithText"}
            iconType={{ default: "message" }}
            iconTextReverse
          />
        </div>

        {/* <div className={styles.sectionHeader}>
          <span className={styles.sectionTitle}>Bugün</span>
        </div> */}

        <div className={styles.chatList}>
          {todayChats.map((chat) => (
            <div key={chat.id} className={styles.chatCard}>
              <h3 className={styles.chatTitle}>{chat.title}</h3>
              <p className={styles.chatPreview}>{chat.preview}</p>
              <p className={styles.chatTime}>{chat.time}</p>
            </div>
          ))}
        </div>

        {/* <div className={classNames(styles.sectionHeader, styles.sectionHeaderSpaced)}>
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
        </div> */}
      </div>
    </div>
  );
};
