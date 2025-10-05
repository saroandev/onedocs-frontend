import { CirclePlus, History, BookOpen, BookMarked } from "lucide-react";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useLocation } from "react-router-dom";
import { playbooks } from "./helper";
import { Button } from "@/shared/ui/button";
import styles from "./header.module.scss";
import { SheetFiles } from "./sheet-files";
import { ChatHistory } from "./chat-history";
import { Playbook } from "./playbook";
import { PlaybookDetail } from "./playbook-detail";

export const Header = () => {
  const { pathname } = useLocation();
  const [kbOpen, setKbOpen] = useState(false);
  const [playbooksOpen, setPlaybooksOpen] = useState(false);
  const [selectedPlaybook, setSelectedPlaybook] = useState<(typeof playbooks)[0] | null>(null);
  const [historyOpen, setHistoryOpen] = useState(false);

  const [chatSessions, setChatSessions] = useState<
    Array<{
      id: string;
      pinned?: boolean;
      label: string;
      items: {
        id: string;
        title: string;
        updatedAt: string;
      }[];
    }>
  >([
    {
      label: "Dün",
      id: "c1",
      pinned: true,
      items: [
        {
          id: "c1-1",
          title: "KVKK aydınlatma metni revizyonu",
          updatedAt: "bugun",
        },
      ],
    },
    {
      label: "Son 7 Gün",
      id: "c2",
      pinned: false,
      items: [
        {
          id: "c2-1",
          title: "İcra takibi süreci soruları",
          updatedAt: "dun",
        },
      ],
    },
  ]);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);

  const openChat = (id: string) => {
    setActiveChatId(id);
    setHistoryOpen(false);
  };

  const handleNewChat = () => {
    const newId = `${Date.now()}`;
    const newItem = {
      id: uuidv4(),
      label: "now",
      pinned: false,
      title: "Yeni Sohbet",
      items: [
        {
          id: uuidv4(),
          title: "İcra takibi süreci soruları",
          updatedAt: "now",
        },
      ],
    };
    setChatSessions((prev) => [...prev, newItem]);
    openChat(newId);
  };

  const isAdminPanel = pathname.startsWith("/yonetici-paneli");

  const headerTitle = isAdminPanel
    ? "Yönetici Paneli"
    : pathname.startsWith("/hukuk-asistani")
    ? "Hukuk Asistanı"
    : pathname.startsWith("/belge-otomasyonu")
    ? "Belge Oluşturma"
    : pathname.startsWith("/proje-yonetimi")
    ? "Analiz Tabloları"
    : "";

  return (
    <header className={styles.header}>
      <div className={styles.titleContainer}>
        <div className={styles.titleWrapper}>
          <h2 className={styles.title} title={headerTitle}>
            {headerTitle}
          </h2>
          {pathname.startsWith("/hukuk-asistani") && (
            <Button
              variant="ghost"
              size="icon"
              className={styles.historyButton}
              aria-label="Sohbet Geçmişi"
              title="Sohbet Geçmişi"
              onClick={() => setHistoryOpen(true)}
            >
              <History className={styles.buttonIcon} />
            </Button>
          )}
        </div>
      </div>

      {/* Right actions */}
      {pathname.startsWith("/hukuk-asistani") && (
        <div className={styles.actions}>
          <Button
            variant="ghost"
            size="icon"
            className={styles.actionButton}
            aria-label="Yeni Sohbet"
            title="Yeni Sohbet"
            onClick={handleNewChat}
          >
            <CirclePlus className={styles.actionIcon} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className={styles.actionButton}
            aria-label="Knowledge Base"
            title="Knowledge Base"
            onClick={() => setKbOpen(true)}
          >
            <BookOpen className={styles.actionIcon} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className={styles.actionButton}
            aria-label="Playbooklar"
            title="Playbooklar"
            onClick={() => setPlaybooksOpen(true)}
          >
            <BookMarked className={styles.actionIcon} />
          </Button>

          {/* Sheets */}
          <SheetFiles onOpenChange={setKbOpen} open={kbOpen} />

          <ChatHistory
            activeChatId={activeChatId}
            handleNewChat={handleNewChat}
            list={chatSessions}
            onOpenChange={setHistoryOpen}
            open={historyOpen}
            openChat={openChat}
          />

          <Playbook
            list={playbooks}
            onOpenChange={setPlaybooksOpen}
            open={playbooksOpen}
            setSelectedPlaybook={setSelectedPlaybook}
          />

          <PlaybookDetail
            selectedPlaybook={selectedPlaybook}
            onOpenChange={setSelectedPlaybook}
            open={!!selectedPlaybook}
          />
        </div>
      )}
    </header>
  );
};
