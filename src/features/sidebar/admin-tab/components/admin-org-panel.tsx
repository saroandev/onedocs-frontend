import { Button, Input, Label } from "@/shared/ui";
import { useState } from "react";
import styles from "../styles/admin-org-panel.module.scss";

export const AdminOrgPanel = () => {
  const [orgName, setOrgName] = useState("Onedocs Hukuk");
  const [assistantName, setAssistantName] = useState("Hukuk Asistanı");

  const handleSave = () => {
    console.log("Saving:", { orgName, assistantName });
  };

  return (
    <div className={styles.container}>
      <div className={styles.headerSection}>
        <h3 className={styles.headerTitle}>Organizasyon Ayarları</h3>
        <p className={styles.headerDescription}>Organizasyonunuzun genel ayarlarını düzenleyin</p>
      </div>

      <div className={styles.formSection}>
        <div className={styles.formField}>
          <Label htmlFor="org-name" className={styles.fieldLabel}>
            Organizasyon İsmi
          </Label>
          <Input
            id="org-name"
            value={orgName}
            onChange={(e) => setOrgName(e.target.value)}
            placeholder="Organizasyon ismini girin"
            className={styles.input}
          />
          <p className={styles.fieldHint}>Bu isim sistem genelinde görünecektir</p>
        </div>

        <div className={styles.formField}>
          <Label htmlFor="assistant-name" className={styles.fieldLabel}>
            Hukuk Asistanı İsmi
          </Label>
          <Input
            id="assistant-name"
            value={assistantName}
            onChange={(e) => setAssistantName(e.target.value)}
            placeholder="Asistan ismini girin"
            className={styles.input}
          />
          <p className={styles.fieldHint}>Bu isim sohbetlerde ve bildirimlerde kullanılacaktır</p>
        </div>
      </div>

      <div className={styles.actionSection}>
        <Button onClick={handleSave} className={styles.saveButton}>
          Değişiklikleri Kaydet
        </Button>
      </div>

      <div className={styles.tipCard}>
        <div className={styles.tipContent}>
          <strong className={styles.tipTitle}>💡 İpucu</strong>
          Organizasyon ayarları tüm kullanıcılar için geçerli olacaktır. Değişiklikler anında
          yansıyacaktır.
        </div>
      </div>
    </div>
  );
};
