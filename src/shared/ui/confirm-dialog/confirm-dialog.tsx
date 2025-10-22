import { Button } from "../button/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../dialog/dialog";
import styles from "./confirm-dialog.module.scss";

export const ConfirmDialog = (props: ConfirmDialogProps) => {
  const {
    cancelText = "Hayır",
    confirmText = "Evet",
    open,
    setOpen,
    loading,
    title = "Emin misiniz?",
    description = "Bu işlemi gerçekleştirmek istediğinize emin misiniz?",
    content,
    onConfirm,
  } = props;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className={styles.container}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {content && <DialogDescription>{content}</DialogDescription>}
        <DialogFooter className={styles.footer}>
          <Button
            label={cancelText}
            buttonType="justText"
            htmlType="button"
            variant="secondary"
            onClick={() => setOpen(false)}
            disabled={loading}
          />
          <Button
            label={confirmText}
            buttonType="justText"
            htmlType="button"
            isLoading={loading}
            onClick={onConfirm}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

interface ConfirmDialogProps {
  open: boolean;
  setOpen: (val: boolean) => void;
  confirmText?: string;
  cancelText?: string;
  loading: boolean;
  title?: string;
  description?: string;
  content?: string;
  onConfirm: () => void;
}
