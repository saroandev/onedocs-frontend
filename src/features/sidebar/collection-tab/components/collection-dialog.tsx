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
import styles from "../styles/collection-dialog.module.scss";
import {
  BUTTON_TYPE,
  BUTTON_VARIANT,
  HTML_TYPE,
  ICON_TYPE,
} from "@/shared/ui/button/button-config";

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
          <Button
            label="İptal"
            buttonType={BUTTON_TYPE.JUST_TEXT}
            htmlType={HTML_TYPE.BUTTON}
            variant={BUTTON_VARIANT.OUTLINE}
            onClick={() => setOpen(false)}
          />
          <Button
            label="Oluştur"
            buttonType={BUTTON_TYPE.ICON_WITH_TEXT}
            iconType={{ default: ICON_TYPE.ADD }}
            htmlType={HTML_TYPE.BUTTON}
            onClick={handleCreateCollection}
            disabled={!newCollectionName.trim()}
          />
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
