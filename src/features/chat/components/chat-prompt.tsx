import { useRef, useState, type KeyboardEvent } from "react";
import { useUIStore } from "@/shared/store/ui.store";
import { showNotification } from "@/shared/lib/notification";
import { Button, Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/ui";
import styles from "../styles/chat-prompt.module.scss";
import { SIDEBAR_MENU_IDS } from "@/widgets/sidebar/constants/sidebar-config";
import {
  DOCUMENT_TEMPLATES,
  playbooks,
  type SelectedPromptOption,
} from "../constants/chat-prompt-config";
import { ChatDropdownMenus } from "./chat-dropdown-menus";
import { ChatPromptOptions } from "./chat-prompt-options";
import { useCreateChat } from "../hooks/use-create-chat";
import { useParams } from "react-router-dom";
import { useChatStore } from "../store/chat.store";

export const ChatPrompt = () => {
  const { conversationId } = useParams<{ conversationId: string }>();
  const { mutate: createChat, isPending: isLoading } = useCreateChat();
  const setChoosenTab = useUIStore((state) => state.setChoosenTab);
  const [value, setValue] = useState("");
  const [selectedPromptOptions, setSelectedPromptOptions] = useState<SelectedPromptOption[]>([]);
  const [showDocumentModal, setShowDocumentModal] = useState(false);
  const [showPlaybookModal, setShowPlaybookModal] = useState(false);
  const isCreatingMessage = useChatStore((state) => state.isCreatingMessage);

  const handleSend = async () => {
    const userText = value.trim();
    if (!userText || isLoading || isCreatingMessage) return;

    const userMessage = {
      question: userText,
      // collections: [
      //   {
      //     name: "sozlesmeler";
      //     scopes: ["private", "shared"];
      //   },
      //   {
      //     name: "kanunlar";
      //     scopes: ["private"];
      //   }
      // ];
      // include_low_confidence_sources: false;
      // max_sources_in_context: 5;
      // min_relevance_score: 0.7;
      // options: {
      //   citations: true;
      //   lang: "tr";
      //   stream: false;
      //   tone: "resmi";
      // };
      // sources: ["mevzuat"];
      // top_k: 5;
      // use_reranker: true;
    };

    // Mesajı gönder (yeni chat veya mevcut conversation)
    createChat(userMessage);
    setValue("");
  };

  const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key !== "Enter" || e.ctrlKey || e.shiftKey) return;
    e.preventDefault();
    handleSend();
  };

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const handleAttachClick = () => fileInputRef.current?.click();

  // const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
  //   const f = e.target.files?.[0];
  //   if (!f || isLoading) return;
  //   const sizeKB = Math.max(1, Math.round(f.size / 1024));
  //   const msg = `📎 Belge yüklendi: ${f.name} (${sizeKB} KB)`;

  //   const userMessage: ChatMessage = {
  //     id: crypto.randomUUID(),
  //     content: msg,
  //     role: "user",
  //     createdAt: Date.now(),
  //   };
  //   createChat(userMessage);
  //   e.target.value = "";
  // };

  const handleDocumentEdit = () => {
    showNotification("success", "Belge Düzenle secildi");
  };

  const handleDocumentCreate = () => {
    setShowDocumentModal(true);
    showNotification("success", "Belge Oluştur secildi");
  };

  const handleDocumentAnalysis = () => {
    setShowPlaybookModal(true);
    showNotification("success", "Belge Analizi secildi");
  };

  const handleDocumentCompare = () => {
    setChoosenTab(SIDEBAR_MENU_IDS.TABLE);
    showNotification("success", "Belgeleri Karşılaştır secildi");
  };

  const handleTimeTrack = () => {
    setChoosenTab(SIDEBAR_MENU_IDS.TIME_TRACK);
    showNotification("success", "zaman takibi secildi");
  };

  const handleChatDropdownMenus = {
    documentEdit: handleDocumentEdit,
    documentCreate: handleDocumentCreate,
    documentAnalysis: handleDocumentAnalysis,
    documentCompare: handleDocumentCompare,
    timeTrack: handleTimeTrack,
  };

  const onSelectPromptOption = (item: SelectedPromptOption) =>
    setSelectedPromptOptions((prev) => {
      const isSelected = prev.some((c) => c.id === item.id);
      if (isSelected) {
        return prev.filter((c) => c.id !== item.id);
      } else {
        return [...prev, item];
      }
    });

  const handleSelectedItemRemove = (selectedItemId: string) =>
    setSelectedPromptOptions((prev) => prev.filter((c) => c.id !== selectedItemId));

  return (
    <div className={styles.container}>
      <div className={styles.textareaContainer}>
        <textarea
          className={styles.textarea}
          placeholder={conversationId ? "Mesajınızı yazın..." : "Nasıl yardımcı olabilirim?"}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={onKeyDown}
          disabled={isCreatingMessage || isLoading}
        />
      </div>
      <div className={styles.controlsSection}>
        <div className={styles.controlGroup}>
          <ChatDropdownMenus
            handleOnSelect={handleChatDropdownMenus}
            onSelectPromptOption={onSelectPromptOption}
            selectedPromptOptions={selectedPromptOptions}
          />
          <div className={styles.separator} role="separator" />
          <ChatPromptOptions
            selectedPromptOptions={selectedPromptOptions}
            handleRemove={handleSelectedItemRemove}
          />
        </div>
        <div className={styles.sendButtonDesktop}>
          <Button
            label="Attach file"
            onClick={handleAttachClick}
            buttonType="justIcon"
            iconType={{ default: "paperclip" }}
            disabled={isLoading || isCreatingMessage}
          />
          <input
            ref={fileInputRef}
            type="file"
            className={styles.hiddenInput}
            // onChange={handleFileChange}
            disabled={isLoading || isCreatingMessage}
          />
          <Button
            label=""
            onClick={handleSend}
            buttonType="justIcon"
            iconType={{ default: "arrow-up" }}
            className={styles.sendButton}
            isLoading={isLoading || isCreatingMessage}
            disabled={value.trim() == ""}
          />
        </div>
        <div className={`${styles.mobileControls} ${styles.leftControls}`}>
          <div className={styles.mobileControlGroup}>
            <ChatDropdownMenus
              handleOnSelect={handleChatDropdownMenus}
              onSelectPromptOption={onSelectPromptOption}
              selectedPromptOptions={selectedPromptOptions}
              isMobile
            />
          </div>
          <div className={styles.mobileActionButtons}>
            <Button
              label="Attach file"
              onClick={handleAttachClick}
              buttonType="iconWithText"
              iconType={{ default: "paperclip" }}
              iconTextReverse
              disabled={isLoading || isCreatingMessage}
            />
            <Button
              label="Gönder"
              onClick={handleSend}
              buttonType="iconWithText"
              iconType={{ default: "arrow-up" }}
              iconTextReverse
              variant="secondary"
              disabled={isLoading || isCreatingMessage}
            />
          </div>
        </div>
      </div>

      <Dialog open={showPlaybookModal} onOpenChange={setShowPlaybookModal}>
        <DialogContent className={styles.dialogContent}>
          <DialogHeader>
            <DialogTitle>Playbook Seçin</DialogTitle>
          </DialogHeader>
          <div className={styles.dialogScroll}>
            <div className={styles.gridContainer}>
              {playbooks.map((playbook) => (
                <div
                  key={playbook.id}
                  className={styles.playbookCard}
                  onClick={() => console.log(playbook)}
                >
                  <h3 className={styles.playbookTitle}>{playbook.title}</h3>
                  <p className={styles.playbookDescription}>{playbook.description}</p>
                </div>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showDocumentModal} onOpenChange={setShowDocumentModal}>
        <DialogContent className={styles.dialogContent}>
          <DialogHeader>
            <DialogTitle>Belge Şablonu Seçin</DialogTitle>
          </DialogHeader>
          <div className={styles.dialogScroll}>
            <div className={styles.templateGrid}>
              {DOCUMENT_TEMPLATES.map((template) => (
                <div
                  key={template.id}
                  className={styles.templateCard}
                  onClick={() => console.log(template)}
                >
                  <div className={styles.templateHeader}>
                    <h3 className={styles.templateTitle}>{template.title}</h3>
                    <span className={styles.templateCategory}>{template.category}</span>
                  </div>
                  <p className={styles.templateDescription}>{template.description}</p>
                </div>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
