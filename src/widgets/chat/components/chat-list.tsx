import styles from "../styles/chat-list.module.scss";
import { ChatArea } from "@/features/chat/components/chat-area";
import { ChatPrompt } from "@/features/chat/components/chat-prompt";
import { useParams } from "react-router-dom";
import classnames from "classnames";

export const ChatList = () => {
  const { conversationId } = useParams<{ conversationId: string }>();

  return (
    <div
      className={classnames(styles.container, {
        [styles.hasConversation]: conversationId,
        [styles.noConversation]: !conversationId,
      })}
    >
      <ChatArea conversationId={conversationId} />
      <ChatPrompt />
    </div>
  );
};
