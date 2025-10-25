// src/features/chat/components/chat-assistant-message.tsx
import { Button } from "@/shared/ui";
// import { MarkdownRenderer } from "@/shared/ui/markdown-renderer/markdown-renderer";
// import { TypewriterText } from "@/shared/ui/typewriter-text/typewriter-text";
import styles from "@/widgets/chat/styles/chat-session.module.scss";
import classnames from "classnames";
// import { useState } from "react";

export const ChatAssistantMessage = (props: ChatAssistantMessageProps) => {
  const {
    data,
    //  isNew = false
  } = props;
  // const [isTypingComplete, setIsTypingComplete] = useState(!isNew);

  return (
    <div className={classnames(styles.messageWrapper, styles.assistantMessage)}>
      <div className={styles.messageContent}>
        <div className={styles.assistantBubble}>
          <div className={styles.textContent}>
            {/* {isNew ? (
              <TypewriterText
                text={data}
                speed={5}
                isNew={isNew}
                onComplete={() => setIsTypingComplete(true)}
              />
            ) : (
              <MarkdownRenderer content={data} />
            )} */}
            {data}
          </div>

          {/* Butonları typing bittiğinde göster */}
          {/* {isTypingComplete && ( */}
          <div className={classnames(styles.actionButtons, styles.fadeIn)}>
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
              onClick={() => navigator.clipboard?.writeText(data)}
            />
            <Button
              label="E-posta"
              buttonType="justIcon"
              iconType={{ default: "mail" }}
              variant="secondary"
            />
            <Button
              label="Editöre Ekle"
              buttonType="justIcon"
              iconType={{ default: "update" }}
              variant="secondary"
            />
          </div>
          {/* )} */}
        </div>
      </div>
    </div>
  );
};

interface ChatAssistantMessageProps {
  data: string;
  isNew?: boolean; // Yeni gelen mesaj mı yoksa geçmiş conversation'dan mı?
}
