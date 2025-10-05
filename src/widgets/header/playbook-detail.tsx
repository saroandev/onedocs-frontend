import { Button } from "@/shared/ui/button";
import { Sheet, SheetContent } from "@/shared/ui/sheet";
import { X } from "lucide-react";
import styles from "./playbook-detail.module.scss";

export interface PlaybookDetailProps {
  open: boolean;
  onOpenChange: (val: null) => void;
  selectedPlaybook: {
    id: string;
    title: string;
    titleEn: string;
    description: string;
    defaultPlaybook: boolean;
    clauses: {
      title: string;
      issues: string[];
    }[];
  } | null;
}

export const PlaybookDetail = (props: PlaybookDetailProps) => {
  const { onOpenChange, open, selectedPlaybook } = props;

  const close = () => onOpenChange(null);

  if (!selectedPlaybook) {
    return null;
  }

  return (
    <Sheet open={!!open} onOpenChange={close}>
      <SheetContent side="right" className={styles.sheetContent}>
        <div className={styles.headerBar}>
          <div className={styles.breadcrumb}>
            <button onClick={close} className={styles.breadcrumbLink}>
              Home
            </button>
            <span>/</span>
            <button onClick={close} className={styles.breadcrumbLink}>
              Default Playbooks
            </button>
            <span>/</span>
            <span className={styles.breadcrumbCurrent}>{selectedPlaybook.title}</span>
          </div>
          <Button size="icon" variant="ghost" className={styles.closeButton} onClick={close}>
            <X className={styles.closeIcon} />
          </Button>
        </div>
        <div className={styles.contentArea}>
          <h1 className={styles.title}>{selectedPlaybook.title}</h1>
          <p className={styles.description}>{selectedPlaybook.description}</p>
          <p className={styles.note}>Bu varsayılan bir playbook'tur ve düzenlenemez</p>
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead className={styles.thead}>
                <tr>
                  <th className={styles.thClause}>Maddeler</th>
                  <th className={styles.thIssue}>Sorunlar</th>
                </tr>
              </thead>
              <tbody className={styles.tbody}>
                {selectedPlaybook.clauses.map((clause, idx) => (
                  <tr key={idx} className={styles.row}>
                    <td className={styles.tdClause}>
                      <div className={styles.clauseHeader}>
                        <span className={styles.clauseNumber}>{idx + 1}</span>
                        <span className={styles.clauseTitle}>{clause.title}</span>
                      </div>
                    </td>
                    <td className={styles.tdIssue}>
                      <ul className={styles.issueList}>
                        {clause.issues.map((issue, issueIdx) => (
                          <li key={issueIdx} className={styles.issueItem}>
                            <span className={styles.issueBullet} />
                            <span className={styles.issueText}>{issue}</span>
                          </li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
