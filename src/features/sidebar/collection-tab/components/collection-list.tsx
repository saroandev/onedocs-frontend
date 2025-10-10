// CollectionList.jsx
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/shared/ui";
import {
  Check,
  ChevronLeft,
  FileText,
  FolderOpen,
  MessageSquare,
  MoreVertical,
  Upload,
} from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import classNames from "classnames";
import styles from "../styles/collection-list.module.scss";
import {
  BUTTON_TYPE,
  BUTTON_VARIANT,
  HTML_TYPE,
  ICON_TYPE,
} from "@/shared/ui/button/button-config";

export const CollectionList = (props: CollectionListProps) => {
  const {
    selectedCollectionId,
    setSelectedCollectionId,
    setChoosenTab,
    setNewCollectionDialogOpen,
    handleAskAssistant,
    selectedCollectionIds,
    filteredCollections,
    toggleCollectionSelection,
    activeScope,
    setActiveScope,
    selectedCollection,
    fileInputRef,
    handleFileSelected,
    documents,
  } = props;

  return (
    <div className={styles.collectionContainer}>
      {!selectedCollectionId && (
        <>
          <div className={styles.header}>
            <div className={styles.headerContent}>
              <h2>Koleksiyonlar</h2>
              <p>Asistanınızı dökümanlarla özel olarak eğitin</p>
            </div>
            <Button
              label=""
              buttonType={BUTTON_TYPE.JUST_ICON}
              onClick={() => setChoosenTab(uuidv4())}
              iconType={{ default: ICON_TYPE.CLOSE }}
            />
          </div>

          <div className={styles.contentScroll}>
            <div className={styles.actionsBar}>
              <Button
                label="Yeni Koleksiyon"
                buttonType={BUTTON_TYPE.ICON_WITH_TEXT}
                onClick={() => setNewCollectionDialogOpen(true)}
                iconType={{ default: ICON_TYPE.DOCUMENT }}
              />
            </div>

            <div className={styles.statsBar}>
              <span className={styles.statsText}>
                {filteredCollections.length} koleksiyon
                {selectedCollectionIds.length > 0 && (
                  <span className={styles.selectedCount}>
                    • {selectedCollectionIds.length} seçili
                  </span>
                )}
              </span>
              <Tabs
                value={activeScope}
                onValueChange={(v) => setActiveScope(v)}
                className={styles.tabsList}
              >
                <TabsList className={styles.tabsList}>
                  <TabsTrigger value="personal" className={styles.tabTrigger}>
                    Kişisel
                  </TabsTrigger>
                  <TabsTrigger value="org" className={styles.tabTrigger}>
                    Organizasyon
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            {selectedCollectionIds.length > 0 && (
              <div className={styles.actionsBar}>
                <Button size="sm" onClick={handleAskAssistant} className={styles.askButton}>
                  <MessageSquare size={16} />
                  Asistana Sor ({selectedCollectionIds.length})
                </Button>
              </div>
            )}

            <div className={styles.collectionsList}>
              {filteredCollections.map((col) => {
                const isSelected = selectedCollectionIds.includes(col.id);
                return (
                  <div
                    key={col.id}
                    className={classNames(styles.collectionItem, {
                      [styles.selected]: isSelected,
                    })}
                  >
                    <div className={styles.collectionContent}>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleCollectionSelection(col.id);
                        }}
                        className={classNames(styles.checkbox, {
                          [styles.checked]: isSelected,
                        })}
                      >
                        {isSelected && <Check className={styles.checkIcon} />}
                      </button>
                      <div
                        className={styles.collectionInfo}
                        onClick={() => setSelectedCollectionId(col.id)}
                      >
                        <h3>{col.name}</h3>
                        <p className={styles.lastUpdated}>Last updated {col.lastUpdated}</p>
                        <div className={styles.collectionStats}>
                          <span>{col.fileCount === 0 ? "No files" : `${col.fileCount} file`}</span>
                          <span>{col.size}</span>
                        </div>
                        <p className={styles.collectionMembers}>
                          {col.members} member • Created by {col.creator}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}

      {selectedCollectionId && selectedCollection && (
        <div className={styles.detailView}>
          <div className={styles.detailHeader}>
            <div
              // variant="ghost"
              // size="sm"
              className={styles.backButton}
              onClick={() => setSelectedCollectionId(null)}
            >
              <ChevronLeft size={16} />
              Geri
            </div>

            <div className={styles.detailHeaderContent}>
              <div className={styles.headerContent}>
                <h2>{selectedCollection.name}</h2>
                <p>Dosyalarınızı görüntüleyin ve yönetin</p>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div
                    // variant="ghost"
                    // size="icon"
                    className={styles.moreButton}
                  >
                    <MoreVertical size={16} />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Düzenle</DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive">Sil</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className={styles.contentScroll}>
            <input
              ref={fileInputRef}
              type="file"
              className={styles.fileInput}
              onChange={handleFileSelected}
              accept=".pdf,.doc,.docx,.txt,.xlsx,.xls,.ppt,.pptx"
            />

            <div className={styles.uploadActions}>
              <Button
                size="sm"
                onClick={() => fileInputRef.current?.click()}
                className={styles.uploadButton}
              >
                <Upload size={16} />
                Dosya Yükle
              </Button>

              <Button
                size="sm"
                variant="outline"
                onClick={handleAskAssistant}
                className={styles.uploadButton}
              >
                <MessageSquare size={16} />
                Asistana Sor
              </Button>
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
                  <div key={doc.id} className={styles.documentItem}>
                    <div className={styles.documentHeader}>
                      <div className={styles.documentIcon}>
                        <FileText />
                      </div>
                      <div className={styles.documentInfo}>
                        <h3>{doc.name}</h3>
                        <p>
                          {doc.type} • {doc.size}
                        </p>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <div
                            // variant="ghost"
                            // size="icon"
                            className={styles.documentMoreBtn}
                          >
                            <MoreVertical size={16} />
                          </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>İndir</DropdownMenuItem>
                          <DropdownMenuItem>Yeniden adlandır</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">Sil</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    <div className={styles.documentDivider}></div>

                    <div className={styles.documentMeta}>
                      <div className={styles.metaRow}>
                        <span className={styles.metaLabel}>Ekleme tarihi</span>
                        <span className={styles.metaValue}>
                          {new Date(doc.uploadDate).toLocaleDateString("tr-TR", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                      <div className={styles.metaRow}>
                        <span className={styles.metaLabel}>Yükleyen</span>
                        <span className={styles.metaValue}>{doc.uploadedBy}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

interface Document {
  id: number;
  collectionId: number;
  name: string;
  type: string;
  size: string;
  uploadDate: string;
  uploadedBy: string;
  content?: string | null;
  userId: string;
}

interface CollectionListProps {
  selectedCollectionId: string | null;
  setSelectedCollectionId: (val: string | null) => void;
  setChoosenTab: (val: string) => void;
  setNewCollectionDialogOpen: (val: boolean) => void;
  handleAskAssistant: () => void;
  selectedCollectionIds: string[];
  filteredCollections: {
    id: string;
    name: string;
    fileCount: number;
    size: string;
    members: number;
    creator: string;
    lastUpdated: string;
    scope: "personal" | "org";
  }[];
  toggleCollectionSelection: (val: string) => void;
  activeScope: "personal" | "org";
  setActiveScope: (val: "personal" | "org" | string) => void;
  selectedCollection:
    | {
        id: string;
        name: string;
        fileCount: number;
        size: string;
        members: number;
        creator: string;
        lastUpdated: string;
        scope: "personal" | "org";
      }
    | null
    | undefined;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  handleFileSelected: (e: React.ChangeEvent<HTMLInputElement>) => void;
  documents: Document[];
}
