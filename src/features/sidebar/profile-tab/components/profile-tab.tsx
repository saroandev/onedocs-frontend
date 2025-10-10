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
import { Building2, Check, ChevronLeft, Lock, LogOut, X } from "lucide-react";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import styles from "../styles/profile-tab.module.scss";
import { BUTTON_TYPE, ICON_TYPE } from "@/shared/ui/button/button-config";

export const ProfileTab = (props: ProfileTabProps) => {
  const { setChoosenTab } = props;
  const [orgSwitchModalOpen, setOrgSwitchModalOpen] = useState(false);
  const [selectedOrg, setSelectedOrg] = useState("onedocs");

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
            buttonType={BUTTON_TYPE.JUST_ICON}
            onClick={() => setChoosenTab(uuidv4())}
            iconType={{ default: ICON_TYPE.CLOSE }}
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
                <Label htmlFor="current-password" className={styles.label}>
                  Mevcut Şifre
                </Label>
                <Input
                  id="current-password"
                  type="password"
                  placeholder="••••••••"
                  className={styles.input}
                />
              </div>
              <div className={styles.field}>
                <Label htmlFor="new-password" className={styles.label}>
                  Yeni Şifre
                </Label>
                <Input
                  id="new-password"
                  type="password"
                  placeholder="••••••••"
                  className={styles.input}
                />
              </div>
              <div className={styles.field}>
                <Label htmlFor="confirm-password" className={styles.label}>
                  Yeni Şifre (Tekrar)
                </Label>
                <Input
                  id="confirm-password"
                  type="password"
                  placeholder="••••••••"
                  className={styles.input}
                />
              </div>
              <Button size="sm" className={styles.updateButton}>
                Şifreyi Güncelle
              </Button>
            </div>
          </div>

          <div className={styles.logoutSection}>
            <Button variant="destructive" className={styles.logoutButton} size="sm">
              <LogOut className={styles.logoutIcon} />
              Çıkış Yap
            </Button>
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
            <Button variant="outline" onClick={() => setOrgSwitchModalOpen(false)}>
              Kapat
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

interface ProfileTabProps {
  setChoosenTab: (val: string) => void;
}
