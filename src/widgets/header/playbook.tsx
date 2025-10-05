import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/shared/ui/sheet";
import { FileText } from "lucide-react";
import styles from "./playbook.module.scss";

export interface PlaybookProps {
  open: boolean;
  onOpenChange: (val: boolean) => void;
  list: {
    id: string;
    title: string;
    titleEn: string;
    description: string;
    defaultPlaybook: boolean;
    clauses: {
      title: string;
      issues: string[];
    }[];
  }[];
  setSelectedPlaybook: (val: {
    id: string;
    title: string;
    titleEn: string;
    description: string;
    defaultPlaybook: boolean;
    clauses: {
      title: string;
      issues: string[];
    }[];
  }) => void;
}

export const Playbook = (props: PlaybookProps) => {
  const { onOpenChange, open, list, setSelectedPlaybook } = props;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className={styles.sheetContent}>
        <SheetHeader>
          <SheetTitle className={styles.sheetTitle}>Playbooklar</SheetTitle>
          <SheetDescription>
            Sözleşme inceleme için hazır playbook'ları görüntüleyin ve kullanın.
          </SheetDescription>
        </SheetHeader>
        <div className={styles.listContainer}>
          {list.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedPlaybook(item)}
              className={styles.playbookItem}
            >
              <div className={styles.iconWrapper}>
                <FileText className={styles.icon} />
              </div>
              <div className={styles.content}>
                <div className={styles.header}>
                  <h3 className={styles.title}>{item.title}</h3>
                  {item.defaultPlaybook && <span className={styles.badge}>Varsayılan</span>}
                </div>
                <p className={styles.clauseCount}>{item.clauses.length} madde</p>
              </div>
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};
