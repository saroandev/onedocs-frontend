import { Button } from "@/shared/ui";
import styles from "../styles/chat-area.module.scss";
import classnames from "classnames";
import type { ConversationMessage } from "../api/chat.types";

export const ChatMessage = (props: ChatMessageProps) => {
  const { data } = props;

  // const handleMail = (data: ChatMessageType) => {
  //   const subject = encodeURIComponent("Sohbet Mesajı");
  //   const body = encodeURIComponent(data.content);
  //   window.location.href = `mailto:?subject=${subject}&body=${body}`;
  // };

  return (
    <div
      className={classnames(
        styles.messageWrapper,
        data.role == "user" ? styles.userMessage : styles.assistantMessage
      )}
    >
      <div className={classnames(styles.messageContent, data.role == "user" && styles.userContent)}>
        {data.role == "user" ? (
          <div className={styles.userBubble}>
            <div className={styles.userText}>{data.content}</div>
          </div>
        ) : (
          <div className={styles.assistantBubble}>
            <div className={styles.textContent}>{data.content}</div>
            <div className={styles.actionButtons}>
              <Button
                label="Beğen"
                buttonType="justIcon"
                iconType={{ default: "like" }}
                variant="secondary"
              />
              <Button
                label="Beğenme"
                buttonType="justIcon"
                iconType={{ default: "dislike" }}
                variant="secondary"
              />
              <Button
                label="Kopyala"
                buttonType="justIcon"
                iconType={{ default: "copy" }}
                variant="secondary"
                onClick={() => navigator.clipboard?.writeText(data.content)}
              />
              <Button
                label="E-posta"
                buttonType="justIcon"
                iconType={{ default: "mail" }}
                variant="secondary"
                // onClick={() => handleMail(data)}
              />
              <Button
                label="Editöre Ekle"
                buttonType="justIcon"
                iconType={{ default: "update" }}
                variant="secondary"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

interface ChatMessageProps {
  data: ConversationMessage;
}
