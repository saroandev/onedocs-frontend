/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Tabs, TabsList, TabsTrigger } from "@/shared/ui";
import { BookMarked } from "lucide-react";
import { useState } from "react";
import styles from "../styles/playbook-tab.module.scss";
import { playbooks } from "../constants/playbook-tab-config";
import { useUIStore } from "@/shared/store/ui.store";

export const PlaybookTab = () => {
  const setChoosenTab = useUIStore((state) => state.setChoosenTab);

  const [selectedPlaybook, setSelectedPlaybook] = useState<(typeof playbooks)[0] | null>(null);
  const [activePlaybookScope, setActivePlaybookScope] = useState<"personal" | "org" | string>(
    "personal"
  );

  const filteredPlaybooks = playbooks.filter((pb) => pb.scope === activePlaybookScope);

  return (
    <div className={styles.container}>
      {!selectedPlaybook && (
        <>
          <div className={styles.header}>
            <div>
              <h2 className={styles.title}>Playbooklar</h2>
              <p className={styles.subtitle}>Sözleşme inceleme için hazır playbook'ları kullanın</p>
            </div>
            <Button
              label=""
              buttonType="justIcon"
              onClick={() => setChoosenTab("")}
              iconType={{ default: "close" }}
            />
          </div>

          <div className={styles.content}>
            <div className={styles.filterBar}>
              <span className={styles.countText}>{filteredPlaybooks.length} playbook</span>
              <Tabs
                value={activePlaybookScope}
                onValueChange={(v) => setActivePlaybookScope(v)}
                className={styles.tabs}
              >
                <TabsList className={styles.tabsList}>
                  <TabsTrigger value="personal" className={styles.tabsTrigger}>
                    Kişisel
                  </TabsTrigger>
                  <TabsTrigger value="org" className={styles.tabsTrigger}>
                    Organizasyon
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <div className={styles.playbookList}>
              {filteredPlaybooks.map((pb) => (
                <div
                  key={pb.id}
                  onClick={() => setSelectedPlaybook(pb)}
                  className={styles.playbookCard}
                >
                  <div className={styles.playbookCardInner}>
                    <div className={styles.playbookIcon}>
                      <BookMarked className={styles.iconSvg} />
                    </div>
                    <div className={styles.playbookInfo}>
                      <div className={styles.playbookHeader}>
                        <h3 className={styles.playbookTitle}>{pb.title}</h3>
                      </div>
                      <p className={styles.playbookDescription}>{pb.description}</p>
                      <p className={styles.playbookMeta}>{pb.clauses.length} madde</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {selectedPlaybook && (
        <div className={styles.detailView}>
          <div className={styles.detailHeader}>
            <Button
              label="Geri"
              onClick={() => setSelectedPlaybook(null)}
              buttonType="iconWithText"
              iconType={{ default: "chevron-left" }}
              iconTextReverse
              variant="secondary"
              className={styles.back}
            />

            <div className={styles.detailHeaderContent}>
              <div>
                <h2 className={styles.detailTitle}>{selectedPlaybook.title}</h2>
                <p className={styles.detailSubtitle}>{selectedPlaybook.description}</p>
              </div>
            </div>
          </div>

          <div className={styles.detailContent}>
            <div className={styles.clauseCountBar}>
              <span className={styles.clauseCount}>{selectedPlaybook.clauses.length} madde</span>
            </div>

            <div className={styles.clauseList}>
              {selectedPlaybook.clauses.map((clause, idx) => (
                <div key={idx} className={styles.clauseCard}>
                  <h3 className={styles.clauseTitle}>{clause.title}</h3>
                  <ul className={styles.issueList}>
                    {clause.issues.map((issue, i) => (
                      <li key={i} className={styles.issueItem}>
                        <span className={styles.issueBullet}>•</span>
                        <span className={styles.issueText}>{issue}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
