/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Tabs, TabsList, TabsTrigger } from "@/shared/ui";
import { ChevronLeft, FileText, X } from "lucide-react";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import styles from "../styles/template-tab.module.scss";

export const TemplateTab = (props: TemplateTabProps) => {
  const { setChoosenTab } = props;
  const [selectedTemplate, setSelectedTemplate] = useState<(typeof templates)[0] | null>(null);
  const [activeTemplateScope, setActiveTemplateScope] = useState<"personal" | "org" | string>(
    "personal"
  );

  const templates = [
    {
      id: "t1",
      title: "Hizmet Sözleşmesi Şablonu",
      description:
        "Genel hizmet sözleşmesi şablonu. Hizmet veren ve alan taraflar arasında kullanılabilir.",
      category: "Ticari Sözleşmeler",
      lastUpdated: "Bugün",
      scope: "personal" as "personal" | "org",
      currentVersion: "3.0",
      versions: [
        {
          id: "v3",
          version: "3.0",
          date: "05.10.2024",
          changes: "Son güncellemeler ve KVKK uyumluluğu eklendi",
          isCurrent: true,
        },
        {
          id: "v2",
          version: "2.1",
          date: "28.09.2024",
          changes: "Hata düzeltmeleri ve madde iyileştirmeleri",
        },
        {
          id: "v1",
          version: "2.0",
          date: "15.09.2024",
          changes: "İlk yayınlanan versiyon",
        },
      ],
    },
    {
      id: "t2",
      title: "Gizlilik Sözleşmesi (NDA)",
      description:
        "Ticari gizlilik ve gizlilik anlaşması şablonu. İki taraf arasında bilgi paylaşımı için.",
      category: "Gizlilik",
      lastUpdated: "Dün",
      scope: "personal" as "personal" | "org",
      currentVersion: "2.5",
      versions: [
        {
          id: "v4",
          version: "2.5",
          date: "04.10.2024",
          changes: "Gizlilik süresi güncellemesi",
          isCurrent: true,
        },
        {
          id: "v3",
          version: "2.0",
          date: "20.09.2024",
          changes: "Yasal düzenlemeler eklendi",
        },
        {
          id: "v2",
          version: "1.5",
          date: "10.09.2024",
          changes: "Madde revizyonları",
        },
      ],
    },
    {
      id: "t3",
      title: "İş Sözleşmesi Şablonu",
      description:
        "Belirsiz süreli iş sözleşmesi şablonu. İşveren ve çalışan arasında kullanılabilir.",
      category: "İş Hukuku",
      lastUpdated: "2 gün önce",
      scope: "org" as "personal" | "org",
      currentVersion: "4.2",
      versions: [
        {
          id: "v5",
          version: "4.2",
          date: "03.10.2024",
          changes: "İş Kanunu değişiklikleri uygulandı",
          isCurrent: true,
        },
        {
          id: "v4",
          version: "4.1",
          date: "25.09.2024",
          changes: "Uzaktan çalışma maddeleri eklendi",
        },
        {
          id: "v3",
          version: "4.0",
          date: "15.09.2024",
          changes: "Önemli güncelleme",
        },
      ],
    },
    {
      id: "t4",
      title: "Tedarik Sözleşmesi",
      description: "Mal veya hizmet tedarik sözleşmesi şablonu. Tedarikçi ve alıcı arasında.",
      category: "Ticari Sözleşmeler",
      lastUpdated: "3 gün önce",
      scope: "org" as "personal" | "org",
      currentVersion: "1.8",
      versions: [
        {
          id: "v2",
          version: "1.8",
          date: "02.10.2024",
          changes: "Teslimat koşulları güncellendi",
          isCurrent: true,
        },
        {
          id: "v1",
          version: "1.5",
          date: "18.09.2024",
          changes: "İlk versiyon",
        },
      ],
    },
    {
      id: "t5",
      title: "Danışmanlık Sözleşmesi",
      description: "Profesyonel danışmanlık hizmeti sözleşmesi şablonu.",
      category: "Ticari Sözleşmeler",
      lastUpdated: "1 hafta önce",
      scope: "personal" as "personal" | "org",
      currentVersion: "2.0",
      versions: [
        {
          id: "v3",
          version: "2.0",
          date: "28.09.2024",
          changes: "Tam revizyon yapıldı",
          isCurrent: true,
        },
        {
          id: "v2",
          version: "1.2",
          date: "12.09.2024",
          changes: "Küçük düzeltmeler",
        },
        {
          id: "v1",
          version: "1.0",
          date: "01.09.2024",
          changes: "İlk yayın",
        },
      ],
    },
  ];

  const filteredTemplates = templates.filter((t) => t.scope === activeTemplateScope);

  return (
    <div className={styles.container}>
      {!selectedTemplate && (
        <>
          <div className={styles.header}>
            <div>
              <h2 className={styles.title}>Şablonlar</h2>
              <p className={styles.subtitle}>Hazır belge şablonlarını kullanın</p>
            </div>
            <Button
              size="icon"
              variant="ghost"
              className={styles.closeButton}
              onClick={() => setChoosenTab(uuidv4())}
            >
              <X className={styles.closeIcon} />
            </Button>
          </div>

          <div className={styles.content}>
            <div className={styles.filterBar}>
              <span className={styles.countText}>{filteredTemplates.length} şablon</span>
              <Tabs
                value={activeTemplateScope}
                onValueChange={(v) => setActiveTemplateScope(v)}
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

            <div className={styles.templateList}>
              {filteredTemplates.map((template) => (
                <div
                  key={template.id}
                  onClick={() => setSelectedTemplate(template)}
                  className={styles.templateCard}
                >
                  <div className={styles.templateCardInner}>
                    <div className={styles.templateIcon}>
                      <FileText className={styles.iconSvg} />
                    </div>
                    <div className={styles.templateInfo}>
                      <div className={styles.templateHeader}>
                        <h3 className={styles.templateTitle}>{template.title}</h3>
                      </div>
                      <p className={styles.templateDescription}>{template.description}</p>
                      <div className={styles.templateMeta}>
                        <span className={styles.metaCategory}>{template.category}</span>
                        <span className={styles.metaDot}>•</span>
                        <span className={styles.metaDate}>{template.lastUpdated}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {selectedTemplate && (
        <div className={styles.detailView}>
          <div className={styles.detailHeader}>
            <Button
              variant="ghost"
              size="sm"
              className={styles.backButton}
              onClick={() => setSelectedTemplate(null)}
            >
              <ChevronLeft size={16} />
              Geri
            </Button>

            <div className={styles.detailHeaderContent}>
              <div>
                <h2 className={styles.detailTitle}>{selectedTemplate.title}</h2>
                <p className={styles.detailSubtitle}>{selectedTemplate.description}</p>
              </div>
            </div>
          </div>

          <div className={styles.detailContent}>
            <div className={styles.actionBar}>
              <Button size="sm">
                <FileText className={styles.buttonIcon} />
                Şablonu Kullan
              </Button>
            </div>

            <div className={styles.infoCard}>
              <div className={styles.infoItem}>
                <h3 className={styles.infoLabel}>Kategori</h3>
                <p className={styles.infoValue}>{selectedTemplate.category}</p>
              </div>
              <div className={styles.infoItem}>
                <h3 className={styles.infoLabel}>Son Güncelleme</h3>
                <p className={styles.infoValue}>{selectedTemplate.lastUpdated}</p>
              </div>
              <div className={styles.infoItem}>
                <h3 className={styles.infoLabel}>Açıklama</h3>
                <p className={styles.infoDescription}>{selectedTemplate.description}</p>
              </div>
            </div>
            <div className={styles.templateContentCard}>
              <h3 className={styles.contentTitle}>Şablon İçeriği</h3>
              <p className={styles.contentDescription}>
                Bu şablon, {selectedTemplate.title.toLowerCase()} için standart maddeleri içerir.
                Taraflar, hizmet kapsamı, ücret ve ödeme koşulları, süre ve fesih, gizlilik,
                sorumluluk sınırlamaları ve uyuşmazlık çözümü gibi önemli bölümleri kapsar.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

interface TemplateTabProps {
  setChoosenTab: (val: string) => void;
}
