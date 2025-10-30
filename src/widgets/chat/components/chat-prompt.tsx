/* eslint-disable @typescript-eslint/no-unused-vars */
import { useRef, useState, type ChangeEvent, type KeyboardEvent } from "react";
// import { useUIStore } from "@/shared/store/ui.store";
// import { showNotification } from "@/shared/lib/notification";
import { Button, Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/ui";
import styles from "../styles/chat-prompt.module.scss";
// import { SIDEBAR_MENU_IDS } from "@/widgets/sidebar/constants/sidebar-config";
// import { DOCUMENT_TEMPLATES, playbooks } from "../constants/chat-prompt-config";
import {
  ChatDocumentMenu,
  ChatPromptOptions,
  useCreateMessage,
  useChatStore,
  ChatSourceMenu,
  ChatCollectionMenu,
} from "@/features/chat";
import { useParams } from "react-router-dom";

export const ChatPrompt = () => {
  const { conversationId } = useParams<{ conversationId: string }>();
  const { mutate: createMessage, isPending: loadingCreateMessage } = useCreateMessage();
  // const setChoosenTab = useUIStore((state) => state.setChoosenTab);
  const [value, setValue] = useState("");
  const [selectedCollections, setSelectedCollections] = useState<
    { name: string; scopes: ("shared" | "private")[] }[]
  >([]);
  const [selectedSources, setSelectedSources] = useState<string[]>([]);
  // const [showDocumentModal, setShowDocumentModal] = useState(false);
  // const [showPlaybookModal, setShowPlaybookModal] = useState(false);
  const isCreatingMessage = useChatStore((state) => state.isCreatingMessage);
  const [selectedPromptOptions, setSelectedPromptOptions] = useState<string[]>([]);
  const [showCollectionMenu, setShowCollectionMenu] = useState(false);
  const [showSourceMenu, setShowSourceMenu] = useState(false);

  const handleSend = async () => {
    const userText = value.trim();
    if (!userText || loadingCreateMessage || isCreatingMessage) return;

    const userMessage = {
      question: userText,
      collections: selectedCollections,
      sources: selectedSources,
      // include_low_confidence_sources: false;
      // max_sources_in_context: 5;
      // min_relevance_score: 0.7;
      // options: {
      //   citations: true;
      //   lang: "tr";
      //   stream: false;
      //   tone: "resmi";
      // };
      // top_k: 5;
      // use_reranker: true;
    };

    createMessage(userMessage);
    setValue("");
    setSelectedPromptOptions([]);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key !== "Enter" || e.ctrlKey || e.shiftKey) return;
    e.preventDefault();
    handleSend();
  };

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const handleAttachClick = () => fileInputRef.current?.click();

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f || loadingCreateMessage) return;
    const sizeKB = Math.max(1, Math.round(f.size / 1024));
    const msg = `📎 Belge yüklendi: ${f.name} (${sizeKB} KB)`;

    // const userMessage: ChatMessage = {
    //   id: crypto.randomUUID(),
    //   content: msg,
    //   role: "user",
    //   createdAt: Date.now(),
    // };
    // createMessage(userMessage);
    e.target.value = "";
  };

  // const handleDocumentEdit = () => {
  //   showNotification("success", "Belge Düzenle secildi");
  // };

  // const handleDocumentCreate = () => {
  //   setShowDocumentModal(true);
  //   showNotification("success", "Belge Oluştur secildi");
  // };

  // const handleDocumentAnalysis = () => {
  //   setShowPlaybookModal(true);
  //   showNotification("success", "Belge Analizi secildi");
  // };

  // const handleDocumentCompare = () => {
  //   setChoosenTab(SIDEBAR_MENU_IDS.TABLE);
  //   showNotification("success", "Belgeleri Karşılaştır secildi");
  // };

  // const handleTimeTrack = () => {
  //   setChoosenTab(SIDEBAR_MENU_IDS.TIME_TRACK);
  //   showNotification("success", "zaman takibi secildi");
  // };

  // const handleChatDropdownMenus = {
  //   documentEdit: handleDocumentEdit,
  //   documentCreate: handleDocumentCreate,
  //   documentAnalysis: handleDocumentAnalysis,
  //   documentCompare: handleDocumentCompare,
  //   timeTrack: handleTimeTrack,
  // };

  const handleCollectionSelect = ({
    name,
    scopes,
  }: {
    name: string;
    scopes: ("shared" | "private")[];
  }) => {
    const alreadySelected = selectedCollections.some((collection) => collection.name === name);

    const selectedOptions = alreadySelected
      ? selectedCollections.filter((collection) => collection.name !== name)
      : [...selectedCollections, { name, scopes }];

    setSelectedPromptOptions([...selectedSources, ...selectedOptions.map((item) => item.name)]);
    setSelectedCollections(selectedOptions);
  };

  const handleSourceSelect = (name: string) => {
    const alreadySelected = selectedSources.some((source) => source === name);

    const selectedOptions = alreadySelected
      ? selectedSources.filter((source) => source !== name)
      : [...selectedSources, name];

    setSelectedPromptOptions([...selectedCollections.map((item) => item.name), ...selectedOptions]);
    setSelectedSources(selectedOptions);
  };

  const handlePromptOptionRemove = (selectedOption: string) => {
    const removedSelectedOptions = selectedPromptOptions.filter((item) => item !== selectedOption);
    setSelectedPromptOptions(removedSelectedOptions);
  };

  return (
    <div className={styles.container}>
      <div className={styles.textareaContainer}>
        <textarea
          className={styles.textarea}
          placeholder={conversationId ? "Mesajınızı yazın..." : "Nasıl yardımcı olabilirim?"}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={onKeyDown}
          disabled={isCreatingMessage || loadingCreateMessage}
        />
      </div>
      <div className={styles.controlsSection}>
        <div className={styles.controlGroup}>
          {/* <ChatDocumentMenu handleOnSelect={handleChatDropdownMenus} /> */}
          <ChatSourceMenu
            onSelectSource={handleSourceSelect}
            selectedSources={selectedSources}
            isSubmit={isCreatingMessage}
            open={showSourceMenu}
            setOpen={setShowSourceMenu}
          />
          <ChatCollectionMenu
            open={showCollectionMenu}
            setOpen={setShowCollectionMenu}
            onSelectCollection={handleCollectionSelect}
            selectedCollections={selectedCollections}
            isSubmit={isCreatingMessage}
          />
          <div className={styles.separator} role="separator" />
          <ChatPromptOptions
            selectedPromptOptions={selectedPromptOptions}
            onRemove={handlePromptOptionRemove}
            isSubmit={isCreatingMessage}
          />
        </div>
        <div className={styles.sendButtonDesktop}>
          <Button
            label="Attach file"
            onClick={handleAttachClick}
            buttonType="justIcon"
            iconType={{ default: "paperclip" }}
            disabled={loadingCreateMessage || isCreatingMessage}
            variant="secondary"
          />
          <input
            ref={fileInputRef}
            type="file"
            className={styles.hiddenInput}
            onChange={handleFileChange}
            disabled={loadingCreateMessage || isCreatingMessage}
          />
          <Button
            label=""
            onClick={handleSend}
            buttonType="justIcon"
            iconType={{ default: "arrow-up" }}
            className={styles.sendButton}
            disabled={loadingCreateMessage || isCreatingMessage}
          />
        </div>
        {/* <div className={`${styles.mobileControls} ${styles.leftControls}`}>
          <div className={styles.mobileControlGroup}>
            <ChatDocumentMenu
              handleOnSelect={handleChatDropdownMenus}
              onSelectCollection={handleCollectionSelect}
              selectedCollections={selectedCollections}
              onSelectSource={handleSourceSelect}
              selectedSources={selectedSources}
            />
          </div>
          <div className={styles.mobileActionButtons}>
            <Button
              label="Attach file"
              onClick={handleAttachClick}
              buttonType="iconWithText"
              iconType={{ default: "paperclip" }}
              iconTextReverse
              disabled={loadingCreateMessage || isCreatingMessage}
            />
            <Button
              label="Gönder"
              onClick={handleSend}
              buttonType="iconWithText"
              iconType={{ default: "arrow-up" }}
              iconTextReverse
              variant="secondary"
              disabled={loadingCreateMessage || isCreatingMessage}
            />
          </div>
        </div> */}
      </div>

      {/* <Dialog open={showPlaybookModal} onOpenChange={setShowPlaybookModal}>
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
      </Dialog> */}
    </div>
  );
};
