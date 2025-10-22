import {
  Button,
  Input,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Textarea,
  Radio,
} from "@/shared/ui";
import styles from "../styles/create-collection-modal.module.scss";
import { useFormik } from "formik";
import { getInitialCreateCollectionModalValues } from "../constants";
import { useCreateCollection } from "../hooks";

export const CreateCollectionModal = (props: CollectionDialogProps) => {
  const { open, setOpen } = props;
  const { mutate: createCollection, isPending } = useCreateCollection();

  const { handleSubmit, handleChange, values, setFieldValue, resetForm, handleBlur } = useFormik({
    initialValues: getInitialCreateCollectionModalValues(),
    enableReinitialize: true,
    onSubmit: async (values) => {
      createCollection(values, {
        onSuccess: () => {
          resetForm();
          setOpen(false);
        },
      });
    },
  });

  const handleClose = () => {
    if (!isPending) {
      resetForm();
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className={styles.dialogContent}>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Yeni Koleksiyon Oluştur</DialogTitle>
            <DialogDescription>
              Dökümanlarınızı organize etmek için yeni bir koleksiyon oluşturun.
            </DialogDescription>
          </DialogHeader>
          <div className={styles.dialogForm}>
            <div className={styles.formGroup}>
              <Input
                name="name"
                placeholder="Örn: Proje Dökümanları"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={isPending}
              />
              <Textarea
                name="description"
                rows={6}
                onChange={handleChange}
                value={values.description}
                onBlur={handleBlur}
                disabled={isPending}
                placeholder="Örn: Proje Dökümanları Açıklaması"
              />
            </div>
            <div className={styles.formGroup}>
              <div className={styles.label}>Kapsam</div>
              <Radio.Group
                onChange={(e) => setFieldValue("scope", e.target.value)}
                value={values.scope}
                name="scope"
                disabled={isPending}
                isVertical
                options={[
                  { value: "private", label: "Kişisel - Sadece size özel" },
                  { value: "shared", label: "Organizasyon - Ekip üyeleriyle paylaşılabilir" },
                ]}
              />
            </div>
          </div>
          <DialogFooter className={styles.dialogFooter}>
            <Button
              label="İptal"
              buttonType="justText"
              htmlType="button"
              variant="secondary"
              onClick={handleClose}
              disabled={isPending}
            />
            <Button
              label="Oluştur"
              buttonType="iconWithText"
              iconType={{ default: "add" }}
              htmlType="submit"
              isLoading={isPending}
              disabled={!Object.values(values).every((x) => x.trim() !== "")}
            />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

interface CollectionDialogProps {
  open: boolean;
  setOpen: (val: boolean) => void;
}
