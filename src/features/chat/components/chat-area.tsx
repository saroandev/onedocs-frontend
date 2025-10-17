/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useRef } from "react";
import styles from "../styles/chat-area.module.scss";
import { ChatMessage } from "./chat-message";
import { useGetChatById } from "../hooks/use-get-chatById";

export const ChatArea = () => {
  const { data, isLoading, isError, error } = useGetChatById();
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [data]);

  // console.log({ data });

  if (isError) return <div>Hata oluştu</div>;

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className={styles.messagesContainer}>
          <div className={styles.loadingMessageWrapper}>
            <div className={styles.loadingBubble}>
              <div className={styles.loadingDots}>
                <span className={styles.dot1}></span>
                <span className={styles.dot2}></span>
                <span className={styles.dot3}></span>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (data?.messages.length === 0 || !data) {
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

    return (
      <div className={styles.messagesContainer}>
        {data?.messages.map((message) => (
          <ChatMessage data={message} key={message.message_id} />
        ))}
        <div ref={bottomRef} />
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.contentWrapper}>
        <div className={styles.contentPadding}>{renderContent()}</div>
      </div>
    </div>
  );
};
