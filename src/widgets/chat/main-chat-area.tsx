/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useRef } from "react";
import { useUIStore } from "@/shared/store/ui.store";
import { useChatStore } from "@/features/chat/store/chat.store";
import { Button } from "@/shared/ui";
import styles from "./main-chat-area.module.scss";
import type { ChatMessage } from "./types/chat.types";

export const MainChatArea = (props: MainChatAreaProps) => {
  const { send } = props;
  const setEditorOpen = useUIStore((state) => state.setEditorOpen);
  const setEditorContent = useUIStore((state) => state.setEditorContent);
  // const setTableName = useUIStore((state) => state.setTableName);
  // const setTableColumns = useUIStore((state) => state.setTableColumns);
  // const setDataGridOpen = useUIStore((state) => state.setDataGridOpen);
  const messages = useChatStore((state) => state.messages);
  const isResponding = useChatStore((state) => state.isResponding);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  // const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  // const [pdfOpen, setPdfOpen] = useState<boolean>(false);
  // const prevIsRespondingRef = useRef(isResponding);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isResponding]);

  const handleMail = (message: ChatMessage) => {
    const subject = encodeURIComponent("Sohbet Mesajı");
    const body = encodeURIComponent(message.content);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  const renderContent = () => {
    if (messages.length === 0) {
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
        {messages.map((message) => {
          // const hasHtmlTable = message.role === "user" && message.content.includes("table"); // TODO

          return (
            <div
              key={message.id}
              className={`${styles.messageWrapper} ${
                message.role === "user" ? styles.userMessage : styles.assistantMessage
              }`}
            >
              <div
                className={`${styles.messageContent} ${
                  message.role === "user" ? styles.userContent : ""
                }`}
              >
                {message.role === "user" ? (
                  <div className={styles.userBubble}>
                    <div className={styles.userText}>{message.content}</div>
                  </div>
                ) : (
                  <div className={styles.assistantBubble}>
                    {/* {hasHtmlTable ? ( // TODO
                      <div
                        className={styles.htmlContent}
                        dangerouslySetInnerHTML={{ __html: message.content }}
                      />
                    ) : (
                      <div className={styles.textContent}>{message.content}</div>
                    )} */}
                    <div className={styles.textContent}>{message.content}</div>

                    {/* {message.content.match(/https?:\/\/\S+\.pdf(\?\S*)?/i) && ( // TODO
                      <div className={styles.pdfLinkContainer}>
                        <Button
                          label="Sağda PDF Önizle"
                          className={styles.pdfPreviewButton}
                          onClick={() => {
                            setPdfUrl(message.content.match(/https?:\/\/\S+\.pdf(\?\S*)?/i)?.[0]);
                            setPdfOpen(true);
                          }}
                          buttonType="justText"
                          variant="secondary"
                        />
                      </div>
                    )} */}

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
                        onClick={() => navigator.clipboard?.writeText(message.content)}
                      />
                      <Button
                        label="E-posta"
                        buttonType="justIcon"
                        iconType={{ default: "mail" }}
                        variant="secondary"
                        onClick={() => handleMail(message)}
                      />
                      <Button
                        label="Editöre Ekle"
                        buttonType="justIcon"
                        iconType={{ default: "update" }}
                        variant="secondary"
                        onClick={() => {
                          setEditorContent(message.content);
                          setEditorOpen(true);
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {isResponding && (
          <div className={styles.loadingMessageWrapper}>
            <div className={styles.loadingBubble}>
              <div className={styles.loadingDots}>
                <span className={styles.dot1}></span>
                <span className={styles.dot2}></span>
                <span className={styles.dot3}></span>
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.contentWrapper}>
        <div className={styles.contentPadding}>
          {/* {pdfUrl && ( // TODO
            <div className={styles.pdfButtonContainer}>
              <Button
                label={pdfOpen ? "PDF Önizlemeyi Kapat" : "PDF Önizleme"}
                className={styles.pdfButton}
                onClick={() => setPdfOpen((v) => !v)}
                buttonType="justText"
                variant="secondary"
              />
            </div>
          )} */}
          {renderContent()}
        </div>
      </div>

      {/* {pdfOpen && pdfUrl && ( // TODO
        <aside className={styles.pdfPanel}>
          <div className={styles.pdfPanelHeader}>
            <div className={styles.pdfPanelTitle}>PDF Önizleme</div>
            <Button
              label="Kapat"
              buttonType="justText"
              variant="secondary"
              onClick={() => setPdfOpen(false)}
            />
          </div>
          <iframe src={pdfUrl} className={styles.pdfIframe} title="PDF Preview" />
        </aside>
      )} */}
    </div>
  );
};

interface MainChatAreaProps {
  send: (userMessage: string) => Promise<void>;
}
