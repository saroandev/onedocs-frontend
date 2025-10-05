import { Button } from "@/shared/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/shared/ui/dialog";
import { Input } from "@/shared/ui/input";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/shared/ui/sheet";
import { Tabs, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import { FileText, Folder, FolderOpen, FolderPlus, StickyNote, Trash2, Upload } from "lucide-react";
import { useRef, useState } from "react";
import classNames from "classnames";
import styles from "./sheet-files.module.scss";

interface SheetFilesProps {
  open: boolean;
  onOpenChange: (val: boolean) => void;
}

export const SheetFiles = (props: SheetFilesProps) => {
  const { open, onOpenChange } = props;

  const [kbItems, setKbItems] = useState<
    Array<{
      id: string;
      title: string;
      type: "document" | "note";
      scope: "user" | "org";
      collection?: string;
      tags?: string[];
      content?: string;
    }>
  >([
    {
      id: "1",
      title: "İş Kanunu Notları.md",
      type: "note",
      scope: "user",
      collection: "Genel",
      tags: ["iş hukuku"],
    },
    {
      id: "2",
      title: "KVKK_Aydinlatma_Ornek.docx",
      type: "document",
      scope: "org",
      collection: "KVKK",
      tags: ["kvkk", "örnek"],
    },
  ]);

  const [collectionFilter, setCollectionFilter] = useState<"ALL" | string>("ALL");
  const [newCollectionName, setNewCollectionName] = useState("");
  const [collections, setCollections] = useState<Record<"user" | "org", string[]>>({
    user: ["Genel", "KVKK", "Sözleşmeler"],
    org: ["Genel", "KVKK", "Sözleşmeler"],
  });
  const [activeScope, setActiveScope] = useState<"user" | "org">("user");
  const [addingCollection, setAddingCollection] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleAddCollection = () => {
    const name = newCollectionName.trim();
    if (!name) return;
    setCollections((prev) => ({
      ...prev,
      [activeScope]: prev[activeScope].includes(name)
        ? prev[activeScope]
        : [...prev[activeScope], name],
    }));
    setNewCollectionName("");
    setAddingCollection(false);
    setCollectionFilter(name);
  };

  const filteredKbItems = kbItems.filter(
    (it) =>
      it.scope === activeScope && (collectionFilter === "ALL" || it.collection === collectionFilter)
  );

  const handleDelete = (id: string) => setKbItems((prev) => prev.filter((it) => it.id !== id));

  const handleFileUpload: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const targetCollection =
      collectionFilter !== "ALL" ? collectionFilter : collections[activeScope][0] || "Genel";
    const toAdd = Array.from(files).map((file) => ({
      id: `${Date.now()}-${file.name}`,
      title: file.name,
      type: "document" as const,
      scope: activeScope,
      collection: targetCollection,
      tags: [],
    }));
    setKbItems((prev) => [...toAdd, ...prev]);
    e.currentTarget.value = "";
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className={styles.sheetContent}>
        <SheetHeader>
          <SheetTitle>Knowledge Base</SheetTitle>
          <SheetDescription>
            Belgelerinizi ve notlarınızı düzenleyin, yenilerini ekleyin.
          </SheetDescription>
        </SheetHeader>
        <div className={styles.content}>
          {/* Scope Tabs */}
          <Tabs value={activeScope} onValueChange={(v) => setActiveScope(v as "user" | "org")}>
            <TabsList className={styles.tabsList}>
              <TabsTrigger value="user">Kullanıcı</TabsTrigger>
              <TabsTrigger value="org">Organization</TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Actions */}
          <div className={styles.actions}>
            <Button
              size="sm"
              variant="secondary"
              className={styles.actionButton}
              onClick={() => fileInputRef.current?.click()}
              disabled={collectionFilter === "ALL"}
              title={
                collectionFilter === "ALL"
                  ? "Önce bir koleksiyon (klasör) seçin"
                  : `Yükleme konumu: ${collectionFilter}`
              }
            >
              <Upload className={styles.actionIcon} /> Doküman Yükle
              {collectionFilter !== "ALL" ? ` (${collectionFilter})` : ""}
            </Button>
            <Button
              size="sm"
              variant="outline"
              className={styles.actionButton}
              onClick={() => setAddingCollection(true)}
            >
              <FolderPlus className={styles.actionIcon} /> Yeni Koleksiyon
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              className={styles.hiddenInput}
              onChange={handleFileUpload}
            />
          </div>

          {/* Collections list */}
          <div className={styles.collectionsSection}>
            <h3 className={styles.collectionsTitle}>Koleksiyonlar</h3>
            <div className={styles.collectionsGrid}>
              {collections[activeScope].length === 0 ? (
                <span className={styles.emptyText}>Henüz koleksiyon yok.</span>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => setCollectionFilter("ALL")}
                    className={classNames(styles.collectionButton, {
                      [styles.active]: collectionFilter === "ALL",
                    })}
                    title="Tümü"
                    aria-pressed={collectionFilter === "ALL"}
                  >
                    <Folder className={styles.collectionIcon} /> Tümü
                  </button>
                  {collections[activeScope].map((c) => (
                    <button
                      type="button"
                      key={c}
                      onClick={() => setCollectionFilter(c)}
                      className={classNames(styles.collectionButton, {
                        [styles.active]: collectionFilter === c,
                      })}
                      title={c}
                      aria-pressed={collectionFilter === c}
                    >
                      {collectionFilter === c ? (
                        <FolderOpen className={styles.collectionIcon} />
                      ) : (
                        <Folder className={styles.collectionIcon} />
                      )}
                      {c}
                    </button>
                  ))}
                </>
              )}
            </div>
          </div>

          {/* Result info */}
          <div className={styles.resultInfo}>
            <small className={styles.resultText}>
              {filteredKbItems.length} içerik bulundu
              {collectionFilter !== "ALL" ? ` • ${collectionFilter}` : ""}
            </small>
          </div>

          {/* Items list */}
          <ul className={styles.itemsList}>
            {filteredKbItems.length === 0 ? (
              <li className={styles.emptyItem}>
                Seçili filtrede içerik yok. Yukarıdan doküman yükleyin.
              </li>
            ) : (
              filteredKbItems.map((item) => (
                <li key={item.id} className={styles.item}>
                  <div className={styles.itemContent}>
                    {item.type === "document" ? (
                      <FileText className={styles.itemIcon} />
                    ) : (
                      <StickyNote className={styles.itemIcon} />
                    )}
                    <div className={styles.itemInfo}>
                      <span className={styles.itemTitle} title={item.title}>
                        {item.title}
                      </span>
                      <small className={styles.itemMeta}>
                        {item.collection || ""}
                        {item.tags && item.tags.length ? ` • ${item.tags.join(", ")}` : ""}
                      </small>
                    </div>
                  </div>
                  <div className={styles.itemActions}>
                    <Button
                      size="icon"
                      variant="ghost"
                      className={styles.deleteButton}
                      aria-label="Sil"
                      onClick={() => handleDelete(item.id)}
                    >
                      <Trash2 className={styles.deleteIcon} />
                    </Button>
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>

        <Dialog open={addingCollection} onOpenChange={setAddingCollection}>
          <DialogContent className={styles.dialogContent}>
            <DialogHeader>
              <DialogTitle>Yeni Koleksiyon</DialogTitle>
            </DialogHeader>
            <div className={styles.dialogBody}>
              <Input
                placeholder="Koleksiyon adı (ör. KVKK, Sözleşmeler)"
                value={newCollectionName}
                onChange={(e) => setNewCollectionName(e.target.value)}
              />
            </div>
            <DialogFooter>
              <Button variant="secondary" onClick={() => setAddingCollection(false)}>
                İptal
              </Button>
              <Button onClick={handleAddCollection}>Kaydet</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </SheetContent>
    </Sheet>
  );
};
