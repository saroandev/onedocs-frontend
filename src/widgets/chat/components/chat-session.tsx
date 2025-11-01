import { useEffect, useRef } from "react";
import styles from "../styles/chat-session.module.scss";
import {
  useGetChat,
  useChatStore,
  ChatAssistantMessage,
  ChatUserMessage,
  useGetSource,
} from "@/features/chat";
import { useAppNavigation } from "@/shared/lib/navigation";
import { ROUTES } from "@/app/router/config/routes.config";
import { Skeleton } from "@/shared/ui";
import { Shell } from "lucide-react";
import { useParams } from "react-router-dom";

export const ChatSession = () => {
  const { conversationId } = useParams<{ conversationId: string }>();
  const { goTo } = useAppNavigation();
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const isCreatingMessage = useChatStore((state) => state.isCreatingMessage);
  const { data, isLoading, isError, error } = useGetChat();
  const lastAssistantMessageId = useChatStore((state) => state.lastAssistantMessageId);
  const { mutate: getSource } = useGetSource();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [data?.messages, isCreatingMessage]);

  useEffect(() => {
    if (isError && error) {
      goTo(ROUTES.DASHBOARD, { replace: true });
    }
  }, [isError, error]);

  if ((!data || data?.messages.length === 0) && !isCreatingMessage && !conversationId) {
    return (
      <div className={styles.container}>
        <div className={styles.wrapper}>
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
        </div>
      </div>
    );
  }

  if (isLoading && conversationId) {
    return (
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <Skeleton />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.messagesContainer}>
          {data?.messages.map((message) => {
            if (message.role === "user") {
              return <ChatUserMessage data={message.content} key={message.message_id} />;
            }

            // Debug: Assistant message sources
            console.log("🔍 Assistant message:", {
              message_id: message.message_id,
              sources: message.sources,
              sourcesLength: message.sources?.length,
            });

            return (
              <ChatAssistantMessage
                data={message.content}
                key={message.message_id}
                isNew={message.message_id === lastAssistantMessageId}
                isLoading={isCreatingMessage}
                sources={message?.sources}
                getSource={getSource}
              />
            );
          })}
          {isCreatingMessage && conversationId && <Shell className={styles.loading} />}
          <div ref={bottomRef} />
        </div>
      </div>
    </div>
  );
};
