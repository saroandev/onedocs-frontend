import styles from "../styles/chat-list.module.scss";
import { ChatArea } from "@/features/chat/components/chat-area";
import { ChatPrompt } from "@/features/chat/components/chat-prompt";

export const ChatList = () => {
  return (
    <div className={styles.container}>
      <div className={styles.mainPanel}>
        <ChatArea />
        <ChatPrompt />
      </div>
    </div>
  );
};
