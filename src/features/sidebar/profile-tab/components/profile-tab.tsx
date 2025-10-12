/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Input,
  Label,
} from "@/shared/ui";
import { Building2, Check, ChevronLeft, Lock } from "lucide-react";
import { useState } from "react";
import styles from "../styles/profile-tab.module.scss";
import { useUIStore } from "@/shared/store/ui.store";

export const ProfileTab = () => {
  const setChoosenTab = useUIStore((state) => state.setChoosenTab);
  const [orgSwitchModalOpen, setOrgSwitchModalOpen] = useState(false);
  const [_selectedOrg, setSelectedOrg] = useState("onedocs");
  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("");
  const [value3, setValue3] = useState("");

  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <div>
            <h2 className={styles.title}>Profil Ayarları</h2>
            <p className={styles.subtitle}>Hesabınızı yönetin</p>
          </div>
          <Button
            label=""
            buttonType={"justIcon"}
            onClick={() => setChoosenTab("")}
            iconType={{ default: "close" }}
          />
        </div>

        <div className={styles.content}>
          <button onClick={() => setOrgSwitchModalOpen(true)} className={styles.orgButton}>
            <div className={styles.orgContent}>
              <div className={styles.orgAvatar}>
                <Building2 className={styles.orgIcon} />
              </div>
              <div className={styles.orgInfo}>
                <h3 className={styles.orgName}>Onedocs Hukuk</h3>
                <p className={styles.orgLabel}>Mevcut organizasyon</p>
              </div>
              <ChevronLeft className={styles.chevron} />
            </div>
          </button>

          <div className={styles.passwordSection}>
            <div className={styles.sectionHeader}>
              <Lock className={styles.sectionIcon} />
              <h3 className={styles.sectionTitle}>Şifre Değiştir</h3>
            </div>
            <div className={styles.formFields}>
              <div className={styles.field}>
                <Input
                  value={value1}
                  onChange={(e) => setValue1(e.target.value)}
                  label="Mevcut Şifre"
                  name="current-password"
                  type="password"
                  placeholder="••••••••"
                />
              </div>
              <div className={styles.field}>
                <Input
                  value={value2}
                  onChange={(e) => setValue2(e.target.value)}
                  label="Yeni Şifre"
                  name="new-password"
                  type="password"
                  placeholder="••••••••"
                />
              </div>
              <div className={styles.field}>
                <Input
                  value={value3}
                  onChange={(e) => setValue3(e.target.value)}
                  label="Yeni Şifre (Tekrar)"
                  name="confirm-password"
                  type="password"
                  placeholder="••••••••"
                />
              </div>
              <Button label="Şifreyi Güncelle" buttonType="justText" />
            </div>
          </div>

          <div className={styles.logoutSection}>
            <Button
              label="Çıkış Yap"
              buttonType="iconWithText"
              variant="destructive"
              iconTextReverse
            />
          </div>
        </div>
      </div>

      <Dialog open={orgSwitchModalOpen} onOpenChange={setOrgSwitchModalOpen}>
        <DialogContent className={styles.dialogContent}>
          <DialogHeader>
            <DialogTitle>Organizasyon Değiştir</DialogTitle>
            <DialogDescription>Çalışmak istediğiniz organizasyonu seçin.</DialogDescription>
          </DialogHeader>
          <div className={styles.dialogBody}>
            <div className={styles.orgSection}>
              <Label className={styles.orgSectionLabel}>Aktif Organizasyon</Label>
              <button className={styles.activeOrg} disabled>
                <div className={styles.activeOrgContent}>
                  <div className={styles.activeOrgLeft}>
                    <Building2 className={styles.activeOrgIcon} />
                    <div>
                      <p className={styles.activeOrgName}>Onedocs Hukuk</p>
                      <p className={styles.activeOrgLabel}>Mevcut organizasyon</p>
                    </div>
                  </div>
                  <Check className={styles.checkIcon} />
                </div>
              </button>
            </div>

            <div className={styles.orgSection}>
              <Label className={styles.orgSectionLabel}>Diğer Organizasyonlar</Label>
              <div className={styles.otherOrgsList}>
                <button
                  onClick={() => {
                    setSelectedOrg("abc");
                    setOrgSwitchModalOpen(false);
                  }}
                  className={styles.otherOrgButton}
                >
                  <div className={styles.otherOrgContent}>
                    <div className={styles.otherOrgLeft}>
                      <Building2 className={styles.otherOrgIcon} />
                      <div>
                        <p className={styles.otherOrgName}>ABC Danışmanlık</p>
                      </div>
                    </div>
                    <ChevronLeft className={styles.otherChevron} />
                  </div>
                </button>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              label="Kapat"
              buttonType="justText"
              variant="secondary"
              onClick={() => setOrgSwitchModalOpen(false)}
            />
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
