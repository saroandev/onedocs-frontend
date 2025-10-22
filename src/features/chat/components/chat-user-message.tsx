import styles from "../styles/chat-area.module.scss";
import classnames from "classnames";

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
