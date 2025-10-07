import { RailButton } from "@/widgets/sidebar/components/rail-button";
import { Button, Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/shared/ui";
import { Shield, User } from "lucide-react";
import styles from "./user-section.module.scss";

export const UserSection = () => {
  return (
    <div className={styles.userSection}>
      <RailButton icon={<Shield className={styles.icon} />} label="Yönetici Paneli" />
      <Sheet>
        <SheetTrigger asChild>
          <button aria-label="Profil" className={styles.profileButton}>
            <div className={styles.profileIcon}>
              <User className={styles.icon} />
            </div>
          </button>
        </SheetTrigger>
        <SheetContent side="right" className={styles.sheetContent}>
          <SheetHeader>
            <SheetTitle>Profil</SheetTitle>
          </SheetHeader>
          <div className={styles.sheetActions}>
            <Button variant="secondary" className={styles.actionButton}>
              Profil Ayarları
            </Button>
            <Button className={styles.actionButton}>Çıkış</Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};
