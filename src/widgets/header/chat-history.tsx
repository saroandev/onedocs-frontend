import { Button } from "@/shared/ui/button";
import { Sheet, SheetContent } from "@/shared/ui/sheet";
import { MoreHorizontal, Pencil } from "lucide-react";
import classNames from "classnames";
import styles from "./chat-history.module.scss";

interface ChatHistoryProps {
  open: boolean;
  onOpenChange: (val: boolean) => void;
  list: {
    id: string;
    pinned?: boolean;
    label: string;
    items: {
      id: string;
      title: string;
      updatedAt: string;
    }[];
  }[];
  handleNewChat: () => void;
  openChat: (id: string) => void;
  activeChatId: string | null;
}

export const ChatHistory = (props: ChatHistoryProps) => {
  const { open, onOpenChange, list, handleNewChat, openChat, activeChatId } = props;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" overlay={false} shadow={false} className={styles.sheetContent}>
        <div className={styles.container}>
          <Button variant="outline" className={styles.newChatButton} onClick={handleNewChat}>
            <span className={styles.newChatIcon}>
              <Pencil className={styles.pencilIcon} />
            </span>
            Yeni Sohbet
          </Button>
          <div className={styles.listContainer}>
            {list.map((item) => {
              return (
                <div key={item.id} className={styles.section}>
                  <h3 className={styles.sectionLabel}>{item.label}</h3>
                  <ul className={styles.chatList}>
                    {item.items.map((c) => {
                      const isActive = activeChatId === c.id;
                      return (
                        <li key={c.id}>
                          <div
                            role="button"
                            tabIndex={0}
                            onClick={() => openChat(c.id)}
                            onKeyDown={(e) => e.key === "Enter" && openChat(c.id)}
                            className={classNames(styles.chatItem, {
                              [styles.active]: isActive,
                            })}
                          >
                            <span
                              className={classNames(styles.chatTitle, {
                                [styles.activeTitle]: isActive,
                              })}
                            >
                              {c.title}
                            </span>
                            <button className={styles.moreButton} aria-label="Daha fazla">
                              <MoreHorizontal className={styles.moreIcon} />
                            </button>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
