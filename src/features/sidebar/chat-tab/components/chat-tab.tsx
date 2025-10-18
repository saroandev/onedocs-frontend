import { Button } from "@/shared/ui";
import styles from "../styles/chat-tab.module.scss";
import { useUIStore } from "@/shared/store/ui.store";
import { useGetAllChats } from "@/features/chat/hooks/use-get-allChats";
import { Skeleton } from "@/shared/ui/skeleton/skeleton";
import { formatDate } from "@/shared/lib/dateFormatter";
import { useAppNavigation } from "@/shared/lib/navigation";

export const ChatTab = () => {
  const setChoosenTab = useUIStore((state) => state.setChoosenTab);
  const { data, isLoading, isError } = useGetAllChats();
  const { goTo } = useAppNavigation();

  const renderContent = () => {
    if (isError) return <div>Hata oluştu</div>;

    if (data?.total_count == 0) return <div>herhangi bi sohbet yoktur</div>;

    return data?.conversations.map((chat, index) => (
      <div
        key={chat.conversation_id}
        className={styles.chatCard}
        onClick={() => goTo(`/chat/${chat.conversation_id}`, { replace: true })}
      >
        <h3 className={styles.chatTitle}>{`Sohbet - ${index + 1}`}</h3>
        <p className={styles.chatPreview}>{chat.first_message_preview}</p>
        <p className={styles.chatTime}>{formatDate(chat.started_at, "withText")}</p>
      </div>
    ));
  };

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
      {isLoading ? ( //TODO
        <Skeleton variant="list" />
      ) : (
        <div className={styles.content}>
          <div className={styles.actionBar}>
            <Button
              label="Yeni Sohbet"
              onClick={() => setChoosenTab("")}
              buttonType={"iconWithText"}
              iconType={{ default: "message" }}
              iconTextReverse
            />
          </div>
          <div className={styles.chatList}>{renderContent()}</div>
        </div>
      )}
    </div>
  );
};
