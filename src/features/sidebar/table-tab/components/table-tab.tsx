/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Tabs, TabsList, TabsTrigger } from "@/shared/ui";
import { Table } from "lucide-react";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import styles from "../styles/table-tab.module.scss";
import { useUIStore } from "@/shared/store/ui.store";
import { tables } from "../constants/table-tab-config";

export const TableTab = () => {
  const setChoosenTab = useUIStore((state) => state.setChoosenTab);
  const [selectedTable, setSelectedTable] = useState<(typeof tables)[0] | null>(null);
  const [activeTableScope, setActiveTableScope] = useState<"personal" | "org" | string>("personal");
  const setTableName = useUIStore((state) => state.setTableName);
  const setTableColumns = useUIStore((state) => state.setTableColumns);
  const setDataGridOpen = useUIStore((state) => state.setDataGridOpen);

  const handleUseTable = () => {
    if (!selectedTable) return;

    const columnNames = selectedTable.columns.map((col) => col.name);

    // Set table data in context
    setTableName(selectedTable.title);
    setTableColumns(columnNames);
    setDataGridOpen(true);

    setChoosenTab(uuidv4());
    // router.push("/");//TODO
  };

  const filteredTables = tables.filter((tb) => tb.scope === activeTableScope);

  return (
    <div className={styles.container}>
      {!selectedTable && (
        <>
          <div className={styles.header}>
            <div>
              <h2 className={styles.title}>Tablolar</h2>
              <p className={styles.subtitle}>Belge karşılaştırma tablo şablonları</p>
            </div>
            <Button
              label=""
              buttonType="justIcon"
              onClick={() => setChoosenTab(uuidv4())}
              iconType={{ default: "close" }}
            />
          </div>

          <div className={styles.content}>
            <div className={styles.filterBar}>
              <span className={styles.countText}>{filteredTables.length} tablo</span>
              <Tabs
                value={activeTableScope}
                onValueChange={(v) => setActiveTableScope(v)}
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

            <div className={styles.tableList}>
              {filteredTables.map((table) => (
                <div
                  key={table.id}
                  onClick={() => setSelectedTable(table)}
                  className={styles.tableCard}
                >
                  <div className={styles.tableCardInner}>
                    <div className={styles.tableIcon}>
                      <Table className={styles.iconSvg} />
                    </div>
                    <div className={styles.tableInfo}>
                      <div className={styles.tableHeader}>
                        <h3 className={styles.tableTitle}>{table.title}</h3>
                      </div>
                      <p className={styles.tableDescription}>{table.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {selectedTable && (
        <div className={styles.detailView}>
          <div className={styles.detailHeader}>
            <Button
              label="Geri"
              onClick={() => setSelectedTable(null)}
              buttonType="iconWithText"
              iconType={{ default: "chevron-left" }}
              iconTextReverse
              variant="secondary"
              className={styles.back}
            />

            <div className={styles.detailHeaderContent}>
              <div>
                <h2 className={styles.detailTitle}>{selectedTable.title}</h2>
                <p className={styles.detailSubtitle}>{selectedTable.description}</p>
              </div>
            </div>
          </div>

          <div className={styles.detailContent}>
            <div className={styles.actionBar}>
              <Button
                onClick={handleUseTable}
                label="Tabloyu Kullan"
                buttonType={"iconWithText"}
                iconType={{ default: "table" }}
                iconTextReverse
              />
            </div>

            <div className={styles.infoCard}>
              <div className={styles.infoSection}>
                <h3 className={styles.infoLabel}>Kullanım Alanı</h3>
                <p className={styles.infoDescription}>{selectedTable.useCase}</p>
              </div>
              <div className={styles.divider}></div>
              <div className={styles.infoSection}>
                <h3 className={styles.infoLabel}>Nasıl Kullanılır?</h3>
                <p className={styles.infoDescription}>
                  Bu tablo şablonu, birden fazla belgeyi sistematik olarak karşılaştırmanızı sağlar.
                  Belgeleri yükleyin ve tablo otomatik olarak önemli bilgileri organize ederek
                  karşılaştırmalı analiz yapmanıza yardımcı olur. Her kolon, belirli bir
                  karşılaştırma kriterini temsil eder ve sonuçlar görsel olarak sunulur.
                </p>
              </div>
            </div>

            <div className={styles.columnsCard}>
              <h3 className={styles.columnsTitle}>Tablo Kolonları</h3>
              <div className={styles.columnsList}>
                {selectedTable.columns.map((col, idx) => (
                  <div key={idx} className={styles.columnItem}>
                    <div className={styles.columnHeader}>
                      <span className={styles.columnNumber}>{idx + 1}</span>
                      <span className={styles.columnName}>
                        {typeof col === "string" ? col : col.name}
                      </span>
                    </div>
                    {typeof col === "object" && col.prompt && (
                      <p className={styles.columnPrompt}>{col.prompt}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
