import {
  Globe,
  FileEdit,
  FileText,
  FileSearch,
  GitCompare,
  Search,
  Scale,
  X,
  Library,
  Clock,
} from "lucide-react";
import { useCallback, useRef, useState, type ChangeEvent, type KeyboardEvent } from "react";
import { useUIStore } from "@/shared/store/ui.store";
// import { useChatStore } from "@/features/chat/store/chat.store";
import { showNotification } from "@/shared/lib/notification";
import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/ui";
import {
  collectionOptions,
  DOCUMENT_TEMPLATES,
  playbooks,
  providerOptions,
  type SelectedPromptOption,
} from "@/features/chat";
import styles from "./chat-prompt.module.scss";
import classnames from "classnames";
import { SIDEBAR_MENU_IDS } from "../sidebar/constants/sidebar-config";

export const ChatPrompt = (props: ChatPromptProps) => {
  const { send } = props;
  const setChoosenTab = useUIStore((state) => state.setChoosenTab);
  const setEditorOpen = useUIStore((state) => state.setEditorOpen);
  // const setDataGridOpen = useUIStore((state) => state.setDataGridOpen);
  const setEditorContent = useUIStore((state) => state.setEditorContent);
  // const setPlaybookAnalysisOpen = useChatStore((state) => state.setPlaybookAnalysisOpen);
  // const isResponding = useChatStore((state) => state.isResponding);
  // const setSelectedPlaybookForAnalysis = useChatStore(
  //   (state) => state.setSelectedPlaybookForAnalysis
  // );
  const [value, setValue] = useState("");
  const [providers, setProviders] = useState<{ karar: boolean; mevzuat: boolean; reklam: boolean }>(
    { karar: false, mevzuat: false, reklam: false }
  );
  // const [activeTemplate, setActiveTemplate] = useState<string | null>(null);

  const [selectedPromptOptions, setSelectedPromptOptions] = useState<SelectedPromptOption[]>([]);

  const [documentModalOpen, setDocumentModalOpen] = useState(false);
  const [playbookModalOpen, setPlaybookModalOpen] = useState(false);

  const docxEditInputRef = useRef<HTMLInputElement | null>(null);
  const docxAnalysisInputRef = useRef<HTMLInputElement | null>(null);

  const handleSend = async () => {
    const userText = value.trim();

    // if (userText.toLowerCase().includes("belge oluştur")) {
    //   setEditorOpen(true); //TODO
    // }

    // if (userText.toLowerCase().includes("tablo oluştur")) {
    //   setDataGridOpen(true); //TODO
    // }

    // if (activeTemplate) { //TODO
    //   const composed = `[AKILLI ŞABLON]\nŞABLON: ${activeTemplate}\nKULLANICI MESAJI: ${userText}\nTALİMAT: Bu şablonu tamamlamak için ihtiyaç duyduğun bilgileri birer birer sor. İlk soruyla başla ve cevaplara göre ilerle.`;
    //   setActiveTemplate(null);
    //   await send(composed);
    //   return;
    // }

    await send(userText);
    setValue("");
  };

  const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      if (e.ctrlKey || e.shiftKey) return;
      e.preventDefault();
      handleSend();
    }
  };

  // File upload handlers
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const handleAttachClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const sizeKB = Math.max(1, Math.round(f.size / 1024));
    const msg = `📎 Belge yüklendi: ${f.name} (${sizeKB} KB)`;
    await send(msg);
    e.target.value = "";
  };

  // Belge Düzenle handler
  const handleDocxEdit = useCallback(() => {
    docxEditInputRef.current?.click();
  }, []);

  const handleDocxEditChange = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      const f = e.target.files?.[0];
      if (!f) return;

      if (!f.name.toLowerCase().endsWith(".docx")) {
        showNotification("error", "Sadece .docx dosyaları yükleyebilirsiniz");
        e.target.value = "";
        return;
      }

      // Read file content
      const reader = new FileReader();
      reader.onload = async (event) => {
        const content = event.target?.result as string;
        console.log({ content });
        // Set editor content and open editor
        setEditorContent(`Yüklenen belge: ${f.name}\n\n[Belge içeriği buraya eklenecek]`);
        setEditorOpen(true);
        showNotification("success", `${f.name} editöre yüklendi`);
      };
      reader.readAsText(f);
      e.target.value = "";
    },
    [setEditorContent, setEditorOpen]
  );

  // Belge Oluştur - Template selection
  const handleDocumentTemplateSelect = () => {
    showNotification("success", `${template.title} editöre yüklendi`);
  };

  const handleDocxAnalysis = () => setPlaybookModalOpen(true);

  const handleDocumentComparison = () => {
    setChoosenTab(SIDEBAR_MENU_IDS.TABLE);
    showNotification("success", "Belgeleri Karşılaştır secildi");
  };

  const handleTimeTrack = () => {
    setChoosenTab(SIDEBAR_MENU_IDS.TIME_TRACK);
    showNotification("success", "zaman takibi secildi");
  };

  const handlePlaybookSelect = useCallback(() => {
    showNotification("success", "Playbook Seçin secildi");
  }, []);

  const handleDocxAnalysisChange = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      const f = e.target.files?.[0];
      if (!f) return;

      const sizeKB = Math.max(1, Math.round(f.size / 1024));
      const msg = `[BELGE ANALİZİ]\nBelge yüklendi: ${f.name} (${sizeKB} KB)\n\nLütfen bu belgeyi analiz et:\n1. Belge türünü belirle (sözleşme, dilekçe, karar, vb.)\n2. İlgili playbook'u otomatik seç\n3. Kapsamlı analiz raporu oluştur (önemli maddeler, riskler, eksiklikler, öneriler)`;
      await send(msg);
      showNotification("success", "Belge analizi başlatıldı");

      e.target.value = "";
    },
    [send]
  );

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

  const getColorClass = (id: number) => {
    const colors = [
      styles.color0,
      styles.color1,
      styles.color2,
      styles.color3,
      styles.color4,
      styles.color5,
      styles.color6,
      styles.color7,
    ];

    return colors[id % colors.length];
  };

  return (
    <div className={styles.container}>
      <div className={styles.inputWrapper}>
        <div className={styles.textareaContainer}>
          <textarea
            className={styles.textarea}
            placeholder="Mesajınızı yazın..."
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={onKeyDown}
            aria-label="Mesajınızı yazın"
          />
        </div>

        <div className={styles.controlsSection}>
          <div className={styles.controlGroup}>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div>
                  <Button
                    label="Oluştur"
                    buttonType="iconWithText"
                    iconType={{ default: "add" }}
                    variant="secondary"
                    iconTextReverse
                    className={styles.dropdownButton}
                  />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className={styles.dropdownContent}>
                <DropdownMenuItem onClick={handleDocxEdit}>
                  <FileEdit className={styles.menuIcon} />
                  Belge Düzenle
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setDocumentModalOpen(true)}>
                  <FileText className={styles.menuIcon} />
                  Belge Oluştur
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleDocxAnalysis}>
                  <FileSearch className={styles.menuIcon} />
                  Belge Analizi
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleDocumentComparison}>
                  <GitCompare className={styles.menuIcon} />
                  Belgeleri Karşılaştır
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleTimeTrack}>
                  <Clock className={styles.menuIcon} />
                  Zaman Girişi Yap
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div>
                  <Button
                    label="Kaynak Seç"
                    buttonType="iconWithText"
                    iconType={{ default: "search" }}
                    variant="secondary"
                    iconTextReverse
                    className={styles.dropdownButton}
                  />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className={styles.sourceDropdown}>
                <div className={styles.dropdownHeader}>
                  <p className={styles.sectionLabel}>ARAMA KAYNAKLARI</p>
                </div>
                {providerOptions.map((provider) => (
                  <DropdownMenuItem
                    key={provider.id}
                    onClick={() => onSelectPromptOption(provider)}
                    className={styles.menuItem}
                  >
                    <Scale className={styles.smallIcon} />
                    <span className={styles.menuLabel}>{provider.name}</span>
                    {selectedPromptOptions.some(
                      (selectedItem) => selectedItem.id === provider.id
                    ) && <span className={styles.checkmark}>✓</span>}
                  </DropdownMenuItem>
                ))}
                <div className={styles.divider} />
                <div className={styles.dropdownHeader}>
                  <p className={styles.sectionLabel}>YAKINDA</p>
                </div>
                <DropdownMenuItem disabled className={styles.disabledItem}>
                  <FileText className={styles.smallIcon} />
                  <span className={styles.menuLabel}>İçtihat</span>
                </DropdownMenuItem>
                <DropdownMenuItem disabled className={styles.disabledItem}>
                  <Search className={styles.smallIcon} />
                  <span className={styles.menuLabel}>Lexpera</span>
                </DropdownMenuItem>
                <DropdownMenuItem disabled className={styles.disabledItem}>
                  <Globe className={styles.smallIcon} />
                  <span className={styles.menuLabel}>İnternet Arama</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div>
                  <Button
                    label="Koleksiyon Seç"
                    buttonType="iconWithText"
                    iconType={{ default: "library" }}
                    variant="secondary"
                    iconTextReverse
                    className={styles.dropdownButton}
                  />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className={styles.sourceDropdown}>
                <div className={styles.dropdownHeader}>
                  <p className={styles.sectionLabel}>KOLEKSİYONLAR</p>
                </div>
                {collectionOptions.map((collection) => (
                  <DropdownMenuItem
                    key={collection.id}
                    onClick={() => onSelectPromptOption(collection)}
                    className={styles.menuItem}
                  >
                    <Library className={styles.smallIcon} />
                    <div className={styles.collectionContent}>
                      <span className={styles.collectionName}>{collection.name}</span>
                      <span
                        className={classnames(styles.badge, {
                          [styles.orgBadge]: collection.scope === "org",
                          [styles.personalBadge]: collection.scope !== "org",
                        })}
                      >
                        {collection.scope === "org" ? "Organizasyon" : "Kişisel"}
                      </span>
                    </div>
                    {selectedPromptOptions.some(
                      (selectedItem) => selectedItem.id === collection.id
                    ) && <span className={styles.checkmark}>✓</span>}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <input
              ref={docxEditInputRef}
              type="file"
              accept=".docx"
              className={styles.hiddenInput}
              onChange={handleDocxEditChange}
            />
            <input
              ref={docxAnalysisInputRef}
              type="file"
              className={styles.hiddenInput}
              onChange={handleDocxAnalysisChange}
            />

            <div className={styles.separator} role="separator" />

            <div className={styles.selectedItems}>
              {/* visibleItems */}
              {selectedPromptOptions.slice(0, 3).map((item, index) => (
                <div key={item.id} className={classnames(styles.badge, getColorClass(index))}>
                  <span>{item.name}</span>
                  <button
                    onClick={() => handleSelectedItemRemove(item.id)}
                    className={styles.badgeRemove}
                    aria-label="Kaldır"
                  >
                    <X className={styles.xIcon} />
                  </button>
                </div>
              ))}
              {/* hiddenItems */}
              {selectedPromptOptions.slice(3).length > 0 && (
                <Popover>
                  <PopoverTrigger asChild>
                    <button className={styles.moreButton}>
                      +{selectedPromptOptions.slice(3).length} daha
                    </button>
                  </PopoverTrigger>
                  <PopoverContent align="start" className={styles.popoverContent}>
                    <div className={styles.popoverGrid}>
                      {selectedPromptOptions.slice(3).map((item, index) => (
                        <div
                          key={item.id}
                          className={classnames(styles.popoverItem, getColorClass(index + 3))}
                        >
                          <span className={styles.popoverLabel}>{item.name}</span>
                          <button
                            onClick={() => handleSelectedItemRemove(item.id)}
                            className={styles.badgeRemove}
                            aria-label="Kaldır"
                          >
                            <X className={styles.xIcon} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>
              )}
            </div>
          </div>

          <div className={styles.sendButtonDesktop}>
            <Button
              label="Attach file"
              onClick={handleAttachClick}
              buttonType="justIcon"
              iconType={{ default: "paperclip" }}
            />
            <input
              ref={fileInputRef}
              type="file"
              className={styles.hiddenInput}
              onChange={handleFileChange}
            />
            <Button
              label=""
              onClick={handleSend}
              buttonType="justIcon"
              iconType={{ default: "arrow-up" }}
              // isLoading={isResponding}
              className={styles.sendButton}
            />
          </div>

          <div className={`${styles.mobileControls} ${styles.leftControls}`}>
            <div className={styles.mobileControlGroup}>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    label=""
                    buttonType="iconWithText"
                    iconType={{ default: "add" }}
                    iconTextReverse
                  />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className={styles.dropdownContent}>
                  <DropdownMenuItem onClick={handleDocxEdit}>
                    <FileEdit className={styles.menuIcon} />
                    Belge Düzenle
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setDocumentModalOpen(true)}>
                    <FileText className={styles.menuIcon} />
                    Belge Oluştur
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleDocxAnalysis}>
                    <FileSearch className={styles.menuIcon} />
                    Belge Analizi
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleDocumentComparison}>
                    <GitCompare className={styles.menuIcon} />
                    Belgeleri Karşılaştır
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleTimeTrack}>
                    <Clock className={styles.menuIcon} />
                    Zaman Girişi Yap
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    label=""
                    buttonType="iconWithText"
                    iconType={{ default: "search" }}
                    iconTextReverse
                  />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className={styles.sourceDropdown}>
                  <div className={styles.dropdownHeader}>
                    <p className={styles.sectionLabel}>ARAMA KAYNAKLARI</p>
                  </div>
                  <DropdownMenuItem
                    onClick={() => setProviders((p) => ({ ...p, karar: !p.karar }))}
                    className={styles.menuItem}
                  >
                    <Scale className={styles.smallIcon} />
                    <span className={styles.menuLabel}>Rekabet Kurumu Kararları</span>
                    {providers.karar && <span className={styles.checkmark}>✓</span>}
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setProviders((p) => ({ ...p, reklam: !p.reklam }))}
                    className={styles.menuItem}
                  >
                    <Scale className={styles.smallIcon} />
                    <span className={styles.menuLabel}>Reklam Kurulu Kararları</span>
                    {providers.reklam && <span className={styles.checkmark}>✓</span>}
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setProviders((p) => ({ ...p, mevzuat: !p.mevzuat }))}
                    className={styles.menuItem}
                  >
                    <FileText className={styles.smallIcon} />
                    <span className={styles.menuLabel}>Mevzuat</span>
                    {providers.mevzuat && <span className={styles.checkmark}>✓</span>}
                  </DropdownMenuItem>

                  <div className={styles.divider} />

                  <div className={styles.dropdownHeader}>
                    <p className={styles.sectionLabel}>YAKINDA</p>
                  </div>
                  <DropdownMenuItem disabled className={styles.disabledItem}>
                    <FileText className={styles.smallIcon} />
                    <span className={styles.menuLabel}>İçtihat</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem disabled className={styles.disabledItem}>
                    <Search className={styles.smallIcon} />
                    <span className={styles.menuLabel}>Lexpera</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem disabled className={styles.disabledItem}>
                    <Globe className={styles.smallIcon} />
                    <span className={styles.menuLabel}>İnternet Arama</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className={styles.libraryButton}>
                    <Library className={styles.libraryIcon} />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className={styles.sourceDropdown}>
                  <div className={styles.dropdownHeader}>
                    <p className={styles.sectionLabel}>KOLEKSİYONLAR</p>
                  </div>
                  {collectionOptions.length === 0 ? (
                    <div className={styles.emptyState}>Henüz koleksiyon yok</div>
                  ) : (
                    collectionOptions.map((collection) => (
                      <DropdownMenuItem
                        key={collection.id}
                        onClick={() => onSelectPromptOption(collection)}
                        className={styles.menuItem}
                      >
                        <Library className={styles.smallIcon} />
                        <div className={styles.collectionContent}>
                          <span className={styles.collectionName}>{collection.name}</span>
                          <span className={styles.badge}>
                            {collection.scope === "org" ? "Organizasyon" : "Kişisel"}
                          </span>
                        </div>
                        {selectedPromptOptions.some((c) => c.id === collection.id) && (
                          <span className={styles.checkmark}>✓</span>
                        )}
                      </DropdownMenuItem>
                    ))
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className={styles.mobileActionButtons}>
              <Button
                label="Attach file"
                onClick={handleAttachClick}
                buttonType="iconWithText"
                iconType={{ default: "paperclip" }}
                iconTextReverse
              />
              <Button
                label="Gönder"
                onClick={handleSend}
                buttonType="iconWithText"
                iconType={{ default: "arrow-up" }}
                iconTextReverse
                // isLoading={isResponding}
                variant="secondary"
              />
            </div>
          </div>
        </div>
      </div>

      <Dialog open={playbookModalOpen} onOpenChange={setPlaybookModalOpen}>
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
                  onClick={() => handlePlaybookSelect(playbook)}
                >
                  <h3 className={styles.playbookTitle}>{playbook.title}</h3>
                  <p className={styles.playbookDescription}>{playbook.description}</p>
                </div>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={documentModalOpen} onOpenChange={setDocumentModalOpen}>
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
                  onClick={() => handleDocumentTemplateSelect(template)}
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

interface ChatPromptProps {
  send: (userMessage: string) => Promise<void>;
}
