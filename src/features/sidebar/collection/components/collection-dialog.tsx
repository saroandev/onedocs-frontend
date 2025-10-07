import {
  Button,
  Input,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Label,
  RadioGroup,
  RadioGroupItem,
} from "@/shared/ui";
import { Plus } from "lucide-react";
import styles from "../styles/collection-dialog.module.scss";

export const CollectionDialog = (props: CollectionDialogProps) => {
  const {
    open,
    setOpen,
    newCollectionName,
    setNewCollectionName,
    newCollectionScope,
    setNewCollectionScope,
    handleCreateCollection,
  } = props;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className={styles.dialogContent}>
        <DialogHeader>
          <DialogTitle>Yeni Koleksiyon Oluştur</DialogTitle>
          <DialogDescription>
            Dökümanlarınızı organize etmek için yeni bir koleksiyon oluşturun.
          </DialogDescription>
        </DialogHeader>
        <div className={styles.dialogForm}>
          <div className={styles.formGroup}>
            <Label htmlFor="collection-name" className={styles.label}>
              Koleksiyon Adı
            </Label>
            <Input
              id="collection-name"
              placeholder="Örn: Proje Dökümanları"
              value={newCollectionName}
              onChange={(e) => setNewCollectionName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleCreateCollection();
                }
              }}
              className={styles.input}
            />
          </div>
          <div className={styles.formGroup}>
            <Label className={styles.label}>Kapsam</Label>
            <RadioGroup
              value={newCollectionScope}
              onValueChange={(v) => setNewCollectionScope(v)}
              className={styles.radioGroup}
            >
              <div className={styles.radioOption}>
                <RadioGroupItem value="personal" id="personal" />
                <Label htmlFor="personal" className={styles.radioLabel}>
                  Kişisel - Sadece size özel
                </Label>
              </div>
              <div className={styles.radioOption}>
                <RadioGroupItem value="org" id="org" />
                <Label htmlFor="org" className={styles.radioLabel}>
                  Organizasyon - Ekip üyeleriyle paylaşılabilir
                </Label>
              </div>
            </RadioGroup>
          </div>
        </div>
        <DialogFooter className={styles.dialogFooter}>
          <Button variant="outline" onClick={() => setOpen(false)} className={styles.cancelButton}>
            İptal
          </Button>
          <Button
            onClick={handleCreateCollection}
            disabled={!newCollectionName.trim()}
            className={styles.createButton}
          >
            <Plus className={styles.plusIcon} />
            Oluştur
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

interface CollectionDialogProps {
  open: boolean;
  setOpen: (val: boolean) => void;
  newCollectionName: string;
  setNewCollectionName: (val: string) => void;
  newCollectionScope: "personal" | "org";
  setNewCollectionScope: (val: "personal" | "org" | string) => void;
  handleCreateCollection: () => void;
}
