import classnames from "classnames";
import styles from "@/widgets/chat/styles/chat-session.module.scss";

export const ChatUserMessage = (props: ChatUserMessageProps) => {
  const { data } = props;

  return (
    <div className={classnames(styles.messageWrapper, styles.userMessage)}>
      <div className={classnames(styles.messageContent, styles.userContent)}>
        <div className={styles.userBubble}>
          <div className={styles.userText}>{data}</div>
        </div>
      </div>
    </div>
  );
};

interface ChatUserMessageProps {
  data: string;
}
