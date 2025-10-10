/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Tabs, TabsList, TabsTrigger } from "@/shared/ui";
import { ChevronLeft, Table, X } from "lucide-react";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import styles from "../styles/table-tab.module.scss";
import { useUIStore } from "@/shared/store/ui.store";

interface TableTabProps {
  setChoosenTab: (val: string) => void;
}

export const TableTab = (props: TableTabProps) => {
  const { setChoosenTab } = props;
  const [selectedTable, setSelectedTable] = useState<(typeof tables)[0] | null>(null);
  const [activeTableScope, setActiveTableScope] = useState<"personal" | "org" | string>("personal");
  const setTableName = useUIStore((state) => state.setTableName);
  const setTableColumns = useUIStore((state) => state.setTableColumns);
  const setDataGridOpen = useUIStore((state) => state.setDataGridOpen);

  const tables = [
    {
      id: "tb1",
      title: "Rekabet Kurumu Kararlarını Karşılaştır",
      description:
        "Rekabet Kurumu kararlarını karar no, tarih, konu, taraflar, ihlal türü ve yaptırım bakımından karşılaştırarak analiz edin.",
      category: "Karşılaştırmalı Analiz",
      lastUpdated: "Bugün",
      scope: "personal" as "personal" | "org",
      columns: [
        { name: "Karar No", prompt: "Kararın referans numarasını girin (örn: 21-45/678-M)" },
        { name: "Karar Tarihi", prompt: "Kararın verildiği tarihi yazın (GG.AA.YYYY)" },
        { name: "Konu", prompt: "Kararın konusunu özetleyin" },
        { name: "Taraflar", prompt: "Karara konu olan tarafları listeleyin" },
        { name: "İhlal Türü", prompt: "Tespit edilen ihlal türünü belirtin" },
      ],
      useCase: "Rekabet Kurumu kararlarını sistematik olarak karşılaştırma ve analiz etme",
    },
    {
      id: "tb2",
      title: 'Kira Sözleşmelerinde "Change of Control" Maddesi Analizi',
      description:
        "Kira sözleşmelerinde şirket kontrol değişikliği hâllerine ilişkin maddeyi tespit edip kapsam ve yaptırımları kıyaslayın.",
      category: "Madde Analizi",
      lastUpdated: "Bugün",
      scope: "personal" as "personal" | "org",
      columns: [
        { name: "Sözleşme Adı", prompt: "Kira sözleşmesinin adını yazın" },
        { name: "Taraflar", prompt: "Kiraya veren ve kiracı bilgilerini girin" },
        { name: "Tarih", prompt: "Sözleşme tarihini belirtin" },
        {
          name: "Change of Control Var mı?",
          prompt: "Kontrol değişikliği maddesi var mı? (Evet/Hayır)",
        },
        { name: "Bildirim Süresi", prompt: "Bildirim yapılması gereken süreyi yazın" },
      ],
      useCase: "Kira sözleşmelerinde kontrol değişikliği maddelerinin detaylı incelemesi",
    },
    {
      id: "tb3",
      title: "Gizlilik (NDA) Sözleşmelerinden Yapılandırılmış Veri Çıkarma",
      description:
        "NDA'lardaki taraflar, kapsam, süre ve istisnalar yapılandırılmış tabloya aktarın.",
      category: "Veri Çıkarma",
      lastUpdated: "Dün",
      scope: "personal" as "personal" | "org",
      columns: [
        { name: "Sözleşme Adı", prompt: "NDA sözleşmesinin adını girin" },
        { name: "Taraf(lar)", prompt: "Gizlilik yükümlülüğü altındaki tarafları listeleyin" },
        { name: "Gizli Bilgi Tanımı", prompt: "Gizli bilginin kapsamını özetleyin" },
        { name: "Amaç", prompt: "NDA'nın amaçlarını belirtin" },
        { name: "Süre", prompt: "Gizlilik yükümlülüğünün süresini yazın" },
      ],
      useCase: "NDA'lardaki önemli bilgileri yapılandırılmış formatta toplama",
    },
    {
      id: "tb4",
      title: "Avukat/Stajyer Özgeçmişlerini Kriter Bazlı Karşılaştırma",
      description:
        "Adayların deneyim, uzmanlık, dil ve teknik becerilerini kıyaslayarak hızlı değerlendirme yapın.",
      category: "İnsan Kaynakları",
      lastUpdated: "2 gün önce",
      scope: "org" as "personal" | "org",
      columns: [
        { name: "Ad Soyad", prompt: "Adayın tam adını yazın" },
        { name: "Deneyim (Yıl)", prompt: "Toplam çalışma yılını girin" },
        { name: "Uzmanlık Alanı", prompt: "Hukuk dallarındaki uzmanlıklarını listeleyin" },
        { name: "Dil", prompt: "Bildiği yabancı dilleri belirtin" },
        { name: "Teknik Beceriler", prompt: "Yazılım ve araç kullanım becerilerini yazın" },
      ],
      useCase: "Aday değerlendirme sürecinde sistematik karşılaştırma",
    },
    {
      id: "tb5",
      title: "Sözleşmelerdeki Önemli Tarihler (Yürürlük, Yenileme, Fesih) Tablosu",
      description: "Yürürlük, fesih bildirimi, yenileme ve ödeme tarihlerini tek tabloda görün.",
      category: "Tarih Takibi",
      lastUpdated: "3 gün önce",
      scope: "personal" as "personal" | "org",
      columns: [
        { name: "Sözleşme", prompt: "Sözleşmenin adını yazın" },
        { name: "Yürürlük", prompt: "Yürürlük başlangıç tarihini girin" },
        { name: "Bitiş", prompt: "Sözleşme bitiş tarihini belirtin" },
        { name: "Yenileme", prompt: "Otomatik yenileme tarihini yazın" },
        { name: "Fesih Bildirim Süresi", prompt: "Fesih için gerekli bildirim süresini girin" },
      ],
      useCase: "Sözleşmelerdeki kritik tarihleri takip etme ve hatırlatma",
    },
    {
      id: "tb6",
      title: "Dava Dosyalarında Masraf ve Süre Takibi",
      description: "Dava bazında masraf kalemleri, duruşma tarihleri ve toplam süreyi izleyin.",
      category: "Dava Yönetimi",
      lastUpdated: "1 hafta önce",
      scope: "org" as "personal" | "org",
      columns: [
        { name: "Dosya No", prompt: "Dava dosyasının numarasını girin" },
        { name: "Mahkeme", prompt: "Mahkeme adını ve türünü belirtin" },
        { name: "Açılış Tarihi", prompt: "Davanın açılış tarihini yazın" },
        { name: "Son İşlem", prompt: "Son yapılan işlemi açıklayın" },
        { name: "Masraf Toplamı", prompt: "Toplam masraf tutarını girin (TL)" },
      ],
      useCase: "Dava süreçlerindeki maliyet ve zaman takibi",
    },
  ];

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
