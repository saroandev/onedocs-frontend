/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Tabs, TabsList, TabsTrigger } from "@/shared/ui";
import { FileText } from "lucide-react";
import { useState } from "react";
import styles from "../styles/template-tab.module.scss";
import { templates } from "../constants/template-tab-config";
import { useUIStore } from "@/shared/store/ui.store";

export const TemplateTab = () => {
  const setChoosenTab = useUIStore((state) => state.setChoosenTab);
  const [selectedTemplate, setSelectedTemplate] = useState<(typeof templates)[0] | null>(null);
  const [activeTemplateScope, setActiveTemplateScope] = useState<"personal" | "org" | string>(
    "personal"
  );

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
              label=""
              buttonType={"justIcon"}
              onClick={() => setChoosenTab("")}
              iconType={{ default: "close" }}
            />
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
              label="Geri"
              onClick={() => setSelectedTemplate(null)}
              buttonType="iconWithText"
              iconType={{ default: "chevron-left" }}
              iconTextReverse
              variant="secondary"
              className={styles.back}
            />

            <div className={styles.detailHeaderContent}>
              <div>
                <h2 className={styles.detailTitle}>{selectedTemplate.title}</h2>
                <p className={styles.detailSubtitle}>{selectedTemplate.description}</p>
              </div>
            </div>
          </div>

          <div className={styles.detailContent}>
            <div className={styles.actionBar}>
              <Button
                label="Şablonu Kullan"
                buttonType={"iconWithText"}
                iconType={{ default: "document" }}
                iconTextReverse
              />
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
