import styles from "./styles/chat.module.scss";
import { ChatPrompt } from "@/widgets/chat/components/chat-prompt";
import { useParams } from "react-router-dom";
import classnames from "classnames";
import { ChatSession } from "./components/chat-session";

export const Chat = () => {
  const { conversationId } = useParams<{ conversationId: string }>();

  return (
    <div
      className={classnames(styles.container, {
        [styles.hasConversation]: conversationId,
        [styles.noConversation]: !conversationId,
      })}
    >
      <div className={styles.chatSession}>
        <ChatSession />
      </div>
      <div className={styles.chatPrompt}>
        <ChatPrompt />
      </div>
    </div>
  );
};
