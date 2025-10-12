// import { useState } from "react";
import { ChatPrompt } from "./chat-prompt";
import { useUIStore } from "@/shared/store/ui.store";
import { MainChatArea } from "./main-chat-area";
import { useChatStore } from "@/features/chat/store/chat.store";
import type { ChatMessage } from "./types/chat.types";
import styles from "./chat-shell.module.scss";

export const ChatShell = () => {
  const dataGridOpen = useUIStore((state) => state.dataGridOpen);
  // const setDataGridOpen = useUIStore((state) => state.setDataGridOpen);
  const setMessages = useChatStore((state) => state.setMessages);
  const setIsResponding = useChatStore((state) => state.setIsResponding);

  // const [playbookAnalysisOpen, setPlaybookAnalysisOpen] = useState(false);
  // const [documentPreviewOpen, setDocumentPreviewOpen] = useState(false);

  const send = async (userMessage: string) => {
    setIsResponding(true);
    const newUserMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: userMessage,
      createdAt: Date.now(),
    };
    setMessages(newUserMsg);
    setTimeout(() => {
      const newAssistantMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: "Bu bir örnek yanıt. Gerçek AI entegrasyonu eklendiğinde gerçek cevaplar gelecek.",
        createdAt: Date.now(),
      };
      setMessages(newAssistantMsg);
      setIsResponding(false);
    }, 2500);
  };

  return (
    <div className={styles.container}>
      <div className={styles.mainPanel} style={{ width: dataGridOpen ? "50%" : "100%" }}>
        <MainChatArea send={send} />
        <ChatPrompt send={send} />
      </div>

      {dataGridOpen && (
        <div className={styles.resizer}>
          <div className={styles.resizerHandle} />
        </div>
      )}

      {/* Right Panels */}
      {/* {playbookAnalysisOpen ? (
      <PlaybookAnalysisPanel
        isOpen={playbookAnalysisOpen}
        onClose={() => setPlaybookAnalysisOpen(false)}
      />
    ) : documentPreviewOpen ? (
      <DocumentPreviewPanel
        isOpen={documentPreviewOpen}
        onClose={() => setDocumentPreviewOpen(false)}
        documentName={selectedDocumentForPreview?.name || ""}
        documentUrl={selectedDocumentForPreview?.url}
      />
    ) : (
      <DataGridPanel
        isOpen={dataGridOpen}
        onClose={() => setDataGridOpen(false)}
        columns={tableColumns}
        tableName={tableName}
      />
    )} */}
    </div>
  );
};
