import { TypewriterMarkdown } from "@/shared/lib/llm-ui";
import { Button } from "@/shared/ui";
import styles from "@/widgets/chat/styles/chat-session.module.scss";
import classnames from "classnames";
import { useCallback, useState } from "react";
import { useChatStore } from "../store/chat.store";
import type { UseMutateFunction } from "@tanstack/react-query";
import type { ChatSourceDto, ChatSourceResponse } from "../api/chat.types";

export const ChatAssistantMessage = (props: ChatAssistantMessageProps) => {
  const { data, isNew = false, isLoading, sources, getSource } = props;
  const [isTypingComplete, setIsTypingComplete] = useState(!isNew);
  const setPdfHighlightText = useChatStore((state) => state.setPdfHighlightText);

  const handleSourceByChat = useCallback(
    (sourceNumber: number) => {
      const sourceIndex = sourceNumber - 1;

      if (!sources || sourceIndex < 0 || sourceIndex >= sources.length) {
        console.error(`Source ${sourceNumber} bulunamadı`);
        return;
      }

      const selectedSource = sources[sourceIndex];

      if (!selectedSource?.document_url) {
        console.error(`Source ${sourceNumber} için document_url bulunamadı`);
        return;
      }

      setPdfHighlightText(selectedSource.text);
      getSource({
        document_url: selectedSource.document_url,
        expires_seconds: 3600,
      });
    },
    [sources, setPdfHighlightText, getSource]
  );

  return (
    <div className={classnames(styles.messageWrapper, styles.assistantMessage)}>
      <div className={styles.messageContent}>
        <div className={styles.assistantBubble}>
          <div className={styles.textContent}>
            <TypewriterMarkdown
              text={data}
              speed={5}
              isNew={isNew}
              onComplete={() => setIsTypingComplete(true)}
              onSourceClick={handleSourceByChat}
            />
          </div>
          {isTypingComplete && (
            <div className={classnames(styles.actionButtons, styles.fadeIn)}>
              <Button
                label="Beğen"
                buttonType="justIcon"
                iconType={{ default: "like" }}
                variant="secondary"
                disabled={isLoading}
              />
              <Button
                label="Beğenme"
                buttonType="justIcon"
                iconType={{ default: "dislike" }}
                variant="secondary"
                disabled={isLoading}
              />
              <Button
                label="Kopyala"
                buttonType="justIcon"
                iconType={{ default: "copy" }}
                variant="secondary"
                onClick={() => navigator.clipboard?.writeText(data)}
                disabled={isLoading}
              />
              <Button
                label="E-posta"
                buttonType="justIcon"
                iconType={{ default: "mail" }}
                variant="secondary"
                disabled={isLoading}
              />
              <Button
                label="Editöre Ekle"
                buttonType="justIcon"
                iconType={{ default: "update" }}
                variant="secondary"
                disabled={isLoading}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

interface ChatAssistantMessageProps {
  data: string;
  isNew?: boolean;
  isLoading: boolean;
  sources: {
    text: string;
    metadata: {
      title: string;
      bucket: string;
      source: string;
      filename: string;
      file_hash: string;
      file_size: 247628;
      page_number: number;
      upload_date: string;
      uploaded_by: string;
    };
    chunk_index: number;
    document_id: string;
    document_url: string;
    relevance_score: number;
  }[];
  getSource: UseMutateFunction<ChatSourceResponse, Error, ChatSourceDto, void>;
}
