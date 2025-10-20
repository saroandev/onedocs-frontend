import { useState } from "react";
import { CreateCollectionModal } from "./create-collection-modal";
import { CollectionList } from "./collection-list";
import styles from "../styles/collection-list.module.scss";
import { Button, Skeleton, Tabs, TabsList, TabsTrigger } from "@/shared/ui";
import { useUIStore } from "@/shared/store/ui.store";
import classnames from "classnames";
import { Check } from "lucide-react";
import { useGetCollections } from "../hooks";
import { scopeMapping } from "../constants/collection-tab-config";
import { formatDate } from "@/shared/lib/dateFormatter";

export const CollectionTab = () => {
  const [activeScope, setActiveScope] = useState<"personal" | "org">("personal");
  const setChoosenTab = useUIStore((state) => state.setChoosenTab);
  const [showCreateCollectionModal, setShowCreateCollectionModal] = useState(false);
  const [selectedCollectionId, setSelectedCollectionId] = useState<string | null>(null);
  const [selectedCollectionIds, setSelectedCollectionIds] = useState<string[]>([]);

  // Collections listesini çek
  const { data: collectionsData, isLoading } = useGetCollections({
    query: activeScope === "personal" ? "private" : "shared",
  });

  const collections = collectionsData?.collections || [];

  const handleAskAssistant = () => {
    // Seçili koleksiyonlarla asistana sor işlemi
    console.log("Selected collections:", selectedCollectionIds);
  };

  const toggleCollectionSelection = (collectionId: string) => {
    setSelectedCollectionIds((prev) => {
      if (prev.includes(collectionId)) {
        return prev.filter((id) => id !== collectionId);
      } else {
        return [...prev, collectionId];
      }
    });
  };

  const selectedCollection = !selectedCollectionId
    ? null
    : collections.find((col) => col.name === selectedCollectionId);

  const renderFilteredCollections = () => {
    if (isLoading) {
      return <Skeleton />;
    }

    return (
      !selectedCollectionId && (
        <div className={styles.contentScroll}>
          <div className={styles.actionsBar}>
            <Button
              label="Yeni Koleksiyon"
              buttonType={"iconWithText"}
              onClick={() => setShowCreateCollectionModal(true)}
              iconType={{ default: "document" }}
              iconTextReverse
            />
          </div>

          <div className={styles.statsBar}>
            <span className={styles.statsText}>
              {collections.length} koleksiyon
              {selectedCollectionIds.length > 0 && (
                <span className={styles.selectedCount}>
                  • {selectedCollectionIds.length} seçili
                </span>
              )}
            </span>
            <Tabs
              value={activeScope}
              onValueChange={(v) => {
                setActiveScope(v as "personal" | "org");
                setSelectedCollectionIds([]);
              }}
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
              <Button
                label={`Asistana Sor ${selectedCollectionIds.length}`}
                onClick={handleAskAssistant}
                buttonType={"iconWithText"}
                iconType={{ default: "message" }}
                iconTextReverse
              />
            </div>
          )}

          {collections.length === 0 && (
            <div className={styles.collectionsList}>
              <div className={styles.emptyState}>
                <p className={styles.emptyTitle}>Henüz koleksiyon yok</p>
                <p className={styles.emptyDesc}>Yeni bir koleksiyon oluşturarak başlayın</p>
              </div>
            </div>
          )}

          {collections.map((col) => {
            const isSelected = selectedCollectionIds.includes(col.name);

            return (
              <div className={styles.collectionsList}>
                <div
                  key={col.name}
                  className={classnames(styles.collectionItem, {
                    [styles.selected]: isSelected,
                  })}
                >
                  <div className={styles.collectionContent}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleCollectionSelection(col.name);
                      }}
                      className={classnames(styles.checkbox, {
                        [styles.checked]: isSelected,
                      })}
                    >
                      {isSelected && <Check className={styles.checkIcon} />}
                    </button>
                    <div
                      className={styles.collectionInfo}
                      onClick={() => setSelectedCollectionId(col.name)}
                    >
                      <h3>{col.name}</h3>
                      <p className={styles.lastUpdated}>
                        Son güncelleme:
                        {formatDate(col.updated_at, "withText")}
                      </p>
                      <div className={styles.collectionStats}>
                        <span>
                          {col.document_count === 0 ? "Dosya yok" : `${col.document_count} dosya`}
                        </span>
                        <span>{col.size_mb.toFixed(2)} MB</span>
                      </div>
                      <p className={styles.collectionMembers}>
                        {col.chunk_count} chunk • {col.created_by_email}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <h2>Koleksiyonlar</h2>
          <p>Asistanınızı dökümanlarla özel olarak eğitin</p>
        </div>
        <Button
          label=""
          buttonType="justIcon"
          onClick={() => setChoosenTab("")}
          iconType={{ default: "close" }}
        />
      </div>

      {renderFilteredCollections()}

      {selectedCollectionId && selectedCollection && (
        <CollectionList
          setSelectedCollectionId={setSelectedCollectionId}
          selectedCollection={selectedCollection}
          collectionScope={scopeMapping[activeScope]}
        />
      )}
      <CreateCollectionModal
        open={showCreateCollectionModal}
        setOpen={setShowCreateCollectionModal}
      />
    </div>
  );
};
