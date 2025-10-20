/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Skeleton,
} from "@/shared/ui";
import { FileText, FolderOpen } from "lucide-react";
import styles from "../styles/collection-list.module.scss";
import { useRef } from "react";
import {
  useGetCollection,
  useGetCollectionDocuments,
  useDeleteCollection,
  useCreateCollectionDocument,
} from "../hooks";
import { formatDate } from "@/shared/lib/dateFormatter";

export const CollectionList = (props: CollectionListProps) => {
  const { setSelectedCollectionId, selectedCollection, collectionScope } = props;
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Collection detaylarını çek
  const { data: collectionDetail, isLoading: isLoadingCollection } = useGetCollection({
    collection_name: selectedCollection.name,
    scope: collectionScope,
  });

  // Collection documents'ı çek
  const { data: documents = [], isLoading: isLoadingDocuments } = useGetCollectionDocuments({
    collection_name: selectedCollection.name,
    scope: collectionScope,
  });

  // Delete collection mutation
  const { mutate: deleteCollection, isPending: isDeleting } = useDeleteCollection();

  // Create document mutation
  const { mutate: createDocument, isPending: isUploadingDocument } = useCreateCollectionDocument();

  const handleDelete = () => {
    //TODO
    if (
      window.confirm(`"${selectedCollection.name}" koleksiyonunu silmek istediğinize emin misiniz?`)
    ) {
      deleteCollection(
        {
          collection_name: selectedCollection.name,
          scope: collectionScope,
        },
        {
          onSuccess: () => {
            setSelectedCollectionId(null);
          },
        }
      );
    }
  };

  const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // const formData = new FormData();
    // formData.append("file", file);

    createDocument({
      collection_name: selectedCollection.name,
      file,
      scope: collectionScope,
    });

    // Input'u temizle
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const renderContent = () => {
    if (isLoadingCollection || isLoadingDocuments) {
      return <Skeleton />;
    }

    return (
      <div className={styles.contentScroll}>
        <input
          ref={fileInputRef}
          type="file"
          className={styles.fileInput}
          onChange={handleFileSelected}
          accept=".pdf,.doc,.docx,.txt,.xlsx,.xls,.ppt,.pptx"
          disabled={isUploadingDocument}
        />
        <div className={styles.uploadActions}>
          <Button
            label="Dosya Yükle"
            onClick={() => fileInputRef.current?.click()}
            buttonType={"iconWithText"}
            iconType={{ default: "upload" }}
            iconTextReverse
            isLoading={isUploadingDocument}
          />
          <Button
            label="Asistana Sor"
            // onClick={() => fileInputRef.current?.click()} //TODO
            buttonType={"iconWithText"}
            iconType={{ default: "message" }}
            iconTextReverse
            variant="secondary"
            disabled={isUploadingDocument}
          />
        </div>

        <div className={styles.statsBar}>
          <span className={styles.fileCount}>{documents.length} dosya</span>
        </div>
        {documents.length === 0 ? (
          <div className={styles.emptyState}>
            <FolderOpen className={styles.emptyIcon} />
            <p className={styles.emptyTitle}>Henüz dosya yüklenmemiş</p>
            <p className={styles.emptyDesc}>Dosya yükleyerek başlayın</p>
          </div>
        ) : (
          <div className={styles.documentsList}>
            {documents.map((doc) => (
              <div key={doc.document_id} className={styles.documentItem}>
                <div className={styles.documentHeader}>
                  <div className={styles.documentIcon}>
                    <FileText />
                  </div>
                  <div className={styles.documentInfo}>
                    <h3>{doc.title}</h3>
                    <p>
                      {doc.document_type} • {doc.size_mb.toFixed(2)} MB
                    </p>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <div>
                        <Button label="" buttonType="justIcon" iconType={{ default: "dots" }} />
                      </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => window.open(doc.url, "_blank")}>
                        {/* //TODO  */}
                        İndir
                      </DropdownMenuItem>
                      <DropdownMenuItem>Yeniden adlandır</DropdownMenuItem>
                      <DropdownMenuItem className={styles.dropdownRemove}>Sil</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className={styles.documentDivider} />
                <div className={styles.documentMeta}>
                  <div className={styles.metaRow}>
                    <span className={styles.metaLabel}>Ekleme tarihi</span>
                    <span className={styles.metaValue}>
                      {formatDate(doc.created_at, "withText")}
                    </span>
                  </div>
                  <div className={styles.metaRow}>
                    <span className={styles.metaLabel}>Yükleyen</span>
                    <span className={styles.metaValue}>{doc.uploaded_by_email}</span>
                  </div>
                  {doc.metadata?.pages && (
                    <div className={styles.metaRow}>
                      <span className={styles.metaLabel}>Sayfa Sayısı</span>
                      <span className={styles.metaValue}>{doc.metadata.pages}</span>
                    </div>
                  )}
                  <div className={styles.metaRow}>
                    <span className={styles.metaLabel}>Chunk Sayısı</span>
                    <span className={styles.metaValue}>{doc.chunks_count}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={styles.detailView}>
      <div className={styles.detailHeader}>
        <Button
          label="Geri"
          onClick={() => setSelectedCollectionId(null)}
          buttonType="iconWithText"
          iconType={{ default: "chevron-left" }}
          iconTextReverse
          variant="secondary"
          className={styles.back}
        />
        <div className={styles.detailHeaderContent}>
          <div className={styles.headerContent}>
            <h2>{selectedCollection.name}</h2>
            <p>{collectionDetail?.description || "Dosyalarınızı görüntüleyin ve yönetin"}</p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div>
                <Button label="" buttonType="justIcon" iconType={{ default: "dots" }} />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Düzenle</DropdownMenuItem>
              <DropdownMenuItem
                className={styles.dropdownRemove}
                onClick={handleDelete}
                disabled={isDeleting}
              >
                {isDeleting ? "Siliniyor..." : "Sil"}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      {renderContent()}
    </div>
  );
};

interface CollectionListProps {
  setSelectedCollectionId: (val: string | null) => void;
  selectedCollection: {
    name: string;
    document_count: number;
    size_mb: number;
    created_by_email: string;
    updated_at: string;
    scope: string;
    chunk_count: number;
  };
  collectionScope: "private" | "shared";
}
