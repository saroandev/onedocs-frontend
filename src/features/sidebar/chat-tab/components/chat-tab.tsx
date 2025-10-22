import { Button, ConfirmDialog } from "@/shared/ui";
import styles from "../styles/chat-tab.module.scss";
import { useUIStore } from "@/shared/store/ui.store";
import { useGetChats } from "@/features/chat/hooks/use-get-chats";
import { Skeleton } from "@/shared/ui/skeleton/skeleton";
import { formatDate } from "@/shared/lib/dateFormatter";
import { useAppNavigation } from "@/shared/lib/navigation";
import { ROUTES } from "@/app/router/config/routes.config";
import { useState } from "react";
import { useDeleteChat } from "@/features/chat/hooks/use-delete-chat";

export const ChatTab = () => {
  const setChoosenTab = useUIStore((state) => state.setChoosenTab);
  const { data, isLoading, isError } = useGetChats();
  const { goTo } = useAppNavigation();
  const [showDeleteChatModal, setShowDeleteChatModal] = useState(false);
  const [selectedIdForDelete, setSelectedIdForDelete] = useState("");
  const [selectedNameForDelete, setSelectedNameForDelete] = useState("");

  const { mutate: deleteChat, isPending: isDeleting } = useDeleteChat();

  const handleDelete = () => {
    deleteChat(
      { conversation_id: selectedIdForDelete },
      {
        onSuccess: () => {
          setSelectedIdForDelete("");
          setShowDeleteChatModal(false);
        },
      }
    );
  };

  const handleNewChat = () => {
    setChoosenTab("");
    goTo(ROUTES.DASHBOARD);
  };

  const renderContent = () => {
    if (isError) return <div>Hata oluştu</div>;

    if (data?.total_count == 0) return <div>herhangi bi sohbet yoktur</div>;

    return data?.conversations.map((chat, index) => (
      <div
        key={chat.conversation_id}
        className={styles.chatCard}
        onClick={() => goTo(`/chat/${chat.conversation_id}`, { replace: true })}
      >
        <Button
          label="Sil"
          buttonType="justIcon"
          onClick={(e) => {
            e.stopPropagation();
            setShowDeleteChatModal(true);
            setSelectedIdForDelete(chat.conversation_id);
            setSelectedNameForDelete(`Sohbet - ${index + 1}`);
          }}
          iconType={{ default: "delete" }}
          className={styles.deleteChat}
        />
        <h3 className={styles.chatTitle}>{`Sohbet - ${index + 1}`}</h3>
        <p className={styles.chatPreview}>{chat.first_message_preview}</p>
        <p className={styles.chatTime}>
          Son Mesaj Tarihi: {formatDate(chat.last_message_at, "withText")}
        </p>
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
      {isLoading ? (
        <Skeleton />
      ) : (
        <div className={styles.content}>
          <div className={styles.actionBar}>
            <Button
              label="Yeni Sohbet"
              onClick={handleNewChat}
              buttonType={"iconWithText"}
              iconType={{ default: "message" }}
              iconTextReverse
            />
          </div>
          <div className={styles.chatList}>{renderContent()}</div>
        </div>
      )}
      {showDeleteChatModal && (
        <ConfirmDialog
          loading={isDeleting}
          open={showDeleteChatModal}
          setOpen={setShowDeleteChatModal}
          content={`"${selectedNameForDelete}" sohbetini silmek istediğinize emin misiniz?`}
          onConfirm={handleDelete}
        />
      )}
    </div>
  );
};
