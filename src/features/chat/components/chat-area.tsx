import { useEffect, useRef } from "react";
import styles from "../styles/chat-area.module.scss";
import { ChatAssistantMessage } from "./chat-assistant-message";
import { useGetChat } from "../hooks";
import { useChatStore } from "../store/chat.store";
import { useAppNavigation } from "@/shared/lib/navigation";
import { ROUTES } from "@/app/router/config/routes.config";
import { Skeleton } from "@/shared/ui";
import { ChatUserMessage } from "./chat-user-message";
import { Shell } from "lucide-react";

export const ChatArea = (props: ChatAreaProps) => {
  const { conversationId } = props;
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
    // Loading: Sadece conversation history fetch edilirken (sayfa yenileme veya başka sekmeden açma)
    if (isLoading && conversationId) {
      return <Skeleton />;
    }

    // Empty state (yeni chat başlangıcı - conversationId yok)
    if (!conversationId) {
      if ((!data || data?.messages.length === 0) && !isCreatingMessage) {
        return (
          <div className={styles.emptyStateContainer}>
            <div className={styles.emptyStateContent}>
              <div className={styles.emptyStateHeader}>
                <div className={styles.titleWrapper}>
                  <h1 className={styles.mainTitle}>Hukuk Asistani</h1>
                </div>
                <p className={styles.subtitle}>
                  Hukuk Asistanı; sorularınızı yanıtlar, metinleri özetler, dilekçe ve sözleşme
                  taslakları oluşturur, ilgili mevzuat ve emsal kararlara yönlendirir. Kısaca,
                  günlük hukuki işlerinizi hızlandırmak için yanınızdadır
                </p>
              </div>
            </div>
          </div>
        );
      }
    }

    return (
      <div className={styles.messagesContainer}>
        {data?.messages.map((message) =>
          message.role === "user" ? (
            <ChatUserMessage data={message.content} key={message.message_id} />
          ) : (
            <ChatAssistantMessage data={message.content} key={message.message_id} />
          )
        )}
        {isCreatingMessage && <Shell className={styles.loading} />}
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

interface ChatAreaProps {
  conversationId: string | undefined;
}
