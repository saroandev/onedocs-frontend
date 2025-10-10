import { Button, Input } from "@/shared/ui";
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
          <Input
            label="Organizasyon İsmi"
            name="org-name"
            value={orgName}
            onChange={(e) => setOrgName(e.target.value)}
            placeholder="Organizasyon ismini girin"
          />
          <p className={styles.fieldHint}>Bu isim sistem genelinde görünecektir</p>
        </div>

        <div className={styles.formField}>
          <Input
            label="Hukuk Asistanı İsmi"
            name="assistant-name"
            value={assistantName}
            onChange={(e) => setAssistantName(e.target.value)}
            placeholder="Asistan ismini girin"
          />
          <p className={styles.fieldHint}>Bu isim sohbetlerde ve bildirimlerde kullanılacaktır</p>
        </div>
      </div>

      <div className={styles.actionSection}>
        <Button label="Değişiklikleri Kaydet" onClick={handleSave} buttonType="justText" />
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
