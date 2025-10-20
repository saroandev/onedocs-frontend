import { useEffect, useRef } from "react";
import styles from "../styles/chat-area.module.scss";
import { ChatMessage } from "./chat-message";
import { useGetChat } from "../hooks";
import { useParams } from "react-router-dom";
import { useChatStore } from "../store/chat.store";
import { useAppNavigation } from "@/shared/lib/navigation";
import { ROUTES } from "@/app/router/config/routes.config";
import { Skeleton } from "@/shared/ui";

export const ChatArea = () => {
  const { conversationId } = useParams<{ conversationId: string }>();
  const { data, isLoading, isError, error } = useGetChat();
  const isCreatingMessage = useChatStore((state) => state.isCreatingMessage);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const { goTo } = useAppNavigation();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [data?.messages, isCreatingMessage]);

  useEffect(() => {
    if (isError && error) {
      goTo(ROUTES.DASHBOARD, { replace: true });
    }
  }, [isError, error]);

  const renderContent = () => {
    // Loading: Sadece conversation history fetch edilirken
    // (sayfa yenileme veya başka sekmeden açma)
    if (isLoading && conversationId) {
      return <Skeleton />;
    }

    // Empty state (yeni chat başlangıcı - conversationId yok)
    if (!conversationId || !data || data.messages.length === 0) {
      return (
        <div className={styles.emptyStateContainer}>
          <div className={styles.emptyStateContent}>
            <div className={styles.emptyStateHeader}>
              <div className={styles.titleWrapper}>
                <h1 className={styles.mainTitle}>hukuk-asistani</h1>
              </div>
              <p className={styles.subtitle}>
                Hukuk Asistanı; sorularınızı yanıtlar, metinleri özetler, dilekçe ve sözleşme
                taslakları oluşturur, ilgili mevzuat ve emsal kararlara yönlendirir. Kısaca, günlük
                hukuki işlerinizi hızlandırmak için yanınızdadır
              </p>
            </div>
          </div>
        </div>
      );
    }

    // Messages state (conversation var ve mesajlar yüklendi)
    return (
      <div className={styles.messagesContainer}>
        {data?.messages.map((message) => (
          <ChatMessage data={message} key={message.message_id} />
        ))}

        {/* Yeni mesaj gönderilirken loading göster */}
        {isCreatingMessage && (
          <div className={styles.loadingMessageWrapper}>
            <div className={styles.loadingBubble}>
              <div className={styles.loadingDots}>
                <span className={styles.dot1}></span>
                <span className={styles.dot2}></span>
                <span className={styles.dot3}></span>
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>{renderContent()}</div>
    </div>
  );
};
